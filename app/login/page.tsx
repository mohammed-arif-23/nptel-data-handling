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
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-lg">IT</span>
            </div>
            <h1 className="text-sm sm:text-xl font-semibold">Department of IT - NPTEL Course Tracker</h1>
          </Link>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-8 sm:py-16">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Student Login</h2>
          <p className="text-gray-400 text-sm sm:text-base">Enter your register number to access your progress</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Register Number</label>
            <input
              type="text"
              required
              value={registerNumber}
              onChange={(e) => setRegisterNumber(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 text-center text-base sm:text-lg text-white placeholder-gray-500"
              placeholder="e.g., 21IT001"
              maxLength={10}
            />
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-lg text-center text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-800 hover:bg-gray-700 disabled:bg-gray-600 text-white py-3 px-4 rounded-lg transition-colors font-medium border border-gray-700"
          >
            {loading ? "Checking..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-6 sm:mt-8">
          <p className="text-gray-400 mb-2 text-sm">Don't have an account?</p>
          <Link href="/" className="text-gray-300 hover:text-white underline text-sm">
            Register for your class
          </Link>
        </div>
      </main>
    </div>
  )
}
