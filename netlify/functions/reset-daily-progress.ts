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

    // Dapatkan tanggal kemarin dalam format YYYY-MM-DD
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split("T")[0]

    // Dapatkan tanggal hari ini dalam format YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0]

    // Dapatkan semua user yang memiliki progress kemarin
    const { data: users, error: usersError } = await supabase
      .from("nutrition_progress")
      .select("user_id")
      .eq("date", yesterdayStr)
      .order("user_id")

    if (usersError) {
      throw usersError
    }

    // Buat array unik dari user_id
    const uniqueUserIds = [...new Set(users.map((user) => user.user_id))]

    // Untuk setiap user, buat entry progress baru untuk hari ini dengan nilai 0
    for (const userId of uniqueUserIds) {
      // Cek apakah sudah ada entry untuk hari ini
      const { data: existingEntry, error: checkError } = await supabase
        .from("nutrition_progress")
        .select("id")
        .eq("user_id", userId)
        .eq("date", today)
        .single()

      if (checkError && checkError.code !== "PGRST116") {
        console.error(`Error checking entry for user ${userId}:`, checkError)
        continue
      }

      // Jika belum ada entry, buat entry baru
      if (!existingEntry) {
        const { error: insertError } = await supabase.from("nutrition_progress").insert({
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

        if (insertError) {
          console.error(`Error creating entry for user ${userId}:`, insertError)
        }
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Daily progress reset successful",
        usersProcessed: uniqueUserIds.length,
      }),
    }
  } catch (error) {
    console.error("Error resetting daily progress:", error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: (error as Error).message }),
    }
  }
}

export { handler }

