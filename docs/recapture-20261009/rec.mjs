// Continuous screen recording of a scripted browser session.
// Frames come from the CDP screencast (every painted frame, real timestamps),
// then ffmpeg rebuilds a constant-frame-rate MP4. A drawn cursor follows the
// real mouse events so viewers can see where the action is.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

export const CHROME = `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;

const CURSOR_SCRIPT = `
(() => {
  if (window.__recCursor) return;
  window.__recCursor = true;
  const install = () => {
    if (!document.body || document.getElementById('__rec_cursor')) return;
    const c = document.createElement('div');
    c.id = '__rec_cursor';
    c.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24"><path d="M4 2l15 9.5-6.6 1.4L16 21l-3 1.4-3.6-8.1L4 18.5z" fill="#111" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>';
    Object.assign(c.style, {position:'fixed',left:'0',top:'0',zIndex:'2147483647',pointerEvents:'none',transform:'translate(-200px,-200px)',filter:'drop-shadow(0 1px 2px rgba(0,0,0,.35))'});
    const r = document.createElement('div');
    r.id = '__rec_ripple';
    Object.assign(r.style, {position:'fixed',left:'0',top:'0',width:'34px',height:'34px',marginLeft:'-17px',marginTop:'-17px',borderRadius:'50%',background:'rgba(0,98,155,.28)',border:'2px solid rgba(0,98,155,.55)',zIndex:'2147483646',pointerEvents:'none',opacity:'0',transition:'opacity .35s, transform .35s'});
    document.body.appendChild(r); document.body.appendChild(c);
    const pos = window.__recPos || {x:-200,y:-200};
    c.style.transform = 'translate(' + (pos.x-3) + 'px,' + (pos.y-2) + 'px)';
  };
  document.addEventListener('mousemove', e => {
    window.__recPos = {x:e.clientX, y:e.clientY};
    install();
    const c = document.getElementById('__rec_cursor');
    if (c) c.style.transform = 'translate(' + (e.clientX-3) + 'px,' + (e.clientY-2) + 'px)';
  }, true);
  document.addEventListener('mousedown', e => {
    install();
    const r = document.getElementById('__rec_ripple');
    if (!r) return;
    r.style.transition = 'none'; r.style.left = e.clientX + 'px'; r.style.top = e.clientY + 'px';
    r.style.opacity = '1'; r.style.transform = 'scale(.5)';
    requestAnimationFrame(() => requestAnimationFrame(() => { r.style.transition = 'opacity .45s, transform .45s'; r.style.opacity = '0'; r.style.transform = 'scale(1.4)'; }));
  }, true);
  if (document.readyState !== 'loading') install(); else document.addEventListener('DOMContentLoaded', install);
})();`;

export async function startSession({ width = 1440, height = 810, outW = 2560, outH = 1440, colorScheme = 'light', storage } = {}) {
  const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--hide-scrollbars', '--autoplay-policy=no-user-gesture-required'] });
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: outW / width, colorScheme, locale: 'en-US', timezoneId: 'America/Los_Angeles' });
  if (storage) await context.addInitScript(storage);
  await context.addInitScript(CURSOR_SCRIPT);
  const page = await context.newPage();
  const mouse = { x: width / 2, y: height / 2 };
  const frames = [];
  let cdp = null;
  let recording = false;

  async function record() {
    cdp = await context.newCDPSession(page);
    cdp.on('Page.screencastFrame', async ({ data, metadata, sessionId }) => {
      if (recording) frames.push({ t: metadata.timestamp, data });
      try { await cdp.send('Page.screencastFrameAck', { sessionId }); } catch {}
    });
    recording = true;
    await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: outW, maxHeight: outH, everyNthFrame: 1 });
    // park the cursor somewhere visible
    await page.mouse.move(mouse.x, mouse.y);
  }

  // A static page sends no new frames; nudge a repaint so holds are timed correctly.
  async function pause(ms) {
    const end = Date.now() + ms;
    while (Date.now() < end) {
      await page.evaluate(() => { const c = document.getElementById('__rec_cursor'); if (c) c.style.opacity = c.style.opacity === '0.999' ? '1' : '0.999'; }).catch(() => {});
      await page.waitForTimeout(Math.min(100, Math.max(0, end - Date.now())));
    }
  }

  async function moveTo(x, y, ms) {
    const sx = mouse.x, sy = mouse.y;
    const dist = Math.hypot(x - sx, y - sy);
    const dur = ms ?? Math.min(900, 280 + dist * 0.7);
    const steps = Math.max(8, Math.round(dur / 16));
    // gentle arc so the motion looks hand-driven
    const cx = (sx + x) / 2 + (y - sy) * 0.12, cy = (sy + y) / 2 - (x - sx) * 0.12;
    for (let i = 1; i <= steps; i++) {
      const p = i / steps; const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      const px = (1 - e) * (1 - e) * sx + 2 * (1 - e) * e * cx + e * e * x;
      const py = (1 - e) * (1 - e) * sy + 2 * (1 - e) * e * cy + e * e * y;
      await page.mouse.move(px, py);
      await page.waitForTimeout(dur / steps);
    }
    mouse.x = x; mouse.y = y;
  }

  async function point(target, opts = {}) {
    const loc = typeof target === 'string' ? page.locator(target).first() : target;
    await loc.scrollIntoViewIfNeeded().catch(() => {});
    const b = await loc.boundingBox();
    if (!b) throw new Error('no box for ' + target);
    const x = b.x + b.width * (opts.fx ?? 0.5), y = b.y + b.height * (opts.fy ?? 0.5);
    await moveTo(x, y, opts.ms);
    return { x, y };
  }

  async function click(target, opts = {}) {
    await point(target, opts);
    await pause(opts.before ?? 180);
    await page.mouse.down(); await page.waitForTimeout(70); await page.mouse.up();
    await pause(opts.after ?? 450);
  }

  async function type(text, delay = 70) {
    for (const ch of text) { await page.keyboard.type(ch); await page.waitForTimeout(delay + Math.random() * 40); }
  }

  async function finish(outFile, { fps = 30, tail = 1.2 } = {}) {
    recording = false;
    try { await cdp.send('Page.stopScreencast'); } catch {}
    await browser.close();
    const dir = outFile.replace(/\.mp4$/, '-frames');
    fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
    const list = [];
    frames.forEach((f, i) => {
      const name = `f${String(i).padStart(6, '0')}.jpg`;
      fs.writeFileSync(path.join(dir, name), Buffer.from(f.data, 'base64'));
      const next = frames[i + 1] ? frames[i + 1].t : f.t + tail;
      list.push(`file '${name}'\nduration ${Math.max(0.001, next - f.t).toFixed(4)}`);
    });
    list.push(`file 'f${String(frames.length - 1).padStart(6, '0')}.jpg'`);
    fs.writeFileSync(path.join(dir, 'list.txt'), list.join('\n') + '\n');
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', path.join(dir, 'list.txt'),
      '-vf', `scale=${outW}:${outH}:flags=lanczos,fps=${fps},format=yuv420p`, '-c:v', 'libx264', '-preset', 'slow', '-crf', '17',
      '-movflags', '+faststart', '-an', outFile]);
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', path.join(dir, 'f000000.jpg'), '-vf', `scale=${outW}:${outH}`, '-q:v', '3', outFile.replace(/\.mp4$/, '-poster.jpg')]);
    const dur = execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', outFile]).toString().trim();
    console.log(`wrote ${outFile} (${frames.length} source frames, ${dur}s)`);
    return { frames: frames.length, duration: Number(dur), framesDir: dir };
  }

  return { browser, context, page, record, pause, moveTo, point, click, type, finish };
}
