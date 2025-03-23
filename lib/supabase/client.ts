"use client"

import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import type { Database } from "../database.types"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase URL or Anon Key. Please check your environment variables.")
    throw new Error("Missing Supabase URL or Anon Key")
  }

  return createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey)
}

