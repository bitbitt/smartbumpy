import type { Handler } from "@netlify/functions"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

const handler: Handler = async (event) => {
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  // GET request untuk mendapatkan data resep
  if (event.httpMethod === "GET") {
    const recipeId = event.queryStringParameters?.id
    const category = event.queryStringParameters?.category

    try {
      let query = supabase.from("recipes").select("*")

      if (recipeId) {
        query = query.eq("id", recipeId).single()
      } else if (category) {
        query = query.eq("category", category)
      }

      const { data, error } = await query

      if (error) throw error

      return {
        statusCode: 200,
        body: JSON.stringify({ recipes: data }),
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

