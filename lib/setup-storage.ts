import { supabase } from "./supabase"

export async function setupStorage() {
  try {
    // Check if bucket already exists
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()

    if (bucketsError) {
      console.error("Error checking buckets:", bucketsError)
      return false
    }

    // Check if smartbump-uploads bucket exists
    const bucketExists = buckets.some((bucket) => bucket.name === "smartbump-uploads")

    if (!bucketExists) {
      // Create new bucket with public access
      const { error: createError } = await supabase.storage.createBucket("smartbump-uploads", {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ["image/png", "image/jpeg", "image/jpg", "image/gif"],
      })

      if (createError) {
        console.error("Error creating bucket:", createError)
        return false
      }

      // Set up RLS policy to allow public access
      // Note: In a production app, you would want more restrictive policies
      const { error: policyError } = await supabase.rpc("create_storage_policy", {
        bucket_name: "smartbump-uploads",
        policy_name: "public_access",
        definition: "true", // Allow all operations
        operation: "ALL", // ALL, READ, WRITE, etc.
      })

      if (policyError) {
        console.error("Error setting bucket policy:", policyError)
        // Continue anyway as the bucket was created
      }

      console.log("Storage bucket created successfully")
    }

    return true
  } catch (error) {
    console.error("Error setting up storage:", error)
    return false
  }
}

