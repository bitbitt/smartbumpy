"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "./database.types"

export const createClient = () => {
  // Check if running on Netlify
  const isNetlify = process.env.NETLIFY === "true"

  // Make sure we have valid environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase URL or Anon Key. Please check your environment variables.")
    // Return a dummy client or handle this case appropriately
    return createClientComponentClient<Database>({
      supabaseUrl: "https://placeholder-url.supabase.co",
      supabaseKey: "placeholder-key",
    })
  }

  // Create Supabase client
  return createClientComponentClient<Database>({
    supabaseUrl,
    supabaseKey,
  })
}

