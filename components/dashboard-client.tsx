"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, LogOut, Calendar, CheckCircle, Clock, XCircle, BookOpen, BarChart3 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

interface StudentData {
  id: string
  user_id: string
  name: string
  email: string
  roll_number: string
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
  { value: "not_started", label: "Not Started", icon: XCircle, color: "text-slate-400" },
  { value: "in_progress", label: "In Progress", icon: Clock, color: "text-yellow-400" },
  { value: "completed", label: "Completed", icon: CheckCircle, color: "text-green-400" },
]

export default function DashboardClient({ user, studentData, userClass }: DashboardClientProps) {
  const [student, setStudent] = useState<StudentData | null>(studentData)
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const updateWeekStatus = async (week: number, status: string) => {
    if (!student || !userClass) return

    setIsUpdating(true)
    const weekColumn = `week_${week}_status`
    const tableName = userClass === "II-IT" ? "ii_it_students" : "iii_it_students"

    const { data, error } = await supabase
      .from(tableName)
      .update({ [weekColumn]: status })
      .eq("user_id", user.id)
      .select()
      .single()

    if (!error && data) {
      setStudent(data)
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
    if (!student) return { completed: 0, inProgress: 0, notStarted: 12, percentage: 0 }

    let completed = 0
    let inProgress = 0
    let notStarted = 0

    for (let i = 1; i <= 12; i++) {
      const status = getWeekStatus(i)
      if (status === "completed") completed++
      else if (status === "in_progress") inProgress++
      else notStarted++
    }

    const percentage = Math.round((completed / 12) * 100)
    return { completed, inProgress, notStarted, percentage }
  }

  const getCurrentWeek = () => {
    // Simple logic: find the first week that's not completed, or week 1 if all are completed
    for (let i = 1; i <= 12; i++) {
      const status = getWeekStatus(i)
      if (status !== "completed") {
        return i
      }
    }
    return 12 // If all completed, show week 12
  }

  const progress = calculateProgress()
  const currentWeek = getCurrentWeek()

  if (!student) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
        <Card className="bg-slate-800/50 border-slate-700 max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-white">Profile Setup Required</CardTitle>
            <CardDescription className="text-slate-300">
              Please complete your profile setup to access the dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={handleLogout} variant="outline" className="border-slate-600 text-slate-300 bg-transparent">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">NPTEL Tracker</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button
                asChild
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
              >
                <Link href="/submissions">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Submissions
                </Link>
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* User Info */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <BookOpen className="h-5 w-5 text-slate-400" />
              <CardTitle className="text-sm font-medium text-slate-200 ml-2">Student Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-white font-semibold">{student.name}</p>
                <p className="text-slate-300 text-sm">Roll: {student.roll_number}</p>
                <Badge className={`${currentClass.bgColor} ${currentClass.textColor} border-0`}>
                  {currentClass.name}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <BookOpen className="h-5 w-5 text-slate-400" />
              <CardTitle className="text-sm font-medium text-slate-200 ml-2">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-white">{progress.percentage}%</div>
                <Progress value={progress.percentage} className="h-2" />
                <p className="text-slate-300 text-sm">{progress.completed} of 12 weeks completed</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Calendar className="h-5 w-5 text-slate-400" />
              <CardTitle className="text-sm font-medium text-slate-200 ml-2">Status Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-400">Completed:</span>
                  <span className="text-white">{progress.completed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-400">In Progress:</span>
                  <span className="text-white">{progress.inProgress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Not Started:</span>
                  <span className="text-white">{progress.notStarted}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Progress Timeline */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Current Week Progress</CardTitle>
            <CardDescription className="text-slate-300">
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
                    className="flex items-center justify-between p-6 rounded-lg bg-slate-700/30 border border-slate-600"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white text-lg font-bold">
                        {week}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">Week {week}</h3>
                        <p className="text-slate-400">NPTEL Course Content</p>
                        <p className="text-slate-500 text-sm">Current active week</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className={`flex items-center gap-2 ${statusInfo.color}`}>
                        <StatusIcon className="h-5 w-5" />
                        <span className="font-medium">{statusInfo.label}</span>
                      </div>
                      <Select
                        value={status}
                        onValueChange={(value) => updateWeekStatus(week, value)}
                        disabled={isUpdating}
                      >
                        <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          {statusOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="text-white hover:bg-slate-600"
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

            <div className="mt-4 p-4 bg-slate-700/20 rounded-lg border border-slate-600">
              <p className="text-slate-300 text-sm text-center">
                <Link href="/submissions" className="text-blue-400 hover:text-blue-300 underline">
                  View all 12 weeks progress in Submissions page
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
