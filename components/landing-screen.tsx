"use client"

import { Button } from "@/components/ui/button"
import MobileHeader from "@/components/mobile-header"

interface LandingScreenProps {
  onLoginClick: () => void
  onRegisterClick: () => void
}

export default function LandingScreen({ onLoginClick, onRegisterClick }: LandingScreenProps) {
  return (
    <div className="flex flex-col h-[800px] w-full max-w-md bg-white rounded-xl overflow-hidden shadow-lg font-poppins">
      <MobileHeader />

      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-light-blue">
        <div className="w-24 h-24 rounded-full bg-primary-purple flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
        </div>

        <h1 className="text-2xl font-semibold text-primary-purple mb-2">SmartBump</h1>

        <p className="text-center text-text-gray mb-8">Aplikasi pemantau nutrisi untuk ibu hamil</p>

        <div className="w-full space-y-4">
          <Button onClick={onLoginClick} className="w-full bg-primary-blue text-white py-3 rounded-full font-medium">
            MASUK
          </Button>

          <Button
            onClick={onRegisterClick}
            className="w-full bg-primary-purple text-white py-3 rounded-full font-medium"
          >
            DAFTAR
          </Button>
        </div>
      </div>
    </div>
  )
}

