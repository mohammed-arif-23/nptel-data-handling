"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  GraduationCap,
  LogOut,
  ArrowLeft,
  CheckCircle,
  Clock,
  XCircle,
  BookOpen,
  Filter,
  TrendingUp,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useMemo } from "react"
import Link from "next/link"

interface StudentData {
  id: string
  user_id: string
  name: string
  email: string
  roll_number: string
  course_duration: string
  // Dynamically generate week status keys
  [key: `week_${number}_status`]: string
  created_at: string
  updated_at: string
}

interface SubmissionsClientProps {
  user: any
  studentData: StudentData
  userClass: string
}

const statusOptions = [
  { value: "not_started", label: "Not Started", icon: XCircle, color: "text-slate-600", bgColor: "bg-slate-200" },
  { value: "in_progress", label: "In Progress", icon: Clock, color: "text-yellow-600", bgColor: "bg-yellow-200" },
  { value: "completed", label: "Completed", icon: CheckCircle, color: "text-green-600", bgColor: "bg-green-200" },
]

export default function SubmissionsClient({ user, studentData, userClass }: SubmissionsClientProps) {
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const router = useRouter()
  const supabase = createClient()

  // Use course_duration dynamically
  const courseDuration = studentData.course_duration ? Number.parseInt(studentData.course_duration) : 12

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const getWeekStatus = (week: number): string => {
    return studentData[`week_${week}_status` as keyof StudentData] as string
  }

  const getStatusInfo = (status: string) => {
    return statusOptions.find((option) => option.value === status) || statusOptions[0]
  }

  // Generate submissions data dynamically based on course duration
  const submissionsData = useMemo(() => {
    const submissions = []
    for (let i = 1; i <= courseDuration; i++) {
      const status = getWeekStatus(i)
      const statusInfo = getStatusInfo(status)
      submissions.push({
        week: i,
        status,
        statusInfo,
        submittedAt: studentData.updated_at,
      })
    }
    return submissions
  }, [studentData, courseDuration])

  // Filter submissions based on selected filter
  const filteredSubmissions = useMemo(() => {
    if (filterStatus === "all") return submissionsData
    return submissionsData.filter((submission) => submission.status === filterStatus)
  }, [submissionsData, filterStatus])

  // Calculate statistics dynamically
  const statistics = useMemo(() => {
    const completed = submissionsData.filter((s) => s.status === "completed").length
    const inProgress = submissionsData.filter((s) => s.status === "in_progress").length
    const notStarted = submissionsData.filter((s) => s.status === "not_started").length
    const completionRate = Math.round((completed / courseDuration) * 100)

    return { completed, inProgress, notStarted, completionRate }
  }, [submissionsData, courseDuration])

  const classInfo = {
    "II-IT": { name: "II-IT", color: "blue", bgColor: "bg-blue-600/20", textColor: "text-blue-400" },
    "III-IT": { name: "III-IT", color: "emerald", bgColor: "bg-emerald-600/20", textColor: "text-emerald-400" },
  }

  const currentClass = classInfo[userClass as keyof typeof classInfo] || { name: userClass, color: "gray", bgColor: "bg-gray-600/20", textColor: "text-gray-400" };

  return (
    <div className="min-h-[70vh]">
      {/* Header */}
      <header className="border-b border-white/20 glass">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Button
              asChild
              variant="outline"
              className="flex-1 sm:flex-none text-black hover:bg-white/20 text-sm"
            >
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-lg sm:text-2xl font-bold text-black">Submissions History</h1>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex-1 sm:flex-none text-black hover:bg-white/20 text-sm"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* Statistics Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <CardTitle className="text-sm font-medium text-black ml-2">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{statistics.completed}</div>
              <p className="text-gray-600 text-sm">out of {courseDuration} weeks</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-sm font-medium text-black ml-2">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{statistics.completionRate}%</div>
              <p className="text-gray-600 text-sm">overall progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <CardTitle className="text-sm font-medium text-black ml-2">Filter</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-black hover:bg-white/20">
                    All Status
                  </SelectItem>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-black hover:bg-white/20">
                      <div className="flex items-center gap-2">
                        <option.icon className={`h-4 w-4 ${option.color}`} />
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {/* Submissions List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-black">Weekly Submissions</CardTitle>
            <CardDescription className="text-gray-600">
              Complete history of your NPTEL course progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredSubmissions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No submissions found for the selected filter.</p>
                </div>
              ) : (
                filteredSubmissions.map((submission) => {
                  const StatusIcon = submission.statusInfo.icon
                  return (
                    <div
                      key={submission.week}
                      className="flex items-center justify-between p-4 rounded-lg glass border-white/20"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full glass border-white/20 text-black font-semibold">
                          {submission.week}
                        </div>
                        <div>
                          <h3 className="text-black font-medium">Week {submission.week}</h3>
                          <p className="text-gray-600 text-sm">NPTEL Course Content</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <Badge
                          className={`${submission.statusInfo.bgColor} ${submission.statusInfo.color} border-0 flex items-center gap-2`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {submission.statusInfo.label}
                        </Badge>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
