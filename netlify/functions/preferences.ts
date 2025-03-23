import type { Handler } from "@netlify/functions"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

const handler: Handler = async (event) => {
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  // GET request untuk mendapatkan preferensi makanan
  if (event.httpMethod === "GET") {
    const userId = event.queryStringParameters?.userId

    if (!userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "User ID is required" }),
      }
    }

    try {
      const { data, error } = await supabase.from("food_preferences").select("food_name").eq("user_id", userId)

      if (error) throw error

      // Extract food names from data
      const preferences = data.map((item) => item.food_name)

      return {
        statusCode: 200,
        body: JSON.stringify({ preferences }),
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: (error as Error).message }),
      }
    }
  }

  // POST request untuk menyimpan preferensi makanan
  if (event.httpMethod === "POST") {
    try {
      const { userId, preferences } = JSON.parse(event.body || "{}")

      if (!userId || !preferences) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "User ID and preferences are required" }),
        }
      }

      // First, delete all existing preferences for this user
      const { error: deleteError } = await supabase.from("food_preferences").delete().eq("user_id", userId)

      if (deleteError) throw deleteError

      // Then, insert new preferences
      const preferencesData = preferences.map((food_name) => ({
        user_id: userId,
        food_name,
        created_at: new Date().toISOString(),
      }))

      const { error: insertError } = await supabase.from("food_preferences").insert(preferencesData)

      if (insertError) throw insertError

      return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: (error as Error).message }),
      }
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: "Method Not Allowed" }),
  }
}

export { handler }

