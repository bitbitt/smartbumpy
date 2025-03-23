import type { Handler } from "@netlify/functions"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

const handler: Handler = async (event) => {
  // Hanya menerima metode GET
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    }
  }

  const userId = event.queryStringParameters?.userId

  if (!userId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "User ID is required" }),
    }
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Dapatkan tanggal hari ini dalam format YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0]

    // Cek apakah ada data progress untuk hari ini
    const { data, error } = await supabase
      .from("nutrition_progress")
      .select("*")
      .eq("user_id", userId)
      .eq("date", today)
      .single()

    if (error) {
      // Jika tidak ada data untuk hari ini, kembalikan default progress
      if (error.code === "PGRST116") {
        // Buat entry baru untuk hari ini
        const { data: newData, error: insertError } = await supabase
          .from("nutrition_progress")
          .insert({
            user_id: userId,
            date: today,
            calories: 0,
            carbs: 0,
            protein: 0,
            fat: 0,
            fiber: 0,
            vitamin_a: 0,
            vitamin_c: 0,
            vitamin_d: 0,
            calcium: 0,
            iron: 0,
            folic_acid: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select()
          .single()

        if (insertError) {
          throw insertError
        }

        return {
          statusCode: 200,
          body: JSON.stringify({
            progress: {
              calories: 0,
              carbs: 0,
              protein: 0,
              fat: 0,
              fiber: 0,
              vitaminA: 0,
              vitaminC: 0,
              vitaminD: 0,
              calcium: 0,
              iron: 0,
              folicAcid: 0,
              lastUpdated: new Date().toISOString(),
            },
          }),
        }
      }

      throw error
    }

    // Jika ada data, kembalikan data tersebut
    return {
      statusCode: 200,
      body: JSON.stringify({
        progress: {
          calories: data.calories,
          carbs: data.carbs,
          protein: data.protein,
          fat: data.fat,
          fiber: data.fiber,
          vitaminA: data.vitamin_a,
          vitaminC: data.vitamin_c,
          vitaminD: data.vitamin_d,
          calcium: data.calcium,
          iron: data.iron,
          folicAcid: data.folic_acid,
          lastUpdated: data.updated_at,
        },
      }),
    }
  } catch (error) {
    console.error("Error getting daily progress:", error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: (error as Error).message }),
    }
  }
}

export { handler }

