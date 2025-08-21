"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedClass = searchParams.get("class") || ""

  const [formData, setFormData] = useState({
    register_number: "",
    name: "",
    email: "",
    mobile: "",
    class_name: selectedClass,
    nptel_course_name: "",
    nptel_course_id: "",
    course_duration: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfirmation(true)
  }

  const confirmSubmit = async () => {
    setLoading(true)
    setError("")
    setShowConfirmation(false)

    try {
      console.log("[v0] Starting registration with data:", formData)
      const supabase = createClient()

      const tableName = formData.class_name === "II-IT" ? "ii_it_students" : "iii_it_students"
      console.log("[v0] Using table:", tableName)

      const dbData = {
        register_number: formData.register_number,
        student_name: formData.name,
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
    <div className="min-h-[70vh] bg-black text-white">
      <main className="max-w-md mx-auto px-4 ">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Register Number</label>
            <input
              type="text"
              required
              value={formData.register_number}
              onChange={(e) => setFormData({ ...formData, register_number: e.target.value.toUpperCase() })}
              className="w-full px-3 py-2 bg-black border border-white-300 rounded-lg focus:outline-none focus:border-blue-500"
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
              className="w-full px-3 py-2 bg-black border border-white-300 rounded-lg focus:outline-none focus:border-blue-500"
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
              className="w-full px-3 py-2 bg-black border border-white-300 rounded-lg focus:outline-none focus:border-blue-500"
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
              className="w-full px-3 py-2 bg-black border border-white-300 rounded-lg focus:outline-none focus:border-blue-500"
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
              className="w-full px-3 py-2 bg-black border border-white-300 rounded-lg focus:outline-none focus:border-blue-500"
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
              className="w-full px-3 py-2 bg-black border border-white-300 rounded-lg focus:outline-none focus:border-blue-500"
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
              className="w-full px-3 py-2 bg-black border border-white-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="e.g., 12 weeks, 8 weeks, 4 weeks"
            />
          </div>

          {error && <div className="text-red-400 text-sm text-center bg-red-900/20 p-3 rounded-lg">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white border border-white-300 hover:bg-gray-700 disabled:bg-gray-600 text-black py-2 px-4 rounded-lg transition-colors"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link href="/login" className="text-white-400 hover:text-blue-300 underline">
            Already registered? Login here
          </Link>
        </div>
      </main>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Confirm Registration Details</DialogTitle>
            <DialogDescription className="text-gray-400">
              Please review your details before submitting
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold">Register Number:</span>
              <span>{formData.register_number}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Name:</span>
              <span>{formData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Email:</span>
              <span>{formData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Mobile:</span>
              <span>{formData.mobile}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Class:</span>
              <span>{formData.class_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">NPTEL Course Name:</span>
              <span>{formData.nptel_course_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">NPTEL Course ID:</span>
              <span>{formData.nptel_course_id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Course Duration:</span>
              <span>{formData.course_duration}</span>
            </div>
          </div>

          <DialogFooter>
           
            <Button 
              onClick={confirmSubmit} 
              disabled={loading}
              className="bg-white border pb-2 border-white-300 hover:bg-gray-700 text-black"
            >
              {loading ? "Submitting..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
