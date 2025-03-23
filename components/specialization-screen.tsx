"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search } from "lucide-react"

interface SpecializationScreenProps {
  navigateTo: (screen: string) => void
  onSelectSpecialization?: (specialization: string) => void
}

export default function SpecializationScreen({ navigateTo, onSelectSpecialization }: SpecializationScreenProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Define specializations
  const specializations = [
    {
      id: 1,
      name: "Spesialis Kandungan",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10 text-primary-blue">
          <path
            fill="currentColor"
            d="M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M12,20c-4.42,0-8-3.58-8-8 c0-4.42,3.58-8,8-8s8,3.58,8,8C20,16.42,16.42,20,12,20z"
          />
          <path
            fill="currentColor"
            d="M13.5,12c0,0.83-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5c0-0.83,0.67-1.5,1.5-1.5S13.5,11.17,13.5,12z"
          />
          <path
            fill="currentColor"
            d="M12,6c-1.93,0-3.5,1.57-3.5,3.5c0,0.59,0.15,1.15,0.42,1.65l-0.97,1.94C7.34,14.06,8.08,15,9,15h6 c0.92,0,1.66-0.94,1.05-1.91l-0.97-1.94C15.35,10.65,15.5,10.09,15.5,9.5C15.5,7.57,13.93,6,12,6z"
          />
        </svg>
      ),
      color: "#C4E2EF",
    },
    {
      id: 2,
      name: "Spesialis Gizi Klinik",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10 text-primary-blue">
          <path
            fill="currentColor"
            d="M14,10H3v2h11V10z M14,6H3v2h11V6z M3,16h7v-2H3V16z M21.5,11.5L23,13l-6.99,7l-4.51-4.5L13,14l3.01,3L21.5,11.5z"
          />
          <path
            fill="currentColor"
            d="M17,8c0-2.76-2.24-5-5-5S7,5.24,7,8c0,1.63,0.8,3.06,2,4v2h6v-2C16.2,11.06,17,9.63,17,8z M9,8c0-1.66,1.34-3,3-3 s3,1.34,3,3s-1.34,3-3,3S9,9.66,9,8z"
          />
        </svg>
      ),
      color: "#C4E2EF",
    },
    {
      id: 3,
      name: "Spesialis Anak",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10 text-primary-blue">
          <path
            fill="currentColor"
            d="M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M12,20c-4.42,0-8-3.58-8-8 c0-4.42,3.58-8,8-8s8,3.58,8,8C20,16.42,16.42,20,12,20z"
          />
          <path fill="currentColor" d="M8,14c0-2.21,1.79-4,4-4s4,1.79,4,4H8z" />
          <path
            fill="currentColor"
            d="M10.5,10c0,0.83-0.67,1.5-1.5,1.5S7.5,10.83,7.5,10s0.67-1.5,1.5-1.5S10.5,9.17,10.5,10z"
          />
          <path
            fill="currentColor"
            d="M16.5,10c0,0.83-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5s0.67-1.5,1.5-1.5S16.5,9.17,16.5,10z"
          />
        </svg>
      ),
      color: "#C4E2EF",
    },
    {
      id: 4,
      name: "Bidan",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10 text-primary-blue">
          <path fill="currentColor" d="M9,4c0-1.11,0.89-2,2-2s2,0.89,2,2s-0.89,2-2,2S9,5.11,9,4z" />
          <path fill="currentColor" d="M16,13c-0.99-1.79-2.87-3-5-3s-4.01,1.21-5,3H16z" />
          <path fill="currentColor" d="M15,16.5c0,0-1.5,2-5,2s-5-2-5-2V20h10V16.5z" />
          <path
            fill="currentColor"
            d="M12,8c-2.21,0-4,1.79-4,4c0,2.21,1.79,4,4,4s4-1.79,4-4C16,9.79,14.21,8,12,8z M12,14c-1.1,0-2-0.9-2-2 c0-1.1,0.9-2,2-2s2,0.9,2,2C14,13.1,13.1,14,12,14z"
          />
        </svg>
      ),
      color: "#C4E2EF",
    },
    {
      id: 5,
      name: "Ahli Gizi",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10 text-primary-blue">
          <path
            fill="currentColor"
            d="M7,2C4.24,2,2,4.24,2,7c0,2.76,2.24,5,5,5c2.76,0,5-2.24,5-5C12,4.24,9.76,2,7,2z M7,10c-1.65,0-3-1.35-3-3 c0-1.65,1.35-3,3-3s3,1.35,3,3C10,8.65,8.65,10,7,10z"
          />
          <path
            fill="currentColor"
            d="M17,2c-2.76,0-5,2.24-5,5c0,2.76,2.24,5,5,5c2.76,0,5-2.24,5-5C22,4.24,19.76,2,17,2z M17,10c-1.65,0-3-1.35-3-3 c0-1.65,1.35-3,3-3s3,1.35,3,3C20,8.65,18.65,10,17,10z"
          />
          <path
            fill="currentColor"
            d="M7,12c-2.76,0-5,2.24-5,5c0,2.76,2.24,5,5,5c2.76,0,5-2.24,5-5C12,14.24,9.76,12,7,12z M7,20c-1.65,0-3-1.35-3-3 c0-1.65,1.35-3,3-3s3,1.35,3,3C10,18.65,8.65,20,7,20z"
          />
          <path
            fill="currentColor"
            d="M17,12c-2.76,0-5,2.24-5,5c0,2.76,2.24,5,5,5c2.76,0,5-2.24,5-5C22,14.24,19.76,12,17,12z M17,20 c-1.65,0-3-1.35-3-3c0-1.65,1.35-3,3-3s3,1.35,3,3C20,18.65,18.65,20,17,20z"
          />
        </svg>
      ),
      color: "#C4E2EF",
    },
    {
      id: 6,
      name: "Lainnya",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10 text-primary-blue">
          <circle fill="currentColor" cx="7" cy="7" r="3" />
          <circle fill="currentColor" cx="17" cy="7" r="3" />
          <circle fill="currentColor" cx="7" cy="17" r="3" />
          <circle fill="currentColor" cx="17" cy="17" r="3" />
        </svg>
      ),
      color: "#C4E2EF",
    },
  ]

  // Filter specializations based on search term
  const filteredSpecializations = searchTerm
    ? specializations.filter((spec) => spec.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : specializations

  // Modified back button handler to go back to home screen
  const handleBack = () => {
    navigateTo("home")
  }

  const handleSelectSpecialization = (specialization: string) => {
    if (onSelectSpecialization) {
      onSelectSpecialization(specialization)
    }

    // Store the selected specialization in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedSpecialization", specialization)
    }

    // Navigate to hospital selection
    navigateTo("hospitalSelection")
  }

  return (
    <div className="flex flex-col h-full min-h-screen w-full max-w-md bg-white rounded-xl overflow-hidden shadow-lg">
      <div className="bg-light-purple p-4 flex items-center">
        <Button variant="ghost" size="sm" className="p-0 mr-2 h-8 w-8" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5 text-primary-purple" />
        </Button>
        <div>
          <h1 className="text-lg font-semibold text-primary-purple">Penghubung Tenaga Medis</h1>
          <p className="text-xs text-text-gray">Pilih spesialisasi yang Anda butuhkan</p>
        </div>
      </div>

      <div className="p-4">
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="bg-bg-purple rounded-full flex items-center p-3 shadow-sm">
            <Search className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari dokter atau spesialis..."
              className="bg-transparent border-none flex-1 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Specialization Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-primary-purple mb-4">Pilih Spesialisasi</h2>

          <div className="grid grid-cols-3 gap-4">
            {filteredSpecializations.map((spec) => (
              <div
                key={spec.id}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => handleSelectSpecialization(spec.name)}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-2"
                  style={{ backgroundColor: spec.color }}
                >
                  {spec.icon}
                </div>
                <span className="text-xs text-primary-blue text-center">{spec.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

