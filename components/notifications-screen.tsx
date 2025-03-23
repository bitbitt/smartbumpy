"use client"

import MobileHeader from "@/components/mobile-header"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface NotificationsScreenProps {
  navigateTo: (screen: string) => void
  username: string
}

export default function NotificationsScreen({ navigateTo, username }: NotificationsScreenProps) {
  const notifications = [
    {
      id: 1,
      title: "Pengingat Pemeriksaan USG",
      message: "Jangan lupa pemeriksaan USG Anda besok pukul 10:00 di RS Bunda.",
      time: "1 jam yang lalu",
      isNew: true,
    },
    {
      id: 2,
      title: "Tips Nutrisi Harian",
      message: "Konsumsi makanan yang kaya akan zat besi seperti bayam dan daging merah untuk mencegah anemia.",
      time: "3 jam yang lalu",
      isNew: true,
    },
    {
      id: 3,
      title: "Pengingat Minum Vitamin",
      message: "Sudahkah Anda minum vitamin prenatal hari ini?",
      time: "5 jam yang lalu",
      isNew: false,
    },
    {
      id: 4,
      title: "Milestone Perkembangan Bayi",
      message: "Minggu ke-24: Bayi Anda sekarang dapat mendengar suara dari luar rahim.",
      time: "1 hari yang lalu",
      isNew: false,
    },
  ]

  // Get the previous screen from localStorage or default to home
  const getPreviousScreen = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("previousScreen") || "home"
    }
    return "home"
  }

  const handleBack = () => {
    navigateTo(getPreviousScreen())
  }

  return (
    <div className="flex flex-col h-full min-h-screen w-full max-w-md bg-white rounded-xl overflow-hidden shadow-lg">
      <MobileHeader />

      <div className="bg-primary-blue p-4 flex items-center">
        <Button variant="ghost" size="sm" className="p-0 mr-2 h-8 w-8" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5 text-white" />
        </Button>
        <div>
          <h1 className="text-lg font-semibold text-white">Notifikasi</h1>
          <p className="text-xs text-white/80">Pemberitahuan terbaru</p>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-16 h-16 rounded-full bg-lighter-blue flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-primary-blue"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <p className="text-center text-text-gray">Belum ada notifikasi</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-xl border ${
                  notification.isNew ? "border-primary-blue bg-lighter-blue" : "border-border-gray bg-white"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-sm font-medium">{notification.title}</h3>
                  <span className="text-xs text-text-gray">{notification.time}</span>
                </div>
                <p className="text-xs text-text-gray">{notification.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

