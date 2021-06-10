import { getFileTree } from "./tools";

/**
 * 生成目录树
 *
 * @export
 * @returns
 */
export function createFileTree() {
  const root = process.cwd();
  const filter = [
    "node_modules",
    ".git",
    "HEAD",
    ".gitignore",
    ".vscode",
    "dist",
  ];
  return getFileTree(root, filter);
}
