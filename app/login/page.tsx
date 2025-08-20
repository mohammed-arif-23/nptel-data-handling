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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">IT</span>
            </div>
            <h1 className="text-xl font-semibold">Department of IT - NPTEL Course Tracker</h1>
          </Link>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Student Login</h2>
          <p className="text-gray-400">Enter your register number to access your progress</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Register Number</label>
            <input
              type="text"
              required
              value={registerNumber}
              onChange={(e) => setRegisterNumber(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-center text-lg"
              placeholder="e.g., 21IT001"
              maxLength={10}
            />
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-700 text-red-400 px-4 py-3 rounded-lg text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-3 px-4 rounded-lg transition-colors font-medium"
          >
            {loading ? "Checking..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-gray-400 mb-2">Don't have an account?</p>
          <Link href="/" className="text-blue-400 hover:text-blue-300 underline">
            Register for your class
          </Link>
        </div>
      </main>
    </div>
  )
}
