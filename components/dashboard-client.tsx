"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, LogOut, Calendar, CheckCircle, Clock, BookOpen, BarChart3 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

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
}

interface DashboardClientProps {
  user: any
  studentData: StudentData | null
  userClass: string | null
}

const statusOptions = [
  { value: "in_progress", label: "In Progress", icon: Clock, color: "text-yellow-400" },
  { value: "completed", label: "Completed", icon: CheckCircle, color: "text-green-400" },
]

export default function DashboardClient({ user, studentData, userClass }: DashboardClientProps) {
  const [student, setStudent] = useState<StudentData | null>(studentData)
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const courseDuration = student?.course_duration ? Number.parseInt(student.course_duration) : 12

  const handleLogout = () => {
    localStorage.removeItem("student")
    router.push("/")
  }

  const updateWeekStatus = async (week: number, status: string) => {
    if (!student || !userClass) return

    setIsUpdating(true)
    const weekColumn = `week_${week}_status`
    const tableName = userClass === "II-IT" ? "ii_it_students" : "iii_it_students"

    try {
      console.log("[v0] Updating week status:", { week, status, tableName, register_number: student.register_number })

      // Update current week status
      const { data, error } = await supabase
        .from(tableName)
        .update({ [weekColumn]: status })
        .eq("register_number", student.register_number)
        .select()
        .single()

      console.log("[v0] Update result:", { data, error })

      if (!error && data) {
        if (status === "completed" && week < courseDuration) {
          const nextWeekColumn = `week_${week + 1}_status`
          const nextWeekStatus = data[nextWeekColumn as keyof StudentData] as string

          if (nextWeekStatus === "not_started") {
            const { data: updatedData } = await supabase
              .from(tableName)
              .update({ [nextWeekColumn]: "in_progress" })
              .eq("register_number", student.register_number)
              .select()
              .single()

            if (updatedData) {
              setStudent(updatedData)
              localStorage.setItem("student", JSON.stringify(updatedData))
            }
          } else {
            setStudent(data)
            localStorage.setItem("student", JSON.stringify(data))
          }
        } else {
          setStudent(data)
          localStorage.setItem("student", JSON.stringify(data))
        }
      } else {
        console.error("[v0] Database update failed:", error)
      }
    } catch (error) {
      console.error("[v0] Error updating week status:", error)
    }

    setIsUpdating(false)
  }

  const getWeekStatus = (week: number): string => {
    if (!student) return "not_started"
    return student[`week_${week}_status` as keyof StudentData] as string
  }

  const getStatusInfo = (status: string) => {
    return statusOptions.find((option) => option.value === status) || statusOptions[0]
  }

  const calculateProgress = () => {
    if (!student) return { completed: 0, inProgress: 0, notStarted: courseDuration, percentage: 0 }

    let completed = 0
    let inProgress = 0
    let notStarted = 0

    for (let i = 1; i <= courseDuration; i++) {
      const status = getWeekStatus(i)
      if (status === "completed") completed++
      else if (status === "in_progress") inProgress++
      else notStarted++
    }

    const percentage = Math.round((completed / courseDuration) * 100)
    return { completed, inProgress, notStarted, percentage }
  }

  const getCurrentWeek = () => {
    for (let i = 1; i <= courseDuration; i++) {
      const status = getWeekStatus(i)
      if (status !== "completed") {
        return i
      }
    }
    return courseDuration // If all completed, show last week
  }

  const progress = calculateProgress()
  const currentWeek = getCurrentWeek()

  if (!student) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <Card className="bg-gray-900 border-gray-800 max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-white">Profile Setup Required</CardTitle>
            <CardDescription className="text-gray-300">
              Please complete your profile setup to access the dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-gray-600 text-gray-300 bg-transparent hover:bg-gray-800"
            >
              Logout and Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const classInfo = {
    "II-IT": { name: "II-IT", color: "blue", bgColor: "bg-blue-600/20", textColor: "text-blue-400" },
    "III-IT": { name: "III-IT", color: "emerald", bgColor: "bg-emerald-600/20", textColor: "text-emerald-400" },
  }

  const currentClass = userClass ? classInfo[userClass as keyof typeof classInfo] : classInfo["II-IT"]

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              <h1 className="text-lg sm:text-2xl font-bold text-white">NPTEL Tracker</h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <Button
                asChild
                variant="outline"
                className="flex-1 sm:flex-none border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent text-sm"
              >
                <Link href="/submissions">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Submissions
                </Link>
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex-1 sm:flex-none border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent text-sm"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* User Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <BookOpen className="h-5 w-5 text-gray-400" />
              <CardTitle className="text-sm font-medium text-gray-200 ml-2">Student Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-white font-semibold text-sm sm:text-base">{student.name}</p>
                <p className="text-gray-300 text-xs sm:text-sm">Roll: {student.roll_number}</p>
                <Badge className={`${currentClass.bgColor} ${currentClass.textColor} border-0 text-xs`}>
                  {currentClass.name}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <BookOpen className="h-5 w-5 text-gray-400" />
              <CardTitle className="text-sm font-medium text-gray-200 ml-2">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-xl sm:text-2xl font-bold text-white">{progress.percentage}%</div>
                <Progress value={progress.percentage} className="h-2" />
                <p className="text-gray-300 text-xs sm:text-sm">
                  {progress.completed} of {courseDuration} weeks completed
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 sm:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <CardTitle className="text-sm font-medium text-gray-200 ml-2">Status Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 sm:space-y-1 sm:block text-xs sm:text-sm">
                <div className="flex flex-col sm:flex-row sm:justify-between text-center sm:text-left">
                  <span className="text-green-400">Completed</span>
                  <span className="text-white font-bold">{progress.completed}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between text-center sm:text-left">
                  <span className="text-yellow-400">In Progress</span>
                  <span className="text-white font-bold">{progress.inProgress}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between text-center sm:text-left">
                  <span className="text-gray-400">Not Started</span>
                  <span className="text-white font-bold">{progress.notStarted}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Progress Timeline */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg sm:text-xl">Current Week Progress</CardTitle>
            <CardDescription className="text-gray-300 text-sm">
              Track your progress for the current week. View all weeks in Submissions page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {(() => {
                const week = currentWeek
                const status = getWeekStatus(week)
                const statusInfo = getStatusInfo(status)
                const StatusIcon = statusInfo.icon

                return (
                  <div
                    key={week}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 rounded-lg bg-gray-800 border border-gray-700 gap-4"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                      <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-black text-base sm:text-lg font-bold">
                        {week}
                      </div>
                      <div className="flex-1 sm:flex-none">
                        <h3 className="text-white font-semibold text-base sm:text-lg">Week {week}</h3>
                        <p className="text-gray-400 text-sm">NPTEL Course Content</p>
                        <p className="text-gray-500 text-xs sm:text-sm">Current active week</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                      <div className={`flex items-center gap-2 ${statusInfo.color}`}>
                        <StatusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="font-medium text-sm sm:text-base">{statusInfo.label}</span>
                      </div>
                      <Select
                        value={status}
                        onValueChange={(value) => updateWeekStatus(week, value)}
                        disabled={isUpdating}
                      >
                        <SelectTrigger className="w-full sm:w-40 bg-gray-800 border-gray-600 text-white hover:bg-gray-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          {statusOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="text-white hover:bg-gray-700 focus:bg-gray-700"
                            >
                              <div className="flex items-center gap-2">
                                <option.icon className={`h-4 w-4 ${option.color}`} />
                                {option.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )
              })()}
            </div>

            <div className="mt-4 p-3 sm:p-4 bg-gray-800 rounded-lg border border-gray-700">
              <p className="text-gray-300 text-xs sm:text-sm text-center">
                <Link href="/submissions" className="text-white hover:text-gray-300 underline">
                  View all {courseDuration} weeks progress in Submissions page
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
