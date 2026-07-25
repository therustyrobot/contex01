# contex01

**A self-hostable launchpad for your project contexts.**

Modern builders — devs, tinkerers, product designers, hobbyists — end up
juggling a pile of contexts per project: where the code lives, which services
are running where, the docs and inspiration links you'll need again, the
integrations wired up, the SSH boxes and terminal sessions you keep
recreating, and increasingly, AI agent sessions and memory scattered across
tools. Switching between them is real fatigue.

contex01 doesn't try to replace or host any of that. It's a launchpad: one
place that remembers *where things are* and *how to get back into them*, so
picking a project back up is one click instead of ten minutes of
reconstruction.

> **Status:** early scaffold. The core data model and a working CRUD UI exist;
> most of the roadmap below is not built yet. Contributions welcome.

## What it tracks, per project ("context")

- **Locations** — local checkout paths, git remotes, remote hosts
- **Services** — dev servers, staging, production, admin panels, with launch URLs
- **Docs & inspiration** — documentation, design references, inspiration links
- **Integrations** — third-party services/APIs a project depends on
- **Sessions** — saved SSH targets and terminal launch commands
- **Agent context** — pointers to AI agent sessions/memory (Claude Code, Cursor,
  Codex CLI, ...) — contex01 stores *where* that context lives and how to
  resume it, not the memory content itself

## Non-goals

- contex01 is not a secrets manager, a terminal, or an SSH client — it launches
  the tools you already use.
- contex01 does not host your source code, documentation content, or AI agent
  memory. It stores pointers, not payloads. (This may become practical to
  relax for specific integrations down the road, but it's explicitly not the
  starting design.)

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript + Tailwind CSS
- [Drizzle ORM](https://orm.drizzle.team) over SQLite — zero external services
  to stand up for a self-hosted instance
- Ships as a single container; data lives in one SQLite file you mount as a
  volume

## Quickstart (local dev)

```bash
cp .env.example .env
npm install
npm run db:generate   # generate SQL migrations from the schema
npm run db:migrate    # apply them to ./data/contex01.sqlite
npm run dev            # http://localhost:3000
```

Optionally seed a demo context:

```bash
npm run db:seed
```

## Self-hosting with Docker

```bash
docker compose up -d --build
```

This builds the image, applies migrations on boot, and persists the SQLite
database to a `contex01_data` volume. The app listens on `:3000` — put it
behind your own reverse proxy / auth (e.g. Caddy, Tailscale, Cloudflare
Access) since contex01 does not ship its own auth layer yet.

## Data model

See [`src/db/schema.ts`](./src/db/schema.ts) for the source of truth. At a
glance:

```
project
 ├─ locations       (local_path | git_remote | remote_host)
 ├─ services        (dev_server | staging | production | admin | other)
 ├─ resource_links  (docs | inspiration | design | integration | other)
 ├─ sessions        (ssh | terminal)
 ├─ agent_contexts  (agent name, resume command, memory pointer)
 └─ tags            (many-to-many)
```

## Roadmap

- [ ] Auth (single-user PIN/passkey for a personal instance; multi-user later)
- [ ] Command palette / quick-launch (`⌘K`) across all contexts
- [ ] One-click launch actions: open in editor (`vscode://`, `cursor://`),
      open SSH session in a local helper, open agent resume command
- [ ] Service health checks (ping `health_check_url`, show live status on cards)
- [ ] Import: scan a directory of git repos and bootstrap contexts automatically
- [ ] Browser extension / bookmarklet to save the current tab as inspiration or docs
- [ ] Tagging + full-text search across all contexts
- [ ] Export/import (JSON) for backup and migration between instances
- [ ] Optional integrations: read live status from GitHub, Vercel, Railway, etc.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). Issues and PRs welcome — this is
early and the shape of things is still up for debate.

## License

[MIT](./LICENSE)
