"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/use-auth"
import MobileHeader from "@/components/mobile-header"
import Link from "next/link"

export default function RegisterForm() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()
  const { signUp, loading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Semua field harus diisi")
      return
    }

    if (password !== confirmPassword) {
      setError("Password tidak cocok")
      return
    }

    const { error: signUpError } = await signUp(email, password, fullName)

    if (signUpError) {
      setError(signUpError.message)
      return
    }

    setSuccess("Registrasi berhasil! Silahkan login dengan akun Anda.")

    // Redirect to login page after successful registration
    setTimeout(() => {
      router.push("/login")
    }, 2000)
  }

  return (
    <div className="flex flex-col h-full min-h-screen w-full max-w-md bg-white rounded-xl overflow-hidden shadow-lg">
      <MobileHeader />

      <div className="bg-bg-purple p-6">
        <div className="flex items-center mb-2">
          <Link href="/login">
            <div className="w-8 h-8 rounded-full bg-primary-purple flex items-center justify-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </Link>
          <span className="ml-2 text-primary-purple font-medium">Kembali</span>
        </div>

        <h1 className="text-xl font-bold text-primary-purple mt-2">Kenalan dulu, yuk!</h1>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {success ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            {success}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-primary-purple mb-1">
                Nama Lengkap
              </label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="input-field"
                placeholder="Masukkan nama lengkap"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary-purple mb-1">
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
              <label htmlFor="password" className="block text-sm font-medium text-primary-purple mb-1">
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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-primary-purple mb-1">
                Ulangi Ulang Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
                placeholder="Masukkan ulang password"
              />
              <p className="text-xs text-primary-purple mt-1">Pastikan password sesuai dengan di atas</p>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-primary-purple text-white py-2 rounded-full mt-4"
              disabled={loading}
            >
              {loading ? "Memproses..." : "Daftar"}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}

