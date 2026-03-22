# ASU-GSV Presentation Script
## "The AI-Enabled University" — Brett Pollak & Courtney Giordano
### 20-Minute Talking Script

---

## Slide 1: Title Slide (~30s)

**BRETT:**
- Welcome everyone — I'm Brett Pollak, Executive Director of IT Services at UC San Diego
- I'm joined by Courtney Giordano, our Associate Chancellor
- Today we're going to talk about how we've operationalized AI across a major research university — not as a pilot, not as an experiment, but as infrastructure

---

## Slide 2: UC San Diego (~1.5 min)

**COURTNEY (owns this slide):**
- Quick orientation on UC San Diego for those less familiar
- We're the #6 public university in the country, $1.73B in research funding
- 45,000 students, over 41,000 employees, 3,685 faculty — this is a small city
- 12 schools, 200+ degree programs, 100+ research centers, 16 Nobel laureates
- The scale matters here — when we say "campus-wide AI," we mean 73,000+ people across an incredibly complex, decentralized institution
- That complexity is exactly why we needed a platform approach, not a patchwork of tools

---

## Slide 3: TritonGPT — The Origin Story (~1.5 min)

**BRETT:**
- This started with Chancellor Khosla recognizing the Transformer/GPT revolution as an opportunity — not for research, but for administrative efficiency
- Chancellor's Office funded it directly — we partnered with the San Diego Supercomputer Center to invest in open-source, low-cost AI solutions
- From day one, we integrated campus context — policies, procedures, institutional data — so the AI actually knows UC San Diego
- We treated it as a research project: get in front of real users fast, prototype, figure out what works
- The philosophy became "scale what works" — double down on tools driving impact, retire what isn't

**COURTNEY (question):**
- Brett, for the folks in the room — a lot of institutions struggle to get executive sponsorship for something like this. What made Chancellor Khosla willing to fund it before there was proof it would work?

**BRETT:**
- The chancellor understood that the cost of waiting was higher than the cost of experimenting
- And by partnering with SDSC, the investment was modest — we weren't buying enterprise SaaS contracts, we were building on open-source with GPU infrastructure we already had access to

---

## Slide 4: Scaling Engagement — The TritonGPT Widget (~1 min)

**BRETT:**
- One of our first big wins — the TritonGPT widget
- Embeddable JavaScript widget that goes on any campus website — no login required, fully public
- Live on 16 campus websites right now — Student Affairs, Admissions, Financial Solutions
- Instant, grounded answers to visitor questions — prospective students, parents, the public
- Key result: $300K in recurring annual savings by displacing a third-party chatbot vendor called Ocelot
- One technical solution, standardized experience across departments

---

## Slide 5: Instructional AI — Socratic Tutor & Faculty Assistant (~1.5 min)

**BRETT:**
- Two tools working together — student-facing Socratic Tutor and an instructor-only Faculty Assistant
- The tutor doesn't give answers — it guides students through Socratic questioning using their actual course materials
- Faculty Assistant lets instructors generate quizzes, study guides, lesson plans from their own lecture content
- Key: faculty control the knowledge base through private Google Drive folders — they define what the AI can see
- Early results: 81% of students said it helped them understand concepts, 86% found it easy to use, and 67% want it in more courses

**COURTNEY (question):**
- This is the one I hear the most about from our academic leadership. How do you get faculty comfortable with AI in instruction when there's so much concern about academic integrity?

**BRETT:**
- The "instructor controlled" piece is everything — faculty aren't giving up control, they're gaining a tool
- They choose what materials go in, they define the boundaries, the tutor stays strictly within those bounds
- And the Socratic model matters — it doesn't do the work for students, it teaches them how to think through it

---

## Slide 6: The Evolution of AI Workflows (~1 min)

**BRETT:**
- Quick framing slide — where the industry is heading
- Generative AI: you ask, it answers. Single-step, stateless, mostly contained within the LLM
- Agentic AI: you define a goal, it plans the steps. Multi-step workflows, memory, tool usage, API calls
- The human role shifts from prompt engineer to supervisor/orchestrator
- Everything we've shown so far is generative. What's coming next is agentic — and that requires a different kind of infrastructure

---

## Slide 7: UC San Diego AI Strategy 2026 (~1.5 min)

**BRETT:**
- Six pillars guiding our strategy going forward
- Trust is infrastructure — sensitive workflows in HR, finance, legal, student support need governed, on-prem hosting
- Make AI a utility — zero variable cost means AI is abundant, not rationed. That drives adoption
- Solve specific pain points — contract review, search, scheduling, accessibility. Purpose-built beats general-purpose chat every time
- Meet users in the workflow — embed AI in Blink, public websites, teaching tools, mobile apps. Don't make people come to a chatbot
- Stay model-agnostic — build around gateways and governance, not a single vendor
- Prepare for agency — move from assistants that answer to agents that act, with oversight

**COURTNEY (question):**
- Brett, "trust is infrastructure" — can you unpack that for the audience? Why can't you just use a cloud-hosted LLM for everything?

**BRETT:**
- If you want AI to touch HR data, student records, legal contracts, financial workflows — you can't send that to a third-party API without institutional agreements and data governance
- We use on-prem models when data must stay on campus, and enterprise-approved hosted models when institutional agreements provide the right security and compliance
- Trust isn't a policy document — it's the actual infrastructure that makes sensitive AI workflows possible

---

## Slide 8: AI Contract Reviewer — Consolidated (~1.5 min)

**BRETT:**
- This is our showcase vertical AI tool — contract review
- The problem: legal teams spend 2+ hours per contract on manual review. Policy interpretation varies across reviewers
- Our AI reviewer applies UC San Diego playbooks to propose redlines with policy-backed rationales
- Analyzes 50+ risk categories — liability, indemnification, data rights, security, SLAs, IP, compliance
- Handles three contract types: NDAs, Procurement T&Cs, and Software agreements
- Result: 91% time savings — from 120 minutes down to 11 minutes per contract
- Delivers a complete package: redlined contracts with tracked changes, issue summaries, routing metadata

---

## Slide 9: AI Contract Reviewer — What Users Are Saying (~1 min)

**BRETT:**
- Real quotes from our legal and procurement teams
- "It's like having an extra attorney"
- "It's saving us hours to days per contract"
- "Highlighting issues I might have overlooked... extremely thorough"
- "It's enabling me to work on other things — I can run the tool, jump on something else, and then go back. It only takes minutes."

**COURTNEY (question):**
- For those of you thinking about this at your own institutions — getting legal to adopt an AI tool is not easy. Brett, what was the key to getting buy-in from the legal team?

**BRETT:**
- We didn't start by saying "we're automating legal review"
- We said "we're giving you a first pass so you can focus on strategic counsel"
- The tool doesn't replace attorneys — it gives them a comprehensive starting point. They still make every decision
- And once they saw the quality of the redlines and the time savings, adoption was organic

---

## Slide 10: AI Transcript Matching & Validation (~1.5 min)

**BRETT:**
- Different kind of problem — every year, Enrollment Management hires 12 temporary staff and pulls 6 full-time staff away from their regular work just to manually match incoming transcripts to student records
- Transcripts come in wildly diverse formats — scanned, stained, distorted
- Our AI uses OCR to extract data and match documents to the correct student record with high confidence
- Phased approach to build trust: Year 1, 100% human review. Year 2, confidence-score thresholds auto-approve high-certainty matches
- Projected savings: $500K annually — we eliminate the temporary labor entirely, and those 6 full-time staff get redirected back to higher-value, more strategic work
- The roadmap extends to self-reported discrepancies, admissions requirements, course transferability

---

## Slide 11: From TritonGPT to TritonAI (~1.5 min)

**BRETT:**
- We're evolving from a chatbot platform to a full AI Tools Hub
- TritonAI is the umbrella — it brings together everything
- Agent Builder: low-code workflow automation so departments can design and launch their own AI agents
- Agent Skills Library: reusable skill packages for common campus tasks
- MCP Server Hub: shared connectors to enterprise data sources — build once, reuse everywhere
- Developer APIs: documentation and reference patterns so technical teams can build campus-ready AI services
- Agent Observability: real-time visibility into agent runs, tool calls, latency, errors
- Pre-Packaged Tools Pipeline: transcription, captioning, summarization, accessibility, OCR — self-service capabilities

---

## Slide 12: TritonAI Developer API Program (~1 min)

**BRETT:**
- How departments actually start building
- Multi-provider backend: Azure OpenAI, Google Cloud, AWS Bedrock, and our own SDSC self-hosted models
- Everything goes through an LLM Gateway with templates and guardrails
- Four-step paved path: Request (describe your use case), Receive (API key, starter credits, template repo), Build (approved stacks, campus auth), Host (campus app hosting)
- Guardrails baked in: P1-P3 data only, approved stacks, curated integrations, campus auth, usage tracking, no model training on our data

---

## Slide 13: Campus App Hosting Intake (~1 min)

**BRETT:**
- Three tiers of app intake
- Citizen apps: ~200/year, individual developers, lightweight review, deployed to *.apps.ucsd.edu
- TritonAI Rapid Dev: ~20/year, small teams, more structured review, deployed to *.tritonai.ucsd.edu
- Enterprise: ~1-5/year, large cross-functional teams, full architecture review
- Each tier has governance gates. Apps can escalate up as they mature

**COURTNEY (question):**
- This is a question I think a lot of CIOs and provosts are wrestling with — how do you enable innovation without losing control? You're essentially letting hundreds of people build AI apps. How do you keep that safe?

**BRETT:**
- The tiered model is the answer — you meet builders where they are
- Citizen apps get lightweight guardrails but real hosting with SSO and logging. If an app gets traction, it escalates to a more governed tier
- ITS owns the platform, templates, and the right to remove apps. Departments own their app logic and support
- The key insight: if you don't give people a governed path, they'll build ungoverned apps anyway. Give them rails and they'll use them

---

## Slide 14: The Flywheel in Action — PDF Remediator (~1.5 min)

**BRETT:**
- This slide is why the developer API and hosting pipeline matter
- Title II requires accessible PDFs — massive compliance challenge, and the people publishing PDFs aren't accessibility experts
- A staff member — not an engineer — used Claude Code and Codex through our Developer API to build a PDF remediation tool
- Browser-first, no database, SSO-ready — maps directly to our Campus App Hosting pipeline
- 17+ automated checks across 9 categories, hours of manual Acrobat work reduced to minutes
- Built-in compliance evidence packs for auditors
- This is the flywheel: identify a problem, build with AI tools, host on campus, scale what works. And it was built by someone close to the problem, not a central IT team

---

## Slide 15: The Agentic AI Stack (~1 min)

**BRETT:**
- Looking ahead — this is the infrastructure we're building out
- Agent Orchestrator at the top: receives goals, breaks them into subtasks, assigns specialized agents
- Model Context Protocol (MCP) as the universal connector between apps and AI — defining what AI can do and what AI can know
- Enterprise Tools layer: finance, HR, research, student systems become callable functions
- Institutional Knowledge: policies, historical decisions, reasoning logs that inform agent actions
- Agent Teams: peer networks where agents collaborate, supervisor teams where a lead agent coordinates others
- This is where the contract reviewer, transcript matching, and everything else is heading — from single-tool AI to coordinated agent workflows

---

## Slide 16: Key Takeaways (~1 min)

**BRETT:**
- Six things to take with you
- Solve specific pain points — don't build "Chat for Everyone," build "Contract Review for Legal." Specialized agents drive 90%+ efficiency
- Prepare for agency — chatbots are 2025, agents are 2026. The integration work you do today is the prerequisite
- Trust is infrastructure — you can't automate HR or Finance in the public cloud. Local hosting is the only way to get sensitive data into the AI loop
- Make intelligence a utility — if every question costs $0.03, you ration it. If it costs $0.00, you innovate
- Don't build alone — we built the stack so you don't have to. Join the UC AI Federation
- Stay model-agnostic — models are a commodity, your architecture is the asset

**COURTNEY (question):**
- Brett, if someone in this room goes back to their institution on Monday and wants to start — what's the one thing they should do first?

**BRETT:**
- Find your most painful manual process — the one where people are doing repetitive, rules-based work at scale
- That's your contract reviewer, your transcript matching. Build there first, prove value, then expand
- And come talk to us — we're actively onboarding institutions onto TritonGPT as a platform

---

## Slide 17: Thank You (~30s)

**COURTNEY:**
- Thank you all for your time today

**BRETT:**
- If you want to learn more, visit tritonai.ucsd.edu
- We're happy to take questions

---

*Total estimated time: ~20 minutes at natural pace*
