import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "./database.types"

export const createClient = () => {
  const cookieStore = cookies()

  // Check if running on Netlify
  const isNetlify = process.env.NETLIFY === "true"

  // Make sure we have valid environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase URL or Anon Key. Please check your environment variables.")
    // Return a dummy client or handle this case appropriately
    return createServerComponentClient<Database>({
      cookies: () => cookieStore,
      supabaseUrl: "https://placeholder-url.supabase.co",
      supabaseKey: "placeholder-key",
    })
  }

  // Create Supabase client
  return createServerComponentClient<Database>({
    cookies: () => cookieStore,
    supabaseUrl,
    supabaseKey,
  })
}

