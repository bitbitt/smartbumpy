"use client"

import { User2, Bell, Stethoscope } from "lucide-react"

interface HeaderWithProfileProps {
  title?: string
  subtitle?: string
  navigateTo: (screen: string) => void
  username: string
}

export default function HeaderWithProfile({ title, subtitle, navigateTo, username }: HeaderWithProfileProps) {
  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center">
        {/* Notification Icon */}
        <div
          className="w-10 h-10 rounded-full border-2 border-primary-blue flex items-center justify-center cursor-pointer mr-3"
          onClick={() => navigateTo("notifications")}
        >
          <Bell className="h-5 w-5 text-primary-blue" />
        </div>

        {/* Medical Staff Icon */}
        <div
          className="w-10 h-10 rounded-full border-2 border-primary-purple flex items-center justify-center cursor-pointer mr-3"
          onClick={() => navigateTo("specialization")}
        >
          <Stethoscope className="h-5 w-5 text-primary-purple" />
        </div>
      </div>

      <div className="flex items-center">
        <div className="mr-3 text-right">
          <h1 className="text-lg font-semibold text-primary-blue">Welcome,</h1>
          <p className="text-base font-medium text-primary-purple">
            {username ? (username.includes("@") ? username.split("@")[0] : username) : "User"}!
          </p>
        </div>

        {/* Profile Picture */}
        <div
          className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center cursor-pointer"
          onClick={() => navigateTo("profile")}
        >
          {username ? (
            <img src="/placeholder.svg?height=40&width=40" alt={username} className="w-full h-full object-cover" />
          ) : (
            <User2 className="h-5 w-5 text-white" />
          )}
        </div>
      </div>
    </div>
  )
}

