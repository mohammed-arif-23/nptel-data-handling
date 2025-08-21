"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const logoutTimer = setTimeout(async () => {
      // Clear student data from localStorage
      localStorage.removeItem("student")
      
      // Sign out from Supabase
      await supabase.auth.signOut()
      
      // Redirect to login page
      router.push("/login")
    }, 3000)

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(logoutTimer)
  }, [router, supabase])

  return (
    <div className="min-h-[70vh] bg-black flex items-center justify-center p-6">
      <div className="text-center max-w-md w-full">
        <div className="bg-black rounded-lg p-8 ">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Assignment Updated Successfully!</h1>
          <p className="text-white mb-6">
            Your assignment status has been updated. You will be logged out automatically in 3 seconds.
          </p>
         
        </div>
      </div>
    </div>
  )
}
