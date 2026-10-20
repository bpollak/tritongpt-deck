import {test,expect} from '@playwright/test';

test('SMT recurring-work presentation has its own navigation and context guide', async ({page})=>{
 await page.goto('/?audience=smt-work#slide=smt-work-environments');
 await expect(page.getByRole('heading',{name:'Interactive work and scheduled work',exact:true})).toBeVisible();
 await expect(page.getByRole('navigation',{name:'Slide navigation'})).toContainText('3 / 18');
 const popupPromise=page.waitForEvent('popup');
 await page.getByRole('link',{name:'Job context'}).focus();
 await page.keyboard.press('Enter');
 const guide=await popupPromise;
 await expect(guide).toHaveURL(/smt-job-guide\.html#harness-brief$/);
 await expect(guide.locator('main section')).toHaveCount(15);
 await expect(guide.locator('#reply-drafts')).toContainText('This job never sends email.');
 await guide.close();
 await page.getByRole('button',{name:'Next slide',exact:true}).click();
 await expect(page).toHaveURL(/#slide=smt-work-briefing$/);
});

test('job guide links reach their sections and PDF download', async ({page,request})=>{
 await page.goto('/smt-job-guide.html');
 for(const a of await page.locator('nav a').all()){
  const target=await a.getAttribute('href');
  await expect(page.locator(target)).toHaveCount(1);
 }
 const pdf=await request.get('/smt-ai-daily-work.pdf');
 expect(pdf.ok()).toBeTruthy();
 expect(pdf.headers()['content-type']).toContain('application/pdf');
 expect((await pdf.body()).subarray(0,5).toString()).toBe('%PDF-');
});

test('SMT context remains readable and reachable on a phone', async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('/?audience=smt-work#slide=smt-work-watchers');
 const context=page.getByRole('link',{name:'Job context'});
 await expect(context).toBeInViewport();
 const stage=page.locator('.smt-work');
 expect(await stage.evaluate(e=>e.scrollWidth<=e.clientWidth+1)).toBeTruthy();
 await page.goto('/smt-job-guide.html#roadmap-review');
 await page.locator('#roadmap-review .top').scrollIntoViewIfNeeded();
 await expect(page.locator('#roadmap-review .top')).toBeInViewport();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
});
