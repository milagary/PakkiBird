// src/config/CreditsConfig.ts
// To add a team member: add an entry to the CREDITS array below.

export interface CreditEntry {
  name: string;
  role: string;
  github: string;
}

export const CREDITS: CreditEntry[] = [
  {
    name: "Ramakrishna",
    role: "Lead Developer & Architect",
    github: "ramkrishna-js",
  },
  {
    name: "Manjanath",
    role: "UI & Frontend Developer",
    github: "manjunathh-xyz",
  },
];

export const ORG_NAME = "PakkiBird Dev Team";
export const ORG_GITHUB = "https://github.com/milagary/PakkiBird";