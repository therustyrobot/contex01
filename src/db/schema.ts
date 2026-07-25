import { relations, sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/sqlite-core";

/**
 * A "context" is the unit contex01 organizes work around: one project /
 * workstream, with everything you need to jump back into it. contex01 stores
 * pointers and metadata — it does not host source, docs, or agent memory
 * itself.
 */
export const projects = sqliteTable("projects", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  icon: text("icon"), // emoji or short glyph shown on the launchpad card
  color: text("color"), // accent color for the card, e.g. "#5eead4"
  archived: integer("archived", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

/** Where the project actually lives: local checkout, remote repo, server. */
export const locations = sqliteTable("locations", {
  id: text("id").primaryKey(),
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  kind: text("kind", {
    enum: ["local_path", "git_remote", "remote_host"],
  }).notNull(),
  label: text("label").notNull(),
  value: text("value").notNull(), // e.g. /Users/me/code/foo, git@github.com:org/repo, prod-box-1
  launchUri: text("launch_uri"), // e.g. vscode://file/... or cursor://...
  sortOrder: integer("sort_order").notNull().default(0),
});

/** Running services tied to the project: dev server, staging, admin panel. */
export const services = sqliteTable("services", {
  id: text("id").primaryKey(),
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  kind: text("kind", {
    enum: ["dev_server", "staging", "production", "admin", "other"],
  }).notNull(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  healthCheckUrl: text("health_check_url"),
  sortOrder: integer("sort_order").notNull().default(0),
});

/** Docs, inspiration, design refs, and third-party integrations — link-only. */
export const resourceLinks = sqliteTable("resource_links", {
  id: text("id").primaryKey(),
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  category: text("category", {
    enum: ["docs", "inspiration", "design", "integration", "other"],
  }).notNull(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  notes: text("notes"),
  sortOrder: integer("sort_order").notNull().default(0),
});

/** SSH targets and saved terminal launch commands for a project. */
export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  kind: text("kind", { enum: ["ssh", "terminal"] }).notNull(),
  label: text("label").notNull(),
  command: text("command").notNull(), // e.g. "ssh deploy@1.2.3.4" or "tmux new -A -s foo"
  lastUsedAt: text("last_used_at"),
  sortOrder: integer("sort_order").notNull().default(0),
});

/**
 * A pointer to an AI agent's session/memory for this project (Claude,
 * Cursor, Codex, a local vector store, ...). contex01 tracks *where* that
 * context lives and how to reopen it — it does not store the memory itself.
 */
export const agentContexts = sqliteTable("agent_contexts", {
  id: text("id").primaryKey(),
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  agentName: text("agent_name").notNull(), // e.g. "Claude Code", "Cursor", "Codex CLI"
  label: text("label").notNull(),
  resumeCommand: text("resume_command"), // e.g. "claude --resume abc123"
  memoryRef: text("memory_ref"), // free-form pointer: file path, URL, session id
  lastSyncedAt: text("last_synced_at"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const tags = sqliteTable("tags", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  color: text("color"),
});

export const projectTags = sqliteTable(
  "project_tags",
  {
    projectId: text("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    tagId: text("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.projectId, t.tagId] })],
);

export const projectsRelations = relations(projects, ({ many }) => ({
  locations: many(locations),
  services: many(services),
  resourceLinks: many(resourceLinks),
  sessions: many(sessions),
  agentContexts: many(agentContexts),
  projectTags: many(projectTags),
}));

export const locationsRelations = relations(locations, ({ one }) => ({
  project: one(projects, { fields: [locations.projectId], references: [projects.id] }),
}));

export const servicesRelations = relations(services, ({ one }) => ({
  project: one(projects, { fields: [services.projectId], references: [projects.id] }),
}));

export const resourceLinksRelations = relations(resourceLinks, ({ one }) => ({
  project: one(projects, { fields: [resourceLinks.projectId], references: [projects.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  project: one(projects, { fields: [sessions.projectId], references: [projects.id] }),
}));

export const agentContextsRelations = relations(agentContexts, ({ one }) => ({
  project: one(projects, { fields: [agentContexts.projectId], references: [projects.id] }),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  projectTags: many(projectTags),
}));

export const projectTagsRelations = relations(projectTags, ({ one }) => ({
  project: one(projects, { fields: [projectTags.projectId], references: [projects.id] }),
  tag: one(tags, { fields: [projectTags.tagId], references: [tags.id] }),
}));
