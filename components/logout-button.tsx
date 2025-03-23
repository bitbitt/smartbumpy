"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

interface LogoutButtonProps {
  className?: string
}

export default function LogoutButton({ className }: LogoutButtonProps) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    const { success } = await logout()
    if (success) {
      setShowConfirmation(false)
      router.push("/login")
    }
  }

  return (
    <>
      <Button onClick={() => setShowConfirmation(true)} variant="outline" className={`text-red-500 ${className}`}>
        Keluar
      </Button>

      <Modal isOpen={showConfirmation} onClose={() => setShowConfirmation(false)} title="Konfirmasi Keluar">
        <div className="p-2">
          <p className="text-sm text-text-gray mb-4">Apakah Anda yakin ingin keluar dari akun?</p>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setShowConfirmation(false)}>
              Batal
            </Button>
            <Button className="flex-1 bg-primary-purple text-white font-medium" onClick={handleLogout}>
              Keluar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

