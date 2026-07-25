# Contributing to contex01

Thanks for taking a look. This project is an early scaffold, so process is
intentionally light.

## Setup

```bash
cp .env.example .env
npm install
npm run db:generate && npm run db:migrate
npm run dev
```

## Before opening a PR

```bash
npm run typecheck
npm run lint
npm run build
```

## Guidelines

- Keep the "pointers, not payloads" boundary: contex01 stores references to
  where your code/docs/agent memory live, not the content itself. If a
  feature needs to host real content, open an issue to discuss first — it's
  a deliberate scope boundary, not an oversight.
- Prefer extending the existing Drizzle schema (`src/db/schema.ts`) over
  bolting on parallel storage.
- UI stays server-rendered where reasonable; keep client-side JS minimal.
- Match existing conventions in the file you're editing before introducing a
  new pattern.

## Reporting bugs / proposing features

Open a GitHub issue. For features, a short description of the use case is
more useful than a full spec — this is early enough that the data model may
still shift.
