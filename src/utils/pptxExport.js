import pptxgen from "pptxgenjs";

const SLIDE_WIDTH = 13.333;
const SLIDE_HEIGHT = 7.5;
const LEFT_MARGIN = 0.6;
const RIGHT_MARGIN = 0.6;
const FOOTER_HEIGHT = 0.24;
const BODY_LINE_HEIGHT = 0.23;
const MAX_CHARS_PER_LINE = 72;
const IMAGE_EXT_RE = /\.(png|jpe?g|gif|webp|svg)$/i;
const LIGHT_MASTER_NAME = "UCSD_LIGHT_MASTER";
const DARK_MASTER_NAME = "UCSD_DARK_MASTER";
const MIN_VISIBLE_FONT_PT = 9;
const NOTES_CHAR_LIMIT = 5000;
const SHRINK_DISABLE_MAX_FONT_PT = 12;
const EXPORT_MODE = Object.freeze({
  PRESENTATION: "presentation",
  ARCHIVE: "archive",
});

const TYPOGRAPHY = Object.freeze({
  display: 44,
  title: 30,
  subtitle: 15,
  section: 14,
  cardTitle: 12,
  body: 10.5,
  bodySmall: 9.5,
  caption: 8.5,
  footer: 8,
  badge: 9,
  accessibility: 1,
});

const NON_CONTENT_KEYS = new Set([
  "id",
  "type",
  "layout",
  "dark",
  "backgroundColor",
  "audiences",
  "title",
  "subtitle",
  "videoSrc",
  "poster",
  "campusImage",
  "presenterImage",
  "managerLabel",
]);

const INTERNAL_KEYS = new Set([
  "icon",
  "color",
  "dark",
  "backgroundColor",
  "audiences",
  "videoSrc",
  "poster",
  "campusImage",
  "presenterImage",
  "id",
  "type",
  "layout",
  "areaFill",
  "maxValue",
  "tier",
  "category",
]);

const LEAD_KEY_PRIORITY = [
  "heading",
  "name",
  "title",
  "rowTitle",
  "feature",
  "role",
  "factor",
  "type",
  "quarter",
  "phase",
  "label",
  "text",
  "value",
];

const COMPACT_DETAIL_KEYS = new Set([
  "text",
  "description",
  "details",
  "example",
  "sub",
  "responsibilities",
  "value",
]);

const TEMPLATE_KIND = {
  TITLE_BODY: "title-body",
  TWO_COLUMN: "two-column",
  DATA_INSIGHT: "data-insight",
  COMPARISON: "comparison",
  ROADMAP: "roadmap",
};

const DENSE_TEMPLATE_KINDS = new Set([
  TEMPLATE_KIND.TWO_COLUMN,
  TEMPLATE_KIND.COMPARISON,
  TEMPLATE_KIND.ROADMAP,
]);

const TEMPLATE_LABELS = {
  [TEMPLATE_KIND.TITLE_BODY]: "Title + Body",
  [TEMPLATE_KIND.TWO_COLUMN]: "Two-Column Narrative",
  [TEMPLATE_KIND.DATA_INSIGHT]: "Data + Insight",
  [TEMPLATE_KIND.COMPARISON]: "Comparison",
  [TEMPLATE_KIND.ROADMAP]: "Roadmap",
};

const LAYOUT_TEMPLATE_MAP = new Map([
  ["title-hero", TEMPLATE_KIND.TITLE_BODY],
  ["feature-grid", TEMPLATE_KIND.TWO_COLUMN],
  ["hero-list", TEMPLATE_KIND.TWO_COLUMN],
  ["key-takeaways", TEMPLATE_KIND.TWO_COLUMN],
  ["solution-showcase", TEMPLATE_KIND.TWO_COLUMN],
  ["solution-showcase-video", TEMPLATE_KIND.TWO_COLUMN],
  ["contract-review-challenge", TEMPLATE_KIND.TWO_COLUMN],
  ["case-study-hero", TEMPLATE_KIND.TWO_COLUMN],
  ["platform-simple", TEMPLATE_KIND.TWO_COLUMN],
  ["campus-metrics", TEMPLATE_KIND.DATA_INSIGHT],
  ["analytics-chart", TEMPLATE_KIND.DATA_INSIGHT],
  ["timeline-evolution", TEMPLATE_KIND.DATA_INSIGHT],
  ["compound-architecture", TEMPLATE_KIND.DATA_INSIGHT],
  ["agent-workflow", TEMPLATE_KIND.DATA_INSIGHT],
  ["comparison-table", TEMPLATE_KIND.COMPARISON],
  ["team-grid", TEMPLATE_KIND.COMPARISON],
  ["agent-dev-strategy", TEMPLATE_KIND.COMPARISON],
  ["assistant-categories", TEMPLATE_KIND.ROADMAP],
]);

const TEMPLATE_PAGINATION_RULES = {
  [TEMPLATE_KIND.TITLE_BODY]: {
    maxItemsPerPage: 4,
    maxWeightPerPage: 16,
  },
  [TEMPLATE_KIND.TWO_COLUMN]: {
    maxItemsPerPage: 6,
    maxWeightPerPage: 24,
  },
  [TEMPLATE_KIND.DATA_INSIGHT]: {
    maxItemsPerPage: 8,
    maxWeightPerPage: 28,
  },
  [TEMPLATE_KIND.COMPARISON]: {
    maxItemsPerPage: 6,
    maxWeightPerPage: 24,
  },
  [TEMPLATE_KIND.ROADMAP]: {
    maxItemsPerPage: 2,
    maxWeightPerPage: 18,
  },
};

const LAYOUT_PAGINATION_RULES = {
  "comparison-table": {
    maxItemsPerPage: 5,
    maxWeightPerPage: 18,
  },
  "timeline-evolution": {
    maxItemsPerPage: 4,
    maxWeightPerPage: 14,
  },
  "team-grid": {
    maxItemsPerPage: 5,
    maxWeightPerPage: 16,
  },
  "campus-metrics": {
    maxItemsPerPage: 8,
    maxWeightPerPage: 26,
  },
  "platform-simple": {
    maxItemsPerPage: 12,
    maxWeightPerPage: 30,
  },
  "case-study-hero": {
    maxItemsPerPage: 2,
    maxWeightPerPage: 8,
  },
  "compound-architecture": {
    maxItemsPerPage: 3,
    maxWeightPerPage: 12,
  },
  "agent-workflow": {
    maxItemsPerPage: 4,
    maxWeightPerPage: 14,
  },
  "assistant-categories": {
    maxItemsPerPage: 2,
    maxWeightPerPage: 16,
  },
  "contract-review-challenge": {
    maxItemsPerPage: 4,
    maxWeightPerPage: 18,
  },
  "solution-showcase": {
    maxItemsPerPage: 4,
    maxWeightPerPage: 15,
  },
  "solution-showcase-video": {
    maxItemsPerPage: 4,
    maxWeightPerPage: 15,
  },
  "feature-grid": {
    maxItemsPerPage: 6,
    maxWeightPerPage: 30,
  },
  "hero-list": {
    maxItemsPerPage: 4,
    maxWeightPerPage: 20,
  },
  "key-takeaways": {
    maxItemsPerPage: 6,
    maxWeightPerPage: 30,
  },
};

const EXPORT_PROFILES = Object.freeze({
  [EXPORT_MODE.PRESENTATION]: Object.freeze({
    mode: EXPORT_MODE.PRESENTATION,
    minVisibleFontPt: 9.5,
    denseTemplateFontPt: 10.5,
    shrinkDisableMaxFontPt: 12.5,
    paginationItemScale: 1.35,
    paginationWeightScale: 1.35,
    maxContinuationSlidesPerSection: null,
    detailLineLimit: null,
    includeHiddenAccessibilityLayer: false,
  }),
  [EXPORT_MODE.ARCHIVE]: Object.freeze({
    mode: EXPORT_MODE.ARCHIVE,
    minVisibleFontPt: MIN_VISIBLE_FONT_PT,
    denseTemplateFontPt: MIN_VISIBLE_FONT_PT,
    shrinkDisableMaxFontPt: SHRINK_DISABLE_MAX_FONT_PT,
    paginationItemScale: 1,
    paginationWeightScale: 1,
    maxContinuationSlidesPerSection: null,
    detailLineLimit: null,
    includeHiddenAccessibilityLayer: false,
  }),
});

let activeExportProfile = EXPORT_PROFILES[EXPORT_MODE.ARCHIVE];
let activeExportSession = null;

const buildExportFileName = () => {
  const now = new Date();
  const yyyy = String(now.getFullYear());
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  return `TritonGPT-Presentation-${yyyy}${mm}${dd}-${hh}${min}${ss}.pptx`;
};

const clampPositive = (value, fallback = 1) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return parsed;
};

const resolveExportProfile = (options = {}) => {
  const requestedMode = String(options?.exportMode || "").trim().toLowerCase();
  const mode = requestedMode === EXPORT_MODE.PRESENTATION
    ? EXPORT_MODE.PRESENTATION
    : EXPORT_MODE.ARCHIVE;
  return EXPORT_PROFILES[mode];
};

const setExportContext = ({ profile, session }) => {
  activeExportProfile = profile || EXPORT_PROFILES[EXPORT_MODE.ARCHIVE];
  activeExportSession = session || null;
};

const clearExportContext = () => {
  activeExportProfile = EXPORT_PROFILES[EXPORT_MODE.ARCHIVE];
  activeExportSession = null;
};

const getActiveExportProfile = () => {
  return activeExportProfile || EXPORT_PROFILES[EXPORT_MODE.ARCHIVE];
};

const getActiveExportSession = () => {
  return activeExportSession;
};

const getDetailLineLimit = () => {
  const limit = Number(getActiveExportProfile()?.detailLineLimit);
  if (!Number.isFinite(limit) || limit <= 0) return null;
  return Math.floor(limit);
};

const getTemplateFontFloor = (templateKind) => {
  const profile = getActiveExportProfile();
  const baseFloor = clampPositive(profile?.minVisibleFontPt, MIN_VISIBLE_FONT_PT);
  if (!DENSE_TEMPLATE_KINDS.has(templateKind)) {
    return baseFloor;
  }
  return Math.max(baseFloor, clampPositive(profile?.denseTemplateFontPt, baseFloor));
};

const estimateTextUnits = (text, charsPerUnit = 72) => {
  const normalized = normalizeWhitespace(text || "");
  if (!normalized) return 1;
  return Math.max(1, Math.ceil(normalized.length / clampPositive(charsPerUnit, 72)));
};

const estimateLinesUnits = (lines, charsPerUnit = 72) => {
  if (!Array.isArray(lines) || !lines.length) return 1;
  return lines.reduce((sum, line) => sum + estimateTextUnits(line, charsPerUnit), 0);
};

const paginateByWeight = ({
  items,
  maxItemsPerPage,
  maxWeightPerPage,
  getWeight,
}) => {
  if (!Array.isArray(items) || !items.length) return [];

  const maxItems = Math.max(1, Math.floor(clampPositive(maxItemsPerPage, 1)));
  const maxWeight = clampPositive(maxWeightPerPage, 1);
  const weightFor = typeof getWeight === "function" ? getWeight : () => 1;

  const pages = [];
  let page = [];
  let pageWeight = 0;

  const commit = () => {
    if (!page.length) return;
    pages.push(page);
    page = [];
    pageWeight = 0;
  };

  for (const item of items) {
    const itemWeight = Math.max(1, Math.ceil(clampPositive(weightFor(item), 1)));
    const tooManyItems = page.length >= maxItems;
    const tooHeavy = page.length > 0 && pageWeight + itemWeight > maxWeight;

    if (tooManyItems || tooHeavy) commit();

    page.push(item);
    pageWeight += itemWeight;
  }

  commit();
  return pages.length ? pages : [items];
};

const getPaginationConfig = ({ slide, defaults = {} }) => {
  const templateKind = resolveTemplateKind(slide);
  const templateRule = TEMPLATE_PAGINATION_RULES[templateKind] || {};
  const layoutKey = typeof slide?.layout === "string" ? slide.layout : "";
  const layoutRule = layoutKey ? LAYOUT_PAGINATION_RULES[layoutKey] || {} : {};
  const profile = getActiveExportProfile();

  const baseItemsPerPage = clampPositive(
    layoutRule.maxItemsPerPage ?? defaults.maxItemsPerPage ?? templateRule.maxItemsPerPage ?? 4,
    4
  );
  const baseWeightPerPage = clampPositive(
    layoutRule.maxWeightPerPage ?? defaults.maxWeightPerPage ?? templateRule.maxWeightPerPage ?? 16,
    16
  );
  const itemScale = clampPositive(profile?.paginationItemScale, 1);
  const weightScale = clampPositive(profile?.paginationWeightScale, 1);

  return {
    maxItemsPerPage: Math.max(1, Math.round(baseItemsPerPage * itemScale)),
    maxWeightPerPage: Math.max(1, Math.round(baseWeightPerPage * weightScale)),
  };
};

const paginateSlideItems = ({
  slide,
  items,
  defaults = {},
  getWeight,
}) => {
  const config = getPaginationConfig({ slide, defaults });
  const pages = paginateByWeight({
    items,
    maxItemsPerPage: config.maxItemsPerPage,
    maxWeightPerPage: config.maxWeightPerPage,
    getWeight,
  });

  const continuationCap = Number(getActiveExportProfile()?.maxContinuationSlidesPerSection);
  if (!Number.isFinite(continuationCap) || continuationCap <= 0 || pages.length <= continuationCap) {
    return pages;
  }

  const cappedPages = pages.slice(0, continuationCap);
  const exportSession = getActiveExportSession();
  if (exportSession && Array.isArray(exportSession.cappedSections)) {
    exportSession.cappedSections.push({
      title: getTitleText(slide),
      originalPageCount: pages.length,
      cappedPageCount: continuationCap,
    });
  }
  return cappedPages;
};

const normalizeMultilineText = (value) => {
  return String(value || "")
    .split(/\n+/)
    .map((line) => normalizeWhitespace(line))
    .filter(Boolean)
    .join("\n");
};

const wrapTextToLines = (text, charsPerLine = 56) => {
  const normalized = normalizeMultilineText(text);
  if (!normalized) return [];

  const maxChars = Math.max(16, Math.floor(clampPositive(charsPerLine, 56)));
  const paragraphLines = normalized.split("\n");
  const lines = [];

  paragraphLines.forEach((paragraph) => {
    const words = paragraph.split(" ").filter(Boolean);
    if (!words.length) return;

    let current = "";
    words.forEach((word) => {
      const candidate = current ? `${current} ${word}` : word;
      if (candidate.length <= maxChars) {
        current = candidate;
      } else {
        if (current) lines.push(current);
        if (word.length <= maxChars) {
          current = word;
        } else {
          // Break very long tokens to avoid impossible wrapping.
          let start = 0;
          while (start < word.length) {
            const piece = word.slice(start, start + maxChars);
            if (piece.length === maxChars) {
              lines.push(piece);
            } else {
              current = piece;
            }
            start += maxChars;
          }
        }
      }
    });

    if (current) lines.push(current);
  });

  return lines;
};

const estimateTextLineCapacity = ({
  heightInches,
  fontSize = TYPOGRAPHY.body,
  lineHeight = 1.18,
}) => {
  const h = clampPositive(heightInches, 0);
  const size = clampPositive(fontSize, TYPOGRAPHY.body);
  const lineMultiplier = clampPositive(lineHeight, 1.18);
  const pointsHeight = h * 72;
  return Math.max(1, Math.floor(pointsHeight / (size * lineMultiplier)));
};

const splitTextIntoSegments = ({
  text,
  charsPerLine = 56,
  maxLinesPerSegment = 4,
  boxHeightInches = null,
  fontSize = null,
  lineHeight = 1.18,
}) => {
  const lines = wrapTextToLines(text, charsPerLine);
  if (!lines.length) return [""];

  const derivedLineCapacity =
    Number.isFinite(Number(boxHeightInches)) && Number.isFinite(Number(fontSize))
      ? estimateTextLineCapacity({
        heightInches: Number(boxHeightInches),
        fontSize: Number(fontSize),
        lineHeight,
      })
      : null;
  const perSegment = Math.max(
    1,
    Math.floor(clampPositive(derivedLineCapacity ?? maxLinesPerSegment, 4))
  );
  const segments = [];

  for (let i = 0; i < lines.length; i += perSegment) {
    segments.push(lines.slice(i, i + perSegment).join("\n"));
  }

  return segments.length ? segments : [""];
};

const expandCardOverflowItems = ({
  items,
  getHeading,
  getBody,
  createItem,
  charsPerLine = 56,
  maxLinesPerSegment = 4,
}) => {
  const sourceItems = Array.isArray(items) ? items : [];
  const expanded = [];

  sourceItems.forEach((item, idx) => {
    const heading = normalizeWhitespace(
      (typeof getHeading === "function" ? getHeading(item, idx) : "") || `Item ${idx + 1}`
    );
    const body = normalizeMultilineText(typeof getBody === "function" ? getBody(item, idx) : "");
    const segments = splitTextIntoSegments({
      text: body,
      charsPerLine,
      maxLinesPerSegment,
    });

    segments.forEach((segment, segIdx) => {
      const headingText = segIdx === 0 ? heading : `${heading} (cont.)`;
      const record = typeof createItem === "function"
        ? createItem(item, {
          heading: headingText,
          body: segment,
          continuationIndex: segIdx,
          continuationCount: segments.length,
        })
        : {
          ...item,
          __displayHeading: headingText,
          __displayBody: segment,
          __continuationIndex: segIdx,
          __continuationCount: segments.length,
        };
      expanded.push(record);
    });
  });

  return expanded;
};

const extractTextCharCount = (value) => {
  if (typeof value === "string") return value.length;
  if (!Array.isArray(value)) return 0;
  return value.reduce((sum, run) => {
    if (!run) return sum;
    if (typeof run === "string") return sum + run.length;
    if (typeof run.text === "string") return sum + run.text.length;
    return sum;
  }, 0);
};

const createQualityReportState = (profile = EXPORT_PROFILES[EXPORT_MODE.ARCHIVE]) => ({
  slideCount: 0,
  fontFloorAdjustments: 0,
  shrinkDisabledCount: 0,
  slides: [],
  exportMode: profile?.mode || EXPORT_MODE.ARCHIVE,
  minVisibleFontPt: clampPositive(profile?.minVisibleFontPt, MIN_VISIBLE_FONT_PT),
  cappedSections: [],
});

const setSlideQualityTitle = (pptxSlide, title) => {
  if (!pptxSlide || !pptxSlide.__qaMeta || !title) return;
  if (!pptxSlide.__qaMeta.title) {
    pptxSlide.__qaMeta.title = normalizeWhitespace(title);
  }
};

const setSlideQualityTemplate = (pptxSlide, templateKind) => {
  if (!pptxSlide || !pptxSlide.__qaMeta || !templateKind) return;
  if (!pptxSlide.__qaMeta.templateKind) {
    pptxSlide.__qaMeta.templateKind = templateKind;
  }
};

const finalizeQualityReport = (qa) => {
  const slides = Array.isArray(qa?.slides) ? qa.slides : [];
  const cappedSections = Array.isArray(qa?.cappedSections) ? qa.cappedSections : [];
  const minVisibleFontPt = clampPositive(qa?.minVisibleFontPt, MIN_VISIBLE_FONT_PT);

  const slidesWithoutNotes = slides.filter((meta) => !meta.hasNotes);
  const slidesWithTinyRequestedFonts = slides.filter((meta) => meta.tinyRequested > 0);
  const slidesWithShrinkRisk = slides.filter((meta) => meta.smallShrinkText > 0);
  const slidesWithDisabledShrink = slides.filter((meta) => meta.shrinkDisabled > 0);
  const denseSlides = slides.filter((meta) => meta.textObjects >= 20 || meta.charCount >= 4200);
  const templateCounts = slides.reduce((acc, meta) => {
    const key = meta.templateKind || TEMPLATE_KIND.TITLE_BODY;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const issues = [];
  if (slidesWithoutNotes.length) {
    issues.push(
      `${slidesWithoutNotes.length} slide(s) missing speaker notes.`
    );
  }
  if (slidesWithTinyRequestedFonts.length) {
    issues.push(
      `${slidesWithTinyRequestedFonts.length} slide(s) requested text below ${minVisibleFontPt}pt.`
    );
  }
  if (slidesWithShrinkRisk.length) {
    issues.push(
      `${slidesWithShrinkRisk.length} slide(s) still rely on aggressive text shrinking.`
    );
  }
  if (slidesWithDisabledShrink.length) {
    issues.push(
      `${slidesWithDisabledShrink.length} slide(s) had shrink disabled to preserve legibility; review for clipped text.`
    );
  }
  if (denseSlides.length) {
    issues.push(
      `${denseSlides.length} slide(s) are content-dense and may benefit from additional continuation splits.`
    );
  }
  if (cappedSections.length) {
    issues.push(
      `${cappedSections.length} section(s) exceeded continuation limits for ${qa?.exportMode || EXPORT_MODE.ARCHIVE} mode; remaining detail is preserved in speaker notes.`
    );
  }

  return {
    slideCount: slides.length,
    fontFloorAdjustments: qa?.fontFloorAdjustments || 0,
    shrinkDisabledCount: qa?.shrinkDisabledCount || 0,
    exportMode: qa?.exportMode || EXPORT_MODE.ARCHIVE,
    minVisibleFontPt,
    issueCount: issues.length,
    issues,
    slidesWithoutNotes: slidesWithoutNotes.map((meta) => meta.title || `Slide ${meta.index}`),
    slidesWithTinyRequestedFonts: slidesWithTinyRequestedFonts.map((meta) => meta.title || `Slide ${meta.index}`),
    slidesWithShrinkRisk: slidesWithShrinkRisk.map((meta) => meta.title || `Slide ${meta.index}`),
    slidesWithDisabledShrink: slidesWithDisabledShrink.map((meta) => meta.title || `Slide ${meta.index}`),
    denseSlides: denseSlides.map((meta) => meta.title || `Slide ${meta.index}`),
    cappedSections,
    templateCounts,
  };
};

const emitQualityReport = (report) => {
  if (!isBrowserRuntime || !report) return;
  const modeLabel = report.exportMode === EXPORT_MODE.PRESENTATION ? "presentation" : "archive";
  const headline = `[PPTX QA] ${report.slideCount} slide(s), mode=${modeLabel}, ${report.issueCount} issue category(ies), ${report.fontFloorAdjustments} font guardrail adjustment(s), ${report.shrinkDisabledCount || 0} shrink disable(s).`;
  console.info(headline);
  if (report.templateCounts && Object.keys(report.templateCounts).length) {
    const templateSummary = Object.entries(report.templateCounts)
      .map(([kind, count]) => `${getTemplateLabel(kind)}: ${count}`)
      .join(" | ");
    console.info("[PPTX QA] Template mix:", templateSummary);
  }
  if (report.issues.length) {
    console.warn("[PPTX QA] Details:", report.issues.join(" "));
  }
  if (Array.isArray(report.cappedSections) && report.cappedSections.length) {
    const summary = report.cappedSections
      .map((entry) => `${entry.title} (${entry.originalPageCount}→${entry.cappedPageCount})`)
      .join(" | ");
    console.info("[PPTX QA] Continuation caps:", summary);
  }
};

const installSlideInstrumentation = (pres, qa) => {
  const originalAddSlide = pres.addSlide.bind(pres);

  pres.addSlide = (...args) => {
    const pptxSlide = originalAddSlide(...args);
    if (!qa) return pptxSlide;

    const meta = {
      index: qa.slideCount + 1,
      title: "",
      templateKind: "",
      hasNotes: false,
      textObjects: 0,
      charCount: 0,
      tinyRequested: 0,
      smallShrinkText: 0,
      shrinkDisabled: 0,
    };
    qa.slideCount += 1;
    qa.slides.push(meta);
    Object.defineProperty(pptxSlide, "__qaMeta", {
      value: meta,
      configurable: true,
      enumerable: false,
      writable: true,
    });

    const originalAddText = pptxSlide.addText.bind(pptxSlide);
    pptxSlide.addText = (text, options = {}) => {
      const hasOptionsObject = options && typeof options === "object" && !Array.isArray(options);
      const baseOptions = hasOptionsObject ? options : {};
      const adjusted = hasOptionsObject ? { ...baseOptions } : baseOptions;
      const profile = getActiveExportProfile();
      const fontFloor = getTemplateFontFloor(meta.templateKind);
      const shrinkDisableMaxFontPt = Math.max(
        fontFloor + 0.5,
        clampPositive(profile?.shrinkDisableMaxFontPt, SHRINK_DISABLE_MAX_FONT_PT)
      );
      const allowShrink = Boolean(adjusted.allowShrink);
      if (Object.prototype.hasOwnProperty.call(adjusted, "allowShrink")) {
        delete adjusted.allowShrink;
      }
      const charCount = extractTextCharCount(text);

      meta.textObjects += 1;
      meta.charCount += charCount;

      const requestedFont = Number(baseOptions.fontSize);
      const isFooter = Number(baseOptions.y) >= SLIDE_HEIGHT - 0.5 && Number(baseOptions.h) <= 0.35;
      const isHiddenLayer = Number(baseOptions.fontSize) > 0 && Number(baseOptions.fontSize) <= 2;

      if (Number.isFinite(requestedFont) && !isFooter && !isHiddenLayer) {
        if (requestedFont < fontFloor) {
          meta.tinyRequested += 1;
          adjusted.fontSize = fontFloor;
          qa.fontFloorAdjustments += 1;
        }
      }

      const effectiveFont = Number(adjusted.fontSize);
      const shouldDisableShrink =
        adjusted.fit === "shrink" &&
        !allowShrink &&
        !isFooter &&
        !isHiddenLayer &&
        Number.isFinite(effectiveFont) &&
        effectiveFont <= shrinkDisableMaxFontPt;

      if (shouldDisableShrink) {
        delete adjusted.fit;
        meta.shrinkDisabled += 1;
        qa.shrinkDisabledCount += 1;
      }

      if (
        adjusted.fit === "shrink" &&
        Number.isFinite(effectiveFont) &&
        effectiveFont <= fontFloor + 0.5
      ) {
        meta.smallShrinkText += 1;
      }

      return originalAddText(text, adjusted);
    };

    if (typeof pptxSlide.addNotes === "function") {
      const originalAddNotes = pptxSlide.addNotes.bind(pptxSlide);
      pptxSlide.addNotes = (notes) => {
        meta.hasNotes = true;
        return originalAddNotes(notes);
      };
    }

    return pptxSlide;
  };
};

const normalizeWhitespace = (value) => {
  return String(value).replace(/\s+/g, " ").trim();
};

const humanizeKey = (key) => {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const isRenderableString = (value) => {
  const text = normalizeWhitespace(value);
  if (!text) return false;
  if (/^#?[0-9A-Fa-f]{6}$/.test(text)) return false;
  if (/^\/media\//i.test(text)) return false;
  return true;
};

const normalizeColor = (value, fallback) => {
  const candidate = String(value || "").trim();
  if (!candidate) return fallback;
  const withoutHash = candidate.startsWith("#") ? candidate.slice(1) : candidate;
  if (/^[0-9A-Fa-f]{6}$/.test(withoutHash)) {
    return withoutHash.toUpperCase();
  }
  return fallback;
};

const dedupeLines = (lines) => {
  const seen = new Set();
  const output = [];

  for (const line of lines) {
    const normalized = normalizeWhitespace(line);
    if (!normalized) continue;

    const key = normalized.toLowerCase();
    if (seen.has(key)) continue;

    seen.add(key);
    output.push(normalized);
  }

  return output;
};

const extractObjectLines = (obj) => {
  if (!obj || typeof obj !== "object") return [];

  const leadKey = LEAD_KEY_PRIORITY.find(
    (key) => typeof obj[key] === "string" && isRenderableString(obj[key])
  );
  const leadText = leadKey ? normalizeWhitespace(obj[leadKey]) : "";

  const details = [];

  for (const [key, value] of Object.entries(obj)) {
    if (key === leadKey || INTERNAL_KEYS.has(key) || value == null) continue;

    if (typeof value === "string") {
      if (!isRenderableString(value)) continue;
      const normalized = normalizeWhitespace(value);
      if (COMPACT_DETAIL_KEYS.has(key)) {
        details.push(normalized);
      } else {
        details.push(`${humanizeKey(key)}: ${normalized}`);
      }
      continue;
    }

    if (Array.isArray(value)) {
      if (!value.length) continue;

      if (value.every((item) => typeof item === "string")) {
        const values = value
          .map((item) => normalizeWhitespace(item))
          .filter((item) => isRenderableString(item));
        if (values.length) {
          details.push(`${humanizeKey(key)}: ${values.join(", ")}`);
        }
        continue;
      }

      for (const item of value) {
        if (typeof item === "string") {
          if (isRenderableString(item)) {
            details.push(`${humanizeKey(key)}: ${normalizeWhitespace(item)}`);
          }
          continue;
        }

        if (item && typeof item === "object") {
          const nestedLines = extractObjectLines(item);
          for (const line of nestedLines) {
            details.push(`${humanizeKey(key)}: ${line}`);
          }
        }
      }
      continue;
    }

    if (typeof value === "object") {
      const nestedLines = extractObjectLines(value);
      for (const line of nestedLines) {
        details.push(`${humanizeKey(key)}: ${line}`);
      }
    }
  }

  if (leadText) {
    if (!details.length) return [leadText];
    return [`${leadText}: ${details[0]}`, ...details.slice(1)];
  }

  return details;
};

const extractLinesFromValue = (value) => {
  if (typeof value === "string") {
    return isRenderableString(value) ? [normalizeWhitespace(value)] : [];
  }

  if (Array.isArray(value)) {
    const lines = [];

    for (const item of value) {
      if (typeof item === "string") {
        if (isRenderableString(item)) {
          lines.push(normalizeWhitespace(item));
        }
        continue;
      }

      if (item && typeof item === "object") {
        lines.push(...extractObjectLines(item));
      }
    }

    return dedupeLines(lines);
  }

  if (value && typeof value === "object") {
    return dedupeLines(extractObjectLines(value));
  }

  return [];
};

const getDetailLines = (obj, skipKeys = [], options = {}) => {
  if (!obj || typeof obj !== "object") return [];

  const clone = {};
  for (const [key, value] of Object.entries(obj)) {
    if (skipKeys.includes(key) || INTERNAL_KEYS.has(key)) continue;
    clone[key] = value;
  }

  const detailLines = dedupeLines(extractLinesFromValue(clone));
  if (options?.disableCompaction) {
    return detailLines;
  }

  const limit = getDetailLineLimit();
  if (!limit || detailLines.length <= limit) {
    return detailLines;
  }

  const overflowCount = detailLines.length - limit;
  const suffix = overflowCount === 1 ? "detail" : "details";
  return [
    ...detailLines.slice(0, limit),
    `+${overflowCount} more ${suffix} in speaker notes.`,
  ];
};

const getTheme = (slideData) => {
  const defaultBg = slideData.dark ? "182B49" : "F5F0E6";
  const bgColor = normalizeColor(slideData.backgroundColor, defaultBg);
  const isDark = slideData.dark || bgColor === "182B49";

  if (isDark) {
    return {
      bgColor,
      isDark,
      title: "FFFFFF",
      text: "F3F4F6",
      muted: "D1D5DB",
      accent: "7FA6D6",
      strongAccent: "FFCD00",
      cardBg: "223B61",
      cardAltBg: "1B3356",
      cardLine: "426A96",
      headerBg: "0F223D",
    };
  }

  return {
    bgColor,
    isDark,
    title: "182B49",
    text: "334155",
    muted: "64748B",
    accent: "00629B",
    strongAccent: "FC8900",
    cardBg: "FFFFFF",
    cardAltBg: "F8FAFC",
    cardLine: "C9D5E3",
    headerBg: "182B49",
  };
};

const getTitleText = (slide) => {
  if (slide.title && isRenderableString(slide.title)) {
    return normalizeWhitespace(slide.title);
  }
  if (slide.managerLabel && isRenderableString(slide.managerLabel)) {
    return normalizeWhitespace(slide.managerLabel);
  }
  if (slide.type === "video") {
    return `Video Slide ${slide.id}`;
  }
  return `Slide ${slide.id}`;
};

const resolveTemplateKind = (slide) => {
  const layout = typeof slide?.layout === "string" ? slide.layout : "";
  if (layout && LAYOUT_TEMPLATE_MAP.has(layout)) {
    return LAYOUT_TEMPLATE_MAP.get(layout);
  }

  if (slide?.type === "title" || slide?.type === "video") {
    return TEMPLATE_KIND.TITLE_BODY;
  }

  if (Array.isArray(slide?.categories) && slide.categories.length) {
    return TEMPLATE_KIND.ROADMAP;
  }

  if (Array.isArray(slide?.tableData) && slide.tableData.length) {
    return TEMPLATE_KIND.COMPARISON;
  }

  if (slide?.chartData || Array.isArray(slide?.metrics)) {
    return TEMPLATE_KIND.DATA_INSIGHT;
  }

  if (Array.isArray(slide?.content) && slide.content.length) {
    return TEMPLATE_KIND.TWO_COLUMN;
  }

  return TEMPLATE_KIND.TITLE_BODY;
};

const getTemplateLabel = (templateKind) => {
  return TEMPLATE_LABELS[templateKind] || TEMPLATE_LABELS[TEMPLATE_KIND.TITLE_BODY];
};

const isBrowserRuntime = typeof window !== "undefined";

const toAbsoluteAssetUrl = (assetPath) => {
  if (!isBrowserRuntime || typeof assetPath !== "string") return null;
  const normalized = assetPath.trim();
  if (!normalized) return null;
  if (/^https?:\/\//i.test(normalized)) return normalized;
  if (normalized.startsWith("/")) return `${window.location.origin}${normalized}`;
  return `${window.location.origin}/${normalized.replace(/^\.\//, "")}`;
};

const getImageOptions = (assetPath) => {
  if (typeof assetPath !== "string" || !IMAGE_EXT_RE.test(assetPath)) return null;
  const url = toAbsoluteAssetUrl(assetPath);
  if (!url) return null;
  return { path: url };
};

const safeAddImage = (pptxSlide, imageOpts, position) => {
  if (!imageOpts) return false;
  try {
    pptxSlide.addImage({ ...imageOpts, ...position });
    return true;
  } catch {
    return false;
  }
};

const getSnapshotImageOptions = (options, slide) => {
  const snapshot = options?.snapshotBySlideId?.[slide.id];
  if (typeof snapshot !== "string" || !snapshot.startsWith("data:image/")) return null;
  return { data: snapshot };
};

const addSnapshotBackdrop = ({ shell, imageOpts, pres }) => {
  if (!imageOpts) return false;

  const artY = shell.bodyTop + 0.02;
  const artH = shell.bodyBottom - artY - 0.38;

  const added = safeAddImage(shell.pptxSlide, imageOpts, {
    x: shell.contentX,
    y: artY,
    w: shell.contentW,
    h: artH,
    sizing: {
      type: "cover",
      x: shell.contentX,
      y: artY,
      w: shell.contentW,
      h: artH,
    },
  });

  if (!added) return false;

  shell.pptxSlide.addShape(pres.ShapeType.rect, {
    x: shell.contentX,
    y: artY,
    w: shell.contentW,
    h: artH,
    fill: { color: shell.theme.isDark ? "000000" : "FFFFFF", transparency: 78 },
    line: { color: shell.theme.cardLine, pt: 1 },
  });

  return true;
};

const buildSnapshotSummary = (slide, maxLines = 6) => {
  const lines = [];
  const sections = buildSections(slide);

  for (const section of sections) {
    if (!section.lines.length) continue;
    lines.push(`${section.heading}: ${section.lines[0]}`);
    for (let i = 1; i < section.lines.length && lines.length < maxLines; i += 1) {
      lines.push(section.lines[i]);
    }
    if (lines.length >= maxLines) break;
  }

  return lines.slice(0, maxLines);
};

const addSnapshotSummaryPanel = ({ shell, slide, pres, title = "Editable Summary" }) => {
  const panelY = shell.bodyBottom - 0.32;
  const summaryLines = buildSnapshotSummary(slide, 4);
  const summaryText = summaryLines.length ? summaryLines.join("\n") : "No additional text on this slide.";

  shell.pptxSlide.addShape(pres.ShapeType.roundRect, {
    x: shell.contentX,
    y: panelY,
    w: shell.contentW,
    h: 0.26,
    fill: { color: shell.theme.cardBg, transparency: 8 },
    line: { color: shell.theme.cardLine, pt: 1 },
    radius: 0.06,
  });

  shell.pptxSlide.addText(`${title}: ${summaryText}`, {
    x: shell.contentX + 0.08,
    y: panelY + 0.06,
    w: shell.contentW - 0.16,
    h: 0.14,
    fontFace: "Calibri",
    fontSize: TYPOGRAPHY.caption,
    color: shell.theme.text,
    fit: "shrink",
  });
};

const addAccessibilityTextLayer = ({ shell, slide }) => {
  if (!getActiveExportProfile()?.includeHiddenAccessibilityLayer) return;

  const allText = buildSections(slide)
    .flatMap((section) => [`${section.heading}:`, ...section.lines])
    .map((line) => normalizeWhitespace(line))
    .filter(Boolean)
    .join(" | ");

  if (!allText) return;

  shell.pptxSlide.addText(allText, {
    x: shell.contentX,
    y: shell.bodyBottom + 0.02,
    w: shell.contentW,
    h: 0.12,
    fontFace: "Calibri",
    fontSize: TYPOGRAPHY.accessibility,
    color: shell.theme.bgColor,
    fit: "shrink",
  });
};

const buildNotesTalkTrackLines = (sections, maxLines = 5) => {
  if (!Array.isArray(sections) || !sections.length) {
    return ["Frame the purpose of this slide before discussing details."];
  }

  const lines = [];
  for (const section of sections) {
    if (!section.lines?.length) continue;
    const primary = normalizeWhitespace(section.lines[0]);
    const secondary = section.lines[1] ? ` ${normalizeWhitespace(section.lines[1])}` : "";
    lines.push(`${section.heading}: ${primary}${secondary}`.trim());
    if (lines.length >= maxLines) break;
  }

  return lines.length ? lines : ["Summarize the visible content and highlight the decision impact."];
};

const buildEvidenceLines = ({ slideData, sections, maxLines = 4 }) => {
  const numericPattern = /(\d|%|\$|x\b|users?|sessions?|prompts?|months?|years?)/i;
  const candidates = [];

  for (const section of sections) {
    for (const line of section.lines || []) {
      if (numericPattern.test(line)) {
        candidates.push(normalizeWhitespace(line));
      }
      if (candidates.length >= maxLines) break;
    }
    if (candidates.length >= maxLines) break;
  }

  if (!candidates.length && Array.isArray(slideData?.chartData?.series)) {
    slideData.chartData.series.slice(0, maxLines).forEach((series) => {
      const values = Array.isArray(series?.data) ? series.data : [];
      if (!values.length) return;
      const start = Number(values[0]) || 0;
      const end = Number(values[values.length - 1]) || 0;
      candidates.push(`${normalizeWhitespace(series.name || "Series")}: ${start.toLocaleString()} to ${end.toLocaleString()}`);
    });
  }

  if (!candidates.length) {
    candidates.push("Use the strongest specific example on the slide as supporting evidence.");
  }

  return candidates.slice(0, maxLines);
};

const buildTransitionLine = ({ templateKind, pageIndex, pageCount }) => {
  if (pageCount > 1 && pageIndex < pageCount - 1) {
    return "Continue to the next slide for the remaining details in this section.";
  }

  const byTemplate = {
    [TEMPLATE_KIND.ROADMAP]: "Transition from milestones to execution priorities and owners.",
    [TEMPLATE_KIND.COMPARISON]: "Transition from differences to the recommended decision path.",
    [TEMPLATE_KIND.DATA_INSIGHT]: "Transition from the data trend to the operational implication.",
    [TEMPLATE_KIND.TWO_COLUMN]: "Transition from capabilities to expected outcomes for stakeholders.",
    [TEMPLATE_KIND.TITLE_BODY]: "Transition to the next section and anchor the audience on why it matters now.",
  };

  return byTemplate[templateKind] || byTemplate[TEMPLATE_KIND.TITLE_BODY];
};

const buildFullExtractedNoteLines = (sections) => {
  if (!Array.isArray(sections) || !sections.length) return [];

  const lines = [];
  sections.forEach((section) => {
    if (!section?.heading) return;
    lines.push(`${section.heading}:`);
    const sectionLines = Array.isArray(section?.lines) ? section.lines : [];
    if (!sectionLines.length) {
      lines.push("- No additional details.");
      return;
    }
    sectionLines.forEach((line) => {
      lines.push(`- ${normalizeWhitespace(line)}`);
    });
  });
  return lines;
};

const buildSpeakerNotes = ({ slideData, pageIndex = 0, pageCount = 1 }) => {
  if (!slideData) return "";

  const templateKind = resolveTemplateKind(slideData);
  const templateLabel = getTemplateLabel(templateKind);
  const titleSuffix = pageCount > 1 ? ` (${pageIndex + 1}/${pageCount})` : "";
  const sections = buildSections(slideData);
  const firstDetail = sections.find((section) => Array.isArray(section.lines) && section.lines.length)?.lines?.[0] || "";
  const subtitle = typeof slideData.subtitle === "string" ? normalizeWhitespace(slideData.subtitle) : "";

  const keyMessage = subtitle || normalizeWhitespace(firstDetail) || `Advance "${getTitleText(slideData)}" with one clear takeaway.`;
  const talkTrackLines = buildNotesTalkTrackLines(sections, 5);
  const evidenceLines = buildEvidenceLines({ slideData, sections, maxLines: 4 });
  const transitionLine = buildTransitionLine({ templateKind, pageIndex, pageCount });
  const fullExtractedLines = buildFullExtractedNoteLines(sections);

  const lines = [
    `Title: ${getTitleText(slideData)}${titleSuffix}`,
    `Template: ${templateLabel}`,
    "",
    "Key message:",
    `- ${keyMessage}`,
    "",
    "Talk track:",
    ...talkTrackLines.map((line) => `- ${line}`),
    "",
    "Evidence:",
    ...evidenceLines.map((line) => `- ${line}`),
    "",
    "Transition:",
    `- ${transitionLine}`,
    "",
    "Full extracted content:",
    ...(fullExtractedLines.length
      ? fullExtractedLines
      : ["- No additional extracted content."]),
  ];

  const notes = lines.join("\n").trim();
  if (!notes) return "";
  if (notes.length <= NOTES_CHAR_LIMIT) return notes;
  return `${notes.slice(0, NOTES_CHAR_LIMIT - 20).trim()}\n... [notes truncated]`;
};

const addSpeakerNotes = ({ pptxSlide, slideData, pageIndex = 0, pageCount = 1 }) => {
  if (!pptxSlide || typeof pptxSlide.addNotes !== "function") return;
  const notes = buildSpeakerNotes({ slideData, pageIndex, pageCount });
  if (!notes) return;
  pptxSlide.addNotes(notes);
};

const createMasterObjects = ({ brandColor, lineColor }) => {
  return [
    {
      line: {
        x: LEFT_MARGIN,
        y: SLIDE_HEIGHT - 0.38,
        w: SLIDE_WIDTH - LEFT_MARGIN - RIGHT_MARGIN,
        h: 0,
        line: { color: lineColor, pt: 0.6 },
      },
    },
    {
      text: {
        text: "UC SAN DIEGO",
        options: {
          x: SLIDE_WIDTH - 2.18,
          y: SLIDE_HEIGHT - 0.33,
          w: 1.5,
          h: FOOTER_HEIGHT,
          fontFace: "Calibri",
          fontSize: TYPOGRAPHY.footer,
          bold: true,
          color: brandColor,
          align: "right",
          valign: "middle",
        },
      },
    },
  ];
};

const registerSlideMasters = (pres) => {
  pres.defineSlideMaster({
    title: LIGHT_MASTER_NAME,
    objects: createMasterObjects({
      brandColor: "182B49",
      lineColor: "C9D5E3",
    }),
  });

  pres.defineSlideMaster({
    title: DARK_MASTER_NAME,
    objects: createMasterObjects({
      brandColor: "FFFFFF",
      lineColor: "426A96",
    }),
  });
};

const getMasterNameForTheme = (theme) => {
  return theme.isDark ? DARK_MASTER_NAME : LIGHT_MASTER_NAME;
};

const addFooter = (pptxSlide, slideData, theme) => {
  pptxSlide.addText(`| ${slideData.id}`, {
    x: SLIDE_WIDTH - 0.92,
    y: SLIDE_HEIGHT - 0.33,
    w: 0.56,
    h: FOOTER_HEIGHT,
    fontFace: "Calibri",
    fontSize: TYPOGRAPHY.footer,
    color: theme.isDark ? "FFFFFF" : "182B49",
    bold: true,
    align: "right",
    valign: "middle",
  });
};

const addSlideShell = ({ pres, slideData, pageIndex, pageCount }) => {
  const theme = getTheme(slideData);
  const pptxSlide = pres.addSlide({ masterName: getMasterNameForTheme(theme) });
  pptxSlide.background = { color: theme.bgColor };
  setSlideQualityTemplate(pptxSlide, resolveTemplateKind(slideData));

  const contentX = LEFT_MARGIN;
  const contentW = SLIDE_WIDTH - LEFT_MARGIN - RIGHT_MARGIN;

  const titleSuffix = pageCount > 1 ? ` (${pageIndex + 1}/${pageCount})` : "";
  const titleText = `${getTitleText(slideData)}${titleSuffix}`;
  setSlideQualityTitle(pptxSlide, titleText);

  pptxSlide.addText(titleText, {
    x: contentX,
    y: 0.26,
    w: contentW,
    h: 0.64,
    fontFace: "Calibri",
    fontSize: TYPOGRAPHY.title,
    bold: true,
    color: theme.title,
    valign: "top",
    fit: "shrink",
  });

  const hasSubtitle = typeof slideData.subtitle === "string" && slideData.subtitle.trim() !== "";
  if (hasSubtitle) {
    pptxSlide.addText(normalizeWhitespace(slideData.subtitle), {
      x: contentX,
      y: 0.92,
      w: contentW,
      h: 0.38,
      fontFace: "Calibri",
      fontSize: TYPOGRAPHY.subtitle,
      color: theme.text,
      valign: "top",
      fit: "shrink",
    });
  }

  const bodyTop = hasSubtitle ? 1.38 : 1.02;
  const bodyBottom = SLIDE_HEIGHT - 0.58;

  pptxSlide.addShape(pres.ShapeType.line, {
    x: contentX,
    y: bodyTop - 0.08,
    w: contentW,
    h: 0,
    line: {
      color: theme.accent,
      pt: 1,
    },
  });

  addFooter(pptxSlide, slideData, theme);
  addSpeakerNotes({ pptxSlide, slideData, pageIndex, pageCount });

  return {
    pptxSlide,
    theme,
    bodyTop,
    bodyBottom,
    contentX,
    contentW,
  };
};

const addSectionHeading = ({ pptxSlide, text, x, y, w, theme }) => {
  pptxSlide.addText(text, {
    x,
    y,
    w,
    h: 0.26,
    fontFace: "Calibri",
    fontSize: TYPOGRAPHY.section,
    bold: true,
    color: theme.title,
    valign: "top",
    fit: "shrink",
  });
};

const addCardShape = ({ pres, pptxSlide, x, y, w, h, theme, alternate = false }) => {
  pptxSlide.addShape(pres.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    fill: { color: alternate ? theme.cardAltBg : theme.cardBg, transparency: 0 },
    line: { color: theme.cardLine, pt: 1 },
    radius: 0.08,
  });
};

const buildNativeTableRows = ({
  headers,
  rows,
  theme,
  headerFill = null,
  rowFontSize = TYPOGRAPHY.body,
  headerFontSize = TYPOGRAPHY.bodySmall + 1,
  firstColumnBold = false,
}) => {
  const border = { pt: 1, color: theme.cardLine };
  const headerColor = headerFill || theme.headerBg;

  const headerRow = headers.map((header) => ({
    text: normalizeWhitespace(header || ""),
    options: {
      bold: true,
      color: "FFFFFF",
      fill: { color: headerColor },
      border,
      align: "center",
      valign: "middle",
      fontFace: "Calibri",
      fontSize: headerFontSize,
      margin: 0.05,
    },
  }));

  const bodyRows = rows.map((values, rowIdx) => {
    const fill = rowIdx % 2 === 0 ? theme.cardBg : theme.cardAltBg;
    return values.map((value, colIdx) => ({
      text: normalizeWhitespace(value || ""),
      options: {
        bold: firstColumnBold && colIdx === 0,
        color: theme.text,
        fill: { color: fill },
        border,
        align: "left",
        valign: "top",
        fontFace: "Calibri",
        fontSize: rowFontSize,
        margin: 0.05,
      },
    }));
  });

  return [headerRow, ...bodyRows];
};

const renderTitleHeroSlide = ({ pres, slide }) => {
  if (slide.layout !== "title-hero" && slide.type !== "title") return false;

  const theme = getTheme(slide);
  const pptxSlide = pres.addSlide({ masterName: getMasterNameForTheme(theme) });
  pptxSlide.background = { color: theme.bgColor };
  setSlideQualityTemplate(pptxSlide, TEMPLATE_KIND.TITLE_BODY);

  const title = getTitleText(slide);
  setSlideQualityTitle(pptxSlide, title);
  const subtitle = typeof slide.subtitle === "string" ? normalizeWhitespace(slide.subtitle) : "";
  const conference = typeof slide.conference === "string" ? normalizeWhitespace(slide.conference) : "";

  pptxSlide.addShape(pres.ShapeType.line, {
    x: 2.0,
    y: 2.65,
    w: 9.3,
    h: 0,
    line: { color: theme.accent, pt: 1.5 },
  });

  pptxSlide.addText(title, {
    x: 1.2,
    y: 1.6,
    w: 10.9,
    h: 1.0,
    fontFace: "Calibri",
    fontSize: TYPOGRAPHY.display,
    bold: true,
    color: theme.title,
    align: "center",
    fit: "shrink",
  });

  if (subtitle) {
    pptxSlide.addText(subtitle, {
      x: 1.2,
      y: 2.8,
      w: 10.9,
      h: 0.6,
      fontFace: "Calibri",
      fontSize: 22,
      color: theme.text,
      align: "center",
      fit: "shrink",
    });
  }

  if (conference) {
    pptxSlide.addShape(pres.ShapeType.roundRect, {
      x: 4.15,
      y: 3.6,
      w: 5.05,
      h: 0.4,
      fill: { color: theme.cardBg },
      line: { color: theme.cardLine, pt: 1 },
      radius: 0.08,
    });
    pptxSlide.addText(conference, {
      x: 4.25,
      y: 3.69,
      w: 4.85,
      h: 0.24,
      fontFace: "Calibri",
      fontSize: TYPOGRAPHY.bodySmall,
      color: theme.muted,
      bold: true,
      align: "center",
      fit: "shrink",
    });
  }

  const contactLines = [];
  if (slide.presenterName) contactLines.push(normalizeWhitespace(slide.presenterName));
  if (slide.presenterTitle) contactLines.push(normalizeWhitespace(slide.presenterTitle));
  if (slide.presenterWebsite) contactLines.push(normalizeWhitespace(slide.presenterWebsite));
  if (slide.qrCodeUrl) contactLines.push(normalizeWhitespace(slide.qrCodeUrl));

  if (contactLines.length) {
    const presenterImage = getImageOptions(slide.presenterImage);
    const hasPresenterImage = Boolean(presenterImage);
    const cardX = hasPresenterImage ? 2.55 : 3.35;
    const cardW = hasPresenterImage ? 8.25 : 6.65;

    pptxSlide.addShape(pres.ShapeType.roundRect, {
      x: cardX,
      y: 4.85,
      w: cardW,
      h: 1.25,
      fill: { color: theme.cardBg },
      line: { color: theme.cardLine, pt: 1 },
      radius: 0.1,
    });

    if (hasPresenterImage) {
      safeAddImage(pptxSlide, presenterImage, {
        x: cardX + 0.16,
        y: 4.98,
        w: 1.0,
        h: 1.0,
        sizing: { type: "contain", x: cardX + 0.16, y: 4.98, w: 1.0, h: 1.0 },
      });
    }

    pptxSlide.addText(contactLines.join("\n"), {
      x: hasPresenterImage ? cardX + 1.34 : 3.6,
      y: 5.02,
      w: hasPresenterImage ? cardW - 1.52 : 6.15,
      h: 0.95,
      fontFace: "Calibri",
      fontSize: TYPOGRAPHY.section,
      color: theme.text,
      align: "center",
      valign: "middle",
      fit: "shrink",
    });
  }

  addFooter(pptxSlide, slide, theme);
  addSpeakerNotes({ pptxSlide, slideData: slide, pageIndex: 0, pageCount: 1 });
  return true;
};

const renderVideoPosterSlide = ({ pres, slide }) => {
  if (slide.type !== "video") return false;

  const shell = addSlideShell({
    pres,
    slideData: slide,
    pageIndex: 0,
    pageCount: 1,
  });

  const posterImage = getImageOptions(slide.poster);
  const mediaY = shell.bodyTop + 0.08;
  const mediaH = shell.bodyBottom - mediaY - 0.42;

  if (posterImage) {
    safeAddImage(shell.pptxSlide, posterImage, {
      x: shell.contentX,
      y: mediaY,
      w: shell.contentW,
      h: mediaH,
      sizing: {
        type: "cover",
        x: shell.contentX,
        y: mediaY,
        w: shell.contentW,
        h: mediaH,
      },
    });

    shell.pptxSlide.addShape(pres.ShapeType.rect, {
      x: shell.contentX,
      y: mediaY,
      w: shell.contentW,
      h: mediaH,
      fill: { color: "000000", transparency: 45 },
      line: { color: shell.theme.cardLine, pt: 1 },
    });
  } else {
    addCardShape({
      pres,
      pptxSlide: shell.pptxSlide,
      x: shell.contentX,
      y: mediaY,
      w: shell.contentW,
      h: mediaH,
      theme: shell.theme,
    });
  }

  shell.pptxSlide.addShape(pres.ShapeType.roundRect, {
    x: shell.contentX + shell.contentW / 2 - 0.45,
    y: mediaY + mediaH / 2 - 0.45,
    w: 0.9,
    h: 0.9,
    fill: { color: "FFFFFF", transparency: 10 },
    line: { color: "FFFFFF", pt: 1 },
    radius: 0.2,
  });

  shell.pptxSlide.addText("▶", {
    x: shell.contentX + shell.contentW / 2 - 0.11,
    y: mediaY + mediaH / 2 - 0.18,
    w: 0.22,
    h: 0.28,
    fontFace: "Calibri",
    fontSize: 24,
    bold: true,
    color: shell.theme.accent,
    align: "center",
    fit: "shrink",
  });

  shell.pptxSlide.addText("Video demo available in the web presentation", {
    x: shell.contentX,
    y: shell.bodyBottom - 0.28,
    w: shell.contentW,
    h: 0.18,
    fontFace: "Calibri",
    fontSize: 10,
    color: shell.theme.muted,
    align: "center",
    fit: "shrink",
  });

  return true;
};

const renderFeatureGridSlide = ({ pres, slide }) => {
  const supportedLayouts = new Set(["feature-grid", "hero-list", "key-takeaways"]);
  if (!supportedLayouts.has(slide.layout)) return false;

  const items = Array.isArray(slide.content) ? slide.content : [];
  if (!items.length) return false;

  const overflowReadyItems = expandCardOverflowItems({
    items,
    getHeading: (item, idx) => item?.heading || item?.name || item?.title || item?.label || `Capability ${idx + 1}`,
    getBody: (item) => getDetailLines(item || {}, ["heading", "name", "title", "label", "icon"]).join("\n"),
    createItem: (item, segment) => ({
      ...item,
      __displayHeading: segment.heading,
      __displayBody: segment.body,
      __continuationIndex: segment.continuationIndex,
      __continuationCount: segment.continuationCount,
    }),
    charsPerLine: slide.layout === "hero-list" ? 62 : 56,
    maxLinesPerSegment: slide.layout === "hero-list" ? 5 : 4,
  });

  const maxItemsPerPage = slide.layout === "hero-list" ? 4 : 6;
  const maxWeightPerPage = slide.layout === "hero-list" ? 20 : 30;
  const pages = paginateSlideItems({
    slide,
    items: overflowReadyItems,
    defaults: { maxItemsPerPage, maxWeightPerPage },
    getWeight: (item) => {
      const heading = item?.__displayHeading || item?.heading || item?.name || item?.title || item?.label || "";
      const bodyLines = String(item?.__displayBody || "").split("\n").filter(Boolean);
      return estimateTextUnits(heading, 26) + estimateLinesUnits(bodyLines, 62) + 1;
    },
  });

  let globalItemOffset = 0;

  pages.forEach((pageItems, pageIndex) => {
    const shell = addSlideShell({
      pres,
      slideData: slide,
      pageIndex,
      pageCount: pages.length,
    });

    const cols = pageItems.length <= 2 ? 1 : 2;
    const rows = Math.ceil(pageItems.length / cols);
    const gapX = 0.34;
    const gapY = 0.24;
    const cardsY = shell.bodyTop + 0.1;
    const cardsHeight = shell.bodyBottom - cardsY;
    const cardW = (shell.contentW - gapX * (cols - 1)) / cols;
    const cardH = (cardsHeight - gapY * (rows - 1)) / rows;

    pageItems.forEach((item, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const cardX = shell.contentX + col * (cardW + gapX);
      const cardY = cardsY + row * (cardH + gapY);

      addCardShape({
        pres,
        pptxSlide: shell.pptxSlide,
        x: cardX,
        y: cardY,
        w: cardW,
        h: cardH,
        theme: shell.theme,
        alternate: idx % 2 === 1,
      });

      const heading = item.__displayHeading || item.heading || item.name || item.title || item.label || `Capability ${globalItemOffset + idx + 1}`;
      const bodyText = item.__displayBody || getDetailLines(item, ["heading", "name", "title", "label", "icon"]).join("\n");

      shell.pptxSlide.addText(normalizeWhitespace(heading), {
        x: cardX + 0.18,
        y: cardY + 0.14,
        w: cardW - 0.36,
        h: 0.38,
        fontFace: "Calibri",
        fontSize: 14,
        bold: true,
        color: shell.theme.title,
        fit: "shrink",
      });

      shell.pptxSlide.addText(bodyText, {
        x: cardX + 0.18,
        y: cardY + 0.56,
        w: cardW - 0.36,
        h: Math.max(0.4, cardH - 0.68),
        fontFace: "Calibri",
        fontSize: 11,
        color: shell.theme.text,
        valign: "top",
        fit: "shrink",
      });
    });

    globalItemOffset += pageItems.length;
  });

  return true;
};

const renderSolutionShowcaseSlide = ({ pres, slide }) => {
  const supportedLayouts = new Set(["solution-showcase", "solution-showcase-video"]);
  if (!supportedLayouts.has(slide.layout)) return false;

  const contentItems = Array.isArray(slide.content) ? slide.content : [];
  const statItems = Array.isArray(slide.stats) ? slide.stats : [];
  if (!contentItems.length && !statItems.length) return false;

  const overflowReadyContent = expandCardOverflowItems({
    items: contentItems,
    getHeading: (item, idx) => item?.heading || item?.name || item?.title || `Highlight ${idx + 1}`,
    getBody: (item) => getDetailLines(item || {}, ["heading", "name", "title", "icon"]).join("\n"),
    createItem: (item, segment) => ({
      ...item,
      __displayHeading: segment.heading,
      __displayBody: segment.body,
      __continuationIndex: segment.continuationIndex,
      __continuationCount: segment.continuationCount,
    }),
    charsPerLine: 56,
    maxLinesPerSegment: 4,
  });

  const pages = overflowReadyContent.length
    ? paginateSlideItems({
      slide,
      items: overflowReadyContent,
      defaults: { maxItemsPerPage: 4, maxWeightPerPage: 15 },
      getWeight: (item) => {
        const heading = item?.__displayHeading || item?.heading || item?.name || item?.title || "";
        const details = String(item?.__displayBody || "").split("\n").filter(Boolean);
        return estimateTextUnits(heading, 24) + estimateLinesUnits(details, 58);
      },
    })
    : [[{}]];

  pages.forEach((pageItems, pageIndex) => {
    const shell = addSlideShell({
      pres,
      slideData: slide,
      pageIndex,
      pageCount: pages.length,
    });

    const leftW = shell.contentW * 0.66;
    const rightGap = 0.28;
    const rightX = shell.contentX + leftW + rightGap;
    const rightW = shell.contentW - leftW - rightGap;

    addSectionHeading({
      pptxSlide: shell.pptxSlide,
      text: "Key Highlights",
      x: shell.contentX,
      y: shell.bodyTop + 0.02,
      w: leftW,
      theme: shell.theme,
    });

    const leftCardsY = shell.bodyTop + 0.34;
    const leftCardsHeight = shell.bodyBottom - leftCardsY;
    const leftGap = 0.22;
    const rowCount = Math.max(pageItems.length, 1);
    const cardH = (leftCardsHeight - leftGap * (rowCount - 1)) / rowCount;

    pageItems.forEach((item, idx) => {
      const cardY = leftCardsY + idx * (cardH + leftGap);
      addCardShape({
        pres,
        pptxSlide: shell.pptxSlide,
        x: shell.contentX,
        y: cardY,
        w: leftW,
        h: cardH,
        theme: shell.theme,
      });

      const heading = item.__displayHeading || item.heading || item.name || item.title || `Highlight ${idx + 1}`;
      const detailsText = item.__displayBody || getDetailLines(item, ["heading", "name", "title", "icon"]).join("\n");

      shell.pptxSlide.addText(normalizeWhitespace(heading), {
        x: shell.contentX + 0.18,
        y: cardY + 0.12,
        w: leftW - 0.36,
        h: 0.34,
        fontFace: "Calibri",
        fontSize: 13,
        bold: true,
        color: shell.theme.title,
        fit: "shrink",
      });

      shell.pptxSlide.addText(detailsText, {
        x: shell.contentX + 0.18,
        y: cardY + 0.5,
        w: leftW - 0.36,
        h: Math.max(0.35, cardH - 0.62),
        fontFace: "Calibri",
        fontSize: 11,
        color: shell.theme.text,
        valign: "top",
        fit: "shrink",
      });
    });

    addSectionHeading({
      pptxSlide: shell.pptxSlide,
      text: "Impact Metrics",
      x: rightX,
      y: shell.bodyTop + 0.02,
      w: rightW,
      theme: shell.theme,
    });

    const statBoxY = shell.bodyTop + 0.34;
    const statBoxHeight = shell.bodyBottom - statBoxY;
    const statGap = 0.16;
    const statRows = Math.max(statItems.length, 1);
    const statH = (statBoxHeight - statGap * (statRows - 1)) / statRows;

    if (statItems.length) {
      statItems.forEach((stat, idx) => {
        const cardY = statBoxY + idx * (statH + statGap);
        addCardShape({
          pres,
          pptxSlide: shell.pptxSlide,
          x: rightX,
          y: cardY,
          w: rightW,
          h: statH,
          theme: shell.theme,
          alternate: idx % 2 === 1,
        });

        const value = stat.value ? normalizeWhitespace(stat.value) : "";
        const label = stat.label ? normalizeWhitespace(stat.label) : "";
        const sub = stat.sub ? normalizeWhitespace(stat.sub) : "";

        shell.pptxSlide.addText(value, {
          x: rightX + 0.14,
          y: cardY + 0.09,
          w: rightW - 0.28,
          h: 0.28,
          fontFace: "Calibri",
          fontSize: 21,
          bold: true,
          color: shell.theme.accent,
          align: "center",
          fit: "shrink",
        });

        shell.pptxSlide.addText(label, {
          x: rightX + 0.14,
          y: cardY + 0.38,
          w: rightW - 0.28,
          h: 0.2,
          fontFace: "Calibri",
          fontSize: 10,
          bold: true,
          color: shell.theme.title,
          align: "center",
          fit: "shrink",
        });

        if (sub) {
          shell.pptxSlide.addText(sub, {
            x: rightX + 0.14,
            y: cardY + 0.58,
            w: rightW - 0.28,
            h: Math.max(0.18, statH - 0.67),
            fontFace: "Calibri",
            fontSize: 9,
            color: shell.theme.muted,
            align: "center",
            fit: "shrink",
          });
        }
      });
    } else {
      addCardShape({
        pres,
        pptxSlide: shell.pptxSlide,
        x: rightX,
        y: statBoxY,
        w: rightW,
        h: statBoxHeight,
        theme: shell.theme,
      });

      shell.pptxSlide.addText("Demo available in web presentation", {
        x: rightX + 0.14,
        y: statBoxY + 0.2,
        w: rightW - 0.28,
        h: statBoxHeight - 0.4,
        fontFace: "Calibri",
        fontSize: 11,
        color: shell.theme.text,
        valign: "middle",
        align: "center",
        fit: "shrink",
      });
    }
  });

  return true;
};

const renderComparisonTableSlide = ({ pres, slide }) => {
  if (slide.layout !== "comparison-table") return false;

  const rows = Array.isArray(slide.tableData) ? slide.tableData : [];
  if (!rows.length) return false;

  const pages = paginateSlideItems({
    slide,
    items: rows,
    defaults: { maxItemsPerPage: 5, maxWeightPerPage: 18 },
    getWeight: (row) => {
      const cells = [
        row?.feature || "",
        row?.genAI || row?.generativeAI || "",
        row?.agenticAI || "",
      ];
      return estimateLinesUnits(cells, 60) + 1;
    },
  });

  pages.forEach((pageRows, pageIndex) => {
    const shell = addSlideShell({
      pres,
      slideData: slide,
      pageIndex,
      pageCount: pages.length,
    });

    const tableX = shell.contentX;
    const tableY = shell.bodyTop + 0.12;
    const tableW = shell.contentW;
    const tableH = shell.bodyBottom - tableY;

    const headerH = 0.44;
    const rowH = (tableH - headerH) / pageRows.length;

    const colWidths = [tableW * 0.22, tableW * 0.39, tableW * 0.39];
    const headers = ["Feature", "Generative AI", "Agentic AI"];
    const rows = pageRows.map((row) => [
      row.feature || "",
      row.genAI || row.generativeAI || "",
      row.agenticAI || "",
    ]);

    const tableRows = buildNativeTableRows({
      headers,
      rows,
      theme: shell.theme,
      headerFill: shell.theme.headerBg,
      rowFontSize: 10,
      headerFontSize: 10.5,
      firstColumnBold: true,
    });

    shell.pptxSlide.addTable(tableRows, {
      x: tableX,
      y: tableY,
      w: tableW,
      h: tableH,
      colW: colWidths,
      rowH: [headerH, ...pageRows.map(() => rowH)],
      margin: 0.03,
      autoPage: false,
    });
  });

  return true;
};

const buildTimelineEntries = (slide) => {
  const entries = [];
  const milestones = Array.isArray(slide.milestones) ? slide.milestones : [];

  milestones.forEach((milestone) => {
    const rowLabel = milestone.rowLabel || "";
    const rowTitle = milestone.rowTitle || "";

    if (Array.isArray(milestone.quarters) && milestone.quarters.length) {
      milestone.quarters.forEach((quarter) => {
        entries.push({
          rowLabel,
          rowTitle,
          quarter: quarter.quarter || quarter.month || "",
          phase: quarter.phase || "",
          title: quarter.title || "",
          items: Array.isArray(quarter.items) ? quarter.items : [],
        });
      });
      return;
    }

    entries.push({
      rowLabel,
      rowTitle,
      quarter: milestone.quarter || milestone.month || "",
      phase: milestone.phase || "",
      title: milestone.title || "",
      items: Array.isArray(milestone.items) ? milestone.items : [],
    });
  });

  return entries;
};

const renderTimelineEvolutionSlide = ({ pres, slide }) => {
  if (slide.layout !== "timeline-evolution") return false;

  const entries = buildTimelineEntries(slide);
  if (!entries.length) return false;

  const pages = paginateSlideItems({
    slide,
    items: entries,
    defaults: { maxItemsPerPage: 4, maxWeightPerPage: 14 },
    getWeight: (entry) => {
      const detailLines = Array.isArray(entry?.items) ? entry.items : [];
      return (
        estimateTextUnits(entry?.quarter || "", 20) +
        estimateTextUnits(entry?.title || "", 28) +
        estimateLinesUnits(detailLines, 52)
      );
    },
  });

  pages.forEach((pageEntries, pageIndex) => {
    const shell = addSlideShell({
      pres,
      slideData: slide,
      pageIndex,
      pageCount: pages.length,
    });

    if (Array.isArray(slide.years) && slide.years.length) {
      shell.pptxSlide.addText(`Years: ${slide.years.map((y) => normalizeWhitespace(y)).join(", ")}`, {
        x: shell.contentX,
        y: shell.bodyTop + 0.03,
        w: shell.contentW,
        h: 0.2,
        fontFace: "Calibri",
        fontSize: 10,
        bold: true,
        color: shell.theme.accent,
        fit: "shrink",
      });
    }

    const cardsTop = shell.bodyTop + 0.28;
    const cardsH = shell.bodyBottom - cardsTop;
    const cols = 2;
    const rows = 2;
    const gapX = 0.32;
    const gapY = 0.25;
    const cardW = (shell.contentW - gapX) / cols;
    const cardH = (cardsH - gapY) / rows;

    shell.pptxSlide.addShape(pres.ShapeType.line, {
      x: shell.contentX,
      y: cardsTop + cardH / 2,
      w: shell.contentW,
      h: 0,
      line: { color: shell.theme.cardLine, pt: 1 },
    });

    pageEntries.forEach((entry, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const cardX = shell.contentX + col * (cardW + gapX);
      const cardY = cardsTop + row * (cardH + gapY);

      addCardShape({
        pres,
        pptxSlide: shell.pptxSlide,
        x: cardX,
        y: cardY,
        w: cardW,
        h: cardH,
        theme: shell.theme,
        alternate: idx % 2 === 1,
      });

      shell.pptxSlide.addShape(pres.ShapeType.roundRect, {
        x: cardX + 0.14,
        y: cardY + 0.12,
        w: 1.5,
        h: 0.3,
        fill: { color: shell.theme.accent },
        line: { color: shell.theme.accent, pt: 1 },
        radius: 0.08,
      });

      shell.pptxSlide.addText(normalizeWhitespace(entry.quarter || "Milestone"), {
        x: cardX + 0.19,
        y: cardY + 0.18,
        w: 1.4,
        h: 0.16,
        fontFace: "Calibri",
        fontSize: 9,
        bold: true,
        color: "FFFFFF",
        align: "center",
        fit: "shrink",
      });

      const rowDescriptor = [entry.rowLabel, entry.rowTitle].filter(Boolean).join(" | ");
      if (rowDescriptor) {
        shell.pptxSlide.addText(normalizeWhitespace(rowDescriptor), {
          x: cardX + 1.75,
          y: cardY + 0.17,
          w: cardW - 1.9,
          h: 0.2,
          fontFace: "Calibri",
          fontSize: 9,
          bold: true,
          color: shell.theme.muted,
          fit: "shrink",
        });
      }

      const details = [];
      if (entry.phase) details.push(`Phase: ${normalizeWhitespace(entry.phase)}`);
      if (entry.title) details.push(`Focus: ${normalizeWhitespace(entry.title)}`);
      if (entry.items.length) {
        details.push(...entry.items.map((item) => `• ${normalizeWhitespace(item)}`));
      }

      shell.pptxSlide.addText(details.join("\n"), {
        x: cardX + 0.16,
        y: cardY + 0.5,
        w: cardW - 0.32,
        h: cardH - 0.62,
        fontFace: "Calibri",
        fontSize: 10,
        color: shell.theme.text,
        valign: "top",
        fit: "shrink",
      });
    });
  });

  return true;
};

const buildTeamRows = (slide) => {
  const rows = [];

  const leadership = Array.isArray(slide.teamLeadership) ? slide.teamLeadership : [];
  leadership.forEach((member) => {
    rows.push({
      group: "Leadership",
      role: member.role || "",
      focus: [member.title, member.category, member.employmentType].filter(Boolean).join(" • "),
      allocation: member.allocation || "",
      responsibilities: member.responsibilities || "",
    });
  });

  const members = Array.isArray(slide.teamMembers) ? slide.teamMembers : [];
  members.forEach((member) => {
    rows.push({
      group: "Core Team",
      role: member.role || "",
      focus: [member.title, member.category, member.employmentType].filter(Boolean).join(" • "),
      allocation: member.allocation || "",
      responsibilities: member.responsibilities || "",
    });
  });

  const studentWorkers = Array.isArray(slide.studentWorkers) ? slide.studentWorkers : [];
  studentWorkers.forEach((member) => {
    rows.push({
      group: "Student",
      role: member.role || "",
      focus: "Support Delivery",
      allocation: member.allocation || "",
      responsibilities: member.responsibilities || "",
    });
  });

  return rows;
};

const renderTeamGridSlide = ({ pres, slide }) => {
  if (slide.layout !== "team-grid") return false;

  const rows = buildTeamRows(slide);
  if (!rows.length) return false;

  const stats = Array.isArray(slide.teamStats) ? slide.teamStats : [];
  const pages = paginateSlideItems({
    slide,
    items: rows,
    defaults: { maxItemsPerPage: 5, maxWeightPerPage: 16 },
    getWeight: (row) => {
      const cells = [
        row?.group || "",
        row?.role || "",
        row?.focus || "",
        row?.allocation || "",
        row?.responsibilities || "",
      ];
      return estimateLinesUnits(cells, 64) + 1;
    },
  });

  pages.forEach((pageRows, pageIndex) => {
    const shell = addSlideShell({
      pres,
      slideData: slide,
      pageIndex,
      pageCount: pages.length,
    });

    let tableY = shell.bodyTop + 0.08;

    if (stats.length) {
      const statY = shell.bodyTop + 0.03;
      const statGap = 0.22;
      const statW = (shell.contentW - statGap * (stats.length - 1)) / stats.length;

      stats.forEach((stat, idx) => {
        const x = shell.contentX + idx * (statW + statGap);
        addCardShape({
          pres,
          pptxSlide: shell.pptxSlide,
          x,
          y: statY,
          w: statW,
          h: 0.78,
          theme: shell.theme,
          alternate: idx % 2 === 1,
        });

        shell.pptxSlide.addText(normalizeWhitespace(stat.value || ""), {
          x: x + 0.14,
          y: statY + 0.12,
          w: statW - 0.28,
          h: 0.26,
          fontFace: "Calibri",
          fontSize: 20,
          bold: true,
          color: shell.theme.accent,
          align: "center",
          fit: "shrink",
        });

        shell.pptxSlide.addText(normalizeWhitespace(stat.label || ""), {
          x: x + 0.14,
          y: statY + 0.42,
          w: statW - 0.28,
          h: 0.2,
          fontFace: "Calibri",
          fontSize: 10,
          bold: true,
          color: shell.theme.title,
          align: "center",
          fit: "shrink",
        });
      });

      tableY = statY + 0.96;
    }

    const tableX = shell.contentX;
    const tableW = shell.contentW;
    const tableH = shell.bodyBottom - tableY;

    const headerH = 0.42;
    const rowH = (tableH - headerH) / pageRows.length;
    const colWidths = [
      tableW * 0.14,
      tableW * 0.18,
      tableW * 0.24,
      tableW * 0.11,
      tableW * 0.33,
    ];
    const headers = ["Group", "Role", "Focus", "Allocation", "Responsibilities"];
    const rowsForTable = pageRows.map((row) => [
      row.group || "",
      row.role || "",
      row.focus || "",
      row.allocation || "",
      row.responsibilities || "-",
    ]);

    const tableRows = buildNativeTableRows({
      headers,
      rows: rowsForTable,
      theme: shell.theme,
      headerFill: shell.theme.headerBg,
      rowFontSize: 9.5,
      headerFontSize: 10,
      firstColumnBold: false,
    });

    tableRows.slice(1).forEach((row) => {
      if (row[0]?.options) row[0].options.bold = true;
      if (row[1]?.options) row[1].options.bold = true;
      if (row[4]?.options) row[4].options.fontSize = 9;
    });

    shell.pptxSlide.addTable(tableRows, {
      x: tableX,
      y: tableY,
      w: tableW,
      h: tableH,
      colW: colWidths,
      rowH: [headerH, ...pageRows.map(() => rowH)],
      margin: 0.03,
      autoPage: false,
    });
  });

  return true;
};

const renderCampusMetricsSlide = ({ pres, slide }) => {
  if (slide.layout !== "campus-metrics") return false;

  const metrics = Array.isArray(slide.metrics) ? slide.metrics : [];
  if (!metrics.length) return false;

  const heroMetrics = metrics.filter((metric) => metric.tier === "hero");
  const detailMetrics = metrics.filter((metric) => metric.tier !== "hero");
  const detailPages = paginateSlideItems({
    slide,
    items: detailMetrics,
    defaults: { maxItemsPerPage: 8, maxWeightPerPage: 26 },
    getWeight: (metric) => {
      return estimateTextUnits(metric?.value || "", 16) + estimateTextUnits(metric?.label || "", 32);
    },
  });
  const pages = detailPages.length ? detailPages : [[]];

  pages.forEach((pageMetrics, pageIndex) => {
    const shell = addSlideShell({
      pres,
      slideData: slide,
      pageIndex,
      pageCount: pages.length,
    });

    let y = shell.bodyTop + 0.04;
    const campusImage = getImageOptions(slide.campusImage);

    if (campusImage && pageIndex === 0) {
      const imageH = 1.25;
      safeAddImage(shell.pptxSlide, campusImage, {
        x: shell.contentX,
        y,
        w: shell.contentW,
        h: imageH,
        sizing: {
          type: "cover",
          x: shell.contentX,
          y,
          w: shell.contentW,
          h: imageH,
        },
      });
      shell.pptxSlide.addShape(pres.ShapeType.rect, {
        x: shell.contentX,
        y,
        w: shell.contentW,
        h: imageH,
        fill: { color: "000000", transparency: 35 },
        line: { color: shell.theme.cardLine, pt: 0.5 },
      });
      y += imageH + 0.14;
    }

    if (heroMetrics.length) {
      addSectionHeading({
        pptxSlide: shell.pptxSlide,
        text: "Campus Snapshot",
        x: shell.contentX,
        y,
        w: shell.contentW,
        theme: shell.theme,
      });
      y += 0.3;

      const heroGap = 0.24;
      const heroCount = Math.min(3, heroMetrics.length);
      const heroW = (shell.contentW - heroGap * (heroCount - 1)) / heroCount;
      const heroH = 0.92;

      heroMetrics.slice(0, heroCount).forEach((metric, idx) => {
        const cardX = shell.contentX + idx * (heroW + heroGap);
        addCardShape({
          pres,
          pptxSlide: shell.pptxSlide,
          x: cardX,
          y,
          w: heroW,
          h: heroH,
          theme: shell.theme,
          alternate: idx % 2 === 1,
        });

        shell.pptxSlide.addText(normalizeWhitespace(metric.value || ""), {
          x: cardX + 0.14,
          y: y + 0.12,
          w: heroW - 0.28,
          h: 0.34,
          fontFace: "Calibri",
          fontSize: 24,
          bold: true,
          color: shell.theme.accent,
          align: "center",
          fit: "shrink",
        });

        shell.pptxSlide.addText(normalizeWhitespace(metric.label || ""), {
          x: cardX + 0.14,
          y: y + 0.5,
          w: heroW - 0.28,
          h: 0.28,
          fontFace: "Calibri",
          fontSize: 11,
          bold: true,
          color: shell.theme.title,
          align: "center",
          fit: "shrink",
        });
      });

      y += heroH + 0.18;
    }

    if (pageMetrics.length) {
      addSectionHeading({
        pptxSlide: shell.pptxSlide,
        text: "Institutional Metrics",
        x: shell.contentX,
        y,
        w: shell.contentW,
        theme: shell.theme,
      });
      y += 0.3;

      const gridTop = y;
      const gridBottom = shell.bodyBottom;
      const gridH = Math.max(0.4, gridBottom - gridTop);
      const cols = 4;
      const rows = Math.ceil(pageMetrics.length / cols);
      const gapX = 0.2;
      const gapY = 0.2;
      const cardW = (shell.contentW - gapX * (cols - 1)) / cols;
      const cardH = (gridH - gapY * Math.max(0, rows - 1)) / Math.max(1, rows);

      pageMetrics.forEach((metric, idx) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        const cardX = shell.contentX + col * (cardW + gapX);
        const cardY = gridTop + row * (cardH + gapY);

        addCardShape({
          pres,
          pptxSlide: shell.pptxSlide,
          x: cardX,
          y: cardY,
          w: cardW,
          h: cardH,
          theme: shell.theme,
          alternate: idx % 2 === 1,
        });

        shell.pptxSlide.addText(normalizeWhitespace(metric.value || ""), {
          x: cardX + 0.1,
          y: cardY + 0.08,
          w: cardW - 0.2,
          h: 0.25,
          fontFace: "Calibri",
          fontSize: 16,
          bold: true,
          color: shell.theme.accent,
          align: "center",
          fit: "shrink",
        });

        shell.pptxSlide.addText(normalizeWhitespace(metric.label || ""), {
          x: cardX + 0.1,
          y: cardY + 0.36,
          w: cardW - 0.2,
          h: Math.max(0.14, cardH - 0.42),
          fontFace: "Calibri",
          fontSize: 9,
          color: shell.theme.text,
          align: "center",
          valign: "top",
          fit: "shrink",
        });
      });
    }
  });

  return true;
};

const renderPlatformSimpleSlide = ({ pres, slide }) => {
  if (slide.layout !== "platform-simple") return false;

  const assistants = Array.isArray(slide.assistants) ? slide.assistants : [];
  if (!assistants.length) return false;

  const overflowReadyAssistants = expandCardOverflowItems({
    items: assistants,
    getHeading: (assistant, idx) => assistant?.name || assistant?.title || `Assistant ${idx + 1}`,
    getBody: (assistant) => assistant?.description || assistant?.text || "",
    createItem: (assistant, segment) => ({
      ...assistant,
      __displayName: segment.heading,
      __displayDescription: segment.body,
      __continuationIndex: segment.continuationIndex,
      __continuationCount: segment.continuationCount,
    }),
    charsPerLine: 46,
    maxLinesPerSegment: 4,
  });

  const pages = paginateSlideItems({
    slide,
    items: overflowReadyAssistants,
    defaults: { maxItemsPerPage: 12, maxWeightPerPage: 30 },
    getWeight: (assistant) => {
      return (
        estimateTextUnits(assistant?.__displayName || assistant?.name || assistant?.title || "", 22) +
        estimateTextUnits(assistant?.__displayDescription || assistant?.description || assistant?.text || "", 44)
      );
    },
  });

  pages.forEach((pageAssistants, pageIndex) => {
    const shell = addSlideShell({
      pres,
      slideData: slide,
      pageIndex,
      pageCount: pages.length,
    });

    const headerY = shell.bodyTop + 0.04;
    addSectionHeading({
      pptxSlide: shell.pptxSlide,
      text: `Assistant Portfolio (${assistants.length} total)`,
      x: shell.contentX,
      y: headerY,
      w: shell.contentW,
      theme: shell.theme,
    });

    const cardsTop = headerY + 0.34;
    const cardsBottom = shell.bodyBottom;
    const cardsH = cardsBottom - cardsTop;
    const cols = 3;
    const rows = 4;
    const gapX = 0.24;
    const gapY = 0.2;
    const cardW = (shell.contentW - gapX * (cols - 1)) / cols;
    const cardH = (cardsH - gapY * (rows - 1)) / rows;

    pageAssistants.forEach((assistant, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const cardX = shell.contentX + col * (cardW + gapX);
      const cardY = cardsTop + row * (cardH + gapY);

      addCardShape({
        pres,
        pptxSlide: shell.pptxSlide,
        x: cardX,
        y: cardY,
        w: cardW,
        h: cardH,
        theme: shell.theme,
        alternate: idx % 2 === 1,
      });

      const name = assistant.__displayName || assistant.name || assistant.title || `Assistant ${idx + 1}`;
      const description = assistant.__displayDescription || assistant.description || assistant.text || "";

      shell.pptxSlide.addText(normalizeWhitespace(name), {
        x: cardX + 0.13,
        y: cardY + 0.1,
        w: cardW - 0.26,
        h: 0.28,
        fontFace: "Calibri",
        fontSize: 12,
        bold: true,
        color: shell.theme.title,
        fit: "shrink",
      });

      shell.pptxSlide.addText(normalizeWhitespace(description), {
        x: cardX + 0.13,
        y: cardY + 0.42,
        w: cardW - 0.26,
        h: Math.max(0.14, cardH - 0.5),
        fontFace: "Calibri",
        fontSize: 10,
        color: shell.theme.text,
        valign: "top",
        fit: "shrink",
      });
    });
  });

  return true;
};

const renderAnalyticsChartSlide = ({ pres, slide, options }) => {
  if (slide.layout !== "analytics-chart") return false;

  const chartData = slide.chartData || {};
  const categories = Array.isArray(chartData.xAxis) ? chartData.xAxis : [];
  const yTicks = Array.isArray(chartData.yAxis) ? chartData.yAxis : [];
  const series = Array.isArray(chartData.series) ? chartData.series : [];

  if (!categories.length || !series.length) return false;

  const snapshotImage = getSnapshotImageOptions(options, slide);
  if (snapshotImage) {
    const shell = addSlideShell({
      pres,
      slideData: slide,
      pageIndex: 0,
      pageCount: 1,
    });
    addSnapshotBackdrop({ shell, imageOpts: snapshotImage, pres });
    addSnapshotSummaryPanel({ shell, slide, pres, title: "Chart Data" });
    addAccessibilityTextLayer({ shell, slide });
    return true;
  }

  const normalizedSeries = series.map((item, idx) => {
    const name = normalizeWhitespace(item.name || `Series ${idx + 1}`);
    const values = Array.isArray(item.data) ? item.data : [];
    return { name, values, color: normalizeColor(item.color, "00629B") };
  });

  const seriesInsights = normalizedSeries.map((item) => {
    const start = Number(item.values[0]) || 0;
    const end = Number(item.values[item.values.length - 1]) || 0;
    const delta = end - start;
    const deltaLabel = delta >= 0 ? `+${delta.toLocaleString()}` : delta.toLocaleString();
    return {
      color: item.color,
      summary: `${item.name}: ${start.toLocaleString()} \u2192 ${end.toLocaleString()} (${deltaLabel})`,
    };
  });

  const yTickSegments = yTicks.length
    ? splitTextIntoSegments({
      text: yTicks.map((v) => normalizeWhitespace(v)).join(", "),
      charsPerLine: 84,
      maxLinesPerSegment: 1,
    }).map((segment, idx) => ({
      color: null,
      summary: idx === 0 ? `Y-axis ticks: ${segment}` : `Y-axis ticks (cont.): ${segment}`,
    }))
    : [];
  const insightRows = [...seriesInsights, ...yTickSegments];

  const insightPages = paginateSlideItems({
    slide,
    items: insightRows,
    defaults: { maxItemsPerPage: 3, maxWeightPerPage: 9 },
    getWeight: (row) => estimateTextUnits(row?.summary || "", 92) + 1,
  });

  const canRenderChart = normalizedSeries.every((item) => item.values.length === categories.length);
  insightPages.forEach((pageInsights, pageIndex) => {
    const shell = addSlideShell({
      pres,
      slideData: slide,
      pageIndex,
      pageCount: insightPages.length,
    });

    const chartTitle = chartData.title ? normalizeWhitespace(chartData.title) : "";
    if (chartTitle) {
      shell.pptxSlide.addText(chartTitle, {
        x: shell.contentX,
        y: shell.bodyTop + 0.03,
        w: shell.contentW,
        h: 0.22,
        fontFace: "Calibri",
        fontSize: 11,
        bold: true,
        color: shell.theme.muted,
        fit: "shrink",
      });
    }

    const chartY = shell.bodyTop + 0.26;
    const insightsY = shell.bodyBottom - 0.64;
    const insightsH = 0.56;
    const chartH = Math.max(2.15, insightsY - chartY - 0.08);
    const chartW = shell.contentW;

    if (canRenderChart && pres.ChartType && pres.ChartType.line) {
      const xAxisTitle = chartData.xAxisTitle ? normalizeWhitespace(chartData.xAxisTitle) : "Month";
      const yAxisTitle = chartData.yAxisTitle
        ? normalizeWhitespace(chartData.yAxisTitle)
        : "Volume";
      const chartSeries = normalizedSeries.map((item) => ({
        name: item.name,
        labels: categories.map((label) => normalizeWhitespace(label)),
        values: item.values,
      }));
      shell.pptxSlide.addChart(pres.ChartType.line, chartSeries, {
        x: shell.contentX,
        y: chartY,
        w: chartW,
        h: chartH,
        showLegend: true,
        legendPos: "b",
        showTitle: false,
        lineSize: 2.2,
        lineDataSymbol: "circle",
        lineDataSymbolSize: 4,
        catAxisLabelRotate: -35,
        catAxisLabelSize: 9,
        catAxisLabelFontFace: "Calibri",
        catAxisTitle: xAxisTitle,
        showCatAxisTitle: true,
        catAxisTitleFontFace: "Calibri",
        catAxisTitleFontSize: 9,
        valAxisLabelSize: 9,
        valAxisLabelFontFace: "Calibri",
        valAxisMinVal: 0,
        valAxisMaxVal: Number.isFinite(chartData.maxValue) ? chartData.maxValue : undefined,
        valAxisTitle: yAxisTitle,
        showValAxisTitle: true,
        valAxisTitleFontFace: "Calibri",
        valAxisTitleFontSize: 9,
        valGridLine: {
          color: shell.theme.cardLine,
          size: 1,
          style: "solid",
        },
        chartColors: normalizedSeries.map((item) => item.color),
      });
    }

    addCardShape({
      pres,
      pptxSlide: shell.pptxSlide,
      x: shell.contentX,
      y: insightsY,
      w: shell.contentW,
      h: insightsH,
      theme: shell.theme,
      alternate: true,
    });

    shell.pptxSlide.addText("Series Insights", {
      x: shell.contentX + 0.08,
      y: insightsY + 0.05,
      w: shell.contentW - 0.16,
      h: 0.08,
      fontFace: "Calibri",
      fontSize: TYPOGRAPHY.bodySmall,
      bold: true,
      color: shell.theme.title,
    });

    const rowTop = insightsY + 0.16;
    const rowAreaHeight = insightsH - 0.2;
    const rowGap = 0.035;
    const rowCount = Math.max(1, pageInsights.length);
    const rowHeight = (rowAreaHeight - rowGap * Math.max(0, rowCount - 1)) / rowCount;

    pageInsights.forEach((row, idx) => {
      const rowY = rowTop + idx * (rowHeight + rowGap);

      if (row.color) {
        shell.pptxSlide.addShape(pres.ShapeType.roundRect, {
          x: shell.contentX + 0.1,
          y: rowY + Math.max(0.01, rowHeight * 0.18),
          w: 0.12,
          h: Math.max(0.04, rowHeight * 0.48),
          fill: { color: row.color },
          line: { color: row.color, pt: 1 },
          radius: 0.02,
        });
      }

      const visibleText = splitTextIntoSegments({
        text: row.summary,
        charsPerLine: 104,
        maxLinesPerSegment: 1,
        boxHeightInches: rowHeight,
        fontSize: TYPOGRAPHY.bodySmall,
      })[0];

      shell.pptxSlide.addText(visibleText, {
        x: shell.contentX + (row.color ? 0.26 : 0.1),
        y: rowY,
        w: shell.contentW - (row.color ? 0.34 : 0.2),
        h: rowHeight,
        fontFace: "Calibri",
        fontSize: TYPOGRAPHY.bodySmall,
        color: shell.theme.text,
        valign: "top",
      });
    });

    addAccessibilityTextLayer({ shell, slide });
  });

  return true;
};

const renderApiGatewaySnapshotSlide = ({ pres, slide, options }) => {
  if (slide.layout !== "api-gateway") return false;

  const snapshotImage = getSnapshotImageOptions(options, slide);
  if (!snapshotImage) return false;

  const shell = addSlideShell({
    pres,
    slideData: slide,
    pageIndex: 0,
    pageCount: 1,
  });

  addSnapshotBackdrop({ shell, imageOpts: snapshotImage, pres });
  addSnapshotSummaryPanel({ shell, slide, pres, title: "Program Notes" });
  addAccessibilityTextLayer({ shell, slide });
  return true;
};

const renderHostingPipelineSnapshotSlide = ({ pres, slide, options }) => {
  if (slide.layout !== "hosting-pipeline") return false;

  const snapshotImage = getSnapshotImageOptions(options, slide);
  if (!snapshotImage) return false;

  const shell = addSlideShell({
    pres,
    slideData: slide,
    pageIndex: 0,
    pageCount: 1,
  });

  addSnapshotBackdrop({ shell, imageOpts: snapshotImage, pres });
  addSnapshotSummaryPanel({ shell, slide, pres, title: "Hosting Notes" });
  addAccessibilityTextLayer({ shell, slide });
  return true;
};

const renderContractReviewChallengeSlide = ({ pres, slide }) => {
  if (slide.layout !== "contract-review-challenge") return false;

  const items = Array.isArray(slide.content) ? slide.content : [];
  if (!items.length) return false;

  const overflowReadyItems = expandCardOverflowItems({
    items,
    getHeading: (item, idx) => item?.heading || `Challenge ${idx + 1}`,
    getBody: (item) => {
      const lines = [
        item?.text ? normalizeWhitespace(item.text) : "",
        item?.statLabel ? `Metric: ${normalizeWhitespace(item.statLabel)}` : "",
      ].filter(Boolean);
      return lines.join("\n");
    },
    createItem: (item, segment) => ({
      ...item,
      __displayHeading: segment.heading,
      __displayBody: segment.body,
      __showStat: segment.continuationIndex === 0,
      __continuationIndex: segment.continuationIndex,
      __continuationCount: segment.continuationCount,
    }),
    charsPerLine: 54,
    maxLinesPerSegment: 4,
  });

  const pages = paginateSlideItems({
    slide,
    items: overflowReadyItems,
    defaults: { maxItemsPerPage: 4, maxWeightPerPage: 18 },
    getWeight: (item) => {
      const heading = item?.__displayHeading || item?.heading || "";
      const bodyLines = String(item?.__displayBody || "").split("\n").filter(Boolean);
      return estimateTextUnits(heading, 24) + estimateLinesUnits(bodyLines, 56);
    },
  });

  pages.forEach((pageItems, pageIndex) => {
    const shell = addSlideShell({
      pres,
      slideData: slide,
      pageIndex,
      pageCount: pages.length,
    });

    const cardsTop = shell.bodyTop + 0.08;
    const cardsBottom = shell.bodyBottom;
    const cardsH = cardsBottom - cardsTop;
    const cols = pageItems.length <= 1 ? 1 : 2;
    const rows = Math.max(1, Math.ceil(pageItems.length / cols));
    const gapX = 0.26;
    const gapY = 0.24;
    const cardW = (shell.contentW - gapX * Math.max(0, cols - 1)) / cols;
    const cardH = (cardsH - gapY * Math.max(0, rows - 1)) / rows;

    pageItems.forEach((item, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const cardX = shell.contentX + col * (cardW + gapX);
      const cardY = cardsTop + row * (cardH + gapY);

      addCardShape({
        pres,
        pptxSlide: shell.pptxSlide,
        x: cardX,
        y: cardY,
        w: cardW,
        h: cardH,
        theme: shell.theme,
        alternate: idx % 2 === 1,
      });

      if (item.__showStat && (item.stat || item.statLabel)) {
        shell.pptxSlide.addShape(pres.ShapeType.roundRect, {
          x: cardX + cardW - 1.22,
          y: cardY + 0.1,
          w: 1.08,
          h: 0.34,
          fill: { color: shell.theme.accent },
          line: { color: shell.theme.accent, pt: 1 },
          radius: 0.08,
        });

        shell.pptxSlide.addText(normalizeWhitespace(item.stat || ""), {
          x: cardX + cardW - 1.16,
          y: cardY + 0.14,
          w: 0.96,
          h: 0.14,
          fontFace: "Calibri",
          fontSize: 11,
          bold: true,
          color: "FFFFFF",
          align: "center",
          fit: "shrink",
        });
      }

      shell.pptxSlide.addText(normalizeWhitespace(item.__displayHeading || item.heading || `Challenge ${idx + 1}`), {
        x: cardX + 0.14,
        y: cardY + 0.1,
        w: cardW - 1.46,
        h: 0.3,
        fontFace: "Calibri",
        fontSize: 12,
        bold: true,
        color: shell.theme.title,
        fit: "shrink",
      });

      const bodyText = item.__displayBody || [
        item.text ? normalizeWhitespace(item.text) : "",
        item.statLabel ? `Metric: ${normalizeWhitespace(item.statLabel)}` : "",
      ].filter(Boolean).join("\n");

      shell.pptxSlide.addText(bodyText, {
        x: cardX + 0.14,
        y: cardY + 0.48,
        w: cardW - 0.28,
        h: cardH - 0.56,
        fontFace: "Calibri",
        fontSize: 10,
        color: shell.theme.text,
        valign: "top",
        fit: "shrink",
      });
    });
  });

  return true;
};

const renderCaseStudyHeroSlide = ({ pres, slide }) => {
  if (slide.layout !== "case-study-hero") return false;

  const highlights = Array.isArray(slide.content) ? slide.content : [];
  const quotes = Array.isArray(slide.quotes) ? slide.quotes : [];
  if (!highlights.length && !quotes.length) return false;

  const overflowReadyQuotes = expandCardOverflowItems({
    items: quotes,
    getHeading: (quote) => quote?.author || "Campus Partner",
    getBody: (quote) => quote?.text || "",
    createItem: (quote, segment) => ({
      ...quote,
      __displayAuthor: segment.heading,
      __displayText: segment.body,
      __continuationIndex: segment.continuationIndex,
      __continuationCount: segment.continuationCount,
    }),
    charsPerLine: 52,
    maxLinesPerSegment: 4,
  });

  const quotePages = overflowReadyQuotes.length
    ? paginateSlideItems({
      slide,
      items: overflowReadyQuotes,
      defaults: { maxItemsPerPage: 2, maxWeightPerPage: 8 },
      getWeight: (quote) => {
        return (
          estimateTextUnits(quote?.__displayAuthor || quote?.author || "", 24) +
          estimateTextUnits(quote?.__displayText || quote?.text || "", 60)
        );
      },
    })
    : [[]];

  quotePages.forEach((pageQuotes, pageIndex) => {
    const shell = addSlideShell({
      pres,
      slideData: slide,
      pageIndex,
      pageCount: quotePages.length,
    });

    const leftW = shell.contentW * 0.6;
    const rightGap = 0.24;
    const rightX = shell.contentX + leftW + rightGap;
    const rightW = shell.contentW - leftW - rightGap;

    addSectionHeading({
      pptxSlide: shell.pptxSlide,
      text: "Capabilities",
      x: shell.contentX,
      y: shell.bodyTop + 0.03,
      w: leftW,
      theme: shell.theme,
    });

    const cardsTop = shell.bodyTop + 0.33;
    const cardsBottom = shell.bodyBottom;
    const cardsH = cardsBottom - cardsTop;
    const cols = 2;
    const rows = Math.max(1, Math.ceil(highlights.length / cols));
    const gapX = 0.2;
    const gapY = 0.2;
    const cardW = (leftW - gapX) / cols;
    const cardH = (cardsH - gapY * Math.max(0, rows - 1)) / rows;

    highlights.forEach((item, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const cardX = shell.contentX + col * (cardW + gapX);
      const cardY = cardsTop + row * (cardH + gapY);

      addCardShape({
        pres,
        pptxSlide: shell.pptxSlide,
        x: cardX,
        y: cardY,
        w: cardW,
        h: cardH,
        theme: shell.theme,
        alternate: idx % 2 === 1,
      });

      shell.pptxSlide.addText(normalizeWhitespace(item.heading || `Capability ${idx + 1}`), {
        x: cardX + 0.12,
        y: cardY + 0.1,
        w: cardW - 0.24,
        h: 0.24,
        fontFace: "Calibri",
        fontSize: 11,
        bold: true,
        color: shell.theme.title,
        fit: "shrink",
      });

      shell.pptxSlide.addText(normalizeWhitespace(item.text || ""), {
        x: cardX + 0.12,
        y: cardY + 0.38,
        w: cardW - 0.24,
        h: cardH - 0.46,
        fontFace: "Calibri",
        fontSize: 9,
        color: shell.theme.text,
        valign: "top",
        fit: "shrink",
      });
    });

    addSectionHeading({
      pptxSlide: shell.pptxSlide,
      text: "User Feedback",
      x: rightX,
      y: shell.bodyTop + 0.03,
      w: rightW,
      theme: shell.theme,
    });

    const quoteTop = shell.bodyTop + 0.33;
    const quoteGap = 0.2;
    const quoteRows = Math.max(1, pageQuotes.length);
    const quoteH = (shell.bodyBottom - quoteTop - quoteGap * (quoteRows - 1)) / quoteRows;

    pageQuotes.forEach((quote, idx) => {
      const cardY = quoteTop + idx * (quoteH + quoteGap);

      addCardShape({
        pres,
        pptxSlide: shell.pptxSlide,
        x: rightX,
        y: cardY,
        w: rightW,
        h: quoteH,
        theme: shell.theme,
        alternate: true,
      });

      const quoteText = normalizeWhitespace(quote.__displayText || quote.text || "");
      shell.pptxSlide.addText(`"${quoteText}"`, {
        x: rightX + 0.12,
        y: cardY + 0.12,
        w: rightW - 0.24,
        h: quoteH - 0.34,
        fontFace: "Calibri",
        fontSize: 10,
        italic: true,
        color: shell.theme.text,
        valign: "top",
        fit: "shrink",
      });

      shell.pptxSlide.addText(`- ${normalizeWhitespace(quote.__displayAuthor || quote.author || "Campus Partner")}`, {
        x: rightX + 0.12,
        y: cardY + quoteH - 0.2,
        w: rightW - 0.24,
        h: 0.12,
        fontFace: "Calibri",
        fontSize: 9,
        bold: true,
        color: shell.theme.accent,
        align: "right",
        fit: "shrink",
      });
    });
  });

  return true;
};

const renderCompoundArchitectureSlide = ({ pres, slide, options }) => {
  if (slide.layout !== "compound-architecture") return false;

  const layers = Array.isArray(slide.architectureLayers) ? slide.architectureLayers : [];
  if (!layers.length) return false;

  const snapshotImage = getSnapshotImageOptions(options, slide);
  if (snapshotImage) {
    const shell = addSlideShell({
      pres,
      slideData: slide,
      pageIndex: 0,
      pageCount: 1,
    });

    addSnapshotBackdrop({ shell, imageOpts: snapshotImage, pres });
    addSnapshotSummaryPanel({ shell, slide, pres, title: "Architecture Notes" });
    addAccessibilityTextLayer({ shell, slide });
    return true;
  }

  const pages = paginateSlideItems({
    slide,
    items: layers,
    defaults: { maxItemsPerPage: 3, maxWeightPerPage: 12 },
    getWeight: (layer) => {
      const detailLines = getDetailLines(layer || {}, ["name", "description", "color", "icon"]);
      return (
        estimateTextUnits(layer?.name || "", 20) +
        estimateTextUnits(layer?.description || "", 38) +
        estimateLinesUnits(detailLines, 56)
      );
    },
  });

  pages.forEach((pageLayers, pageIndex) => {
    const shell = addSlideShell({
      pres,
      slideData: slide,
      pageIndex,
      pageCount: pages.length,
    });

    const top = shell.bodyTop + 0.08;
    const gapY = 0.18;
    const layerH = (shell.bodyBottom - top - gapY * (pageLayers.length - 1)) / pageLayers.length;

    pageLayers.forEach((layer, idx) => {
      const y = top + idx * (layerH + gapY);

      addCardShape({
        pres,
        pptxSlide: shell.pptxSlide,
        x: shell.contentX,
        y,
        w: shell.contentW,
        h: layerH,
        theme: shell.theme,
        alternate: idx % 2 === 1,
      });

      shell.pptxSlide.addShape(pres.ShapeType.roundRect, {
        x: shell.contentX + 0.12,
        y: y + 0.14,
        w: 0.9,
        h: 0.28,
        fill: { color: shell.theme.accent },
        line: { color: shell.theme.accent, pt: 1 },
        radius: 0.08,
      });

      shell.pptxSlide.addText(normalizeWhitespace(layer.name || `Layer ${idx + 1}`), {
        x: shell.contentX + 1.08,
        y: y + 0.1,
        w: shell.contentW - 1.2,
        h: 0.22,
        fontFace: "Calibri",
        fontSize: 13,
        bold: true,
        color: shell.theme.title,
        fit: "shrink",
      });

      shell.pptxSlide.addText(normalizeWhitespace(layer.description || ""), {
        x: shell.contentX + 1.08,
        y: y + 0.34,
        w: shell.contentW - 1.2,
        h: 0.16,
        fontFace: "Calibri",
        fontSize: 10,
        bold: true,
        color: shell.theme.accent,
        fit: "shrink",
      });

      const detailLines = getDetailLines(layer, ["name", "description", "color", "icon"]);
      shell.pptxSlide.addText(detailLines.join("\n"), {
        x: shell.contentX + 0.14,
        y: y + 0.56,
        w: shell.contentW - 0.28,
        h: layerH - 0.64,
        fontFace: "Calibri",
        fontSize: 9,
        color: shell.theme.text,
        valign: "top",
        fit: "shrink",
      });
    });
  });

  return true;
};

const renderAgentWorkflowSlide = ({ pres, slide, options }) => {
  if (slide.layout !== "agent-workflow") return false;

  const stages = Array.isArray(slide.workflowStages) ? slide.workflowStages : [];
  if (!stages.length) return false;

  const snapshotImage = getSnapshotImageOptions(options, slide);
  if (snapshotImage) {
    const shell = addSlideShell({
      pres,
      slideData: slide,
      pageIndex: 0,
      pageCount: 1,
    });

    addSnapshotBackdrop({ shell, imageOpts: snapshotImage, pres });
    addSnapshotSummaryPanel({ shell, slide, pres, title: "Workflow Notes" });
    addAccessibilityTextLayer({ shell, slide });
    return true;
  }

  const pages = paginateSlideItems({
    slide,
    items: stages,
    defaults: { maxItemsPerPage: 4, maxWeightPerPage: 14 },
    getWeight: (stage) => {
      const lines = [
        stage?.name || "",
        stage?.description || "",
        stage?.example || "",
      ];
      return estimateLinesUnits(lines, 56) + 1;
    },
  });
  const agents = Array.isArray(slide.centralConcept?.agents) ? slide.centralConcept.agents : [];
  const supporting = Array.isArray(slide.supportingLayers) ? slide.supportingLayers : [];

  pages.forEach((pageStages, pageIndex) => {
    const shell = addSlideShell({
      pres,
      slideData: slide,
      pageIndex,
      pageCount: pages.length,
    });

    const centralText = [
      slide.centralConcept?.title ? normalizeWhitespace(slide.centralConcept.title) : "",
      agents.length ? `Agents: ${agents.map((a) => normalizeWhitespace(a.name || "")).join(", ")}` : "",
      supporting.length
        ? supporting
            .map((layer) => `${normalizeWhitespace(layer.name || "")}: ${(layer.items || []).map((x) => normalizeWhitespace(x)).join(", ")}`)
            .join(" | ")
        : "",
    ]
      .filter(Boolean)
      .join(" | ");

    if (centralText) {
      addCardShape({
        pres,
        pptxSlide: shell.pptxSlide,
        x: shell.contentX,
        y: shell.bodyTop + 0.02,
        w: shell.contentW,
        h: 0.48,
        theme: shell.theme,
      });

      shell.pptxSlide.addText(centralText, {
        x: shell.contentX + 0.12,
        y: shell.bodyTop + 0.14,
        w: shell.contentW - 0.24,
        h: 0.24,
        fontFace: "Calibri",
        fontSize: 9,
        bold: true,
        color: shell.theme.text,
        fit: "shrink",
      });
    }

    const cardsTop = shell.bodyTop + 0.58;
    const cardsBottom = shell.bodyBottom;
    const cardsH = cardsBottom - cardsTop;
    const cols = 2;
    const rows = 2;
    const gapX = 0.26;
    const gapY = 0.22;
    const cardW = (shell.contentW - gapX) / cols;
    const cardH = (cardsH - gapY) / rows;

    pageStages.forEach((stage, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const cardX = shell.contentX + col * (cardW + gapX);
      const cardY = cardsTop + row * (cardH + gapY);

      addCardShape({
        pres,
        pptxSlide: shell.pptxSlide,
        x: cardX,
        y: cardY,
        w: cardW,
        h: cardH,
        theme: shell.theme,
        alternate: idx % 2 === 1,
      });

      shell.pptxSlide.addShape(pres.ShapeType.roundRect, {
        x: cardX + 0.12,
        y: cardY + 0.1,
        w: 0.28,
        h: 0.24,
        fill: { color: shell.theme.accent },
        line: { color: shell.theme.accent, pt: 1 },
        radius: 0.08,
      });

      shell.pptxSlide.addText(normalizeWhitespace(stage.number || `${idx + 1}`), {
        x: cardX + 0.13,
        y: cardY + 0.13,
        w: 0.26,
        h: 0.16,
        fontFace: "Calibri",
        fontSize: 10,
        bold: true,
        color: "FFFFFF",
        align: "center",
        fit: "shrink",
      });

      shell.pptxSlide.addText(normalizeWhitespace(stage.name || `Stage ${idx + 1}`), {
        x: cardX + 0.45,
        y: cardY + 0.1,
        w: cardW - 0.57,
        h: 0.2,
        fontFace: "Calibri",
        fontSize: 11,
        bold: true,
        color: shell.theme.title,
        fit: "shrink",
      });

      const details = [
        stage.description ? normalizeWhitespace(stage.description) : "",
        stage.example ? `Example: ${normalizeWhitespace(stage.example)}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      shell.pptxSlide.addText(details, {
        x: cardX + 0.12,
        y: cardY + 0.4,
        w: cardW - 0.24,
        h: cardH - 0.48,
        fontFace: "Calibri",
        fontSize: 9,
        color: shell.theme.text,
        valign: "top",
        fit: "shrink",
      });
    });
  });

  return true;
};

const ROADMAP_CONTINUATION_SUFFIX_RE = /\s*\(cont\.?\)\s*$/i;

const stripRoadmapContinuationSuffix = (value) => {
  const normalized = normalizeWhitespace(value || "");
  if (!normalized) return "";
  return normalized.replace(ROADMAP_CONTINUATION_SUFFIX_RE, "").trim();
};

const normalizeRoadmapCategories = (categories) => {
  const source = Array.isArray(categories) ? categories : [];
  const merged = [];

  source.forEach((category, idx) => {
    const rawName = normalizeWhitespace(category?.name || `Category ${idx + 1}`);
    const baseName = stripRoadmapContinuationSuffix(rawName) || rawName;
    const assistants = Array.isArray(category?.assistants) ? category.assistants : [];
    const previous = merged[merged.length - 1];
    const previousName = stripRoadmapContinuationSuffix(previous?.name || "");
    const shouldMerge =
      Boolean(previousName) &&
      previousName.toLowerCase() === baseName.toLowerCase();

    if (shouldMerge) {
      previous.assistants = [...previous.assistants, ...assistants];
      if (!previous.color && category?.color) previous.color = category.color;
      return;
    }

    merged.push({
      ...category,
      name: baseName || rawName || `Category ${idx + 1}`,
      assistants: [...assistants],
    });
  });

  return merged;
};

const normalizeCategoryEntries = (category) => {
  const assistants = Array.isArray(category?.assistants) ? category.assistants : [];
  const entries = [];

  assistants.forEach((assistant, idx) => {
    const rawTitle = normalizeWhitespace(
      assistant?.heading || assistant?.name || assistant?.title || `Initiative ${idx + 1}`
    );
    const title = stripRoadmapContinuationSuffix(rawTitle) || rawTitle || `Initiative ${idx + 1}`;
    const body = assistant?.text ? normalizeWhitespace(assistant.text) : "";
    const isContinuation = ROADMAP_CONTINUATION_SUFFIX_RE.test(rawTitle);
    const previous = entries[entries.length - 1];
    const previousTitle = stripRoadmapContinuationSuffix(previous?.title || "");

    if (isContinuation && previousTitle && previousTitle.toLowerCase() === title.toLowerCase()) {
      previous.body = [previous.body, body].filter(Boolean).join(" ").trim();
      return;
    }

    entries.push({
      index: entries.length + 1,
      title,
      body,
    });
  });

  return entries;
};

const estimateRoadmapEntryWeight = (entry) => {
  const titleUnits = Math.max(1, Math.ceil((entry?.title || "").length / 22));
  const bodyUnits = Math.max(1, Math.ceil((entry?.body || "").length / 54));
  return titleUnits + bodyUnits;
};

const computeAdaptiveCardHeights = ({
  entries,
  availableHeight,
  minHeight = 0.74,
  maxHeight = 1.34,
  gap = 0.12,
}) => {
  if (!entries.length) return { heights: [], offsetY: 0, gap };

  const totalGap = gap * Math.max(0, entries.length - 1);
  const usableHeight = Math.max(0.2, availableHeight - totalGap);
  const weights = entries.map((entry) => estimateRoadmapEntryWeight(entry));
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0) || 1;

  let heights = weights.map((weight) => {
    const candidate = (usableHeight * weight) / totalWeight;
    return Math.min(maxHeight, Math.max(minHeight, candidate));
  });

  const sumHeights = () => heights.reduce((sum, value) => sum + value, 0);
  let totalHeights = sumHeights();

  if (totalHeights > usableHeight) {
    const overflow = totalHeights - usableHeight;
    const shrinkCapacity = heights.reduce((sum, value) => sum + Math.max(0, value - minHeight), 0);

    if (shrinkCapacity > 0) {
      heights = heights.map((value) => {
        const room = Math.max(0, value - minHeight);
        const shrink = (overflow * room) / shrinkCapacity;
        return value - Math.min(room, shrink);
      });
    }
  } else if (totalHeights < usableHeight) {
    const extra = usableHeight - totalHeights;
    const growCapacity = heights.reduce((sum, value) => sum + Math.max(0, maxHeight - value), 0);

    if (growCapacity > 0) {
      heights = heights.map((value) => {
        const room = Math.max(0, maxHeight - value);
        const grow = (extra * room) / growCapacity;
        return value + Math.min(room, grow);
      });
    }
  }

  totalHeights = sumHeights();
  if (totalHeights > usableHeight) {
    const scale = usableHeight / totalHeights;
    heights = heights.map((value) => Math.max(0.42, value * scale));
    totalHeights = sumHeights();
  }

  const offsetY = Math.max(0, (usableHeight - totalHeights) / 2);
  return { heights, offsetY, gap };
};

const renderCategoryColumn = ({
  pres,
  pptxSlide,
  theme,
  category,
  x,
  y,
  w,
  h,
  index = 0,
}) => {
  const headerColor = normalizeColor(category?.color, theme.headerBg);
  const entries = normalizeCategoryEntries(category);

  addCardShape({
    pres,
    pptxSlide,
    x,
    y,
    w,
    h,
    theme,
    alternate: index % 2 === 1,
  });

  pptxSlide.addShape(pres.ShapeType.rect, {
    x,
    y,
    w,
    h: 0.34,
    fill: { color: headerColor },
    line: { color: headerColor, pt: 1 },
  });

  pptxSlide.addText(normalizeWhitespace(category?.name || `Category ${index + 1}`), {
    x: x + 0.12,
    y: y + 0.08,
    w: w - 0.24,
    h: 0.16,
    fontFace: "Calibri",
    fontSize: 11.5,
    bold: true,
    color: "FFFFFF",
    align: "center",
    fit: "shrink",
  });

  pptxSlide.addShape(pres.ShapeType.roundRect, {
    x: x + w - 0.56,
    y: y + 0.07,
    w: 0.44,
    h: 0.2,
    fill: { color: "E2E8F0", transparency: 0 },
    line: { color: "C9D5E3", pt: 0.75 },
    radius: 0.08,
  });

  pptxSlide.addText(`${entries.length}`, {
    x: x + w - 0.52,
    y: y + 0.11,
    w: 0.36,
    h: 0.12,
    fontFace: "Calibri",
    fontSize: 9,
    bold: true,
    color: headerColor,
    align: "center",
    fit: "shrink",
  });

  const itemsTop = y + 0.44;
  const itemsBottom = y + h - 0.12;
  const itemsHeight = Math.max(0.2, itemsBottom - itemsTop);

  if (!entries.length) {
    pptxSlide.addText("No initiatives listed.", {
      x: x + 0.14,
      y: itemsTop + 0.1,
      w: w - 0.28,
      h: itemsHeight - 0.2,
      fontFace: "Calibri",
      fontSize: 9,
      color: theme.muted,
      align: "center",
      valign: "middle",
      fit: "shrink",
    });
    return;
  }

  const adaptive = computeAdaptiveCardHeights({
    entries,
    availableHeight: itemsHeight,
    minHeight: 0.82,
    maxHeight: 1.42,
    gap: 0.12,
  });

  let cursorY = itemsTop + adaptive.offsetY;
  entries.forEach((entry, entryIdx) => {
    const itemH = adaptive.heights[entryIdx] || 0.88;
    const itemY = cursorY;

    pptxSlide.addShape(pres.ShapeType.roundRect, {
      x: x + 0.1,
      y: itemY,
      w: w - 0.2,
      h: itemH,
      fill: { color: entryIdx % 2 === 0 ? theme.cardBg : theme.cardAltBg, transparency: 0 },
      line: { color: theme.cardLine, pt: 0.65 },
      radius: 0.06,
    });

    pptxSlide.addShape(pres.ShapeType.roundRect, {
      x: x + 0.14,
      y: itemY + 0.085,
      w: 0.24,
      h: 0.2,
      fill: { color: theme.accent },
      line: { color: theme.accent, pt: 1 },
      radius: 0.06,
    });

    pptxSlide.addText(`${entry.index}`, {
      x: x + 0.148,
      y: itemY + 0.112,
      w: 0.23,
      h: 0.13,
      fontFace: "Calibri",
      fontSize: 9,
      bold: true,
      color: "FFFFFF",
      align: "center",
      fit: "shrink",
    });

    pptxSlide.addText(entry.title, {
      x: x + 0.42,
      y: itemY + 0.072,
      w: w - 0.54,
      h: 0.205,
      fontFace: "Calibri",
      fontSize: 11.2,
      bold: true,
      color: theme.title,
      fit: "shrink",
    });

    if (entry.body) {
      pptxSlide.addText(entry.body, {
        x: x + 0.42,
        y: itemY + 0.295,
        w: w - 0.54,
        h: Math.max(0.1, itemH - 0.36),
        fontFace: "Calibri",
        fontSize: 9.8,
        color: theme.text,
        valign: "top",
        fit: "shrink",
      });
    }

    cursorY += itemH + adaptive.gap;
  });
};

const renderAssistantCategoriesSlide = ({ pres, slide }) => {
  if (slide.layout !== "assistant-categories") return false;

  const categories = normalizeRoadmapCategories(slide.categories);
  if (!categories.length) return false;

  const pages = paginateByWeight({
    items: categories,
    maxItemsPerPage: 2,
    maxWeightPerPage: 999,
    getWeight: () => 1,
  });

  pages.forEach((pageCategories, pageIndex) => {
    const shell = addSlideShell({
      pres,
      slideData: slide,
      pageIndex,
      pageCount: pages.length,
    });

    addSectionHeading({
      pptxSlide: shell.pptxSlide,
      text: "Roadmap Milestones",
      x: shell.contentX,
      y: shell.bodyTop + 0.02,
      w: shell.contentW,
      theme: shell.theme,
    });

    const cols = pageCategories.length;
    const gapX = 0.24;
    const colW = (shell.contentW - gapX * Math.max(0, cols - 1)) / Math.max(1, cols);
    const cardTop = shell.bodyTop + 0.32;
    const cardBottom = shell.bodyBottom - 0.34;
    const cardH = cardBottom - cardTop;

    pageCategories.forEach((category, idx) => {
      const cardX = shell.contentX + idx * (colW + gapX);
      renderCategoryColumn({
        pres,
        pptxSlide: shell.pptxSlide,
        theme: shell.theme,
        category,
        x: cardX,
        y: cardTop,
        w: colW,
        h: cardH,
        index: idx,
      });
    });

    if (slide.saasOnboarding?.text) {
      shell.pptxSlide.addShape(pres.ShapeType.roundRect, {
        x: shell.contentX,
        y: shell.bodyBottom - 0.26,
        w: shell.contentW,
        h: 0.2,
        fill: { color: shell.theme.cardBg },
        line: { color: shell.theme.cardLine, pt: 1 },
        radius: 0.06,
      });

      shell.pptxSlide.addText(normalizeWhitespace(slide.saasOnboarding.text), {
        x: shell.contentX + 0.08,
        y: shell.bodyBottom - 0.22,
        w: shell.contentW - 0.16,
        h: 0.12,
        fontFace: "Calibri",
        fontSize: 9,
        bold: true,
        color: shell.theme.accent,
        align: "center",
        fit: "shrink",
      });
    }

    addAccessibilityTextLayer({ shell, slide });
  });

  return true;
};

const renderAgentDevStrategySlide = ({ pres, slide }) => {
  if (slide.layout !== "agent-dev-strategy") return false;

  const routingFactors = Array.isArray(slide.routingFactors) ? slide.routingFactors : [];
  const models = Array.isArray(slide.models) ? slide.models : [];
  const platforms = Array.isArray(slide.platforms) ? slide.platforms : [];

  const shell = addSlideShell({
    pres,
    slideData: slide,
    pageIndex: 0,
    pageCount: 1,
  });

  let y = shell.bodyTop + 0.04;

  if (slide.recharge?.title || slide.recharge?.text) {
    addCardShape({
      pres,
      pptxSlide: shell.pptxSlide,
      x: shell.contentX,
      y,
      w: shell.contentW,
      h: 0.58,
      theme: shell.theme,
    });
    shell.pptxSlide.addText(normalizeWhitespace(slide.recharge?.title || "Recharge"), {
      x: shell.contentX + 0.12,
      y: y + 0.08,
      w: shell.contentW - 0.24,
      h: 0.18,
      fontFace: "Calibri",
      fontSize: 11,
      bold: true,
      color: shell.theme.title,
      fit: "shrink",
    });
    shell.pptxSlide.addText(normalizeWhitespace(slide.recharge?.text || ""), {
      x: shell.contentX + 0.12,
      y: y + 0.28,
      w: shell.contentW - 0.24,
      h: 0.24,
      fontFace: "Calibri",
      fontSize: 9,
      color: shell.theme.text,
      fit: "shrink",
    });
    y += 0.68;
  }

  if (platforms.length || models.length) {
    const summaryText = [
      platforms.length ? `Platforms: ${platforms.map((p) => normalizeWhitespace(p)).join(", ")}` : "",
      models.length
        ? `Models: ${models.map((m) => `${normalizeWhitespace(m.name || "")} (${normalizeWhitespace(m.vendor || "")})`).join(", ")}`
        : "",
    ]
      .filter(Boolean)
      .join(" | ");

    addCardShape({
      pres,
      pptxSlide: shell.pptxSlide,
      x: shell.contentX,
      y,
      w: shell.contentW,
      h: 0.34,
      theme: shell.theme,
      alternate: true,
    });
    shell.pptxSlide.addText(summaryText, {
      x: shell.contentX + 0.1,
      y: y + 0.09,
      w: shell.contentW - 0.2,
      h: 0.18,
      fontFace: "Calibri",
      fontSize: 9,
      bold: true,
      color: shell.theme.text,
      fit: "shrink",
    });
    y += 0.44;
  }

  const compareH = 1.34;
  const compareGap = 0.22;
  const compareW = (shell.contentW - compareGap) / 2;
  const codex = slide.codex || {};
  const claude = slide.claude || {};

  [
    { data: codex, x: shell.contentX, titleColor: "0B5A47" },
    { data: claude, x: shell.contentX + compareW + compareGap, titleColor: "95452F" },
  ].forEach((column) => {
    addCardShape({
      pres,
      pptxSlide: shell.pptxSlide,
      x: column.x,
      y,
      w: compareW,
      h: compareH,
      theme: shell.theme,
    });

    shell.pptxSlide.addText(normalizeWhitespace(column.data.brand || ""), {
      x: column.x + 0.12,
      y: y + 0.08,
      w: compareW - 0.24,
      h: 0.14,
      fontFace: "Calibri",
      fontSize: 9,
      bold: true,
      color: shell.theme.muted,
      fit: "shrink",
    });

    shell.pptxSlide.addText(normalizeWhitespace(column.data.title || ""), {
      x: column.x + 0.12,
      y: y + 0.22,
      w: compareW - 0.24,
      h: 0.22,
      fontFace: "Calibri",
      fontSize: 12,
      bold: true,
      color: column.titleColor,
      fit: "shrink",
    });

    if (column.data.tag) {
      shell.pptxSlide.addText(normalizeWhitespace(column.data.tag), {
        x: column.x + 0.12,
        y: y + 0.44,
        w: compareW - 0.24,
        h: 0.12,
        fontFace: "Calibri",
        fontSize: 8,
        bold: true,
        color: shell.theme.accent,
        fit: "shrink",
      });
    }

    const strengths = Array.isArray(column.data.strengths) ? column.data.strengths : [];
    shell.pptxSlide.addText(strengths.map((value) => `• ${normalizeWhitespace(value)}`).join("\n"), {
      x: column.x + 0.12,
      y: y + 0.6,
      w: compareW - 0.24,
      h: 0.66,
      fontFace: "Calibri",
      fontSize: 8.5,
      color: shell.theme.text,
      valign: "top",
      fit: "shrink",
    });
  });
  y += compareH + 0.16;

  if (routingFactors.length) {
    addCardShape({
      pres,
      pptxSlide: shell.pptxSlide,
      x: shell.contentX,
      y,
      w: shell.contentW,
      h: shell.bodyBottom - y,
      theme: shell.theme,
      alternate: true,
    });

    const routingLines = routingFactors.flatMap((factor) => [
      `${normalizeWhitespace(factor.factor || "")}`,
      `  CODEX: ${normalizeWhitespace(factor.codex || "")}`,
      `  Claude: ${normalizeWhitespace(factor.claude || "")}`,
    ]);

    shell.pptxSlide.addText(routingLines.join("\n"), {
      x: shell.contentX + 0.12,
      y: y + 0.08,
      w: shell.contentW - 0.24,
      h: shell.bodyBottom - y - 0.16,
      fontFace: "Calibri",
      fontSize: 8.5,
      color: shell.theme.text,
      valign: "top",
      fit: "shrink",
    });
  }

  return true;
};

const estimateLineUnits = (text) => {
  return Math.max(1, Math.ceil(normalizeWhitespace(text).length / MAX_CHARS_PER_LINE));
};

const paginateSections = (sections, maxUnits) => {
  const pages = [];
  let currentPage = [];
  let currentUnits = 0;

  const commitPage = () => {
    if (!currentPage.length) return;
    pages.push(currentPage);
    currentPage = [];
    currentUnits = 0;
  };

  for (const section of sections) {
    const heading = section.heading;

    const ensureHeading = (isContinuation) => {
      if (currentUnits + 1 > maxUnits) {
        commitPage();
      }
      currentPage.push({
        kind: "heading",
        text: isContinuation ? `${heading} (cont.)` : heading,
        units: 1,
      });
      currentUnits += 1;
    };

    ensureHeading(false);

    for (const line of section.lines) {
      const units = estimateLineUnits(line);

      if (currentUnits + units > maxUnits) {
        commitPage();
        ensureHeading(true);
      }

      currentPage.push({ kind: "bullet", text: line, units });
      currentUnits += units;
    }
  }

  commitPage();

  if (pages.length) return pages;
  return [[{ kind: "bullet", text: "No additional text on this slide.", units: 1 }]];
};

const buildSections = (slide) => {
  const sections = [];

  for (const [key, value] of Object.entries(slide)) {
    if (NON_CONTENT_KEYS.has(key) || value == null) continue;
    if (Array.isArray(value) && value.length === 0) continue;

    const lines = dedupeLines(extractLinesFromValue(value));
    if (!lines.length) continue;

    sections.push({
      heading: humanizeKey(key),
      lines,
    });
  }

  if (slide.type === "video") {
    const videoTitle = slide.managerLabel || slide.title || `Video Slide ${slide.id}`;
    sections.unshift({
      heading: "Video",
      lines: [`Playback for "${videoTitle}" is available in the web presentation.`],
    });
  }

  if (!sections.length) {
    sections.push({
      heading: "Content",
      lines: ["No additional text on this slide."],
    });
  }

  return sections;
};

const renderFallbackSlide = ({ pres, slide }) => {
  const sections = buildSections(slide);
  const hasSubtitle = typeof slide.subtitle === "string" && slide.subtitle.trim() !== "";
  const bodyTop = hasSubtitle ? 1.38 : 1.02;
  const bodyHeight = SLIDE_HEIGHT - bodyTop - 0.55;
  const maxUnits = Math.max(12, Math.floor(bodyHeight / BODY_LINE_HEIGHT) - 2);
  const pages = paginateSections(sections, maxUnits);

  pages.forEach((pageItems, pageIndex) => {
    const shell = addSlideShell({
      pres,
      slideData: slide,
      pageIndex,
      pageCount: pages.length,
    });

    let y = shell.bodyTop;

    for (const item of pageItems) {
      if (item.kind === "heading") {
        shell.pptxSlide.addText(item.text, {
          x: shell.contentX,
          y,
          w: shell.contentW,
          h: 0.24,
          fontFace: "Calibri",
          fontSize: 14,
          bold: true,
          color: shell.theme.title,
          valign: "top",
        });
        y += 0.28;
        continue;
      }

      const lineHeight = Math.max(BODY_LINE_HEIGHT, item.units * BODY_LINE_HEIGHT);
      shell.pptxSlide.addText(`\u2022 ${item.text}`, {
        x: shell.contentX + 0.2,
        y,
        w: shell.contentW - 0.2,
        h: lineHeight,
        fontFace: "Calibri",
        fontSize: 12,
        color: shell.theme.text,
        valign: "top",
        fit: "shrink",
      });
      y += lineHeight + 0.04;
    }
  });
};

const TEMPLATE_RENDERER_FAMILIES = {
  [TEMPLATE_KIND.TITLE_BODY]: [
    renderTitleHeroSlide,
    renderVideoPosterSlide,
    renderApiGatewaySnapshotSlide,
    renderHostingPipelineSnapshotSlide,
  ],
  [TEMPLATE_KIND.TWO_COLUMN]: [
    renderFeatureGridSlide,
    renderSolutionShowcaseSlide,
    renderContractReviewChallengeSlide,
    renderCaseStudyHeroSlide,
    renderPlatformSimpleSlide,
  ],
  [TEMPLATE_KIND.DATA_INSIGHT]: [
    renderCampusMetricsSlide,
    renderAnalyticsChartSlide,
    renderTimelineEvolutionSlide,
    renderCompoundArchitectureSlide,
    renderAgentWorkflowSlide,
  ],
  [TEMPLATE_KIND.COMPARISON]: [
    renderComparisonTableSlide,
    renderTeamGridSlide,
    renderAgentDevStrategySlide,
  ],
  [TEMPLATE_KIND.ROADMAP]: [
    renderAssistantCategoriesSlide,
  ],
};

const tryRenderTemplateFamily = ({ templateKind, pres, slide, options }) => {
  const renderers = TEMPLATE_RENDERER_FAMILIES[templateKind] || [];
  for (const render of renderers) {
    if (render({ pres, slide, options })) {
      return true;
    }
  }
  return false;
};

const tryRenderLayoutSlide = ({ pres, slide, options }) => {
  const primaryTemplate = resolveTemplateKind(slide);
  if (tryRenderTemplateFamily({ templateKind: primaryTemplate, pres, slide, options })) {
    return true;
  }

  const fallbackTemplates = [
    TEMPLATE_KIND.TITLE_BODY,
    TEMPLATE_KIND.TWO_COLUMN,
    TEMPLATE_KIND.DATA_INSIGHT,
    TEMPLATE_KIND.COMPARISON,
    TEMPLATE_KIND.ROADMAP,
  ];

  for (const templateKind of fallbackTemplates) {
    if (templateKind === primaryTemplate) continue;
    if (tryRenderTemplateFamily({ templateKind, pres, slide, options })) {
      return true;
    }
  }

  return false;
};

// Utility to create a PPTX file from JSON slide data
export const generatePPTX = async (slidesData, options = {}) => {
  const exportProfile = resolveExportProfile(options);
  const qa = createQualityReportState(exportProfile);
  setExportContext({ profile: exportProfile, session: qa });

  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.theme = {
    headFontFace: "Calibri",
    bodyFontFace: "Calibri",
  };
  pres.company = "UC San Diego";
  pres.author = "UC San Diego IT Services";
  pres.subject = "TritonGPT Presentation Export";
  pres.title = "TritonGPT Presentation";
  try {
    installSlideInstrumentation(pres, qa);
    registerSlideMasters(pres);

    for (const slide of slidesData) {
      if (!tryRenderLayoutSlide({ pres, slide, options })) {
        renderFallbackSlide({ pres, slide });
      }
    }

    await pres.writeFile({ fileName: buildExportFileName() });
    const qualityReport = finalizeQualityReport(qa);
    emitQualityReport(qualityReport);
    if (typeof options.onQualityReport === "function") {
      options.onQualityReport(qualityReport);
    }
    return qualityReport;
  } finally {
    clearExportContext();
  }
};
