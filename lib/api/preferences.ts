import { supabase } from "../supabase"

export async function getFoodPreferences(userId: string) {
  try {
    const { data, error } = await supabase
      .from("food_preferences")
      .select("food_name")
      .eq("user_id", userId)
      .order("created_at")

    if (error) {
      throw error
    }

    // Extract food names from data
    const preferences = data.map((item) => item.food_name)

    return { preferences, error: null }
  } catch (error) {
    console.error("Error getting food preferences:", error)
    return { preferences: [], error }
  }
}

export async function saveFoodPreferences(userId: string, preferences: string[]) {
  try {
    // First, delete all existing preferences for this user
    const { error: deleteError } = await supabase.from("food_preferences").delete().eq("user_id", userId)

    if (deleteError) {
      throw deleteError
    }

    // Then, insert new preferences
    const preferencesData = preferences.map((food_name) => ({
      user_id: userId,
      food_name,
      created_at: new Date().toISOString(),
    }))

    const { error: insertError } = await supabase.from("food_preferences").insert(preferencesData)

    if (insertError) {
      throw insertError
    }

    return { success: true, error: null }
  } catch (error) {
    console.error("Error saving food preferences:", error)
    return { success: false, error }
  }
}

