# TritonAI Deck Remediation Goal

## Goal objective

Transform the TritonAI deck from a broad slide library into a set of intentional, audience-specific presentations that are narratively coherent, governance-safe, source-backed, accurate to the OpenClaw memory ecosystem, and fully verified in the browser—while preserving the TritonAI visual system, stable slide links, and slide-manager workflow.

## Communication job

By the end of each presentation, its intended audience should understand the part of the TritonAI strategy relevant to them, trust the evidence and governance model, and leave with a clear conclusion, decision, or next action.

## Baseline

- Published deck: 98 managed slides; 96 slides in `audience=all`.
- Completed cleanup:
  - Six unused market-trend slides removed.
  - Duplicate Developer API and hosting-intake slides removed.
  - Redundant older Contract Reviewer slide removed.
- Remaining problem: audience filters still behave primarily as subsets of a slide library rather than deliberately edited presentations.

## Definition of done

The goal is complete only when all of the following are true:

1. Every supported audience has one deliberate opening, a cumulative narrative, and one purposeful closing.
2. Audience sequences meet the recommended size ranges below, or an exception is documented with a clear reason.
3. The Cabinet audience contains the intended Cabinet briefing and a decision-oriented close.
4. Sensitive performance and workforce material is restricted to explicitly approved audiences.
5. The OpenClaw memory story covers evidence, curation, retrieval, action, write-back, provenance, freshness, privacy, correction, and operational health.
6. Volatile or non-obvious claims are sourced, dated, qualified, or removed.
7. Actual, projected, target-state, and illustrative results are visually distinguishable.
8. Duplicate narrative beats are removed, analytics are synthesized, and each retained video has a descriptive title or poster cue.
9. Stable slugs and direct audience-prefixed links continue to work.
10. Every audience sequence passes structural validation, production build validation, full in-browser review, overflow checks, navigation checks, and live production verification.

## Recommended audience targets

| Audience | Current published count | Target |
|---|---:|---:|
| Technical | 30 | 22–25 |
| Executive | 37 | 20–24 |
| Cabinet | 22 | 14–18 |
| Citizen Developer | 24 | 18–22 |
| Internal | 57 | 30–35 |
| Public | 44 | 18–22 |
| Conference | 19 | 16–19 |
| PK operating review | 7 | 8–10 |
| Regent | 48 | 20–25 |
| LMU | 52 | 28–35 |

Counts are guardrails, not arbitrary quotas. Narrative completeness and audience relevance take precedence, but material exceptions must be explicit.

## Goal-compatible execution plan

### 1. Establish the audience contracts

**Status:** Pending

**Purpose:** Define what each audience must understand, decide, or do before changing slide assignments.

**Actions:**

- Define a one-sentence communication job for Technical, Executive, Cabinet, Citizen Developer, Internal, Public, Conference, PK, Regent, and LMU.
- Define a canonical opening, three-to-five narrative beats, and a purposeful close for each audience.
- Produce an audience-by-slide routing matrix with `keep`, `remove`, `move`, and `conditional` decisions.
- Treat `all` as the full editorial library; do not use it as the model for every audience presentation.
- Record any audience-count exception and its rationale.

**Completion gate:**

- Every audience has an approved narrative contract and proposed slide sequence.
- No slide is assigned merely because it is broadly interesting.

### 2. Repair routing, openings, closings, and sensitive exposure

**Status:** Pending

**Purpose:** Fix the highest-risk audience and governance defects before adding content.

**Actions:**

- Add the intended `cabinet-people-00-title` through `cabinet-people-13-closing` sequence to the Cabinet presentation, then remove unrelated Cabinet material until the sequence is within the target range.
- Reduce Technical and Internal to one opening title.
- Reduce Public to one opening title and one closing.
- Give Citizen, Regent, and PK an audience-appropriate opening.
- Give Cabinet, Citizen, and PK a decision-oriented closing.
- Remove premature `Thank You` slides from the middle of Internal and Public sequences.
- Restrict `cabinet-harness-13-recap` to internal leadership by default unless formal policy approval supports broader exposure.
- Review temporary-position, workforce-reduction, performance-evaluation, and other employee-sensitive language for audience restrictions.

**Completion gate:**

- Each audience has exactly one deliberate opening and one deliberate closing.
- The Cabinet briefing appears in the Cabinet view.
- No sensitive slide is visible outside its approved audience.
- Direct links to retained slides remain stable.

### 3. Rebuild the OpenClaw memory narrative

**Status:** Pending

**Purpose:** Explain memory as a governed operational capability rather than a collection of storage layers or token-management tactics.

**Actions:**

- Rewrite `harness-memory-architecture` around:
  - `Evidence → Daily context → Curation → Wiki and graph → Selective retrieval → Action → Write-back`
  - Governing claim: “A governed memory pipeline turns daily evidence into durable judgment.”
  - Trust rail: provenance, freshness, privacy, and human correction.
- Rewrite `harness-memory-scale-ucsd` around:
  - `Personal → Team Shared → Agent Integration`
  - Approved aggregates for department and campus use.
  - Governing line: “Agents propose; humans promote.”
- Rewrite `cabinet-harness-09b-context-management` to distinguish:
  - Always-loaded instructions and recent context.
  - Triggered wiki, graph, project, and people retrieval.
  - Durable memory across sessions.
  - Temporary context inside one run.
- Add `a-meeting-becomes-memory-and-then-action`:
  - `Transcript → Debrief → Decision/owner → Reviewed proposal → Wiki/graph update → Briefing/reminder/artifact`
- Add `memory-quality-is-an-operational-service`:
  - Source freshness.
  - Missing enrichment jobs.
  - Stale wiki pages.
  - Graph/wiki drift.
  - Failed promotion.
  - Reconciliation and alerts.
- Expand “Institutional Knowledge” on `the-agentic-ai-stack`.
- Add proposal gates and personal-by-default language to `cabinet-harness-11-ucsd-safe-path`.
- Rewrite the Q3 shared-knowledge roadmap item as measurable pilot outcomes: freshness, review rate, onboarding time, and self-service project-status retrieval.
- Add the memory architecture sequence to the Technical audience.

**Completion gate:**

- The memory sequence explains the full evidence-to-action loop and its trust model.
- The two new slides exist and have stable slugs.
- Technical, Cabinet, Citizen Developer, and Internal each receive an audience-appropriate subset.
- No hard-coded schedule or model allocation appears without a date and source.

### 4. Source, date, qualify, or remove volatile claims

**Status:** Pending

**Purpose:** Make the deck defensible in public, executive, workforce, and governance settings.

**Actions:**

- Create a claim ledger with slide slug, exact claim, claim type, source, source date, review date, audience risk, and disposition.
- Classify results as `actual`, `projected`, `target`, or `illustrative`.
- Remove or source the institutional-maturity percentages previously shown on “The Cost of Inaction.”
- Verify or qualify vendor adoption, revenue, developer-count, model, and context-window claims.
- Replace “73,000 campus users” with precise language distinguishing potential reach, enabled users, active users, and people trained.
- Separate realized savings from projected savings on `ucsd-ai-by-the-numbers`.
- Mark the incident-response workflow as an illustrative target state unless production evidence confirms it is operational.
- Update Q1 and Q2 roadmap language from plans to completed outcomes where evidence supports completion.
- Add visible source/date footers or source metadata for every retained external or volatile claim.

**Completion gate:**

- Every high-risk claim has a traceable source and date, a clear qualification, or has been removed.
- Actual and projected outcomes cannot be mistaken for one another.
- Public, Regent, Executive, Cabinet, and LMU slides pass a focused claim-risk review.

### 5. Consolidate the remaining library and label demonstrations

**Status:** Pending

**Purpose:** Reduce repetition and make every retained slide earn its place.

**Actions:**

- Keep Contract Review to one case-study slide plus one demonstration for most audiences.
- Select no more than two flywheel case studies per audience based on that audience’s communication job.
- Replace three standalone analytics charts with a synthesis sequence that explains what changed, why it changed, and what action follows.
- Add a visible title, poster, or “what to notice” cue to every retained video.
- Remove repeated summary beats and audience-inappropriate implementation detail.
- Run a semantic-duplicate scan after consolidation and document intentional exceptions.

**Completion gate:**

- No audience receives redundant treatments of the same claim or example.
- Every video is identifiable before playback.
- Each audience is within its target range or has a documented exception.

### 6. Validate, publish, and verify every audience

**Status:** Pending

**Purpose:** Confirm that the edited presentations work as complete experiences, not merely as valid data.

**Actions:**

- Run `npm run check:deck` and the production build.
- Verify slide-manager order, removal state, audience assignments, stable slugs, aliases, and generated slide artifacts.
- Review every slide in every audience sequence in the browser.
- For each audience, verify:
  - Opening and closing.
  - Narrative continuity.
  - Slide count.
  - Previous/next controls and counter.
  - Direct audience-prefixed links.
  - Text wrapping, clipping, media fit, and viewport overflow.
  - Video title/poster cues.
  - Zero browser console errors.
- Review at the presentation viewport and at least one smaller viewport that can expose wrapping or navigation collisions.
- Publish to `main`, wait for Vercel to reach `Ready`, and repeat the key structural and browser checks against the production alias.

**Completion gate:**

- All automated checks pass.
- Every audience has a completed QA record with no unresolved critical or high-severity issue.
- Production JSON and live browser behavior match the approved sequences.
- The final production links are documented by audience.

## Implementation defaults

These defaults allow the goal to proceed without repeated clarification:

- Treat `all` as the complete editorial library, not a recommended presentation.
- Preserve stable slugs and use aliases when replacing a slide.
- Restrict sensitive HR/performance content to Internal and explicitly approved leadership audiences.
- Remove an unsupported volatile claim rather than presenting it as fact.
- Label non-operational workflows `illustrative target state`.
- Prefer one strong case study over several similar examples.
- Prefer a shorter, coherent audience sequence over hitting an exact slide-count target.
- Preserve the existing TritonAI typography, palette, navigation, and visual system.

## Change and deployment strategy

Use small, reviewable commits:

1. Audience routing and sensitive-content restrictions.
2. Memory narrative rewrites and two new slides.
3. Claim ledger and claim corrections.
4. Consolidation, analytics synthesis, and video labeling.
5. Final audience QA fixes and production verification.

Do not combine all phases into one commit. Each phase must pass structural validation and representative browser review before the next phase begins.

## Goal handoff

This plan can be activated as a goal with the objective stated above and these six plan items:

1. Establish audience contracts.
2. Repair audience routing and sensitive exposure.
3. Rebuild the OpenClaw memory narrative.
4. Source and qualify volatile claims.
5. Consolidate content and label demonstrations.
6. Validate, publish, and verify every audience.

Start with all six items `pending`. Move only one item to `in_progress` at a time. Mark the goal complete only after the production verification gate in Phase 6 passes.
