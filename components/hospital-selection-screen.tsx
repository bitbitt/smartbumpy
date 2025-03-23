"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search } from "lucide-react"

interface HospitalSelectionScreenProps {
  navigateTo: (screen: string) => void
  onSelectHospital?: (hospital: string) => void
}

export default function HospitalSelectionScreen({ navigateTo, onSelectHospital }: HospitalSelectionScreenProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialization, setSelectedSpecialization] = useState("")

  // Load selected specialization from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSpecialization = localStorage.getItem("selectedSpecialization")
      if (storedSpecialization) {
        setSelectedSpecialization(storedSpecialization)
      }
    }
  }, [])

  // Define hospitals
  const hospitals = [
    {
      id: 1,
      name: "RS 1",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10 text-primary-blue">
          <path
            fill="currentColor"
            d="M19,7H5C3.9,7,3,7.9,3,9v11c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V9C21,7.9,20.1,7,19,7z M19,20H5V9h14V20z"
          />
          <path
            fill="currentColor"
            d="M12,2c-0.55,0-1,0.45-1,1v3c0,0.55,0.45,1,1,1s1-0.45,1-1V3C13,2.45,12.55,2,12,2z"
          />
          <path fill="currentColor" d="M7,2c-0.55,0-1,0.45-1,1v3c0,0.55,0.45,1,1,1s1-0.45,1-1V3C8,2.45,7.55,2,7,2z" />
          <path
            fill="currentColor"
            d="M17,2c-0.55,0-1,0.45-1,1v3c0,0.55,0.45,1,1,1s1-0.45,1-1V3C18,2.45,17.55,2,17,2z"
          />
          <path
            fill="currentColor"
            d="M14,13h-1v-1c0-0.55-0.45-1-1-1s-1,0.45-1,1v1h-1c-0.55,0-1,0.45-1,1s0.45,1,1,1h1v1c0,0.55,0.45,1,1,1 s1-0.45,1-1v-1h1c0.55,0,1-0.45,1-1S14.55,13,14,13z"
          />
        </svg>
      ),
      color: "#C4E2EF",
    },
    {
      id: 2,
      name: "RS 2",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10 text-primary-blue">
          <path
            fill="currentColor"
            d="M19,7H5C3.9,7,3,7.9,3,9v11c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V9C21,7.9,20.1,7,19,7z M19,20H5V9h14V20z"
          />
          <path
            fill="currentColor"
            d="M12,2c-0.55,0-1,0.45-1,1v3c0,0.55,0.45,1,1,1s1-0.45,1-1V3C13,2.45,12.55,2,12,2z"
          />
          <path fill="currentColor" d="M7,2c-0.55,0-1,0.45-1,1v3c0,0.55,0.45,1,1,1s1-0.45,1-1V3C8,2.45,7.55,2,7,2z" />
          <path
            fill="currentColor"
            d="M17,2c-0.55,0-1,0.45-1,1v3c0,0.55,0.45,1,1,1s1-0.45,1-1V3C18,2.45,17.55,2,17,2z"
          />
          <path
            fill="currentColor"
            d="M14,13h-1v-1c0-0.55-0.45-1-1-1s-1,0.45-1,1v1h-1c-0.55,0-1,0.45-1,1s0.45,1,1,1h1v1c0,0.55,0.45,1,1,1 s1-0.45,1-1v-1h1c0.55,0,1-0.45,1-1S14.55,13,14,13z"
          />
        </svg>
      ),
      color: "#C4E2EF",
    },
    {
      id: 3,
      name: "RS 3",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10 text-primary-blue">
          <path
            fill="currentColor"
            d="M19,7H5C3.9,7,3,7.9,3,9v11c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V9C21,7.9,20.1,7,19,7z M19,20H5V9h14V20z"
          />
          <path
            fill="currentColor"
            d="M12,2c-0.55,0-1,0.45-1,1v3c0,0.55,0.45,1,1,1s1-0.45,1-1V3C13,2.45,12.55,2,12,2z"
          />
          <path fill="currentColor" d="M7,2c-0.55,0-1,0.45-1,1v3c0,0.55,0.45,1,1,1s1-0.45,1-1V3C8,2.45,7.55,2,7,2z" />
          <path
            fill="currentColor"
            d="M17,2c-0.55,0-1,0.45-1,1v3c0,0.55,0.45,1,1,1s1-0.45,1-1V3C18,2.45,17.55,2,17,2z"
          />
          <path
            fill="currentColor"
            d="M14,13h-1v-1c0-0.55-0.45-1-1-1s-1,0.45-1,1v1h-1c-0.55,0-1,0.45-1,1s0.45,1,1,1h1v1c0,0.55,0.45,1,1,1 s1-0.45,1-1v-1h1c0.55,0,1-0.45,1-1S14.55,13,14,13z"
          />
        </svg>
      ),
      color: "#C4E2EF",
    },
    {
      id: 4,
      name: "RS 4",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10 text-primary-blue">
          <path
            fill="currentColor"
            d="M19,7H5C3.9,7,3,7.9,3,9v11c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V9C21,7.9,20.1,7,19,7z M19,20H5V9h14V20z"
          />
          <path
            fill="currentColor"
            d="M12,2c-0.55,0-1,0.45-1,1v3c0,0.55,0.45,1,1,1s1-0.45,1-1V3C13,2.45,12.55,2,12,2z"
          />
          <path fill="currentColor" d="M7,2c-0.55,0-1,0.45-1,1v3c0,0.55,0.45,1,1,1s1-0.45,1-1V3C8,2.45,7.55,2,7,2z" />
          <path
            fill="currentColor"
            d="M17,2c-0.55,0-1,0.45-1,1v3c0,0.55,0.45,1,1,1s1-0.45,1-1V3C18,2.45,17.55,2,17,2z"
          />
          <path
            fill="currentColor"
            d="M14,13h-1v-1c0-0.55-0.45-1-1-1s-1,0.45-1,1v1h-1c-0.55,0-1,0.45-1,1s0.45,1,1,1h1v1c0,0.55,0.45,1,1,1 s1-0.45,1-1v-1h1c0.55,0,1-0.45,1-1S14.55,13,14,13z"
          />
        </svg>
      ),
      color: "#C4E2EF",
    },
    {
      id: 5,
      name: "RS 5",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10 text-primary-blue">
          <path
            fill="currentColor"
            d="M19,7H5C3.9,7,3,7.9,3,9v11c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V9C21,7.9,20.1,7,19,7z M19,20H5V9h14V20z"
          />
          <path
            fill="currentColor"
            d="M12,2c-0.55,0-1,0.45-1,1v3c0,0.55,0.45,1,1,1s1-0.45,1-1V3C13,2.45,12.55,2,12,2z"
          />
          <path fill="currentColor" d="M7,2c-0.55,0-1,0.45-1,1v3c0,0.55,0.45,1,1,1s1-0.45,1-1V3C8,2.45,7.55,2,7,2z" />
          <path
            fill="currentColor"
            d="M17,2c-0.55,0-1,0.45-1,1v3c0,0.55,0.45,1,1,1s1-0.45,1-1V3C18,2.45,17.55,2,17,2z"
          />
          <path
            fill="currentColor"
            d="M14,13h-1v-1c0-0.55-0.45-1-1-1s-1,0.45-1,1v1h-1c-0.55,0-1,0.45-1,1s0.45,1,1,1h1v1c0,0.55,0.45,1,1,1 s1-0.45,1-1v-1h1c0.55,0,1-0.45,1-1S14.55,13,14,13z"
          />
        </svg>
      ),
      color: "#C4E2EF",
    },
    {
      id: 6,
      name: "RS 6",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10 text-primary-blue">
          <path
            fill="currentColor"
            d="M19,7H5C3.9,7,3,7.9,3,9v11c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V9C21,7.9,20.1,7,19,7z M19,20H5V9h14V20z"
          />
          <path
            fill="currentColor"
            d="M12,2c-0.55,0-1,0.45-1,1v3c0,0.55,0.45,1,1,1s1-0.45,1-1V3C13,2.45,12.55,2,12,2z"
          />
          <path fill="currentColor" d="M7,2c-0.55,0-1,0.45-1,1v3c0,0.55,0.45,1,1,1s1-0.45,1-1V3C8,2.45,7.55,2,7,2z" />
          <path
            fill="currentColor"
            d="M17,2c-0.55,0-1,0.45-1,1v3c0,0.55,0.45,1,1,1s1-0.45,1-1V3C18,2.45,17.55,2,17,2z"
          />
          <path
            fill="currentColor"
            d="M14,13h-1v-1c0-0.55-0.45-1-1-1s-1,0.45-1,1v1h-1c-0.55,0-1,0.45-1,1s0.45,1,1,1h1v1c0,0.55,0.45,1,1,1 s1-0.45,1-1v-1h1c0.55,0,1-0.45,1-1S14.55,13,14,13z"
          />
        </svg>
      ),
      color: "#C4E2EF",
    },
  ]

  // Filter hospitals based on search term
  const filteredHospitals = searchTerm
    ? hospitals.filter((hospital) => hospital.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : hospitals

  // Modified back button handler to go back to specialization screen
  const handleBack = () => {
    navigateTo("specialization")
  }

  const handleSelectHospital = (hospital: string) => {
    if (onSelectHospital) {
      onSelectHospital(hospital)
    }

    // Store the selected hospital in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedHospital", hospital)
    }

    // Navigate to medical staff screen
    navigateTo("medicalStaff")
  }

  return (
    <div className="flex flex-col h-full min-h-screen w-full max-w-md bg-white rounded-xl overflow-hidden shadow-lg">
      <div className="bg-light-purple p-4 flex items-center">
        <Button variant="ghost" size="sm" className="p-0 mr-2 h-8 w-8" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5 text-primary-purple" />
        </Button>
        <div>
          <h1 className="text-lg font-semibold text-primary-purple">Penghubung Tenaga Medis</h1>
          <p className="text-xs text-text-gray">
            {selectedSpecialization ? `${selectedSpecialization} - ` : ""}
            Pilih rumah sakit
          </p>
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
              placeholder="Cari rumah sakit..."
              className="bg-transparent border-none flex-1 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Hospital Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-primary-purple mb-4">Pilih Rumah Sakit</h2>

          <div className="grid grid-cols-3 gap-4">
            {filteredHospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => handleSelectHospital(hospital.name)}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-2"
                  style={{ backgroundColor: hospital.color }}
                >
                  {hospital.icon}
                </div>
                <span className="text-xs text-primary-blue text-center">{hospital.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

