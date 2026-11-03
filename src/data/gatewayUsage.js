// Public Gateway aggregates from https://tritonai.ucsd.edu/developer-apis/index.html#gateway-usage.
// January–October 2026; source reviewed November 3, 2026 (October from Dominic Feliton's November 2 export).
// Keep exact counts for geometry; round only presentation labels.
const monthly = [
  {
    "month": "2026-01",
    "label": "January",
    "selfHostedTokens": 43823578111,
    "cloudTokens": 461275717
  },
  {
    "month": "2026-02",
    "label": "February",
    "selfHostedTokens": 48256624512,
    "cloudTokens": 707140348
  },
  {
    "month": "2026-03",
    "label": "March",
    "selfHostedTokens": 43712369023,
    "cloudTokens": 1047427888
  },
  {
    "month": "2026-04",
    "label": "April",
    "selfHostedTokens": 48662696509,
    "cloudTokens": 1402041712
  },
  {
    "month": "2026-05",
    "label": "May",
    "selfHostedTokens": 42809512637,
    "cloudTokens": 5283859803
  },
  {
    "month": "2026-06",
    "label": "June",
    "selfHostedTokens": 68314520505,
    "cloudTokens": 4877858185
  },
  {
    "month": "2026-07",
    "label": "July",
    "selfHostedTokens": 61460517438,
    "cloudTokens": 5614002890
  },
  {
    "month": "2026-08",
    "label": "August",
    "selfHostedTokens": 64536316586,
    "cloudTokens": 14325943611
  },
  {
    "month": "2026-09",
    "label": "September",
    "selfHostedTokens": 55691559415,
    "cloudTokens": 16040063953
  },
  {
    "month": "2026-10",
    "label": "October",
    "selfHostedTokens": 58970967701,
    "cloudTokens": 12327787313
  }
];

const billions = (tokens) => (tokens / 1e9).toFixed(1);

export const gatewayUsageDashboard = {
  type: 'content',
  layout: 'data-dashboard',
  compact: true,
  title: 'TritonAI LLM Gateway Usage',
  subtitle: 'Aggregate API activity across UC San Diego, January 1–October 31, 2026. No user-level records.',
  backgroundColor: '#F5F0E6',
  dashboardSections: [
    {
      type: 'metric-grid',
      variant: 'strip',
      items: [
        { value: '598.3B', label: 'Tokens processed', icon: 'Database', color: '#00629B' },
        { value: '166.8M', label: 'API request records', icon: 'BarChart3', color: '#00C6D7' },
        { value: '89.6%', label: 'Tokens on self-hosted and internal routes', icon: 'Server', color: '#6E963B' },
        { value: '71.3B', label: 'Tokens in October', icon: 'TrendingUp', color: '#FC8900' }
      ]
    },
    {
      type: 'stacked-columns',
      sectionTitle: 'Monthly token volume · billions, 2026',
      series: [
        { key: 'selfHosted', label: 'Self-hosted and internal', color: '#00629B' },
        { key: 'cloud', label: 'Cloud', color: '#FFCD00' }
      ],
      items: monthly.map((row) => ({
        label: `${row.label.slice(0, 3)} 2026`,
        selfHosted: row.selfHostedTokens / 1e9,
        cloud: row.cloudTokens / 1e9,
        displayValue: `${billions(row.selfHostedTokens + row.cloudTokens)}B`,
        annotation: `${billions(row.selfHostedTokens)}B / ${billions(row.cloudTokens)}B cloud`,
        highlight: row.month === '2026-10'
      })),
      caption: 'October was about level with September (down 0.6%), with more on self-hosted routes. August remains the highest-volume month.'
    },
    {
      type: 'stat-callouts',
      compact: true,
      items: [
        {
          icon: 'Server',
          stat: 'October route mix',
          detail: '59.0B tokens on self-hosted and internal routes (up 5.9%); 12.3B on cloud routes (down 23.1%).',
          color: '#00629B'
        },
        {
          icon: 'CheckCircle',
          stat: 'How to read these numbers',
          detail: 'Gateway-recorded input plus output tokens. Request records include successful and failed calls.',
          color: '#6E963B'
        }
      ]
    }
  ],
  sourceUrl: 'https://tritonai.ucsd.edu/developer-apis/index.html#gateway-usage',
  claimNote: 'Source: TritonAI Gateway usage · Jan–Oct 2026 · source reviewed Nov 3, 2026',
  speakerNotes: 'Gateway usage measures shared model access, not TritonGPT chat sessions or Harness adoption. January–October reconciles to 598,326,063,857 input and output tokens and 166,831,485 request records. October totals 71,298,755,014 tokens: 58,970,967,701 self-hosted/internal and 12,327,787,313 cloud. October has 9,801,361 request records across all 31 days. The 89.6% year-to-date share is the non-cloud remainder, including internal routes; do not describe all of it as on-premises GPU inference. Volume alone does not establish the cause of the monthly change. Cache-read and cache-creation fields are not added separately; earlier exports lack those fields, so an upstream definition change cannot be entirely ruled out. Labels are rounded; chart heights use exact public aggregates. Source: https://tritonai.ucsd.edu/developer-apis/index.html#gateway-usage, reviewed November 3, 2026.'
};

export const gatewayMonthly = monthly;
