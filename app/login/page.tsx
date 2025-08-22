"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [registerNumber, setRegisterNumber] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const supabase = createClient()

      let studentData = null

      // Try ii_it_students first
      const { data: iiItData, error: iiItError } = await supabase
        .from("ii_it_students")
        .select("*")
        .eq("register_number", registerNumber.toUpperCase())
        .single()

      if (iiItData && !iiItError) {
        studentData = { ...iiItData, class: "II-IT" }
      } else {
        // Try iii_it_students
        const { data: iiiItData, error: iiiItError } = await supabase
          .from("iii_it_students")
          .select("*")
          .eq("register_number", registerNumber.toUpperCase())
          .single()

        if (iiiItData && !iiiItError) {
          studentData = { ...iiiItData, class: "III-IT" }
        }
      }

      if (!studentData) {
        setError("Register number not found. Please register first.")
        return
      }

      localStorage.setItem("student", JSON.stringify(studentData))
      router.push("/dashboard")
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[50vh] flex items-center justify-center flex-col">
     

      <main className="max-w-md mx-auto px-4 py-8 sm:py-16">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-black">Student Login</h2>
         <p className="text-gray-600 text-sm mb-16">Enter your register number to access your progress</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-black">Register Number</label>
            <input
              type="number"
              required
              value={registerNumber}
              onChange={(e) => setRegisterNumber(e.target.value)}
              className="w-full px-4 py-3 glass-input border-white/20 rounded-lg focus:outline-none focus:border-white/40 text-center text-base sm:text-lg text-black placeholder-gray-500"
              placeholder="Enter your register number"
              
            />
          </div>

          {error && (
            <div className="glass border-red-200 text-red-600 px-4 py-3 rounded-lg text-center text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full glass-button hover:bg-white/20 disabled:bg-white/10 text-black py-3 px-4 rounded-lg transition-all font-medium border border-white/20"
          >
            {loading ? "Checking..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-6 sm:mt-8">
          <p className="text-black mb-2 text-sm">Don't have an account?</p>
          <Link href="/" className="text-black hover:text-gray-600 underline text-sm">
            Register for your class
          </Link>
        </div>
      </main>
    </div>
  )
}
