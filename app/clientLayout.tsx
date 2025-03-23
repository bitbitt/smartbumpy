"use client"

import type React from "react"
import { Poppins } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/AuthContext"

// Import setupStorage
import { setupStorage } from "@/lib/setup-storage"

// Add useEffect to setup storage
// Add this inside the RootLayout component, before the return statement:
// Note: This is a client component, so we need to use 'use client' directive

import { useEffect } from "react"

// Initialize Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Setup storage bucket when app loads
  useEffect(() => {
    setupStorage()
  }, [])

  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-poppins">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}

