"use client"

import { useEffect, useState } from "react"
import SubmissionsClient from "@/components/submissions-client"

export default function SubmissionsPage() {
  const [studentData, setStudentData] = useState(null)
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
      <div className="min-h-screen glass flex items-center justify-center">
        <div className="text-black">Loading...</div>
      </div>
    )
  }

  if (!studentData) {
    return null // Will redirect via useEffect
  }

  // Extract userClass from studentData (support both 'class' and 'class_name' keys)
  const userClass = studentData.class || studentData.class_name || null;

  return <SubmissionsClient studentData={studentData} userClass={userClass} />
}
