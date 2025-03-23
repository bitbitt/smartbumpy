import { supabase } from "../supabase"

export type Child = {
  id: string
  name: string
  birthDate: string
  gender: string
  isPremature: boolean
  birthWeight: number
  birthHeight: number
  headCircumference: number
  upperArmCircumference: number
  hasAllergies: boolean
  motherHeight?: number
  fatherHeight?: number
  photoUrl?: string | null
}

export async function getChildren(userId: string) {
  try {
    const { data, error } = await supabase
      .from("children")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    // Transform data to match frontend format
    const children = data.map((child) => ({
      id: child.id,
      name: child.name,
      birthDate: child.birth_date,
      gender: child.gender,
      isPremature: child.is_premature,
      birthWeight: child.birth_weight,
      birthHeight: child.birth_height,
      headCircumference: child.head_circumference,
      upperArmCircumference: child.upper_arm_circumference,
      hasAllergies: child.has_allergies,
      motherHeight: child.mother_height,
      fatherHeight: child.father_height,
      photoUrl: child.photo_url,
    }))

    return { children, error: null }
  } catch (error) {
    console.error("Error getting children:", error)
    return { children: [], error }
  }
}

export async function addChild(userId: string, childData: Omit<Child, "id">) {
  try {
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

    if (error) {
      throw error
    }

    // Transform data to match frontend format
    const child = {
      id: data.id,
      name: data.name,
      birthDate: data.birth_date,
      gender: data.gender,
      isPremature: data.is_premature,
      birthWeight: data.birth_weight,
      birthHeight: data.birth_height,
      headCircumference: data.head_circumference,
      upperArmCircumference: data.upper_arm_circumference,
      hasAllergies: data.has_allergies,
      motherHeight: data.mother_height,
      fatherHeight: data.father_height,
      photoUrl: data.photo_url,
    }

    return { child, error: null }
  } catch (error) {
    console.error("Error adding child:", error)
    return { child: null, error }
  }
}

export async function updateChild(childId: string, childData: Partial<Omit<Child, "id">>) {
  try {
    // Transform data to match database format
    const updateData: any = {}
    if (childData.name) updateData.name = childData.name
    if (childData.birthDate) updateData.birth_date = childData.birthDate
    if (childData.gender) updateData.gender = childData.gender
    if (childData.isPremature !== undefined) updateData.is_premature = childData.isPremature
    if (childData.birthWeight) updateData.birth_weight = childData.birthWeight
    if (childData.birthHeight) updateData.birth_height = childData.birthHeight
    if (childData.headCircumference) updateData.head_circumference = childData.headCircumference
    if (childData.upperArmCircumference) updateData.upper_arm_circumference = childData.upperArmCircumference
    if (childData.hasAllergies !== undefined) updateData.has_allergies = childData.hasAllergies
    if (childData.motherHeight) updateData.mother_height = childData.motherHeight
    if (childData.fatherHeight) updateData.father_height = childData.fatherHeight
    if (childData.photoUrl !== undefined) updateData.photo_url = childData.photoUrl
    updateData.updated_at = new Date().toISOString()

    const { data, error } = await supabase.from("children").update(updateData).eq("id", childId).select().single()

    if (error) {
      throw error
    }

    // Transform data to match frontend format
    const child = {
      id: data.id,
      name: data.name,
      birthDate: data.birth_date,
      gender: data.gender,
      isPremature: data.is_premature,
      birthWeight: data.birth_weight,
      birthHeight: data.birth_height,
      headCircumference: data.head_circumference,
      upperArmCircumference: data.upper_arm_circumference,
      hasAllergies: data.has_allergies,
      motherHeight: data.mother_height,
      fatherHeight: data.father_height,
      photoUrl: data.photo_url,
    }

    return { child, error: null }
  } catch (error) {
    console.error("Error updating child:", error)
    return { child: null, error }
  }
}

export async function deleteChild(childId: string) {
  try {
    const { error } = await supabase.from("children").delete().eq("id", childId)

    if (error) {
      throw error
    }

    return { success: true, error: null }
  } catch (error) {
    console.error("Error deleting child:", error)
    return { success: false, error }
  }
}

