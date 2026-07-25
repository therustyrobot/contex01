/**
 * Best-effort launch URIs. These rely on OS/editor URL-handler registration
 * (VS Code, Cursor, iTerm, etc.) on the machine viewing the page — contex01
 * itself never executes anything server-side.
 */

export function editorLaunchUri(kind: "vscode" | "cursor", localPath: string) {
  return `${kind}://file${localPath.startsWith("/") ? "" : "/"}${localPath}`;
}

export function isLikelyUrl(value: string): boolean {
  return /^[a-z][a-z0-9+.-]*:\/\//i.test(value);
}
