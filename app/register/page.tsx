"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedClass = searchParams.get("class") || ""

  const [formData, setFormData] = useState({
    register_number: "",
    name: "",
    email: "", // Added email field
    mobile: "",
    class_name: selectedClass,
    nptel_course_name: "",
    nptel_course_id: "",
    course_duration: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      console.log("[v0] Starting registration with data:", formData)
      const supabase = createClient()

      const tableName = formData.class_name === "II-IT" ? "ii_it_students" : "iii_it_students"
      console.log("[v0] Using table:", tableName)

      const dbData = {
        register_number: formData.register_number,
        student_name: formData.name, // Map 'name' to 'student_name'
        email: formData.email,
        mobile: formData.mobile,
        class_name: formData.class_name,
        nptel_course_name: formData.nptel_course_name,
        nptel_course_id: formData.nptel_course_id,
        course_duration: formData.course_duration,
        week_1_status: "in_progress",
        week_2_status: "not_started",
        week_3_status: "not_started",
        week_4_status: "not_started",
        week_5_status: "not_started",
        week_6_status: "not_started",
        week_7_status: "not_started",
        week_8_status: "not_started",
        week_9_status: "not_started",
        week_10_status: "not_started",
        week_11_status: "not_started",
        week_12_status: "not_started",
      }

      console.log("[v0] Mapped database data:", dbData)

      const { data, error } = await supabase.from(tableName).insert([dbData]).select().single()

      console.log("[v0] Insert result:", { data, error })

      if (error) {
        console.log("[v0] Database error:", error)
        if (error.code === "23505") {
          setError("Register number already exists")
        } else if (error.code === "42P01") {
          setError("Database table not found. Please contact administrator.")
        } else {
          setError(`Registration failed: ${error.message}`)
        }
        return
      }

      const studentData = data || dbData
      localStorage.setItem("student", JSON.stringify(studentData))
      console.log("[v0] Stored student data:", studentData)

      router.push("/dashboard")
    } catch (err) {
      console.log("[v0] Catch error:", err)
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
          <h2 className="text-2xl font-bold mb-2">Register for {selectedClass}</h2>
          <p className="text-gray-400">Fill your details to register</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Register Number</label>
            <input
              type="text"
              required
              value={formData.register_number}
              onChange={(e) => setFormData({ ...formData, register_number: e.target.value.toUpperCase() })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your register number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Mobile Number</label>
            <input
              type="tel"
              required
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your mobile number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">NPTEL Course Name</label>
            <input
              type="text"
              required
              value={formData.nptel_course_name}
              onChange={(e) => setFormData({ ...formData, nptel_course_name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter NPTEL course name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">NPTEL Course ID</label>
            <input
              type="text"
              required
              value={formData.nptel_course_id}
              onChange={(e) => setFormData({ ...formData, nptel_course_id: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter NPTEL course ID"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Course Duration</label>
            <input
              type="text"
              required
              value={formData.course_duration}
              onChange={(e) => setFormData({ ...formData, course_duration: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="e.g., 12 weeks, 8 weeks, 4 weeks"
            />
          </div>

          {error && <div className="text-red-400 text-sm text-center bg-red-900/20 p-3 rounded-lg">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link href="/login" className="text-blue-400 hover:text-blue-300 underline">
            Already registered? Login here
          </Link>
        </div>
      </main>
    </div>
  )
}
