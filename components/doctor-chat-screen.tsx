"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Send, Phone, Video, MoreVertical } from "lucide-react"
import MobileHeader from "@/components/mobile-header"

interface DoctorChatScreenProps {
  navigateTo: (screen: string) => void
}

export default function DoctorChatScreen({ navigateTo }: DoctorChatScreenProps) {
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null)
  const [doctor, setDoctor] = useState<any | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

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
        image: "/placeholder.svg?height=80&width=80",
        online: true,
      }

      setDoctor(doctorData)

      // Initialize with a welcome message
      setMessages([
        {
          id: 1,
          text: `Halo, saya ${doctorData.name}. Ada yang bisa saya bantu terkait kesehatan Anda?`,
          isDoctor: true,
          timestamp: new Date().toISOString(),
        },
      ])
    }
  }, [selectedDoctorId])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Modified back button handler to go back to doctor profile
  const handleBack = () => {
    navigateTo("doctorProfile")
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add user message
      const userMessage = {
        id: Date.now(),
        text: newMessage,
        isDoctor: false,
        timestamp: new Date().toISOString(),
      }
      setMessages([...messages, userMessage])
      setNewMessage("")

      // Simulate doctor response after a short delay
      setTimeout(() => {
        const doctorResponses = [
          "Terima kasih atas pertanyaannya. Berdasarkan informasi yang Anda berikan, saya sarankan untuk melakukan pemeriksaan lebih lanjut.",
          "Gejala yang Anda alami umum terjadi pada ibu hamil trimester kedua. Pastikan Anda cukup istirahat dan minum air putih.",
          "Untuk kasus seperti ini, sebaiknya Anda melakukan kontrol rutin setiap 2 minggu sekali.",
          "Apakah ada gejala lain yang Anda rasakan? Informasi lebih detail akan membantu saya memberikan saran yang lebih tepat.",
        ]

        const randomResponse = doctorResponses[Math.floor(Math.random() * doctorResponses.length)]

        const doctorMessage = {
          id: Date.now() + 1,
          text: randomResponse,
          isDoctor: true,
          timestamp: new Date().toISOString(),
        }

        setMessages((prevMessages) => [...prevMessages, doctorMessage])
      }, 1500)
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
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

      {/* Chat Header */}
      <div className="bg-primary-purple p-3 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="p-0 mr-2 h-8 w-8 text-white" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
              <img src={doctor.image || "/placeholder.svg"} alt={doctor.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-white">{doctor.name}</h2>
              <p className="text-xs text-white/80">{doctor.specialty}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="p-1 h-8 w-8 text-white">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="p-1 h-8 w-8 text-white">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="p-1 h-8 w-8 text-white">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 bg-bg-light overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isDoctor ? "justify-start" : "justify-end"}`}>
              {message.isDoctor && (
                <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                  <img
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div
                className={`max-w-[75%] rounded-xl p-3 ${message.isDoctor ? "bg-white" : "bg-primary-blue text-white"}`}
              >
                <p className="text-sm mb-1">{message.text}</p>
                <p className={`text-xs ${message.isDoctor ? "text-text-gray" : "text-white/80"} text-right`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="p-3 border-t border-border-gray bg-white">
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ketik pesan..."
            className="flex-1 p-2 rounded-full border border-border-gray focus:outline-none focus:ring-1 focus:ring-primary-purple"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
          />
          <Button
            onClick={handleSendMessage}
            className="ml-2 h-10 w-10 rounded-full bg-primary-purple p-0 flex items-center justify-center"
            disabled={!newMessage.trim()}
          >
            <Send size={18} className="text-white" />
          </Button>
        </div>
      </div>
    </div>
  )
}

