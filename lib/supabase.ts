import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { GuestWish } from "@/types";

let supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  if (!supabase) {
    supabase = createClient(url, key);
  }
  return supabase;
}

export async function fetchWishes(): Promise<GuestWish[]> {
  const client = getSupabase();
  if (!client) return [];

  const { data, error } = await client
    .from("guest_wishes")
    .select("*")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch wishes:", error);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    relationship: row.relationship,
    message: row.message,
    createdAt: row.created_at,
    approved: row.approved,
  }));
}

export async function submitWish(
  wish: Omit<GuestWish, "id" | "createdAt" | "approved">
): Promise<{ success: boolean; error?: string }> {
  const client = getSupabase();
  if (!client) {
    return { success: false, error: "Supabase not configured" };
  }

  const { error } = await client.from("guest_wishes").insert({
    name: wish.name,
    relationship: wish.relationship,
    message: wish.message,
    approved: false,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
