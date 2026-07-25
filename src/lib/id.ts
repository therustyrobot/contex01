import { nanoid } from "nanoid";

/** Short, URL-safe id used as the primary key for every table. */
export function newId(prefix: string): string {
  return `${prefix}_${nanoid(12)}`;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}
