import type { Handler } from "@netlify/functions"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

const handler: Handler = async (event) => {
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  // GET request untuk mendapatkan data nutrisi
  if (event.httpMethod === "GET") {
    const userId = event.queryStringParameters?.userId
    const date = event.queryStringParameters?.date

    if (!userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "User ID is required" }),
      }
    }

    try {
      let query = supabase.from("nutrition_progress").select("*").eq("user_id", userId)

      if (date) {
        query = query.eq("date", date)
      }

      const { data, error } = await query

      if (error) throw error

      return {
        statusCode: 200,
        body: JSON.stringify({ nutrition: data }),
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: (error as Error).message }),
      }
    }
  }

  // POST request untuk menambahkan data nutrisi
  if (event.httpMethod === "POST") {
    try {
      const { userId, nutritionData } = JSON.parse(event.body || "{}")

      if (!userId || !nutritionData) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "User ID and nutrition data are required" }),
        }
      }

      // Check if there's already an entry for this date
      const { data: existingData, error: existingError } = await supabase
        .from("nutrition_progress")
        .select("id")
        .eq("user_id", userId)
        .eq("date", nutritionData.date)
        .single()

      let result

      if (existingData) {
        // Update existing entry
        result = await supabase
          .from("nutrition_progress")
          .update({
            calories: nutritionData.calories,
            carbs: nutritionData.carbs,
            protein: nutritionData.protein,
            fat: nutritionData.fat,
            fiber: nutritionData.fiber,
            vitamin_a: nutritionData.vitaminA,
            vitamin_c: nutritionData.vitaminC,
            vitamin_d: nutritionData.vitaminD,
            calcium: nutritionData.calcium,
            iron: nutritionData.iron,
            folic_acid: nutritionData.folicAcid,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingData.id)
          .select()
          .single()
      } else {
        // Insert new entry
        result = await supabase
          .from("nutrition_progress")
          .insert({
            user_id: userId,
            date: nutritionData.date,
            calories: nutritionData.calories,
            carbs: nutritionData.carbs,
            protein: nutritionData.protein,
            fat: nutritionData.fat,
            fiber: nutritionData.fiber,
            vitamin_a: nutritionData.vitaminA,
            vitamin_c: nutritionData.vitaminC,
            vitamin_d: nutritionData.vitaminD,
            calcium: nutritionData.calcium,
            iron: nutritionData.iron,
            folic_acid: nutritionData.folicAcid,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select()
          .single()
      }

      const { data, error } = result

      if (error) throw error

      return {
        statusCode: 200,
        body: JSON.stringify({ nutrition: data }),
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

