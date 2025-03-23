"use client"

import { useState } from "react"
import MobileHeader from "@/components/mobile-header"
import BottomNavigation from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

interface ChatbotScreenProps {
  navigateTo: (screen: string) => void
}

export default function ChatbotScreen({ navigateTo }: ChatbotScreenProps) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Halo, saya SmartBump! Asisten virtual yang siap membantu Anda dengan pertanyaan seputar kehamilan dan nutrisi. Apa yang bisa saya bantu hari ini?",
      isBot: true,
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add user message
      const userMessage = {
        id: Date.now(),
        text: newMessage,
        isBot: false,
      }
      setMessages([...messages, userMessage])
      setNewMessage("")

      // Simulate bot response after a short delay
      setTimeout(() => {
        const botResponses = [
          "Terima kasih atas pertanyaannya. Selama kehamilan, penting untuk mengonsumsi makanan yang kaya nutrisi seperti buah-buahan, sayuran, protein tanpa lemak, dan biji-bijian utuh.",
          "Pada trimester kedua, bayi Anda sedang mengalami pertumbuhan yang pesat. Pastikan asupan kalsium dan zat besi Anda mencukupi.",
          "Jangan lupa untuk tetap terhidrasi! Minum setidaknya 8-10 gelas air setiap hari sangat penting selama kehamilan.",
          "Saya sarankan untuk berkonsultasi dengan dokter atau bidan Anda untuk rekomendasi yang lebih spesifik sesuai dengan kondisi kesehatan Anda.",
        ]

        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

        const botMessage = {
          id: Date.now() + 1,
          text: randomResponse,
          isBot: true,
        }
        setMessages((prevMessages) => [...prevMessages, botMessage])
      }, 1000)
    }
  }

  return (
    <div className="flex flex-col h-full min-h-screen w-full max-w-md bg-white rounded-xl overflow-hidden shadow-lg font-poppins">
      <MobileHeader />

      <div className="bg-light-purple p-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary-purple flex items-center justify-center mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-primary-purple">SmartBump</h1>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 bg-bg-light overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[80%] rounded-xl p-3 ${
                  message.isBot ? "bg-bg-purple text-text-dark" : "bg-primary-purple text-white"
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 border-t border-border-gray bg-white mb-20">
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

      <BottomNavigation currentScreen="chatbot" navigateTo={navigateTo} />
    </div>
  )
}

