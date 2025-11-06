// .obsidian/scripts/new-rp-scene.js
//
// QuickAdd user script:
// - Suggest any folder under "RP Scenes/" (including subfolders)
// - Or let user type a new path under "RP Scenes/"
// - Create the scene there; Templater handles frontmatter

module.exports = async (params) => {
  const { app, quickAddApi } = params;
  const RP_ROOT = "RP Scenes";

  // 1) Collect existing directories under RP_ROOT from file paths
  const files = app.vault.getFiles();
  const dirSet = new Set();

  for (const file of files) {
    if (!file.path.startsWith(RP_ROOT + "/")) continue;

    const parts = file.path.split("/"); // e.g. ["RP Scenes","For the Greeks","Twin Flames","File.md"]
    parts.pop(); // drop filename -> ["RP Scenes","For the Greeks","Twin Flames"]

    // We only care about folders that are at least RP_ROOT/<something>
    if (parts.length >= 2) {
      // Add every prefix from "RP Scenes/<RP>" downward
      // e.g. "RP Scenes/For the Greeks" and "RP Scenes/For the Greeks/Twin Flames"
      for (let i = 2; i <= parts.length; i++) {
        const dirPath = parts.slice(0, i).join("/");
        dirSet.add(dirPath);
      }
    }
  }

  // Turn into relative paths under RP_ROOT for display:
  // "RP Scenes/For the Greeks/Twin Flames" -> "For the Greeks/Twin Flames"
  let options = Array.from(dirSet)
    .map((fullPath) => fullPath.slice(RP_ROOT.length + 1)) // remove "RP Scenes/"
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }));

  // Always allow making something new
  options.push("+ New folder path…");

  // 2) Let user pick or define a folder path
  const choice = await quickAddApi.suggester(options, options);
  if (!choice) return;

  let relPath; // path relative to RP_ROOT, e.g. "For the Greeks/Twin Flames"

  if (choice === "+ New folder path…") {
    relPath = await quickAddApi.inputPrompt(
      'Folder under "RP Scenes" (e.g. For the Greeks/Twin Flames)'
    );
    if (!relPath) return;

    // Normalize: slashes only, strip leading/trailing slashes
    relPath = relPath
      .replace(/\\/g, "/")
      .replace(/^\/+/, "")
      .replace(/\/+$/, "");
  } else {
    relPath = choice;
  }

  if (!relPath) return;

  const rpFolderPath = `${RP_ROOT}/${relPath}`;

  // 3) Ensure all folders in the path exist
  const segs = rpFolderPath.split("/").filter(Boolean);
  let currentPath = segs[0];

  // Ensure RP_ROOT itself exists
  let abs = app.vault.getAbstractFileByPath(currentPath);
  if (!abs) {
    await app.vault.createFolder(currentPath);
  }

  for (let i = 1; i < segs.length; i++) {
    currentPath += "/" + segs[i];
    let folder = app.vault.getAbstractFileByPath(currentPath);
    if (!folder) {
      await app.vault.createFolder(currentPath);
    }
  }

  // 4) Ask for scene title
  const sceneTitle = await quickAddApi.inputPrompt(
    "Scene title (e.g. Cana & Cornelia - This scene)"
  );
  if (!sceneTitle) return;

  const filePath = `${rpFolderPath}/${sceneTitle}.md`;

  // 5) Create (or reuse) the file
  let file = app.vault.getAbstractFileByPath(filePath);
  if (!file) {
    // blank content – Templater's folder template will populate frontmatter
    file = await app.vault.create(filePath, "");
  }

  // 6) Open the new scene
  await app.workspace.getLeaf(true).openFile(file);
};
