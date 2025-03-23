import { supabase } from "../supabase"

export type NutritionProgress = {
  id: string
  date: string
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
}

export type NutritionSummary = {
  calories: { value: number; target: number; percentage: number }
  carbs: { value: number; target: number; percentage: number }
  protein: { value: number; target: number; percentage: number }
  fat: { value: number; target: number; percentage: number }
  fiber: { value: number; target: number; percentage: number }
  vitaminA: { value: number; target: number; percentage: number }
  vitaminC: { value: number; target: number; percentage: number }
  vitaminD: { value: number; target: number; percentage: number }
  calcium: { value: number; target: number; percentage: number }
  iron: { value: number; target: number; percentage: number }
  folicAcid: { value: number; target: number; percentage: number }
}

// Target nutrisi harian untuk ibu hamil
const dailyTargets = {
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

export async function getNutritionProgress(userId: string, date: string) {
  try {
    const { data, error } = await supabase
      .from("nutrition_progress")
      .select("*")
      .eq("user_id", userId)
      .eq("date", date)
      .single()

    if (error && error.code !== "PGRST116") {
      // PGRST116 is "no rows returned" error
      throw error
    }

    if (!data) {
      return { progress: null, error: null }
    }

    // Transform data to match frontend format
    const progress: NutritionProgress = {
      id: data.id,
      date: data.date,
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
    }

    return { progress, error: null }
  } catch (error) {
    console.error("Error getting nutrition progress:", error)
    return { progress: null, error }
  }
}

export async function addNutritionProgress(userId: string, nutritionData: Omit<NutritionProgress, "id">) {
  try {
    // Check if there's already an entry for this date
    const { data: existingData, error: existingError } = await supabase
      .from("nutrition_progress")
      .select("id")
      .eq("user_id", userId)
      .eq("date", nutritionData.date)
      .single()

    if (existingError && existingError.code !== "PGRST116") {
      throw existingError
    }

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

    if (error) {
      throw error
    }

    // Transform data to match frontend format
    const progress: NutritionProgress = {
      id: data.id,
      date: data.date,
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
    }

    return { progress, error: null }
  } catch (error) {
    console.error("Error adding nutrition progress:", error)
    return { progress: null, error }
  }
}

export async function getNutritionSummary(userId: string): Promise<{ summary: NutritionSummary; error: any }> {
  try {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0]

    const { progress, error } = await getNutritionProgress(userId, today)

    if (error) {
      throw error
    }

    // Default values if no progress is found
    const defaultSummary: NutritionSummary = {
      calories: { value: 0, target: dailyTargets.calories, percentage: 0 },
      carbs: { value: 0, target: dailyTargets.carbs, percentage: 0 },
      protein: { value: 0, target: dailyTargets.protein, percentage: 0 },
      fat: { value: 0, target: dailyTargets.fat, percentage: 0 },
      fiber: { value: 0, target: dailyTargets.fiber, percentage: 0 },
      vitaminA: { value: 0, target: dailyTargets.vitaminA, percentage: 0 },
      vitaminC: { value: 0, target: dailyTargets.vitaminC, percentage: 0 },
      vitaminD: { value: 0, target: dailyTargets.vitaminD, percentage: 0 },
      calcium: { value: 0, target: dailyTargets.calcium, percentage: 0 },
      iron: { value: 0, target: dailyTargets.iron, percentage: 0 },
      folicAcid: { value: 0, target: dailyTargets.folicAcid, percentage: 0 },
    }

    if (!progress) {
      return { summary: defaultSummary, error: null }
    }

    // Calculate percentages
    const summary: NutritionSummary = {
      calories: {
        value: progress.calories,
        target: dailyTargets.calories,
        percentage: Math.round((progress.calories / dailyTargets.calories) * 100),
      },
      carbs: {
        value: progress.carbs,
        target: dailyTargets.carbs,
        percentage: Math.round((progress.carbs / dailyTargets.carbs) * 100),
      },
      protein: {
        value: progress.protein,
        target: dailyTargets.protein,
        percentage: Math.round((progress.protein / dailyTargets.protein) * 100),
      },
      fat: {
        value: progress.fat,
        target: dailyTargets.fat,
        percentage: Math.round((progress.fat / dailyTargets.fat) * 100),
      },
      fiber: {
        value: progress.fiber,
        target: dailyTargets.fiber,
        percentage: Math.round((progress.fiber / dailyTargets.fiber) * 100),
      },
      vitaminA: {
        value: progress.vitaminA,
        target: dailyTargets.vitaminA,
        percentage: Math.round((progress.vitaminA / dailyTargets.vitaminA) * 100),
      },
      vitaminC: {
        value: progress.vitaminC,
        target: dailyTargets.vitaminC,
        percentage: Math.round((progress.vitaminC / dailyTargets.vitaminC) * 100),
      },
      vitaminD: {
        value: progress.vitaminD,
        target: dailyTargets.vitaminD,
        percentage: Math.round((progress.vitaminD / dailyTargets.vitaminD) * 100),
      },
      calcium: {
        value: progress.calcium,
        target: dailyTargets.calcium,
        percentage: Math.round((progress.calcium / dailyTargets.calcium) * 100),
      },
      iron: {
        value: progress.iron,
        target: dailyTargets.iron,
        percentage: Math.round((progress.iron / dailyTargets.iron) * 100),
      },
      folicAcid: {
        value: progress.folicAcid,
        target: dailyTargets.folicAcid,
        percentage: Math.round((progress.folicAcid / dailyTargets.folicAcid) * 100),
      },
    }

    return { summary, error: null }
  } catch (error) {
    console.error("Error getting nutrition summary:", error)
    return {
      summary: {
        calories: { value: 0, target: dailyTargets.calories, percentage: 0 },
        carbs: { value: 0, target: dailyTargets.carbs, percentage: 0 },
        protein: { value: 0, target: dailyTargets.protein, percentage: 0 },
        fat: { value: 0, target: dailyTargets.fat, percentage: 0 },
        fiber: { value: 0, target: dailyTargets.fiber, percentage: 0 },
        vitaminA: { value: 0, target: dailyTargets.vitaminA, percentage: 0 },
        vitaminC: { value: 0, target: dailyTargets.vitaminC, percentage: 0 },
        vitaminD: { value: 0, target: dailyTargets.vitaminD, percentage: 0 },
        calcium: { value: 0, target: dailyTargets.calcium, percentage: 0 },
        iron: { value: 0, target: dailyTargets.iron, percentage: 0 },
        folicAcid: { value: 0, target: dailyTargets.folicAcid, percentage: 0 },
      },
      error,
    }
  }
}

