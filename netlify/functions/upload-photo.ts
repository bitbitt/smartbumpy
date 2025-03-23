import type { Handler } from "@netlify/functions"
import { createClient } from "@supabase/supabase-js"
import { parse } from "lambda-multipart-parser"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

const handler: Handler = async (event) => {
  // Hanya menerima metode POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    }
  }

  try {
    // Parse multipart form data
    const formData = await parse(event)
    const file = formData.files[0]
    const userId = formData.userId
    const folder = formData.folder || "profile"

    if (!file || !userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "File dan userId diperlukan" }),
      }
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Buat nama file yang unik
    const fileExt = file.filename.split(".").pop()
    const fileName = `${userId}/${folder}/${Date.now()}.${fileExt}`

    // Upload file ke Supabase Storage
    const { data, error } = await supabase.storage.from("smartbump-uploads").upload(fileName, file.content, {
      contentType: file.contentType,
      cacheControl: "3600",
      upsert: false,
    })

    if (error) {
      throw error
    }

    // Dapatkan URL publik dari file yang diupload
    const { data: urlData } = supabase.storage.from("smartbump-uploads").getPublicUrl(fileName)

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        url: urlData.publicUrl,
      }),
    }
  } catch (error) {
    console.error("Error uploading file:", error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Gagal mengupload file" }),
    }
  }
}

export { handler }

