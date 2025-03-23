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
    const { userId, progress } = JSON.parse(event.body || "{}")

    if (!userId || !progress) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "User ID and progress data are required" }),
      }
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Dapatkan tanggal hari ini dalam format YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0]

    // Cek apakah ada data progress untuk hari ini
    const { data, error } = await supabase
      .from("nutrition_progress")
      .select("id")
      .eq("user_id", userId)
      .eq("date", today)
      .single()

    if (error && error.code !== "PGRST116") {
      throw error
    }

    const updateData: any = {
      updated_at: new Date().toISOString(),
    }

    // Tambahkan field yang ada di progress
    if (progress.calories !== undefined) updateData.calories = progress.calories
    if (progress.carbs !== undefined) updateData.carbs = progress.carbs
    if (progress.protein !== undefined) updateData.protein = progress.protein
    if (progress.fat !== undefined) updateData.fat = progress.fat
    if (progress.fiber !== undefined) updateData.fiber = progress.fiber
    if (progress.vitaminA !== undefined) updateData.vitamin_a = progress.vitaminA
    if (progress.vitaminC !== undefined) updateData.vitamin_c = progress.vitaminC
    if (progress.vitaminD !== undefined) updateData.vitamin_d = progress.vitaminD
    if (progress.calcium !== undefined) updateData.calcium = progress.calcium
    if (progress.iron !== undefined) updateData.iron = progress.iron
    if (progress.folicAcid !== undefined) updateData.folic_acid = progress.folicAcid

    let result

    if (data) {
      // Update data yang sudah ada
      result = await supabase.from("nutrition_progress").update(updateData).eq("id", data.id).select().single()
    } else {
      // Buat data baru
      updateData.user_id = userId
      updateData.date = today
      updateData.calories = progress.calories || 0
      updateData.carbs = progress.carbs || 0
      updateData.protein = progress.protein || 0
      updateData.fat = progress.fat || 0
      updateData.fiber = progress.fiber || 0
      updateData.vitamin_a = progress.vitaminA || 0
      updateData.vitamin_c = progress.vitaminC || 0
      updateData.vitamin_d = progress.vitaminD || 0
      updateData.calcium = progress.calcium || 0
      updateData.iron = progress.iron || 0
      updateData.folic_acid = progress.folicAcid || 0
      updateData.created_at = new Date().toISOString()

      result = await supabase.from("nutrition_progress").insert(updateData).select().single()
    }

    if (result.error) {
      throw result.error
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        progress: {
          calories: result.data.calories,
          carbs: result.data.carbs,
          protein: result.data.protein,
          fat: result.data.fat,
          fiber: result.data.fiber,
          vitaminA: result.data.vitamin_a,
          vitaminC: result.data.vitamin_c,
          vitaminD: result.data.vitamin_d,
          calcium: result.data.calcium,
          iron: result.data.iron,
          folicAcid: result.data.folic_acid,
          lastUpdated: result.data.updated_at,
        },
      }),
    }
  } catch (error) {
    console.error("Error updating daily progress:", error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: (error as Error).message }),
    }
  }
}

export { handler }

