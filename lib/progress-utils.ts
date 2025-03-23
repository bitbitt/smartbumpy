import { supabase } from "./supabase"

// Tipe data untuk progress nutrisi
export interface NutritionProgress {
  calories: number
  carbs: number
  protein: number
  fat: number
  fiber: number
  vitaminA: number
  vitaminC: number
  vitaminD: number
  calcium: number
  iron: number
  folicAcid: number
  lastUpdated: string
}

// Target nutrisi harian untuk ibu hamil
export const dailyTargets = {
  calories: 2000,
  carbs: 250,
  protein: 60,
  fat: 65,
  fiber: 25,
  vitaminA: 700,
  vitaminC: 85,
  vitaminD: 15,
  calcium: 1000,
  iron: 27,
  folicAcid: 600,
}

// Fungsi untuk mendapatkan progress hari ini
export async function getTodayProgress(userId: string): Promise<NutritionProgress> {
  // Default progress (semua nilai 0)
  const defaultProgress: NutritionProgress = {
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
  }

  try {
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
          console.error("Error creating new progress entry:", insertError)
        }

        return defaultProgress
      }

      console.error("Error fetching nutrition progress:", error)
      return defaultProgress
    }

    // Jika ada data, kembalikan data tersebut
    return {
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
    }
  } catch (error) {
    console.error("Error in getTodayProgress:", error)
    return defaultProgress
  }
}

// Improve the progress utilities to ensure data is properly updated
export async function updateTodayProgress(userId: string, newProgress: Partial<NutritionProgress>): Promise<boolean> {
  try {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0]

    // Check if there's existing progress for today
    const { data, error } = await supabase
      .from("nutrition_progress")
      .select("id, calories, carbs, protein, fat, fiber, vitamin_a, vitamin_c, vitamin_d, calcium, iron, folic_acid")
      .eq("user_id", userId)
      .eq("date", today)
      .single()

    if (error && error.code !== "PGRST116") {
      console.error("Error checking existing progress:", error)
      return false
    }

    const updateData: any = {
      updated_at: new Date().toISOString(),
    }

    // If we have existing data, we'll replace it with new values
    // This is different from the previous implementation which added to existing values
    if (newProgress.calories !== undefined) updateData.calories = newProgress.calories
    if (newProgress.carbs !== undefined) updateData.carbs = newProgress.carbs
    if (newProgress.protein !== undefined) updateData.protein = newProgress.protein
    if (newProgress.fat !== undefined) updateData.fat = newProgress.fat
    if (newProgress.fiber !== undefined) updateData.fiber = newProgress.fiber
    if (newProgress.vitaminA !== undefined) updateData.vitamin_a = newProgress.vitaminA
    if (newProgress.vitaminC !== undefined) updateData.vitamin_c = newProgress.vitaminC
    if (newProgress.vitaminD !== undefined) updateData.vitamin_d = newProgress.vitaminD
    if (newProgress.calcium !== undefined) updateData.calcium = newProgress.calcium
    if (newProgress.iron !== undefined) updateData.iron = newProgress.iron
    if (newProgress.folicAcid !== undefined) updateData.folic_acid = newProgress.folicAcid

    let result

    if (data) {
      // Update existing data
      const { error: updateError } = await supabase.from("nutrition_progress").update(updateData).eq("id", data.id)

      if (updateError) {
        console.error("Error updating progress:", updateError)
        return false
      }
    } else {
      // Create new data
      updateData.user_id = userId
      updateData.date = today
      updateData.calories = newProgress.calories || 0
      updateData.carbs = newProgress.carbs || 0
      updateData.protein = newProgress.protein || 0
      updateData.fat = newProgress.fat || 0
      updateData.fiber = newProgress.fiber || 0
      updateData.vitamin_a = newProgress.vitaminA || 0
      updateData.vitamin_c = newProgress.vitaminC || 0
      updateData.vitamin_d = newProgress.vitaminD || 0
      updateData.calcium = newProgress.calcium || 0
      updateData.iron = newProgress.iron || 0
      updateData.folic_acid = newProgress.folicAcid || 0
      updateData.created_at = new Date().toISOString()

      const { error: insertError } = await supabase.from("nutrition_progress").insert(updateData)

      if (insertError) {
        console.error("Error creating new progress:", insertError)
        return false
      }
    }

    return true
  } catch (error) {
    console.error("Error in updateTodayProgress:", error)
    return false
  }
}

// Fungsi untuk memeriksa apakah perlu reset progress (jika hari sudah berganti)
export function checkAndResetProgress(lastUpdated: string): boolean {
  if (!lastUpdated) return true

  const lastDate = new Date(lastUpdated).toISOString().split("T")[0]
  const today = new Date().toISOString().split("T")[0]

  return lastDate !== today
}

