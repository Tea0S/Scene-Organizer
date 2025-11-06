<%*
const title = tp.file.title;

// --- Characters from title ---
// Examples:
// "Cana & Cornelia - This scene"
// "Cana, Cornelia and Nim | This scene"
// "Cana & Cornelia, Nim and Bel - Something something"

let charactersPart = title;

// Find earliest separator that splits names from scene: " - " or " | "
const seps = [" - ", " | "];
let cutIndex = -1;

for (const sep of seps) {
  const idx = title.indexOf(sep);
  if (idx !== -1 && (cutIndex === -1 || idx < cutIndex)) {
    cutIndex = idx;
  }
}

if (cutIndex !== -1) {
  charactersPart = title.substring(0, cutIndex);
}

// Split on &, comma, or the word "and" (case-insensitive), trim, drop empties
let characters = charactersPart
  .split(/\s*(?:&|,|\band\b)\s*/i)
  .map(c => c.trim())
  .filter(c => c.length > 0);

// Deduplicate while preserving order
characters = [...new Set(characters)];

// --- Roleplay from folder path ---
// Take the first folder after "RP Scenes"
const path = tp.file.path(true); // includes filename
const parts = path.split("/");

const rpIndex = parts.indexOf("RP Scenes");
let roleplay = "";

if (rpIndex !== -1 && rpIndex + 1 < parts.length) {
  roleplay = parts[rpIndex + 1];
}

// --- Build YAML frontmatter ---
let yaml = "---\n";

if (characters.length > 0) {
  yaml += "Characters:\n";
  for (const c of characters) {
    yaml += `  - ${c}\n`;
  }
} else {
  yaml += "Characters: []\n";
}

yaml += `Roleplay: ${roleplay}\n`;
yaml += "Is Scene?: true\n";
yaml += "Is Active?: true\n";
yaml += "Replied?: false\n";
yaml += "---\n";

tR = yaml;
%>
