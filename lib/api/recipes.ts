import { supabase } from "../supabase"

export type Recipe = {
  id: string
  name: string
  description: string
  imageUrl: string
  prepTime: string
  cookTime: string
  servings: number
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
  ingredients: string[]
  steps: string[]
  category: string
}

export async function getRecipes() {
  try {
    const { data, error } = await supabase.from("recipes").select("*").order("name")

    if (error) {
      throw error
    }

    // Transform data to match frontend format
    const recipes = data.map((recipe) => ({
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      imageUrl: recipe.image_url,
      prepTime: recipe.prep_time,
      cookTime: recipe.cook_time,
      servings: recipe.servings,
      calories: recipe.calories,
      carbs: recipe.carbs,
      protein: recipe.protein,
      fat: recipe.fat,
      fiber: recipe.fiber,
      vitaminA: recipe.vitamin_a,
      vitaminC: recipe.vitamin_c,
      vitaminD: recipe.vitamin_d,
      calcium: recipe.calcium,
      iron: recipe.iron,
      folicAcid: recipe.folic_acid,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      category: recipe.category,
    }))

    return { recipes, error: null }
  } catch (error) {
    console.error("Error getting recipes:", error)
    return { recipes: [], error }
  }
}

export async function getRecipeById(recipeId: string) {
  try {
    const { data, error } = await supabase.from("recipes").select("*").eq("id", recipeId).single()

    if (error) {
      throw error
    }

    // Transform data to match frontend format
    const recipe: Recipe = {
      id: data.id,
      name: data.name,
      description: data.description,
      imageUrl: data.image_url,
      prepTime: data.prep_time,
      cookTime: data.cook_time,
      servings: data.servings,
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
      ingredients: data.ingredients,
      steps: data.steps,
      category: data.category,
    }

    return { recipe, error: null }
  } catch (error) {
    console.error("Error getting recipe:", error)
    return { recipe: null, error }
  }
}

export async function getRecipesByCategory(category: string) {
  try {
    const { data, error } = await supabase.from("recipes").select("*").eq("category", category).order("name")

    if (error) {
      throw error
    }

    // Transform data to match frontend format
    const recipes = data.map((recipe) => ({
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      imageUrl: recipe.image_url,
      prepTime: recipe.prep_time,
      cookTime: recipe.cook_time,
      servings: recipe.servings,
      calories: recipe.calories,
      carbs: recipe.carbs,
      protein: recipe.protein,
      fat: recipe.fat,
      fiber: recipe.fiber,
      vitaminA: recipe.vitamin_a,
      vitaminC: recipe.vitamin_c,
      vitaminD: recipe.vitamin_d,
      calcium: recipe.calcium,
      iron: recipe.iron,
      folicAcid: recipe.folic_acid,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      category: recipe.category,
    }))

    return { recipes, error: null }
  } catch (error) {
    console.error("Error getting recipes by category:", error)
    return { recipes: [], error }
  }
}

