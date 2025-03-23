import { createClient } from "@supabase/supabase-js"

// Tipe untuk database Supabase
export type Database = {
  public: {
    tables: {
      users: {
        Row: {
          id: string
          username: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          username: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          username?: string
          email?: string
          updated_at?: string
        }
      }
      children: {
        Row: {
          id: string
          user_id: string
          name: string
          birth_date: string
          gender: string
          is_premature: boolean
          birth_weight: number
          birth_height: number
          head_circumference: number
          upper_arm_circumference: number
          has_allergies: boolean
          mother_height: number
          father_height: number
          photo_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          name: string
          birth_date: string
          gender: string
          is_premature: boolean
          birth_weight: number
          birth_height: number
          head_circumference: number
          upper_arm_circumference: number
          has_allergies: boolean
          mother_height?: number
          father_height?: number
          photo_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          birth_date?: string
          gender?: string
          is_premature?: boolean
          birth_weight?: number
          birth_height?: number
          head_circumference?: number
          upper_arm_circumference?: number
          has_allergies?: boolean
          mother_height?: number
          father_height?: number
          photo_url?: string | null
          updated_at?: string
        }
      }
      nutrition_progress: {
        Row: {
          id: string
          user_id: string
          date: string
          calories: number
          carbs: number
          protein: number
          fat: number
          fiber: number
          vitamin_a: number
          vitamin_c: number
          vitamin_d: number
          calcium: number
          iron: number
          folic_acid: number
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          date: string
          calories: number
          carbs: number
          protein: number
          fat: number
          fiber: number
          vitamin_a: number
          vitamin_c: number
          vitamin_d: number
          calcium: number
          iron: number
          folic_acid: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          date?: string
          calories?: number
          carbs?: number
          protein?: number
          fat?: number
          fiber?: number
          vitamin_a?: number
          vitamin_c?: number
          vitamin_d?: number
          calcium?: number
          iron?: number
          folic_acid?: number
          updated_at?: string
        }
      }
      food_preferences: {
        Row: {
          id: string
          user_id: string
          food_name: string
          created_at: string
        }
        Insert: {
          user_id: string
          food_name: string
          created_at?: string
        }
        Update: {
          food_name?: string
        }
      }
      recipes: {
        Row: {
          id: string
          name: string
          description: string
          image_url: string
          prep_time: string
          cook_time: string
          servings: number
          calories: number
          carbs: number
          protein: number
          fat: number
          fiber: number
          vitamin_a: number
          vitamin_c: number
          vitamin_d: number
          calcium: number
          iron: number
          folic_acid: number
          ingredients: string[]
          steps: string[]
          category: string
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          description: string
          image_url: string
          prep_time: string
          cook_time: string
          servings: number
          calories: number
          carbs: number
          protein: number
          fat: number
          fiber: number
          vitamin_a: number
          vitamin_c: number
          vitamin_d: number
          calcium: number
          iron: number
          folic_acid: number
          ingredients: string[]
          steps: string[]
          category: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          description?: string
          image_url?: string
          prep_time?: string
          cook_time?: string
          servings?: number
          calories?: number
          carbs?: number
          protein?: number
          fat?: number
          fiber?: number
          vitamin_a?: number
          vitamin_c?: number
          vitamin_d?: number
          calcium?: number
          iron?: number
          folic_acid?: number
          ingredients?: string[]
          steps?: string[]
          category?: string
          updated_at?: string
        }
      }
    }
  }
}

// Inisialisasi Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Check if we have valid URL and key before creating the client
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase URL or Anon Key. Please check your environment variables.")
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

