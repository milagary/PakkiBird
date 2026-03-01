// src/config/ChangelogConfig.ts
// To add a release: prepend a new entry to the CHANGELOG array.
// Keep newest version at the top.

export interface ChangelogEntry {
  version: string;
  date: string;
  changes: string[];
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "1.0.0",
    date: "2026-03-01",
    changes: [
      "Initial release",
      "Core game loop with delta-time physics",
      "Procedural visuals — no external assets",
      "Cheat code system",
      "Progressive difficulty scaling",
      "Credits and Changelog pages",
      "GitHub Pages deployment via GitHub Actions",
    ],
  },
];