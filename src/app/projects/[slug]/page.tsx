import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/db/client";
import { projects } from "@/db/schema";
import {
  addLocation,
  addResourceLink,
  addService,
  addSession,
  archiveProject,
} from "@/app/actions";
import { isLikelyUrl } from "@/lib/launch";

export const dynamic = "force-dynamic";

const LOCATION_KINDS = ["local_path", "git_remote", "remote_host"] as const;
const SERVICE_KINDS = ["dev_server", "staging", "production", "admin", "other"] as const;
const LINK_CATEGORIES = ["docs", "inspiration", "design", "integration", "other"] as const;
const SESSION_KINDS = ["ssh", "terminal"] as const;

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await db.query.projects.findFirst({
    where: eq(projects.slug, slug),
    with: {
      locations: true,
      services: true,
      resourceLinks: true,
      sessions: true,
      agentContexts: true,
    },
  });

  if (!project) notFound();

  const boundArchive = archiveProject.bind(null, project.id, !project.archived);
  const boundAddLocation = addLocation.bind(null, project.id);
  const boundAddService = addService.bind(null, project.id);
  const boundAddLink = addResourceLink.bind(null, project.id);
  const boundAddSession = addSession.bind(null, project.id);

  return (
    <div className="space-y-10">
      <section className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">{project.icon ?? "📁"}</span>
            <h1 className="text-lg font-medium text-zinc-100">{project.name}</h1>
          </div>
          {project.description && (
            <p className="mt-1 text-sm text-zinc-500">{project.description}</p>
          )}
        </div>
        <form action={boundArchive}>
          <button type="submit" className="btn">
            {project.archived ? "Unarchive" : "Archive"}
          </button>
        </form>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="card">
          <h2 className="mb-3 text-sm font-medium text-zinc-100">Locations</h2>
          <ul className="mb-4 space-y-2">
            {project.locations.map((loc) => (
              <li key={loc.id} className="flex items-center justify-between text-sm">
                <span className="text-zinc-300">
                  {loc.label} <span className="chip ml-1">{loc.kind}</span>
                </span>
                <code className="text-xs text-zinc-500">{loc.value}</code>
              </li>
            ))}
            {project.locations.length === 0 && (
              <li className="text-sm text-zinc-600">No locations yet.</li>
            )}
          </ul>
          <form action={boundAddLocation} className="flex flex-wrap gap-2">
            <select name="kind" className="input w-auto">
              {LOCATION_KINDS.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
            <input name="label" placeholder="Label" required className="input w-32" />
            <input
              name="value"
              placeholder="Path / remote / host"
              required
              className="input flex-1"
            />
            <button type="submit" className="btn">
              Add
            </button>
          </form>
        </div>

        <div className="card">
          <h2 className="mb-3 text-sm font-medium text-zinc-100">Services</h2>
          <ul className="mb-4 space-y-2">
            {project.services.map((svc) => (
              <li key={svc.id} className="flex items-center justify-between text-sm">
                <span className="text-zinc-300">
                  {svc.name} <span className="chip ml-1">{svc.kind}</span>
                </span>
                <a href={svc.url} className="text-xs text-accent hover:underline">
                  {svc.url}
                </a>
              </li>
            ))}
            {project.services.length === 0 && (
              <li className="text-sm text-zinc-600">No services yet.</li>
            )}
          </ul>
          <form action={boundAddService} className="flex flex-wrap gap-2">
            <select name="kind" className="input w-auto">
              {SERVICE_KINDS.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
            <input name="name" placeholder="Name" required className="input w-32" />
            <input name="url" placeholder="https://..." required className="input flex-1" />
            <button type="submit" className="btn">
              Add
            </button>
          </form>
        </div>

        <div className="card">
          <h2 className="mb-3 text-sm font-medium text-zinc-100">
            Docs, inspiration &amp; integrations
          </h2>
          <ul className="mb-4 space-y-2">
            {project.resourceLinks.map((link) => (
              <li key={link.id} className="flex items-center justify-between text-sm">
                <span className="text-zinc-300">
                  {link.title} <span className="chip ml-1">{link.category}</span>
                </span>
                {isLikelyUrl(link.url) && (
                  <a href={link.url} className="text-xs text-accent hover:underline">
                    open
                  </a>
                )}
              </li>
            ))}
            {project.resourceLinks.length === 0 && (
              <li className="text-sm text-zinc-600">No links yet.</li>
            )}
          </ul>
          <form action={boundAddLink} className="flex flex-wrap gap-2">
            <select name="category" className="input w-auto">
              {LINK_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input name="title" placeholder="Title" required className="input w-32" />
            <input name="url" placeholder="https://..." required className="input flex-1" />
            <button type="submit" className="btn">
              Add
            </button>
          </form>
        </div>

        <div className="card">
          <h2 className="mb-3 text-sm font-medium text-zinc-100">
            Sessions &amp; agent context
          </h2>
          <ul className="mb-4 space-y-2">
            {project.sessions.map((s) => (
              <li key={s.id} className="flex items-center justify-between text-sm">
                <span className="text-zinc-300">
                  {s.label} <span className="chip ml-1">{s.kind}</span>
                </span>
                <code className="text-xs text-zinc-500">{s.command}</code>
              </li>
            ))}
            {project.agentContexts.map((a) => (
              <li key={a.id} className="flex items-center justify-between text-sm">
                <span className="text-zinc-300">
                  {a.label} <span className="chip ml-1">{a.agentName}</span>
                </span>
                <code className="text-xs text-zinc-500">
                  {a.resumeCommand ?? a.memoryRef}
                </code>
              </li>
            ))}
            {project.sessions.length === 0 && project.agentContexts.length === 0 && (
              <li className="text-sm text-zinc-600">
                No sessions yet. Agent-context pointers can be added via the
                API — see the README.
              </li>
            )}
          </ul>
          <form action={boundAddSession} className="flex flex-wrap gap-2">
            <select name="kind" className="input w-auto">
              {SESSION_KINDS.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
            <input name="label" placeholder="Label" required className="input w-32" />
            <input
              name="command"
              placeholder="ssh user@host / tmux new -A -s foo"
              required
              className="input flex-1"
            />
            <button type="submit" className="btn">
              Add
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
