import type { Handler } from "@netlify/functions"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

const handler: Handler = async (event) => {
  // Hanya menerima metode POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    }
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    const { action, email, password, username } = JSON.parse(event.body || "{}")

    // Proses login
    if (action === "login") {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      return {
        statusCode: 200,
        body: JSON.stringify({ user: data.user }),
      }
    }

    // Proses registrasi
    if (action === "register") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        // Tambahkan data user ke tabel users
        const { error: profileError } = await supabase.from("users").insert({
          id: data.user.id,
          username,
          email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })

        if (profileError) throw profileError
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ user: data.user }),
      }
    }

    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid action" }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: (error as Error).message }),
    }
  }
}

export { handler }

