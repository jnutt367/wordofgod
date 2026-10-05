/* Builds public/search-index.json from data/chapters/*.json
 * Run automatically via the `prebuild` npm script.
 */
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const chaptersDir = path.join(root, "data", "chapters");
const outFile = path.join(root, "public", "search-index.json");

const files = (await fs.readdir(chaptersDir)).filter((f) =>
  f.endsWith("_data.json")
);

const index = [];
for (const file of files.sort()) {
  const slug = file.slice(0, -"_data.json".length);
  const page = `${slug}.html`;
  const data = JSON.parse(
    await fs.readFile(path.join(chaptersDir, file), "utf-8")
  );
  (data.books || []).forEach((b, i) => {
    const title = (b.title || "").trim();
    const text = (b.description || "").trim();
    if (!title || !text) return;
    index.push({ p: page, i, t: title, x: text.slice(0, 180) });
  });
}

await fs.mkdir(path.dirname(outFile), { recursive: true });
await fs.writeFile(outFile, JSON.stringify(index));
const kb = (await fs.stat(outFile)).size / 1024;
console.log(`search index: ${index.length} entries, ${kb.toFixed(0)} KB`);
