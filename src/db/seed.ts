import { db } from "./client";
import { locations, projects, resourceLinks, services, sessions } from "./schema";
import { newId } from "../lib/id";

async function seed() {
  const projectId = newId("project");
  await db.insert(projects).values({
    id: projectId,
    slug: "contex01",
    name: "contex01",
    description: "This project, dogfooding itself.",
    icon: "🧭",
  });

  await db.insert(locations).values({
    id: newId("loc"),
    projectId,
    kind: "local_path",
    label: "Working copy",
    value: "~/Projects/contex01",
  });

  await db.insert(services).values({
    id: newId("svc"),
    projectId,
    kind: "dev_server",
    name: "Next.js dev server",
    url: "http://localhost:3000",
  });

  await db.insert(resourceLinks).values({
    id: newId("link"),
    projectId,
    category: "docs",
    title: "README",
    url: "https://github.com/therustyrobot/contex01#readme",
  });

  await db.insert(sessions).values({
    id: newId("sess"),
    projectId,
    kind: "terminal",
    label: "Dev shell",
    command: "tmux new -A -s contex01",
  });

  console.log("contex01: seeded demo data.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
