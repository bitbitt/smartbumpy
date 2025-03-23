"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MobileHeader from "@/components/mobile-header"

interface LoginScreenProps {
  onLogin: (username: string, password: string) => void
  onRegisterClick: () => void
}

export default function LoginScreen({ onLogin, onRegisterClick }: LoginScreenProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !password) {
      setError("Username dan password harus diisi")
      return
    }

    onLogin(username, password)
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
            <label htmlFor="username" className="block text-sm font-medium text-primary-blue mb-1">
              Username
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              placeholder="Masukkan username"
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

          <Button type="submit" className="w-full bg-primary-blue text-white py-2 rounded-full mt-4 font-medium">
            LOG IN
          </Button>
        </form>

        <div className="mt-6">
          <p className="text-center text-sm text-text-gray">Belum punya akun?</p>
          <Button
            onClick={onRegisterClick}
            className="w-full bg-primary-purple text-white py-2 rounded-full mt-2 font-medium"
          >
            REGISTER
          </Button>
        </div>
      </div>
    </div>
  )
}

