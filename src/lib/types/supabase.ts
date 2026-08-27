import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database";

// Lazily construct the Supabase client on first property access instead of at module
// import. Building the app (e.g. prerendering /_not-found) imports this module without
// the NEXT_PUBLIC_SUPABASE_* env vars present; constructing eagerly threw
// "supabaseUrl is required" and failed the production build. A Proxy defers construction
// until a consumer actually uses the client at runtime, when the env is available, while
// keeping the existing `import { supabase }` usage unchanged for all consumers.
let cachedClient: SupabaseClient<Database> | null = null;

function getClient(): SupabaseClient<Database> {
  if (cachedClient) return cachedClient;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase client used without NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY set. " +
        "These are required at runtime; they are intentionally absent at build time.",
    );
  }
  cachedClient = createClient<Database>(supabaseUrl, supabaseAnonKey);
  return cachedClient;
}

export const supabase = new Proxy({} as SupabaseClient<Database>, {
  get(_target, prop, receiver) {
    const client = getClient();
    const value = Reflect.get(client as object, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});

export type { Database };
