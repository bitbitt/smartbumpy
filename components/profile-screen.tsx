"use client"

import { useState, useEffect } from "react"
import MobileHeader from "@/components/mobile-header"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronRight, Key, Languages, Smartphone, FileText, Shield, LogOut } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import PhotoUpload from "@/components/photo-upload"
import { Modal } from "@/components/ui/modal"
import { useRouter } from "next/navigation"

interface ProfileScreenProps {
  navigateTo: (screen: string) => void
  username: string
}

export default function ProfileScreen({ navigateTo, username }: ProfileScreenProps) {
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false)
  const [cameFromFoodPreferences, setCameFromFoodPreferences] = useState(false)
  const { signOut, user } = useAuth()
  const router = useRouter()

  // Check if we came from food preferences screen
  useEffect(() => {
    if (typeof window !== "undefined") {
      const fromFoodPrefs = localStorage.getItem("cameFromFoodPreferences") === "true"
      setCameFromFoodPreferences(fromFoodPrefs)

      // Clear the flag after reading it
      if (fromFoodPrefs) {
        localStorage.removeItem("cameFromFoodPreferences")
      }
    }
  }, [])

  const menuItems = [
    {
      title: "Preferensi Bahan Makanan",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 000-4m0 4a2 2 0 010-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 010-4m0 4v2m0-6V4"
          />
        </svg>
      ),
    },
    {
      title: "Kondisi Kesehatan",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
    },
    {
      title: "Riwayat Medis",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
    },
  ]

  const infoItems = [
    {
      title: "Tentang Aplikasi",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Bantuan",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Kebijakan Privasi",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
  ]

  const accountItems = [
    {
      title: "Pengaturan Akun",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      action: () => {},
    },
    {
      title: "Keluar",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      ),
      action: () => setShowLogoutConfirmation(true),
    },
  ]

  const handleBack = () => {
    // If we came from food preferences, go to home instead of back to food preferences
    if (cameFromFoodPreferences) {
      navigateTo("home")
    } else {
      // Get the previous screen from localStorage or default to home
      if (typeof window !== "undefined") {
        const previousScreen = localStorage.getItem("previousScreen")
        // Check if previous screen is profile (which would cause a loop)
        if (previousScreen && previousScreen !== "profile" && previousScreen !== "foodPreferences") {
          navigateTo(previousScreen)
        } else {
          // Default to home if previous screen is profile or not set
          navigateTo("home")
        }
      } else {
        navigateTo("home")
      }
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
      // Redirect to login page after logout
      router.push("/login")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  const handleFoodPreferencesClick = () => {
    // When going to food preferences, mark that we're coming from profile
    if (typeof window !== "undefined") {
      localStorage.setItem("cameFromProfile", "true")
    }

    navigateTo("foodPreferences")
  }

  // Ubah cara generate email dari username
  const userEmail = username
    ? username.includes("@")
      ? username
      : `${username.toLowerCase().replace(/\s+/g, ".")}@example.com`
    : "user@example.com"

  return (
    <div className="flex flex-col h-full min-h-screen w-full max-w-md bg-white rounded-xl overflow-hidden shadow-lg font-poppins">
      <MobileHeader />

      {/* Purple header */}
      <div className="bg-primary-purple p-4 flex items-center">
        <Button variant="ghost" size="sm" className="p-0 mr-2 h-8 w-8 text-white" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-lg font-semibold text-white">Profil</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* User profile section */}
        <div className="flex flex-col items-center py-6 border-b border-border-gray">
          <PhotoUpload
            onPhotoUploaded={(url) => {
              // In a real app, you would save this URL to the user's profile
              console.log("Profile photo URL:", url)
              // You could call an API to update the user's profile here
            }}
            currentPhotoUrl={user?.user_metadata?.avatar_url}
            folder="profile"
            size="lg"
          />
          <h2 className="text-lg font-semibold text-primary-purple">{username || "User"}</h2>
          <p className="text-sm text-primary-purple">
            {username ? (username.includes("@") ? username.split("@")[0] : username) : "User"}
          </p>
        </div>

        {/* Food preferences button */}
        <div className="p-4">
          <button
            className="w-full bg-primary-blue text-white rounded-lg p-4 flex items-center justify-between"
            onClick={handleFoodPreferencesClick}
          >
            <span className="font-medium">Preferensi Bahan Makanan</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* General settings section */}
        <div className="px-4 pb-4">
          <h3 className="text-lg font-medium text-primary-purple mb-2">Pengaturan Umum</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-bg-light rounded-lg">
              <div className="flex items-center">
                <Key className="h-5 w-5 text-primary-blue mr-3" />
                <span className="text-primary-blue">Kelola Akun</span>
              </div>
              <ChevronRight className="h-5 w-5 text-primary-blue" />
            </div>
            <div className="flex items-center justify-between p-3 bg-bg-light rounded-lg">
              <div className="flex items-center">
                <Languages className="h-5 w-5 text-primary-blue mr-3" />
                <span className="text-primary-blue">Bahasa</span>
              </div>
              <ChevronRight className="h-5 w-5 text-primary-blue" />
            </div>
          </div>
        </div>

        {/* Information section */}
        <div className="px-4 pb-6">
          <h3 className="text-lg font-medium text-primary-purple mb-2">Informasi</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-bg-light rounded-lg">
              <div className="flex items-center">
                <Smartphone className="h-5 w-5 text-primary-blue mr-3" />
                <span className="text-primary-blue">Tentang Aplikasi</span>
              </div>
              <ChevronRight className="h-5 w-5 text-primary-blue" />
            </div>
            <div className="flex items-center justify-between p-3 bg-bg-light rounded-lg">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-primary-blue mr-3" />
                <span className="text-primary-blue">Syarat & Ketentuan</span>
              </div>
              <ChevronRight className="h-5 w-5 text-primary-blue" />
            </div>
            <div className="flex items-center justify-between p-3 bg-bg-light rounded-lg">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-primary-blue mr-3" />
                <span className="text-primary-blue">Kebijakan Privasi</span>
              </div>
              <ChevronRight className="h-5 w-5 text-primary-blue" />
            </div>
          </div>
        </div>
        <div className="px-4 pb-6">
          <h3 className="text-lg font-medium text-primary-purple mb-2">Akun</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-bg-light rounded-lg">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary-blue mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-primary-blue">Pengaturan Akun</span>
              </div>
              <ChevronRight className="h-5 w-5 text-primary-blue" />
            </div>
            <button
              onClick={() => setShowLogoutConfirmation(true)}
              className="w-full flex items-center justify-between p-3 bg-bg-light rounded-lg"
            >
              <div className="flex items-center">
                <LogOut className="h-5 w-5 text-red-500 mr-3" />
                <span className="text-red-500">Keluar Akun</span>
              </div>
              <ChevronRight className="h-5 w-5 text-red-500" />
            </button>
          </div>
        </div>
      </div>
      {/* Modal Konfirmasi Logout */}
      <Modal isOpen={showLogoutConfirmation} onClose={() => setShowLogoutConfirmation(false)} title="Konfirmasi Logout">
        <div className="p-4">
          <p className="text-sm text-text-gray mb-4">Apakah Anda yakin ingin keluar dari akun?</p>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setShowLogoutConfirmation(false)}>
              Batal
            </Button>
            <Button className="flex-1 bg-red-500 text-white" onClick={handleLogout}>
              Keluar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

