import { desc } from "drizzle-orm";
import Link from "next/link";
import { db } from "@/db/client";
import { projects } from "@/db/schema";
import { createProject } from "./actions";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const allProjects = await db.query.projects.findMany({
    orderBy: [desc(projects.updatedAt)],
    with: { locations: true, services: true },
  });

  const active = allProjects.filter((p) => !p.archived);
  const archived = allProjects.filter((p) => p.archived);

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-lg font-medium text-zinc-100">Launchpad</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Every project you&apos;re juggling, one click from where you left off.
        </p>
      </section>

      {active.length === 0 ? (
        <p className="card text-sm text-zinc-500">
          No contexts yet. Add your first project below to start tracking its
          locations, services, docs, and sessions.
        </p>
      ) : (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {active.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="card block transition hover:border-accent"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{project.icon ?? "📁"}</span>
                <span className="font-medium text-zinc-100">{project.name}</span>
              </div>
              {project.description && (
                <p className="mt-2 line-clamp-2 text-sm text-zinc-500">
                  {project.description}
                </p>
              )}
              <div className="mt-3 flex gap-2 text-xs text-zinc-500">
                <span>{project.locations.length} locations</span>
                <span>·</span>
                <span>{project.services.length} services</span>
              </div>
            </Link>
          ))}
        </section>
      )}

      <section className="card max-w-md">
        <h2 className="mb-3 text-sm font-medium text-zinc-100">New context</h2>
        <form action={createProject} className="space-y-3">
          <input
            name="name"
            placeholder="Project name"
            required
            className="input"
          />
          <input
            name="description"
            placeholder="One-line description (optional)"
            className="input"
          />
          <input
            name="icon"
            placeholder="Icon / emoji (optional)"
            className="input"
          />
          <button type="submit" className="btn">
            Create context
          </button>
        </form>
      </section>

      {archived.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-medium text-zinc-500">
            Archived ({archived.length})
          </h2>
          <div className="flex flex-wrap gap-2">
            {archived.map((project) => (
              <Link key={project.id} href={`/projects/${project.slug}`} className="chip">
                {project.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
