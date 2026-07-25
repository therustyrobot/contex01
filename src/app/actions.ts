"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { locations, projects, resourceLinks, services, sessions } from "@/db/schema";
import { newId, slugify } from "@/lib/id";

export async function createProject(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) throw new Error("Project name is required.");

  const description = String(formData.get("description") ?? "").trim() || null;
  const icon = String(formData.get("icon") ?? "").trim() || null;

  const baseSlug = slugify(name) || newId("project");
  let slug = baseSlug;
  let suffix = 1;
  while (await db.query.projects.findFirst({ where: eq(projects.slug, slug) })) {
    suffix += 1;
    slug = `${baseSlug}-${suffix}`;
  }

  await db.insert(projects).values({
    id: newId("project"),
    slug,
    name,
    description,
    icon,
  });

  revalidatePath("/");
  redirect(`/projects/${slug}`);
}

export async function archiveProject(projectId: string, archived: boolean) {
  await db.update(projects).set({ archived }).where(eq(projects.id, projectId));
  revalidatePath("/");
}

export async function addLocation(projectId: string, formData: FormData) {
  await db.insert(locations).values({
    id: newId("loc"),
    projectId,
    kind: String(formData.get("kind")) as "local_path" | "git_remote" | "remote_host",
    label: String(formData.get("label")),
    value: String(formData.get("value")),
  });
  revalidatePath(`/projects`);
}

export async function addService(projectId: string, formData: FormData) {
  await db.insert(services).values({
    id: newId("svc"),
    projectId,
    kind: String(formData.get("kind")) as
      | "dev_server"
      | "staging"
      | "production"
      | "admin"
      | "other",
    name: String(formData.get("name")),
    url: String(formData.get("url")),
  });
  revalidatePath(`/projects`);
}

export async function addResourceLink(projectId: string, formData: FormData) {
  await db.insert(resourceLinks).values({
    id: newId("link"),
    projectId,
    category: String(formData.get("category")) as
      | "docs"
      | "inspiration"
      | "design"
      | "integration"
      | "other",
    title: String(formData.get("title")),
    url: String(formData.get("url")),
    notes: String(formData.get("notes") ?? "").trim() || null,
  });
  revalidatePath(`/projects`);
}

export async function addSession(projectId: string, formData: FormData) {
  await db.insert(sessions).values({
    id: newId("sess"),
    projectId,
    kind: String(formData.get("kind")) as "ssh" | "terminal",
    label: String(formData.get("label")),
    command: String(formData.get("command")),
  });
  revalidatePath(`/projects`);
}
