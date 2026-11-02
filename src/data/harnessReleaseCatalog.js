// Release snapshots plus the product-owner availability correction noted below.
export const harnessReleaseCatalog = {
  "stableVersion": "0.4.1",
  "nightlyVersion": "0.4.2-nightly.20261030.115",
  "nightlyDate": "Oct 30",
  "checkedDate": "Nov 2, 2026",
  "sources": {
    "stable": "https://github.com/dbalders/TritonAI-Harness/releases/tag/v0.4.1",
    "nightly": "https://github.com/dbalders/TritonAI-Harness/releases/tag/v0.4.2-nightly.20261030.115",
    "commons": "https://github.com/dbalders/UCSD-Skills-Library/tree/f5ab0b625ed2959d569b4a05c1948e6d450d26f9"
  },
  "plugins": [
    {
      "id": "github",
      "name": "GitHub",
      "description": "Repositories, issues, pull requests, and build checks.",
      "availability": "both",
      "skillCount": 5,
      "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.2-nightly.20261030.115/config/managed-plugin-catalog.nightly.json"
    },
    {
      "id": "google-workspace",
      "name": "Google Workspace",
      "description": "Gmail, Calendar, Drive, Docs, Sheets, and Slides.",
      "availability": "both",
      "skillCount": 3,
      "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.2-nightly.20261030.115/config/managed-plugin-catalog.nightly.json"
    },
    {
      "id": "jira-data-center",
      "name": "Jira",
      "description": "Read issues and prepare reviewed changes.",
      "availability": "both",
      "skillCount": 2,
      "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.2-nightly.20261030.115/config/managed-plugin-catalog.nightly.json"
    },
    {
      "id": "kuali-build",
      "name": "Kuali Build",
      "description": "Work with documents and supported form workflows.",
      "availability": "both",
      "skillCount": 1,
      "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.2-nightly.20261030.115/config/managed-plugin-catalog.nightly.json"
    },
    {
      "id": "lucid",
      "name": "Lucid",
      "description": "Lucidchart and Lucidspark diagrams.",
      "availability": "both",
      "skillCount": 1,
      "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.2-nightly.20261030.115/config/managed-plugin-catalog.nightly.json"
    },
    {
      "id": "microsoft-365",
      "name": "Microsoft 365",
      "description": "Outlook, OneDrive, and Teams.",
      "availability": "both",
      "skillCount": 4,
      "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.2-nightly.20261030.115/config/managed-plugin-catalog.nightly.json"
    },
    {
      "id": "n8n",
      "name": "n8n",
      "description": "Build, inspect, and manage workflows.",
      "availability": "both",
      "skillCount": 1,
      "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.2-nightly.20261030.115/config/managed-plugin-catalog.nightly.json"
    },
    {
      "id": "tableau",
      "name": "Tableau",
      "description": "Read reports and prepare reviewed changes.",
      "availability": "nightly",
      "skillCount": 1,
      "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.2-nightly.20261030.115/config/managed-plugin-catalog.nightly.json"
    },
    {
      "id": "ucsd-assistant",
      "name": "UCSD Assistant",
      "description": "Public campus search and service information.",
      "availability": "both",
      "availabilityNote": "Available in Stable and Nightly. Product-owner correction, Nov 2, 2026: the prior Nightly omission was a release mistake and is being corrected.",
      "skillCount": 2,
      "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/config/managed-plugin-catalog.json"
    }
  ],
  "skills": [
    {
      "name": "Skills included with plugins",
      "note": "Available when the matching plugin is installed.",
      "items": [
        {
          "id": "github-actions",
          "name": "GitHub build checks",
          "description": "Inspect GitHub Actions runs, jobs, checks, and commit status through TritonAI provider tools for bounded CI triage.",
          "plugin": "github",
          "availability": "both",
          "source": "https://github.com/dbalders/TritonAI-Plugins/blob/f124aeef89c6ec85b972dc8ea3935f23ed0deb99/plugins/github/skills/github-actions/SKILL.md"
        },
        {
          "id": "github-contributions",
          "name": "GitHub contributions",
          "description": "Fork repositories, create branches, commit bounded file changes, and open pull requests through TritonAI provider tools for ordinary contribution flows.",
          "plugin": "github",
          "availability": "both",
          "source": "https://github.com/dbalders/TritonAI-Plugins/blob/f124aeef89c6ec85b972dc8ea3935f23ed0deb99/plugins/github/skills/github-contributions/SKILL.md"
        },
        {
          "id": "github-issues",
          "name": "GitHub issues",
          "description": "Read, triage, create, update, or comment on GitHub issues through TritonAI provider tools. Use read tools first and require enabled issue-write access for mutations.",
          "plugin": "github",
          "availability": "both",
          "source": "https://github.com/dbalders/TritonAI-Plugins/blob/f124aeef89c6ec85b972dc8ea3935f23ed0deb99/plugins/github/skills/github-issues/SKILL.md"
        },
        {
          "id": "github-pull-requests",
          "name": "GitHub pull requests",
          "description": "Read, prepare branches and commits for, create, comment on, or review GitHub pull requests through TritonAI provider tools. Never assume gh CLI authentication or merge access.",
          "plugin": "github",
          "availability": "both",
          "source": "https://github.com/dbalders/TritonAI-Plugins/blob/f124aeef89c6ec85b972dc8ea3935f23ed0deb99/plugins/github/skills/github-pull-requests/SKILL.md"
        },
        {
          "id": "github-repositories",
          "name": "GitHub repositories",
          "description": "Find, read, fork, branch, and commit bounded GitHub repository content through TritonAI provider tools. Use for repository inspection and ordinary contribution setup.",
          "plugin": "github",
          "availability": "both",
          "source": "https://github.com/dbalders/TritonAI-Plugins/blob/f124aeef89c6ec85b972dc8ea3935f23ed0deb99/plugins/github/skills/github-repositories/SKILL.md"
        },
        {
          "id": "gmail",
          "name": "Gmail",
          "description": "Search or read UC San Diego Gmail, or create an unsent plain-text draft through TritonAI Harness. Use when the user asks to inspect mail or prepare a draft without sending it.",
          "plugin": "google-workspace",
          "availability": "both",
          "source": "https://github.com/dbalders/TritonAI-Plugins/blob/f124aeef89c6ec85b972dc8ea3935f23ed0deb99/plugins/google-workspace/skills/gmail/SKILL.md"
        },
        {
          "id": "google-calendar",
          "name": "Google Calendar",
          "description": "Read, create, or narrowly edit UC San Diego Google Calendar events through TritonAI Harness. Use when the user asks about their schedule or requests an event change.",
          "plugin": "google-workspace",
          "availability": "both",
          "source": "https://github.com/dbalders/TritonAI-Plugins/blob/f124aeef89c6ec85b972dc8ea3935f23ed0deb99/plugins/google-workspace/skills/google-calendar/SKILL.md"
        },
        {
          "id": "google-drive",
          "name": "Google Drive, Docs, Sheets, Slides",
          "description": "Search, read, create, edit, organize, delete, or share UC San Diego Google Drive, Docs, Sheets, or Slides through TritonAI Harness. Use when the user asks to find, inspect, change, move, remove, or share Workspace files.",
          "plugin": "google-workspace",
          "availability": "both",
          "source": "https://github.com/dbalders/TritonAI-Plugins/blob/f124aeef89c6ec85b972dc8ea3935f23ed0deb99/plugins/google-workspace/skills/google-drive/SKILL.md"
        },
        {
          "id": "ucsd-jira-changes",
          "name": "Jira changes",
          "description": "Make previewed, approved changes to UC San Diego Jira issues.",
          "plugin": "jira-data-center",
          "availability": "both",
          "source": "https://github.com/dbalders/TritonAI-Plugins/blob/f124aeef89c6ec85b972dc8ea3935f23ed0deb99/plugins/jira-data-center/skills/ucsd-jira-changes/SKILL.md"
        },
        {
          "id": "ucsd-jira",
          "name": "Jira search and reading",
          "description": "Read UC San Diego Jira projects, issues, comments, worklogs, and fields.",
          "plugin": "jira-data-center",
          "availability": "both",
          "source": "https://github.com/dbalders/TritonAI-Plugins/blob/f124aeef89c6ec85b972dc8ea3935f23ed0deb99/plugins/jira-data-center/skills/ucsd-jira/SKILL.md"
        },
        {
          "id": "ucsd-kuali-build",
          "name": "Kuali Build",
          "description": "Read and safely perform the verified document update, draft initialization, draft resolution, and draft submission operations in UC San Diego Kuali Build.",
          "plugin": "kuali-build",
          "availability": "both",
          "source": "https://github.com/dbalders/TritonAI-Plugins/blob/f124aeef89c6ec85b972dc8ea3935f23ed0deb99/plugins/kuali-build/skills/ucsd-kuali-build/SKILL.md"
        },
        {
          "id": "lucid-diagrams",
          "name": "Lucid diagrams",
          "description": "Find, read, create, edit, comment on, organize, or share Lucidchart and Lucidspark documents through TritonAI Harness using the connected user's Lucid access.",
          "plugin": "lucid",
          "availability": "both",
          "source": "https://github.com/dbalders/TritonAI-Plugins/blob/f124aeef89c6ec85b972dc8ea3935f23ed0deb99/plugins/lucid/skills/lucid-diagrams/SKILL.md"
        },
        {
          "id": "onedrive-files",
          "name": "OneDrive files",
          "description": "Browse, search, read, create, or edit files in the user's OneDrive through TritonAI Harness. Use when the user asks to find, open, upload, update, or rename OneDrive files or folders.",
          "plugin": "microsoft-365",
          "availability": "both",
          "source": "https://github.com/dbalders/TritonAI-Plugins/blob/f124aeef89c6ec85b972dc8ea3935f23ed0deb99/plugins/microsoft-365/skills/onedrive-files/SKILL.md"
        },
        {
          "id": "outlook-calendar",
          "name": "Outlook Calendar",
          "description": "Read, create, or edit Outlook calendar events through TritonAI Harness. Use when the user asks about their Outlook schedule or requests a new or changed calendar event.",
          "plugin": "microsoft-365",
          "availability": "both",
          "source": "https://github.com/dbalders/TritonAI-Plugins/blob/f124aeef89c6ec85b972dc8ea3935f23ed0deb99/plugins/microsoft-365/skills/outlook-calendar/SKILL.md"
        },
        {
          "id": "outlook-mail",
          "name": "Outlook Mail",
          "description": "Search or organize Outlook mail, or create an unsent draft or in-thread reply draft through TritonAI Harness. Use when the user asks to review, search, triage, move, archive, or organize Outlook mail, or to prepare an email or reply draft without sending it.",
          "plugin": "microsoft-365",
          "availability": "both",
          "source": "https://github.com/dbalders/TritonAI-Plugins/blob/f124aeef89c6ec85b972dc8ea3935f23ed0deb99/plugins/microsoft-365/skills/outlook-mail/SKILL.md"
        },
        {
          "id": "teams-chat",
          "name": "Teams chat",
          "description": "Read Microsoft Teams chats or send a message to an existing chat through TritonAI Harness. Use when the user asks to review Teams chats, read chat history, or send a chat reply.",
          "plugin": "microsoft-365",
          "availability": "both",
          "source": "https://github.com/dbalders/TritonAI-Plugins/blob/f124aeef89c6ec85b972dc8ea3935f23ed0deb99/plugins/microsoft-365/skills/teams-chat/SKILL.md"
        },
        {
          "id": "n8n-workflows",
          "name": "n8n workflows",
          "description": "Find, inspect, build, test, execute, publish, archive, or manage n8n workflows, folders, Data Tables, and Agents through TritonAI Harness using the connected user's n8n access.",
          "plugin": "n8n",
          "availability": "both",
          "source": "https://github.com/dbalders/TritonAI-Plugins/blob/f124aeef89c6ec85b972dc8ea3935f23ed0deb99/plugins/n8n/skills/n8n-workflows/SKILL.md"
        },
        {
          "id": "tableau-reports",
          "name": "Tableau reports",
          "description": "Read UCSD Tableau reports and prepare reviewed content, publishing, refresh, and supported data changes.",
          "plugin": "tableau",
          "availability": "nightly",
          "source": "https://github.com/dbalders/TritonAI-Plugins/blob/f124aeef89c6ec85b972dc8ea3935f23ed0deb99/plugins/tableau/skills/tableau-reports/SKILL.md"
        },
        {
          "id": "ucsd-campus-search",
          "name": "Campus search",
          "description": "Search public UC San Diego campus information.",
          "plugin": "ucsd-assistant",
          "availability": "both",
          "source": "https://github.com/dbalders/TritonAI-Plugins/blob/218f61639ca6de8ecac6ecddd35884a25afaa8ed/plugins/ucsd-assistant/skills/ucsd-campus-search/SKILL.md"
        },
        {
          "id": "ucsd-campus-services",
          "name": "Campus services",
          "description": "Find public campus service information.",
          "plugin": "ucsd-assistant",
          "availability": "both",
          "source": "https://github.com/dbalders/TritonAI-Plugins/blob/218f61639ca6de8ecac6ecddd35884a25afaa8ed/plugins/ucsd-assistant/skills/ucsd-campus-services/SKILL.md"
        }
      ]
    },
    {
      "name": "Campus-provided skills",
      "note": "Provided through campus skill management; availability depends on your setup.",
      "items": [
        {
          "id": "hosting-readiness",
          "name": "Hosting readiness",
          "description": "Check deployment packaging and prepare the handoff for platform-team review and hosting.",
          "availability": "campus",
          "source": "TritonAI Harness Skills → AI Team: enabled, managed hosting preparation skill; checked Nov 1, 2026."
        }
      ]
    },
    {
      "name": "TritonAI Commons skills",
      "note": "Optional public library; updates separately from the app.",
      "items": [
        {
          "id": "jira-sprint-review",
          "name": "Jira sprint review",
          "description": "Review an ending Jira sprint and recommend close, update, or move decisions for every unresolved issue. Use when a sprint has ended, a new sprint is about to start, or the user asks for a sprint transition review.",
          "availability": "both",
          "source": "https://github.com/dbalders/UCSD-Skills-Library/blob/f5ab0b625ed2959d569b4a05c1948e6d450d26f9/community/jira-sprint-review/SKILL.md",
          "community": true
        },
        {
          "id": "jira-worklogs",
          "name": "Jira worklogs",
          "description": "Turn Outlook meetings and Teams chat history into reviewed Jira worklogs and reconcile the day toward a full workload. Use when the user asks to log time to Jira, port calendar meetings into worklogs, fill remaining daily hours, check logged Jira totals, or turn chat history into time entries.",
          "availability": "both",
          "source": "https://github.com/dbalders/UCSD-Skills-Library/blob/f5ab0b625ed2959d569b4a05c1948e6d450d26f9/community/jira-worklogs/SKILL.md",
          "community": true
        },
        {
          "id": "tritonai-autoreview",
          "name": "Code review",
          "description": "Use for TritonAI Harness or UCSD AI Tools code-review closeout before commit, pull request update, merge, release, or ship. Trigger when the user says use tritonai-autoreview, run TritonAI autoreview, autoreview this, auto review, Codex review, second-model review, review this branch, review this PR, review this commit, before merge, before ship, closeout review, run tests plus review, or fix accepted review findings.",
          "availability": "both",
          "source": "https://github.com/dbalders/UCSD-Skills-Library/blob/f5ab0b625ed2959d569b4a05c1948e6d450d26f9/tritonai/tritonai-autoreview/SKILL.md",
          "community": false
        },
        {
          "id": "tritonai-feedback",
          "name": "Feedback and bug reports",
          "description": "Gather diagnostics for TritonAI feedback, bug reports, support requests, improvement ideas, or agent-experience notes, then prepare a GitHub issue for users with a GitHub account or an email for users without one. Trigger on /tritonai, /feedback, /feed-back, /feed back, TritonAI feedback, email TritonAI, report this to TritonAI, or send this to tritonai@ucsd.edu.",
          "availability": "both",
          "source": "https://github.com/dbalders/UCSD-Skills-Library/blob/f5ab0b625ed2959d569b4a05c1948e6d450d26f9/tritonai/tritonai-feedback/SKILL.md",
          "community": false
        },
        {
          "id": "tritonai-harness-config",
          "name": "Harness configuration",
          "description": "Investigate and explain the live TritonAI Harness environment using sanitized runtime and source evidence. Use for Harness config files, CODEX_HOME or TRITONAI_HOME, permissions or sandbox modes, models and providers, skills, logs, installation paths, or comparisons with personal Codex or Codex Desktop. Also use for explicit T3 Code or t3code configuration/runtime questions, Harness-versus-T3 Code comparisons, or questions about a t3code identifier in a Harness diagnostic; not unrelated source-code mentions.",
          "availability": "both",
          "source": "https://github.com/dbalders/UCSD-Skills-Library/blob/f5ab0b625ed2959d569b4a05c1948e6d450d26f9/tritonai/tritonai-harness-config/SKILL.md",
          "community": false
        },
        {
          "id": "ucsd-accessibility-compliance",
          "name": "Digital accessibility",
          "description": "Use for UC San Diego digital accessibility work across websites, web apps, Campus CMS or Simple Sites pages, LMS content, forms, documents, PDFs, presentations, email campaigns, social posts, images, graphics, audio, and video. Helps implement, audit, or remediate content against official UCSD accessibility guidance, UCSD Digital Accessibility Standards, WCAG 2.1 AA expectations, ADA Title II and UC policy context, keyboard and screen-reader usability, semantic HTML, forms, contrast, alt text, captions, transcripts, accessible documents, and practical manual review steps. Trigger on /ucsd-accessibility, accessibility review, a11y, WCAG, ADA Title II, Siteimprove, screen reader, keyboard access, alt text, captions, transcripts, PDF remediation, or \"is this accessible at UCSD\".",
          "availability": "both",
          "source": "https://github.com/dbalders/UCSD-Skills-Library/blob/f5ab0b625ed2959d569b4a05c1948e6d450d26f9/tritonai/ucsd-accessibility-compliance/SKILL.md",
          "community": false
        },
        {
          "id": "ucsd-cms",
          "name": "Cascade CMS authoring",
          "description": "Use when authoring, editing, publishing, or reviewing content on a UC San Diego website running on Hannon Hill Cascade CMS (Blink, department sites, *.ucsd.edu sites managed in the campus CMS) \u2014 to follow the correct workflow, pick the right template/module, write valid metadata, meet accessibility and SEO requirements, and publish safely. Trigger when the user mentions Cascade, Blink, \"the CMS\", a `.ucsd.edu` page, templates, modules, drawers, tabs, metadata, display names, system names, SiteImprove, publish/unpublish, or asks \"how do I add/edit/publish a page\", \"what template should I use\", \"why is my page not showing\", \"how do I get CMS access\". Also /ucsd-cms.",
          "availability": "both",
          "source": "https://github.com/dbalders/UCSD-Skills-Library/blob/f5ab0b625ed2959d569b4a05c1948e6d450d26f9/tritonai/ucsd-cms/SKILL.md",
          "community": false
        },
        {
          "id": "ucsd-data-classification",
          "name": "Data classification",
          "description": "Use when building or reviewing a UC San Diego application, automation, script, database, API, or data pipeline that stores, transmits, logs, or displays data \u2014 to classify that data under UC's IS-3 Protection Levels (P1\u2013P4) and apply the handling controls each level requires. Trigger when defining data models or database schemas, choosing where to store data, writing logging, building forms or endpoints that collect personal/financial/health/student data, or whenever fields like SSN, credit card, PHI, FERPA student records, passwords, API keys, or other PII appear. Also /ucsd-data-classification, \"classify this data\", \"what protection level\", \"can I store this\", \"is this allowed at UCSD\".",
          "availability": "both",
          "source": "https://github.com/dbalders/UCSD-Skills-Library/blob/f5ab0b625ed2959d569b4a05c1948e6d450d26f9/tritonai/ucsd-data-classification/SKILL.md",
          "community": false
        },
        {
          "id": "ucsd-decorator",
          "name": "UC San Diego website templates",
          "description": "Build and edit UC San Diego web pages on the Decorator 5 design system without damaging the page chrome. Use when working on any ucsd.edu site, campus page shell, Decorator template, or kitchen-sink component \u2014 and specifically when a task touches the header, navbar, mobile offcanvas drawer, search forms, footer, or an embedded UCSD widget. Also use when a developer asks to get started or start a new Decorator project (\"help me get started\", \"where do I begin\") \u2014 run the kickoff interview before building. Enforces one writable canvas, a pinned source of truth for markup, and a CI-checkable chrome contract.",
          "availability": "both",
          "source": "https://github.com/dbalders/UCSD-Skills-Library/blob/f5ab0b625ed2959d569b4a05c1948e6d450d26f9/tritonai/ucsd-decorator/SKILL.md",
          "community": false
        },
        {
          "id": "ucsd-memory",
          "name": "Use and manage memory",
          "description": "Use and maintain an existing local TritonAI memory vault. Trigger on $memory, remember this, forget this, search memory, what do we know about, summarize this into memory, memory status, or requests to add, update, remove, query, or cite Obsidian-style TritonAI memory notes.",
          "availability": "both",
          "source": "https://github.com/dbalders/UCSD-Skills-Library/blob/f5ab0b625ed2959d569b4a05c1948e6d450d26f9/tritonai/ucsd-memory/SKILL.md",
          "community": false
        },
        {
          "id": "ucsd-memory-create",
          "name": "Set up personal memory",
          "description": "Create and maintain a local TritonAI memory vault. Use when a user asks for $memory-create, memory setup, an Obsidian-style memory graph, daily conversation sync, weekly memory cleanup, or cross-platform background memory jobs for TritonAI Harness.",
          "availability": "both",
          "source": "https://github.com/dbalders/UCSD-Skills-Library/blob/f5ab0b625ed2959d569b4a05c1948e6d450d26f9/tritonai/ucsd-memory-create/SKILL.md",
          "community": false
        }
      ]
    }
  ],
  "features": [
    {
      "name": "Work with AI",
      "items": [
        {
          "id": "models",
          "name": "UC-hosted and cloud models",
          "availability": "both",
          "description": "Choose an approved model and its reasoning options.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/providers-codex.md"
        },
        {
          "id": "engines",
          "name": "Other agent engines",
          "availability": "both",
          "description": "Optional Claude, OpenCode, Muse, Pi, Antigravity, and ACP engines require their own setup.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/providers-acp.md"
        },
        {
          "id": "modes",
          "name": "Choose when it asks permission",
          "availability": "both",
          "description": "Supervised, Auto, and Full access modes; behavior depends on the engine.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/permission-modes.md"
        },
        {
          "id": "plan",
          "name": "Plans and follow-up questions",
          "availability": "both",
          "description": "Plan a task and answer questions as work proceeds.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/composer.md"
        },
        {
          "id": "goals",
          "name": "Keep working toward a goal",
          "availability": "both",
          "description": "Set a goal and manage its progress.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/providers-codex.md"
        },
        {
          "id": "agents",
          "name": "Parallel helper agents",
          "availability": "both",
          "description": "Delegate parts of a task and follow the helper agents.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/providers-codex.md"
        },
        {
          "id": "queue",
          "name": "Queue or steer follow-ups",
          "availability": "both",
          "description": "Queue a message or steer the active task.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/composer.md"
        },
        {
          "id": "voice",
          "name": "Voice dictation",
          "availability": "both",
          "description": "Turn speech into an editable message; phone support depends on the device.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/composer.md"
        }
      ]
    },
    {
      "name": "Files, browsers, and apps",
      "items": [
        {
          "id": "attachments",
          "name": "Attach files, images, and video",
          "availability": "both",
          "description": "Bring task materials into a conversation.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/file-attachments.md"
        },
        {
          "id": "previews",
          "name": "Read and preview documents",
          "availability": "both",
          "description": "Inspect files, HTML, and PDFs in the workspace.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/composer.md"
        },
        {
          "id": "visuals",
          "name": "Interactive charts and pages",
          "availability": "both",
          "description": "Create visual replies in a conversation.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/html-renders.md"
        },
        {
          "id": "browser",
          "name": "Browser and saved sign-ins",
          "availability": "both",
          "description": "Use the built-in browser and import supported browser sessions.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/browser-import.md"
        },
        {
          "id": "computer",
          "name": "Computer use",
          "availability": "both",
          "description": "Let the agent operate desktop apps after enabling access.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/computer-use.md"
        },
        {
          "id": "capture",
          "name": "Screenshot capture",
          "availability": "both",
          "description": "Capture a screen region and supported app text.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/snap-shot.md"
        },
        {
          "id": "mcp-apps",
          "name": "Interactive tool apps",
          "availability": "both",
          "description": "Open supported MCP apps inside a conversation.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/html-renders.md"
        }
      ]
    },
    {
      "name": "Projects and context",
      "items": [
        {
          "id": "projects",
          "name": "Projects and project overviews",
          "availability": "both",
          "description": "Organize tasks and see updates, work in progress, and next steps.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/thread-sidebar.md"
        },
        {
          "id": "briefs",
          "name": "Project briefs and next steps",
          "availability": "both",
          "description": "Review source-backed decisions and start bounded follow-up work.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/project-settings.md"
        },
        {
          "id": "memory",
          "name": "Memory and OneDrive sync",
          "availability": "both",
          "description": "Manage saved context and sync it across computers.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/memory.md"
        },
        {
          "id": "ideas",
          "name": "Ideas based on your work",
          "availability": "both",
          "description": "Prepare editable drafts from relevant suggestions.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/ideas.md"
        },
        {
          "id": "threads",
          "name": "Search, pin, and snooze chats",
          "availability": "both",
          "description": "Find previous work and manage thread history.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/thread-sidebar.md"
        },
        {
          "id": "home-refresh",
          "name": "Updated project overview",
          "availability": "nightly",
          "description": "A revised Project Home makes current work and next steps easier to scan.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.2-nightly.20261030.115/docs/user/thread-sidebar.md"
        },
        {
          "id": "feature-ideas",
          "name": "New features to try in Ideas",
          "availability": "nightly",
          "description": "Prepare examples of features you have not tried.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.2-nightly.20261030.115/docs/user/ideas.md"
        }
      ]
    },
    {
      "name": "Skills and automation",
      "items": [
        {
          "id": "skills",
          "name": "Create and install skills",
          "availability": "both",
          "description": "Use reusable instructions for recurring work.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/tritonai-commons.md"
        },
        {
          "id": "record",
          "name": "Record a task as a skill",
          "availability": "both",
          "description": "Demonstrate desktop actions and turn them into a reusable skill.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/record-a-skill.md"
        },
        {
          "id": "commons",
          "name": "Find and share Commons skills",
          "availability": "both",
          "description": "Browse AI Team and Community skills or submit your own for review.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/tritonai-commons.md"
        },
        {
          "id": "schedule",
          "name": "Recurring scheduled tasks",
          "availability": "both",
          "description": "Schedule work on a selected connected computer.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/project-settings.md"
        },
        {
          "id": "webhooks",
          "name": "Tasks triggered by webhooks",
          "availability": "both",
          "description": "Run a task when an external service calls its configured URL.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/project-settings.md"
        },
        {
          "id": "environments",
          "name": "Plugin Prod/Dev connections",
          "availability": "nightly",
          "description": "Plugins can offer separate Production and Development sign-ins.",
          "source": "https://github.com/dbalders/TritonAI-Harness/pull/469"
        }
      ]
    },
    {
      "name": "Devices and collaboration",
      "items": [
        {
          "id": "clients",
          "name": "Desktop, web, and phone access",
          "availability": "both",
          "description": "Use compatible clients connected to a running Harness computer.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/install.md"
        },
        {
          "id": "remote",
          "name": "Remote computers and SSH",
          "availability": "both",
          "description": "Pair environments, choose connection routes, and use supported remote hosts.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/remote-access.md"
        },
        {
          "id": "devices",
          "name": "Device and simulator tools",
          "availability": "both",
          "description": "Inspect supported devices, browsers, and simulators.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/devices.md"
        },
        {
          "id": "outside",
          "name": "Connect outside agents by MCP",
          "availability": "both",
          "description": "Authorize another agent to read or work with a Harness environment.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/outside-agents.md"
        },
        {
          "id": "guests",
          "name": "Guest links to a thread",
          "availability": "nightly",
          "description": "A guest can follow a thread and propose messages for the owner to approve.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.2-nightly.20261030.115/docs/user/guest-links.md"
        },
        {
          "id": "tour",
          "name": "Guided getting-started tour",
          "availability": "nightly",
          "description": "Opt into guided practice. The tour is off by default.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.2-nightly.20261030.115/docs/user/welcome-wizard.md"
        }
      ]
    },
    {
      "name": "Build and manage work",
      "items": [
        {
          "id": "terminal",
          "name": "Terminal and code workspace",
          "availability": "both",
          "description": "Run commands and inspect their output.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/terminal.md"
        },
        {
          "id": "git",
          "name": "Git branches and worktrees",
          "availability": "both",
          "description": "Keep software changes in separate working copies.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/source-control.md"
        },
        {
          "id": "pulls",
          "name": "Pull requests and code review",
          "availability": "both",
          "description": "Prepare and review changes through supported code hosts.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/source-control.md"
        },
        {
          "id": "usage",
          "name": "Usage, costs, and limits",
          "availability": "both",
          "description": "Inspect usage and supported provider limits.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/usage.md"
        },
        {
          "id": "appearance",
          "name": "Themes and keyboard shortcuts",
          "availability": "both",
          "description": "Adjust appearance and configure keyboard controls.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/appearance.md"
        },
        {
          "id": "help",
          "name": "Built-in Help and feedback",
          "availability": "both",
          "description": "Ask for help and prepare feedback with diagnostics.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.1/docs/user/help.md"
        },
        {
          "id": "fx",
          "name": "Optional fx agent engine",
          "availability": "nightly",
          "description": "Connect an independently installed fx engine using its own sign-in.",
          "source": "https://github.com/dbalders/TritonAI-Harness/blob/v0.4.2-nightly.20261030.115/docs/user/providers-fx.md"
        }
      ]
    }
  ]
};

// Curated presentation selection; release availability still comes from the verified catalog.
export const harnessReleaseHighlights = {
  features: [
    { id: 'memory', name: 'Memory', detail: 'Recall past work and decisions', icon: 'Brain' },
    { id: 'agents', name: 'Helper agents', detail: 'Keep several tasks moving at once', icon: 'Users' },
    { id: 'schedule', name: 'Automations', detail: 'Run on a schedule or a trigger', icon: 'Calendar' },
    { id: 'computer', name: 'Computer use', detail: 'Use your files, apps, and browser', icon: 'MousePointer2' },
    { id: 'clients', name: 'Phone access', detail: 'Start work on a connected computer', icon: 'Smartphone' },
    { id: 'ideas', name: 'Ideas', detail: 'Suggestions for using the Harness', icon: 'Lightbulb' }
  ],
  plugins: ['microsoft-365', 'google-workspace', 'github', 'jira-data-center', 'kuali-build', 'n8n', 'lucid', 'tableau', 'ucsd-assistant'],
  skills: [
    { name: 'Email and calendars', icon: 'Mail', ids: ['gmail', 'google-calendar', 'outlook-mail', 'outlook-calendar'] },
    { name: 'Documents and spreadsheets', icon: 'FileSpreadsheet', ids: ['google-drive', 'onedrive-files'] },
    { name: 'Hosting readiness', icon: 'ClipboardList', ids: ['hosting-readiness'] },
    { name: 'Websites and accessibility', icon: 'Globe', ids: ['ucsd-cms', 'ucsd-accessibility-compliance', 'ucsd-decorator'] },
    { name: 'Data classification', icon: 'ShieldCheck', ids: ['ucsd-data-classification'] },
    { name: 'Tableau reports', icon: 'BarChart3', ids: ['tableau-reports'] }
  ],
  previews: [
    { id: 'tour', name: 'Guided tour', icon: 'Compass' },
    { id: 'guests', name: 'Guest links', icon: 'Link2' },
    { id: 'environments', name: 'Prod/Dev connections', icon: 'Layers' }
  ]
};
