export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          username: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          email?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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
          mother_height: number | null
          father_height: number | null
          photo_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
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
          mother_height?: number | null
          father_height?: number | null
          photo_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          birth_date?: string
          gender?: string
          is_premature?: boolean
          birth_weight?: number
          birth_height?: number
          head_circumference?: number
          upper_arm_circumference?: number
          has_allergies?: boolean
          mother_height?: number | null
          father_height?: number | null
          photo_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "children_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      // Add other tables here...
    }
  }
}

