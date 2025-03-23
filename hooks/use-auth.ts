"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase-browser"
import type { User } from "@supabase/supabase-js"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase.auth])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    setLoading(false)
    return { error }
  }

  const signUp = async (email: string, password: string, username: string) => {
    setLoading(true)
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    })

    if (!error && data.user) {
      // Create a profile in the users table
      await supabase.from("users").insert({
        id: data.user.id,
        username,
        email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
    }

    setLoading(false)
    return { error }
  }

  // Pastikan fungsi signOut mengarahkan ke halaman login
  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push("/login")
      return { success: true, error: null }
    } catch (error) {
      console.error("Error signing out:", error)
      return { success: false, error }
    }
  }

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  }
}

