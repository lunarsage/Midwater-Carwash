/**
 * Prototype login — email/password pairs below.
 *
 * Admin (both land on /admin):
 *   admin@midwater.co.za       / MidwaterAdmin2026!
 *   operations@midwater.co.za    / MidwaterOps2026!
 *
 * Customer (example seeded account):
 *   customer@midwater.co.za      / Customer2026!
 *
 * Any other email + non-empty password signs in as a customer; the display name
 * is derived from the email (e.g. jane.smith@mail.com → "Jane Smith").
 */

export type UserRole = "customer" | "admin";

export interface SeededAccount {
  email: string;
  password: string;
  /** Shown in the app after login for this account */
  name: string;
  role: UserRole;
}

export const SEEDED_ACCOUNTS: SeededAccount[] = [
  {
    email: "admin@midwater.co.za",
    password: "MidwaterAdmin2026!",
    name: "Nomsa Nkosi",
    role: "admin",
  },
  {
    email: "operations@midwater.co.za",
    password: "MidwaterOps2026!",
    name: "Pieter van der Merwe",
    role: "admin",
  },
  {
    email: "customer@midwater.co.za",
    password: "Customer2026!",
    name: "Lerato Mokoena",
    role: "customer",
  },
];

export function findSeededAccount(
  email: string,
  password: string
): SeededAccount | null {
  const e = email.trim().toLowerCase();
  return (
    SEEDED_ACCOUNTS.find((a) => a.email === e && a.password === password) ??
    null
  );
}

/** When the user is not on a seeded account, build a friendly name from the local part of the email */
export function displayNameFromEmail(email: string): string {
  const local = email.split("@")[0]?.trim() ?? "Guest";
  return local
    .replace(/[._+-]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ") || "Guest";
}

export function firstName(fullName: string): string {
  const part = fullName.trim().split(/\s+/)[0];
  return part || "there";
}

export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase() || "?";
}
