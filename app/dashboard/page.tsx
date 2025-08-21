"use client"

import { useEffect, useState } from "react"
import DashboardClient from "@/components/dashboard-client"

// Define a type for the student data matching the interface in dashboard-client
interface StudentData {
  id: string
  user_id: string
  name: string
  email: string
  roll_number: string
  register_number: string
  course_duration: string
  week_1_status: string
  week_2_status: string
  week_3_status: string
  week_4_status: string
  week_5_status: string
  week_6_status: string
  week_7_status: string
  week_8_status: string
  week_9_status: string
  week_10_status: string
  week_11_status: string
  week_12_status: string
  class?: string
  class_name?: string
  student_name?: string
}

export default function DashboardPage() {
  const [studentData, setStudentData] = useState<StudentData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      // Check if user is logged in via localStorage
      const storedStudent = localStorage.getItem("student")

      if (!storedStudent) {
        window.location.href = "/login"
        return
      }

      try {
        const student = JSON.parse(storedStudent)
        setStudentData(student)
      } catch (error) {
        console.error("Error parsing student data:", error)
        localStorage.removeItem("student")
        window.location.href = "/login"
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!studentData) {
    return null // Will redirect via useEffect
  }

  // Extract userClass from studentData (support both 'class' and 'class_name' keys)
  const userClass = studentData.class || studentData.class_name || null;

  // Add a mock user object to satisfy the interface requirement
  const user = {
    id: studentData.id || studentData.user_id,
    email: studentData.email,
    name: studentData.name || studentData.student_name || ''
  }

  return <DashboardClient user={user} studentData={studentData} userClass={userClass} />
}
