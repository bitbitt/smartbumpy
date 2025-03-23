import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Inisialisasi Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const userId = formData.get("userId") as string
    const fileType = formData.get("fileType") as string

    if (!file || !userId || !fileType) {
      return NextResponse.json({ error: "File, userId, dan fileType diperlukan" }, { status: 400 })
    }

    // Buat nama file yang unik
    const fileExt = file.name.split(".").pop()
    const fileName = `${userId}/${fileType}/${Date.now()}.${fileExt}`

    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    // Upload file ke Supabase Storage
    const { data, error } = await supabase.storage.from("smartbump-uploads").upload(fileName, buffer, {
      contentType: file.type,
      upsert: false,
    })

    if (error) {
      throw error
    }

    // Dapatkan URL publik dari file yang diupload
    const { data: urlData } = supabase.storage.from("smartbump-uploads").getPublicUrl(fileName)

    return NextResponse.json({
      success: true,
      url: urlData.publicUrl,
    })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Gagal mengupload file" }, { status: 500 })
  }
}

