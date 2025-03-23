"use client"

import { Home, Utensils, Camera, User, MessageCircle } from "lucide-react"

interface BottomNavigationProps {
  currentScreen: string
  navigateTo: (screen: string) => void
}

export default function BottomNavigation({ currentScreen, navigateTo }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-16 bg-primary-purple rounded-t-xl flex items-center justify-between px-4 font-poppins z-10">
      <div className="flex-1 flex justify-center">
        <button
          onClick={() => navigateTo("home")}
          className={`flex flex-col items-center justify-center ${currentScreen === "home" ? "text-white" : "text-light-purple"}`}
        >
          <Home className="h-6 w-6" />
        </button>
      </div>

      <div className="flex-1 flex justify-center">
        <button
          onClick={() => navigateTo("nutritionInfo")}
          className={`flex flex-col items-center justify-center ${currentScreen === "nutritionInfo" ? "text-white" : "text-light-purple"}`}
        >
          <Utensils className="h-6 w-6" />
        </button>
      </div>

      {/* Camera Button (Center) - Positioned higher */}
      <div className="flex-1 flex justify-center relative">
        <button
          onClick={() => navigateTo("camera")}
          className="absolute -top-14 w-20 h-20 bg-lavender-100 rounded-full flex items-center justify-center shadow-lg"
        >
          <div className="w-16 h-16 rounded-full border-2 border-primary-purple flex items-center justify-center">
            <Camera className="h-8 w-8 text-primary-purple" />
          </div>
        </button>
      </div>

      <div className="flex-1 flex justify-center">
        <button
          onClick={() => navigateTo("childMonitor")}
          className={`flex flex-col items-center justify-center ${currentScreen === "childMonitor" ? "text-white" : "text-light-purple"}`}
        >
          <User className="h-6 w-6" />
        </button>
      </div>

      <div className="flex-1 flex justify-center">
        <button
          onClick={() => navigateTo("chatbot")}
          className={`flex flex-col items-center justify-center ${currentScreen === "chatbot" ? "text-white" : "text-light-purple"}`}
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}

