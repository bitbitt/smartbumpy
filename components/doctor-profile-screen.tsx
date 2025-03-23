"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, Star, MapPin, Phone, Mail, MessageCircle } from "lucide-react"
import MobileHeader from "@/components/mobile-header"

interface DoctorProfileScreenProps {
  navigateTo: (screen: string) => void
}

export default function DoctorProfileScreen({ navigateTo }: DoctorProfileScreenProps) {
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null)
  const [doctor, setDoctor] = useState<any | null>(null)

  // Load selected doctor from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedDoctorId = localStorage.getItem("selectedDoctorId")
      if (storedDoctorId) {
        setSelectedDoctorId(Number.parseInt(storedDoctorId, 10))
      }
    }
  }, [])

  // Simulate fetching doctor data
  useEffect(() => {
    if (selectedDoctorId !== null) {
      // In a real app, this would be an API call
      const doctorData = {
        id: selectedDoctorId,
        name:
          selectedDoctorId === 1 ? "dr. Jane Doe, Sp.OG" : selectedDoctorId === 2 ? "dr. John Smith" : "Bidan Sarah",
        specialty:
          selectedDoctorId === 1 ? "Dokter Spesialis Kandungan" : selectedDoctorId === 2 ? "Dokter Umum" : "Bidan",
        hospital:
          selectedDoctorId === 1 ? "RS Bunda" : selectedDoctorId === 2 ? "Klinik Sehat" : "Praktik Mandiri Bidan",
        image: "/placeholder.svg?height=120&width=120",
        rating: 4.8,
        reviews: 124,
        experience: "8 tahun",
        education: [
          "Universitas Indonesia - Fakultas Kedokteran (2010-2016)",
          "Spesialis Obstetri dan Ginekologi (2016-2020)",
        ],
        about:
          "Dr. Jane Doe adalah dokter spesialis kandungan berpengalaman dengan fokus pada kesehatan ibu dan anak. Beliau telah menangani lebih dari 1000 kasus kehamilan dan persalinan.",
        schedule: [
          { day: "Senin", time: "08:00 - 12:00" },
          { day: "Rabu", time: "13:00 - 17:00" },
          { day: "Jumat", time: "08:00 - 12:00" },
        ],
        contact: {
          phone: "+62 812-3456-7890",
          email: "jane.doe@rsbunda.com",
        },
        available: selectedDoctorId !== 3,
      }

      setDoctor(doctorData)
    }
  }, [selectedDoctorId])

  // Modified back button handler to go back to medical staff screen
  const handleBack = () => {
    navigateTo("medicalStaff")
  }

  const handleConsultation = () => {
    navigateTo("doctorChat")
  }

  if (!doctor) {
    return (
      <div className="flex flex-col h-full min-h-screen w-full max-w-md bg-white rounded-xl overflow-hidden shadow-lg">
        <MobileHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-t-primary-blue border-primary-purple rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full min-h-screen w-full max-w-md bg-white rounded-xl overflow-hidden shadow-lg">
      <MobileHeader />

      <div className="bg-primary-purple p-4 flex items-center">
        <Button variant="ghost" size="sm" className="p-0 mr-2 h-8 w-8 text-white" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-lg font-semibold text-white">Profil Dokter</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Doctor Header */}
        <div className="bg-bg-purple p-6 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border-2 border-primary-purple">
            <img src={doctor.image || "/placeholder.svg"} alt={doctor.name} className="w-full h-full object-cover" />
          </div>

          <h2 className="text-lg font-semibold text-primary-purple mb-1">{doctor.name}</h2>
          <p className="text-sm text-text-gray mb-2">{doctor.specialty}</p>

          <div className="flex items-center mb-3">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="text-sm font-medium mr-1">{doctor.rating}</span>
            <span className="text-xs text-text-gray">({doctor.reviews} ulasan)</span>
          </div>

          <div className="flex items-center text-primary-blue">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{doctor.hospital}</span>
          </div>
        </div>

        {/* Doctor Info */}
        <div className="p-4">
          {/* About */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-primary-purple mb-2">Tentang Dokter</h3>
            <p className="text-sm text-text-gray">{doctor.about}</p>
          </div>

          {/* Experience */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-primary-purple mb-2">Pengalaman</h3>
            <div className="flex items-center bg-bg-light p-3 rounded-lg">
              <Clock className="h-5 w-5 text-primary-blue mr-3" />
              <div>
                <p className="text-sm font-medium">{doctor.experience}</p>
                <p className="text-xs text-text-gray">Pengalaman Praktik</p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-primary-purple mb-2">Pendidikan</h3>
            <div className="space-y-2">
              {doctor.education.map((edu: string, index: number) => (
                <div key={index} className="bg-bg-light p-3 rounded-lg">
                  <p className="text-sm">{edu}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-primary-purple mb-2">Jadwal Praktik</h3>
            <div className="space-y-2">
              {doctor.schedule.map((schedule: any, index: number) => (
                <div key={index} className="flex justify-between bg-bg-light p-3 rounded-lg">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-primary-blue mr-2" />
                    <span className="text-sm">{schedule.day}</span>
                  </div>
                  <span className="text-sm">{schedule.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-primary-purple mb-2">Kontak</h3>
            <div className="space-y-2">
              <div className="flex items-center bg-bg-light p-3 rounded-lg">
                <Phone className="h-4 w-4 text-primary-blue mr-2" />
                <span className="text-sm">{doctor.contact.phone}</span>
              </div>
              <div className="flex items-center bg-bg-light p-3 rounded-lg">
                <Mail className="h-4 w-4 text-primary-blue mr-2" />
                <span className="text-sm">{doctor.contact.email}</span>
              </div>
            </div>
          </div>

          {/* Consultation Button */}
          <Button
            onClick={handleConsultation}
            className="w-full bg-primary-blue text-white py-3 mb-4 flex items-center justify-center gap-2"
            disabled={!doctor.available}
          >
            <MessageCircle className="h-5 w-5" />
            {doctor.available ? "Mulai Konsultasi" : "Dokter Tidak Tersedia"}
          </Button>
        </div>
      </div>
    </div>
  )
}

