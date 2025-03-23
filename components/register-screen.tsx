"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MobileHeader from "@/components/mobile-header"

interface RegisterScreenProps {
  onRegister: () => void
  onBackClick: () => void
}

export default function RegisterScreen({ onRegister, onBackClick }: RegisterScreenProps) {
  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!fullName || !username || !password || !confirmPassword) {
      setError("Semua field harus diisi")
      return
    }

    if (password !== confirmPassword) {
      setError("Password tidak cocok")
      return
    }

    onRegister()
  }

  return (
    <div className="flex flex-col h-full min-h-screen w-full max-w-md bg-white rounded-xl overflow-hidden shadow-lg">
      <MobileHeader />

      <div className="bg-bg-purple p-6">
        <div className="flex items-center mb-2">
          <div
            className="w-8 h-8 rounded-full bg-primary-purple flex items-center justify-center cursor-pointer"
            onClick={onBackClick}
          >
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
          <span className="ml-2 text-primary-purple font-medium">Kembali</span>
        </div>

        <h1 className="text-xl font-bold text-primary-purple mt-2">Kenalan dulu, yuk!</h1>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
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
            <label htmlFor="username" className="block text-sm font-medium text-primary-purple mb-1">
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

          <Button type="submit" className="w-full bg-primary-purple text-white py-2 rounded-full mt-4">
            Daftar
          </Button>
        </form>
      </div>
    </div>
  )
}

