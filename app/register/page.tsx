import RegisterForm from "@/components/register-form"
import { createClient } from "@/lib/supabase-server"
import { redirect } from "next/navigation"

export default async function RegisterPage() {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect("/")
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <RegisterForm />
    </div>
  )
}

