"use client"

import { useState } from "react"
import MobileHeader from "@/components/mobile-header"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BarChart2, MessageCircle, Users, ExternalLink } from "lucide-react"

interface ChildDetailScreenProps {
  navigateTo: (screen: string) => void
  selectedChild: any
  username: string
}

export default function ChildDetailScreen({ navigateTo, selectedChild, username }: ChildDetailScreenProps) {
  const [showGrowthAnalysis, setShowGrowthAnalysis] = useState(false)

  const childMetrics = [
    {
      id: 1,
      title: "Perkembangan Anak",
      description: `Minggu ke-${selectedChild?.week || 24}`,
      image: "/placeholder.svg?height=80&width=120",
    },
    {
      id: 2,
      title: "Berat Badan",
      description: selectedChild?.birthWeight ? `${selectedChild.birthWeight} kg` : "Belum diisi",
      image: "/placeholder.svg?height=80&width=120",
    },
    {
      id: 3,
      title: "Tinggi Badan",
      description: selectedChild?.birthHeight ? `${selectedChild.birthHeight} cm` : "Belum diisi",
      image: "/placeholder.svg?height=80&width=120",
    },
    {
      id: 4,
      title: "Lingkar Kepala",
      description: selectedChild?.headCircumference ? `${selectedChild.headCircumference} cm` : "Belum diisi",
      image: "/placeholder.svg?height=80&width=120",
    },
    {
      id: 5,
      title: "Lingkar Lengan Atas",
      description: selectedChild?.upperArmCircumference ? `${selectedChild.upperArmCircumference} cm` : "Belum diisi",
      image: "/placeholder.svg?height=80&width=120",
    },
  ]

  const handleAnalyzeGrowth = () => {
    setShowGrowthAnalysis(true)
  }

  return (
    <div className="flex flex-col h-full min-h-screen w-full max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-lg font-poppins">
      <MobileHeader />

      {showGrowthAnalysis ? (
        <>
          <div className="bg-light-blue p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="p-0 mr-2 h-8 w-8"
                onClick={() => setShowGrowthAnalysis(false)}
              >
                <ArrowLeft className="h-5 w-5 text-primary-blue" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-primary-blue">Analisis Pertumbuhan</h1>
                <p className="text-xs text-primary-blue">{selectedChild?.name || "Anak"}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-lighter-blue">
            <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
              <h2 className="text-base font-semibold text-primary-blue mb-2">Hasil Analisis Pertumbuhan</h2>
              <p className="text-sm text-primary-blue mb-4">
                Berdasarkan standar WHO, pertumbuhan {selectedChild?.name || "anak"} berada dalam kategori:
              </p>

              <div className="bg-lighter-blue p-3 rounded-lg mb-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary-blue flex items-center justify-center mr-2">
                    <BarChart2 className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-primary-blue">Status Pertumbuhan</h3>
                </div>
                <p className="text-sm font-semibold text-primary-blue">Normal</p>
                <p className="text-xs text-primary-blue mt-1">
                  Berat dan tinggi badan sesuai dengan usia dan jenis kelamin
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-primary-blue">Berat Badan</span>
                  <span className="text-sm text-primary-blue font-medium">Normal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-primary-blue">Tinggi Badan</span>
                  <span className="text-sm text-primary-blue font-medium">Normal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-primary-blue">Lingkar Kepala</span>
                  <span className="text-sm text-primary-blue font-medium">Normal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-primary-blue">Lingkar Lengan Atas</span>
                  <span className="text-sm text-primary-blue font-medium">Normal</span>
                </div>
              </div>

              <p className="text-xs text-primary-blue mb-4">
                Catatan: Analisis ini hanya bersifat indikatif. Konsultasikan dengan tenaga medis untuk evaluasi yang
                lebih akurat.
              </p>

              <div className="space-y-3">
                <Button
                  onClick={() => navigateTo("chatbot")}
                  className="w-full bg-primary-blue text-white flex items-center justify-center gap-2 font-medium"
                >
                  <MessageCircle size={16} />
                  Konsultasi via SmartBump
                </Button>

                <Button
                  onClick={() => navigateTo("medicalStaff")}
                  className="w-full bg-primary-purple text-white flex items-center justify-center gap-2 font-medium"
                >
                  <Users size={16} />
                  Konsultasi Tenaga Medis
                </Button>

                <Button
                  onClick={() => navigateTo("home")}
                  className="w-full bg-lighter-blue text-primary-blue flex items-center justify-center gap-2 font-medium"
                >
                  <ExternalLink size={16} />
                  Cek Informasi Lebih Lanjut
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="bg-light-blue p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="p-0 mr-2 h-8 w-8" onClick={() => navigateTo("childMonitor")}>
                <ArrowLeft className="h-5 w-5 text-primary-blue" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-primary-blue">{selectedChild?.name || "Anak"}</h1>
                <p className="text-xs text-primary-blue">
                  {selectedChild?.gender || ""}
                  {selectedChild?.birthDate ? ` ${new Date(selectedChild.birthDate).toLocaleDateString()}` : ""}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-lighter-blue">
            {childMetrics.map((metric) => (
              <div key={metric.id} className="flex items-center p-3 rounded-xl mb-3 border border-light-blue bg-white">
                <div className="w-20 h-16 rounded-lg overflow-hidden mr-3">
                  <img
                    src={metric.image || "/placeholder.svg"}
                    alt={metric.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-primary-blue">{metric.title}</h3>
                  <p className="text-xs text-primary-blue">{metric.description}</p>
                </div>
              </div>
            ))}

            <Button onClick={handleAnalyzeGrowth} className="w-full bg-primary-blue text-white mb-4 font-medium">
              Analisis Pertumbuhan
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

