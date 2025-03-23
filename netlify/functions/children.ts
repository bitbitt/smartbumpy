import type { Handler } from "@netlify/functions"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

const handler: Handler = async (event) => {
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  // GET request untuk mendapatkan data anak
  if (event.httpMethod === "GET") {
    const userId = event.queryStringParameters?.userId

    if (!userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "User ID is required" }),
      }
    }

    try {
      const { data, error } = await supabase.from("children").select("*").eq("user_id", userId)

      if (error) throw error

      return {
        statusCode: 200,
        body: JSON.stringify({ children: data }),
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: (error as Error).message }),
      }
    }
  }

  // POST request untuk menambahkan data anak
  if (event.httpMethod === "POST") {
    try {
      const { userId, childData } = JSON.parse(event.body || "{}")

      if (!userId || !childData) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "User ID and child data are required" }),
        }
      }

      const { data, error } = await supabase
        .from("children")
        .insert({
          user_id: userId,
          name: childData.name,
          birth_date: childData.birthDate,
          gender: childData.gender,
          is_premature: childData.isPremature,
          birth_weight: childData.birthWeight,
          birth_height: childData.birthHeight,
          head_circumference: childData.headCircumference,
          upper_arm_circumference: childData.upperArmCircumference,
          has_allergies: childData.hasAllergies,
          mother_height: childData.motherHeight,
          father_height: childData.fatherHeight,
          photo_url: childData.photoUrl,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) throw error

      return {
        statusCode: 200,
        body: JSON.stringify({ child: data }),
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: (error as Error).message }),
      }
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: "Method Not Allowed" }),
  }
}

export { handler }

