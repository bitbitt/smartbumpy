"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/use-auth"
import MobileHeader from "@/components/mobile-header"
import Link from "next/link"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { signIn, loading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError("Email dan password harus diisi")
      return
    }

    const { error: signInError } = await signIn(email, password)

    if (signInError) {
      setError(signInError.message)
      return
    }

    router.push("/")
    router.refresh()
  }

  return (
    <div className="flex flex-col h-full min-h-screen w-full max-w-md bg-white rounded-xl overflow-hidden shadow-lg font-poppins">
      <MobileHeader />

      <div className="bg-light-blue p-6">
        <h1 className="text-xl font-semibold text-primary-blue">Selamat datang, Bumpies!</h1>
        <p className="text-sm text-primary-blue mt-1">Silahkan masuk ke akun Anda</p>
      </div>

      <div className="flex-1 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary-blue mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="Masukkan email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-primary-blue mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="Masukkan password"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-primary-blue text-white py-2 rounded-full mt-4 font-medium"
            disabled={loading}
          >
            {loading ? "Memproses..." : "MASUK"}
          </Button>
        </form>

        <div className="mt-6">
          <p className="text-center text-sm text-text-gray">Belum punya akun?</p>
          <Link href="/register">
            <Button className="w-full bg-primary-purple text-white py-2 rounded-full mt-2 font-medium">REGISTER</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

