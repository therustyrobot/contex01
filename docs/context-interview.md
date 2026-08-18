# Context interview — findings

Working notes from walking through harlw's GitHub repos to figure out what
contex01 actually needs to track. Goal per harlw: a project board that gives
a visual queue of in-flight work, surfaces blockers and things to purchase/
delegate, and gets him back into full working context on a project as fast
as possible.

Repos queued for this interview: reloop-ecycling, family-calendar-display,
sermon-quotes-graphics, homelylab, station-cassandra, harlw.com.

## reloop-ecycling (client site — e-cycling business)

**What "context" means for this project, in his words:**
- AI chat/agent context (conversation history with an assistant working the project)
- Documents: content/copy, mostly AI-generated first drafts
- The repo/code itself
- Domain registrar info
- Hosting platform (Vercel / Netlify / GH Pages — undecided)
- A reference website (external site he needs to pull info from)
- Contact phone number(s) for the businesses he's approaching (donation partners)
- Follow-ups → external to-do list
- Appointments → external, Google Calendar specifically

**Current blocker:** researching TN state + federal e-cycling regulations
(data destruction requirements, equipment disposal rules) — needed before he
can write accurate website claims or put together donor/partner packages.
This is a **blocked-on-own-research** blocker, not blocked-on-someone-else.

**Purchases:** a domain, possibly print materials. Nothing heavy.

**Cold-handoff gap:** someone picking this up (contractor or agent) wouldn't
know:
- His actual intent for the site / unresolved specifics (e.g. where a
  contact form goes)
- His design taste/tone: explicitly **not** too polished/corporate — needs
  to read as a small, approachable local business so partners don't feel
  like they're dealing with a big company. This is closer to "needs
  thought/planning" than "needs a doc filled in" — see design notes below.

## Design notes surfaced (apply across all projects, not just this repo)

1. **Blocker taxonomy** — a project/task blocker isn't one thing. At least
   three flavors so far:
   - blocked on an external party (client feedback, waiting on someone else)
   - blocked on harlw's own research/decision
   - blocked on a purchase
   contex01 should let a blocker say *which kind* it is, not just "blocked: yes/no".

2. **Delegation on tasks** — a task should have a "delegatable?" checkbox.
   When checked, show a delegate-target field with editable prefilled
   options: "AI agent" or "specific person" (a real contact). Surfaces what
   *can* be handed off, not just what's stuck.

3. **"Needs thought/planning" is its own task state** — distinct from a
   blocker and distinct from "write this doc." Some tasks aren't blocked on
   an external thing, they're blocked because harlw hasn't thought it
   through yet (e.g. site tone/taste, content specifics). Worth a status or
   tag rather than folding it into a generic "brief" doc field.

4. **Blocker nudges with snooze** — periodically (automation) prompt "is
   there anything you can do to unblock this?" on open blockers. Must be
   dismissible/snoozable for a chosen period (a day / a week / a year) so it
   doesn't nag on things he knows he can't act on yet, while keeping the
   blocker's status honest in the meantime.

## family-calendar-display (DIY Skylight-style Home Assistant build)

**What "context" means for this project, in his words:**
- Software: likely a customized pre-existing dashboard/repo
- Physical deployment: a touchscreen, physically located in a specific room
  (dining room / kitchen) — the project has a **place**, not just a repo
- Hardware inventory: some parts already owned, some need to be purchased —
  needs a "things to collect/buy" checklist that distinguishes have vs. need
- Login/credential data for whatever services feed the display
- **Unresolved decisions** (not blockers exactly — open design questions):
  which calendars display, which tasks display, where tasks come from, who
  in the family can add tasks, who can check them off, weather source
  (probably built into the dashboard already)
- **Stakeholders beyond himself**: the family. Some decisions require
  discussing with them, not just deciding solo — this is a different flavor
  of "needs thought/planning": needs input from specific people, not just
  needs harlw to think it through alone.
- **Scope tiers**: security camera streaming called out explicitly as an
  "enhancement," not core scope, because it needs extra background
  services. Core build vs. nice-to-have/someday matters for what he tracks
  as active vs. backlog.
- Research task: look at other people's builds for ideas before locking in
  scope — competitive/reference research, distinct from the TN-regulations
  "must research before I can act" blocker seen on reloop-ecycling.
- Third-party consumer integration: family shopping list feeding into an
  existing phone app (Kroger) so items can be ordered directly — contex01
  wouldn't rebuild this, just needs to represent "this project depends on
  that external app/integration."

## Design notes surfaced (apply across all projects, not just this repo)

5. **Projects can have a physical location**, not just a repo/service
   location. `locations.kind` currently covers local_path / git_remote /
   remote_host — a "physical place" (a room, a device on a shelf) is a
   different kind entirely.

6. **Inventory/shopping checklist, have-vs-need** — distinct from the
   "purchase" flag on a blocker. This is a whole sub-list of physical items
   per project, each either already owned or still needing to be bought.

7. **"Needs input from a specific person" vs. "needs my own thought"** —
   both are flavors of not-ready-to-act-yet, but the first names who the
   input is needed from (could be family, could be a client). Related to,
   but distinct from, delegation (delegation hands the *work* off; this is
   asking a *decision* of someone).

8. **Scope tiers** — core/must-have vs. enhancement/nice-to-have vs.
   someday/backlog. Determines what shows as "in flight" vs. what's parked.

**Current blocker:** purchasing the main screen hardware — blocked on
**purchase**, specifically on being picky about finding the right deal.
Detail on what "purchase tracking" needs to hold, from his answer:
- Marketplaces he watches for deals: eBay, Mercari, Facebook Marketplace
  local, AliExpress, plus checking his own existing inventory first
- A criteria/spec for what he's shopping for, not just an item name — e.g.
  "cheapest thing that works," low power draw, big screen, good interface
- Strong preference for reused/secondhand hardware over new (keeps stuff
  out of landfills) — this is a standing preference, not project-specific,
  but it shapes how a "purchase" task should behave: it's a **watch/search
  task with criteria**, not a one-shot "buy X" checkbox.

9. **Purchase items are richer than a checkbox** — a purchase blocker often
   needs: criteria/spec text, a list of marketplaces/sources being watched,
   and a status (searching → found candidate → ordered → owned), not just
   done/not-done.

## sermon-quotes-graphics (sermon quotes → reminder graphics)

**What "context" means for this project, in his words:**
- Source capture is manual/live, not automated yet: he highlights passages
  in a live-transcription app (Otter, or similar — he's considering rolling
  his own eventually). The "n8n automation" framing in the repo description
  is provisional — the underlying *concept* (text → processed → shared) is
  the durable part, the specific tool chain isn't locked in.
- An existing **manual spreadsheet** tracks quotes, attribution, and a
  done/not-done marker per quote — this is a tracking system that predates
  contex01 and that contex01 would either need to reference or replace.
- Output destination: a shared iCloud Photo Library, consumed by an old
  iPad's built-in slideshow feature — already fully set up in software
  terms.
- Physical deployment: the iPad is mounted and ready to hang on a wall.

**Current blocker:** needs power run to the wall-mounted iPad location.
This is neither a purchase-search blocker nor a research blocker — it's a
**physical installation/labor task** (needs an electrician or his own DIY
time), a fourth blocker flavor.

10. **Blocker taxonomy, updated** — at least four flavors now: blocked on
    external party, blocked on own research/decision, blocked on purchase
    (search task), blocked on physical installation/labor.

11. **A project's tool chain can be provisional** — the repo description
    can say "n8n automation" while the real state is "concept: capture →
    process → share, exact tools TBD." Might argue for keeping the
    *pipeline concept* separate from the specific services/tools wired to
    each stage, so swapping Otter for a homemade capture tool doesn't mean
    re-describing the whole project.

12. **Legacy tracking artifacts** — some projects already have an ad hoc
    tracker (a spreadsheet, a notes doc) that contex01 would sit alongside
    or eventually replace. Worth being able to link "the old way I tracked
    this" as a resource even after contex01 takes over.

## homelylab (core homelab infra — rolling backlog, not a deliverable)

**Different shape than everything above:** this project is never really
"done." It's mostly repo-contained (data, code, planning), a rolling list
of definable to-dos in various states of progress.

- No project-level deadline/timeline — doesn't make sense for a project
  like this. Individual *tasks* within it might occasionally have a
  timeline, but the project itself shouldn't have a due-date field forcing
  one.
- What matters instead is **freshness metadata**: last worked on / last
  edited / last looked at. That's the signal for a rolling-backlog project,
  not a deadline.
- To-dos often need research first (same "needs own research" flavor as
  reloop-ecycling).
- **To-dos can outgrow the project and become their own project.** A task
  that starts as a homelylab item can scope-creep into something that
  deserves to be its own tracked project. contex01 should support
  "promote this task to a new project," ideally keeping some link back to
  where it came from.
- He's already using **GitHub Issues** on homelylab to track to-dos — an
  existing system contex01 would either need to integrate with (pull issues
  in) or consciously decide to replace. Open question, not yet resolved
  with him.

13. **Not every project has a deadline, and that's fine** — project-level
    due dates should be optional/absent for rolling-backlog-style projects;
    only specific tasks occasionally carry a timeline.

14. **Tasks can graduate into projects** — needs a "promote to project"
    action that preserves provenance (which project/task it came from).

15. **Open question: GitHub Issues integration.** homelylab already tracks
    to-dos via GitHub Issues. Does contex01 pull those in as a read-through
    view, or does it want its own task store per project and leave Issues
    alone? Affects whether "tasks" in contex01 are a first-class local
    table or a synced mirror.

**Resolved (#15):** yes — v1 should show open GitHub issues per project.
GitHub Issues is already one of his easiest ways to hand off work to
agents, so it's worth surfacing directly rather than duplicating.
Refinement: a project can involve **multiple repos**, and they're not all
equal —
- the **primary repo** gets a full "GitHub info block" (open issues, etc.)
- **secondary/related repos** might just be a link, without needing the
  same synced data

16. **Multi-repo projects, tiered.** `locations` (kind: git_remote) already
    supports multiple repos per project, but contex01 needs a way to mark
    one as primary (gets the rich GitHub issues/info block) vs. secondary
    (just a reference link). Not all `git_remote` locations are equal.

17. **Icebox state for new projects.** harlw has too many ideas and starts
    too many projects he doesn't finish. Wants a project lifecycle state —
    "iceboxed" — for a brand-new idea:
    - Record the idea/initial thoughts up front (a brain-dump capture, see
      #18 below)
    - The project is locked from being worked on for a set cool-down period
    - Visually distinct — "frozen," with a countdown clock (he explicitly
      said it's fine to get a little cheesy/playful with this)
    - Separately, he gets a bounded window (~30 min) he can spend on an
      iceboxed project purely to brain-dump/brainstorm and think it through
      more — this is deliberately *not* "working on" the project, it's
      reflection time, distinct from the cooldown lock
    - When the cooldown period ends, he decides: pursue for real (promote
      out of icebox), archive, or fold it into something smaller ("modify
      into something lesser")
    - Point of the whole mechanic: temper the initial excitement spike so
      he doesn't headlong into new projects at the expense of finishing
      existing ones.

18. **Voice brain-dump → agent-assisted project fill-out.** Proposed as one
    of the first things you'd do on a new project: record a voice
    transcription brain-dump of everything in your head about it, then have
    an integrated agent process that transcript and auto-populate the
    project: description, identified tasks/to-dos, identified
    blockers/requirements, identified people who might need to be involved,
    and anything else it can pick up. This is essentially productizing the
    interview process this very session has been doing manually — worth
    building as a first-class "new project" flow, not just a one-off.

## station-cassandra (interactive signals-intelligence terminal / narrative escape experience)

**Shape:** a physical installation — a self-contained unit (not a room) with
a small computer, vintage/retro phone-and-headset hardware, internal
radios, a custom-built keyboard, an Arduino driving relays that physically
unlatch drawers/locks as the story progresses, and a Pi (or similar)
running the software side, which talks to small local agents with very
specific instructions to lock/unlock story information.

- **Phased build, deliberately sequenced:** starting with a digital
  prototype so people can playtest the *story/logic* before any physical
  build happens — goal is to fully scope what hardware is actually needed
  and avoid overbuilding, then move to physical implementation once the
  digital version is validated.
- **Content to generate:** storyboards, story branching/logic — a content
  type specific to this kind of project (distinct from reloop's marketing
  copy, but same general shape: written material that needs producing).
- **Physical hardware BOM:** Arduino(s), Raspberry Pi, retro/vintage
  display hardware, custom keyboard, phone/headset hardware, radios — same
  have-vs-need-to-buy inventory need as family-calendar-display; this
  confirms it's a general pattern for physical-build projects, not a
  one-off.
- **Deliberately flexible/extensible format:** wants to support more than
  one story experience — start simple, add complexity as bugs get worked
  out. He's not sure yet whether this stays one long, sprawling,
  never-quite-done project (homelylab-shaped) or ends up spinning off
  sibling projects for each additional story/installation (a
  project-to-project relationship, similar in spirit to the task-graduates-
  to-project pattern from homelylab, but for whole projects).

19. **Projects can have build phases/milestones** — e.g. digital prototype
    → physical build. Each phase can have its own scope and blockers. Not
    every project needs this, but complex physical builds do.

20. **Playtesting/validation is a distinct task type** — goal is explicitly
    to *avoid* building things that turn out unnecessary; testing an
    earlier-stage version is how scope gets finalized before committing to
    a harder-to-change physical stage.

21. **Projects can spawn sibling projects**, not just tasks graduating into
    projects. Worth tracking a loose "related project" link even when
    there's no cooldown/promotion event — sometimes a project just inspires
    another one.

## harlw.com (personal site)

**Shape:** closer to reloop-ecycling than homelylab — a boundable project
that can actually reach "complete," not a rolling backlog.

- Remaining work: finish editing existing content drafts, generate and add
  graphics — same content-doc pattern seen on reloop-ecycling.
- The build/deployment/editing setup itself is unfinished and awkward — he
  did "a funky thing" architecturally that made it hard to manage content,
  and may need to rework that. This is a **technical-debt/rework blocker**:
  not something stopping progress outright, but friction slowing every
  future content update until it's addressed.
- Wants to blog regularly once the site itself is done — but sees the blog
  as a strong candidate for a **sibling/related project** rather than
  living inside harlw.com's own context: the site can be "complete" on its
  own, while the blog is an ongoing, separate-context thing that happens to
  live on the same domain. Confirms the "related project" link from
  station-cassandra is a real, recurring need, not a one-off.

22. **Technical-debt/rework is its own blocker flavor** — distinct from the
    four found earlier (external-party, own-research, purchase, physical
    installation). This one blocks *ergonomics*, not the ability to act at
    all: harlw.com's awkward CMS setup doesn't stop him from editing
    content, it just makes every edit more painful until it's reworked.

23. **A "complete" project can still have an ongoing sibling.** harlw.com
    (the site) is boundable and can finish; a blog on the same domain is
    open-ended and shouldn't drag harlw.com's status down or force them to
    share all context. Reinforces #21 (related-project links) with a
    concrete case: same domain/infra, deliberately separate project.

## All six repos covered — summary of new concepts surfaced

- Blocker taxonomy (5 flavors): external-party, own-research/decision,
  purchase (watch/search), physical installation/labor, technical-debt/
  rework
- Delegation checkbox + prefilled delegate-target (AI agent / person)
- "Needs input from a specific person" vs. "needs my own thought"
- Scope tiers: core / enhancement / someday-backlog
- Physical location as a location kind
- Have-vs-need-to-buy inventory checklist (general to physical builds)
- Purchase items as watch/search tasks with criteria + sources + status
- Rolling-backlog projects: no forced deadline, freshness metadata instead
- Tasks can graduate into their own project (with provenance link)
- Projects can spawn/link to sibling projects (looser than graduation)
- Build phases/milestones within a project
- Playtesting/validation as a task type
- GitHub Issues surfaced per project (v1 decision); multi-repo projects
  need a primary-repo/secondary-repo distinction
- Legacy tracking artifacts (e.g. a spreadsheet) linkable as "old way I
  tracked this"
- Project tool chain can be conceptual/provisional, separate from the
  specific services wired to each pipeline stage
- Icebox lifecycle state with cooldown timer + bounded brainstorm window
- Voice brain-dump → agent-assisted new-project fill-out
