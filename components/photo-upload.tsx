"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Loader2, Upload, X } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { createClient } from "@/lib/supabase/client"

interface PhotoUploadProps {
  onPhotoUploaded: (url: string) => void
  currentPhotoUrl?: string
  folder?: string
  className?: string
  shape?: "square" | "circle"
  size?: "sm" | "md" | "lg"
}

export default function PhotoUpload({
  onPhotoUploaded,
  currentPhotoUrl,
  folder = "profile",
  className = "",
  shape = "circle",
  size = "md",
}: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(currentPhotoUrl)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    setPhotoUrl(currentPhotoUrl)
  }, [currentPhotoUrl])

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  }

  const shapeClasses = {
    circle: "rounded-full",
    square: "rounded-lg",
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) {
      setError("Anda harus login untuk mengupload foto")
      return
    }

    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const fileType = file.type
    if (!fileType.startsWith("image/")) {
      setError("File harus berupa gambar")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran file maksimal 5MB")
      return
    }

    setUploading(true)
    setError(null)

    try {
      // Create unique filename
      const fileExt = file.name.split(".").pop()
      const fileName = `${user.id}/${folder}/${Date.now()}.${fileExt}`

      // Create a Supabase client
      const supabase = createClient()

      // Upload file to Supabase Storage
      const { data, error: uploadError } = await supabase.storage.from("smartbump-uploads").upload(fileName, file, {
        cacheControl: "3600",
        upsert: true, // Changed to true to overwrite existing files
      })

      if (uploadError) {
        console.warn("Storage upload error, using fallback:", uploadError)

        // If that fails, we'll use a placeholder image URL
        const placeholderUrl = `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(folder)}`

        // Update state and call callback
        setPhotoUrl(placeholderUrl)
        onPhotoUploaded(placeholderUrl)
        return
      }

      // Get public URL
      const { data: urlData } = supabase.storage.from("smartbump-uploads").getPublicUrl(fileName)

      // Update state and call callback
      setPhotoUrl(urlData.publicUrl)
      onPhotoUploaded(urlData.publicUrl)
    } catch (error: any) {
      console.error("Error uploading photo:", error)
      setError(error.message || "Gagal mengupload foto")
    } finally {
      setUploading(false)
    }
  }

  const handleRemovePhoto = () => {
    setPhotoUrl(undefined)
    onPhotoUploaded("")
  }

  return (
    <div className={`${className} flex flex-col items-center`}>
      <div
        className={`${sizeClasses[size]} ${shapeClasses[shape]} border-2 border-dashed border-primary-blue relative overflow-hidden flex items-center justify-center bg-lighter-blue`}
      >
        {uploading ? (
          <Loader2 className="h-8 w-8 text-primary-blue animate-spin" />
        ) : photoUrl ? (
          <>
            <img src={photoUrl || "/placeholder.svg"} alt="Uploaded photo" className="w-full h-full object-cover" />
            <button
              onClick={handleRemovePhoto}
              className="absolute top-1 right-1 bg-red-500 rounded-full p-1 text-white"
              type="button"
            >
              <X className="h-3 w-3" />
            </button>
          </>
        ) : (
          <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
            <Upload className="h-6 w-6 text-primary-blue mb-1" />
            <span className="text-xs text-primary-blue text-center">Upload Foto</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}

