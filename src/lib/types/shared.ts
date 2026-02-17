/**
 * Shared types used across LC, EL, and Hub.
 *
 * Keep this file in sync across all three repos.
 * If this grows beyond ~200 LOC, consider a shared npm package.
 */

/** Common user profile shape (subset of what Supabase auth returns) */
export interface UserProfile {
  id: string;
  email: string;
  display_name?: string;
  avatar_url?: string;
}

/** App identifiers for routing and auth redirects */
export type AppId = "lc" | "el" | "hub";

/** Domain map for cross-app linking */
export const APP_DOMAINS: Record<AppId, string> = {
  lc: process.env.NEXT_PUBLIC_LC_URL || "https://logbook.readyall.org",
  el: process.env.NEXT_PUBLIC_EL_URL || "https://erg.train-better.app",
  hub: process.env.NEXT_PUBLIC_HUB_URL || "https://train-better.app",
};
