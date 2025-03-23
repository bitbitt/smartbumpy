import { supabase } from "./supabase"

export type User = {
  id: string
  username: string
  email: string
}

export async function signUp(email: string, password: string, username: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      throw error
    }

    if (data.user) {
      // Tambahkan data user ke tabel users
      const { error: profileError } = await supabase.from("users").insert({
        id: data.user.id,
        username,
        email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      if (profileError) {
        throw profileError
      }

      return { user: data.user, error: null }
    }

    return { user: null, error: new Error("User tidak berhasil dibuat") }
  } catch (error) {
    console.error("Error signing up:", error)
    return { user: null, error }
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw error
    }

    return { user: data.user, error: null }
  } catch (error) {
    console.error("Error signing in:", error)
    return { user: null, error }
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw error
    }
    return { error: null }
  } catch (error) {
    console.error("Error signing out:", error)
    return { error }
  }
}

export async function getCurrentUser() {
  try {
    const { data, error } = await supabase.auth.getUser()

    if (error) {
      throw error
    }

    if (data.user) {
      // Dapatkan data profil dari tabel users
      const { data: profileData, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", data.user.id)
        .single()

      if (profileError) {
        throw profileError
      }

      return { user: profileData as User, error: null }
    }

    return { user: null, error: null }
  } catch (error) {
    console.error("Error getting current user:", error)
    return { user: null, error }
  }
}

