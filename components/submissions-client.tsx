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
  created_at: string
  updated_at: string
}

interface SubmissionsClientProps {
  user: any
  studentData: StudentData
  userClass: string
}

const statusOptions = [
  { value: "not_started", label: "Not Started", icon: XCircle, color: "text-slate-400", bgColor: "bg-slate-600/20" },
  { value: "in_progress", label: "In Progress", icon: Clock, color: "text-yellow-400", bgColor: "bg-yellow-600/20" },
  { value: "completed", label: "Completed", icon: CheckCircle, color: "text-green-400", bgColor: "bg-green-600/20" },
]

export default function SubmissionsClient({ user, studentData, userClass }: SubmissionsClientProps) {
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const router = useRouter()
  const supabase = createClient()

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

  // Generate submissions data for all weeks
  const submissionsData = useMemo(() => {
    const submissions = []
    for (let i = 1; i <= 12; i++) {
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
  }, [studentData])

  // Filter submissions based on selected filter
  const filteredSubmissions = useMemo(() => {
    if (filterStatus === "all") return submissionsData
    return submissionsData.filter((submission) => submission.status === filterStatus)
  }, [submissionsData, filterStatus])

  // Calculate statistics
  const statistics = useMemo(() => {
    const completed = submissionsData.filter((s) => s.status === "completed").length
    const inProgress = submissionsData.filter((s) => s.status === "in_progress").length
    const notStarted = submissionsData.filter((s) => s.status === "not_started").length
    const completionRate = Math.round((completed / 12) * 100)

    return { completed, inProgress, notStarted, completionRate }
  }, [submissionsData])

  const classInfo = {
    a: { name: "Class A", color: "blue", bgColor: "bg-blue-600/20", textColor: "text-blue-400" },
    b: { name: "Class B", color: "emerald", bgColor: "bg-emerald-600/20", textColor: "text-emerald-400" },
  }

  const currentClass = classInfo[userClass as keyof typeof classInfo]

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
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Dashboard
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
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Submissions History</h2>
          <p className="text-slate-300">Track your learning journey and submission progress</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <BookOpen className="h-5 w-5 text-slate-400" />
              <CardTitle className="text-sm font-medium text-slate-200 ml-2">Student</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-white font-semibold">{studentData.name}</p>
                <Badge className={`${currentClass.bgColor} ${currentClass.textColor} border-0`}>
                  {currentClass.name}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <CardTitle className="text-sm font-medium text-slate-200 ml-2">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{statistics.completed}</div>
              <p className="text-slate-300 text-sm">out of 12 weeks</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Clock className="h-5 w-5 text-yellow-400" />
              <CardTitle className="text-sm font-medium text-slate-200 ml-2">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">{statistics.inProgress}</div>
              <p className="text-slate-300 text-sm">weeks active</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              <CardTitle className="text-sm font-medium text-slate-200 ml-2">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">{statistics.completionRate}%</div>
              <p className="text-slate-300 text-sm">overall progress</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter and Submissions List */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Weekly Submissions</CardTitle>
                <CardDescription className="text-slate-300">
                  Complete history of your NPTEL course progress
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-slate-400" />
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="all" className="text-white hover:bg-slate-600">
                      All Status
                    </SelectItem>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-white hover:bg-slate-600">
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
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredSubmissions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-400">No submissions found for the selected filter.</p>
                </div>
              ) : (
                filteredSubmissions.map((submission) => {
                  const StatusIcon = submission.statusInfo.icon
                  return (
                    <div
                      key={submission.week}
                      className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30 border border-slate-600"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-600 text-white font-semibold">
                          {submission.week}
                        </div>
                        <div>
                          <h3 className="text-white font-medium">Week {submission.week}</h3>
                          <p className="text-slate-400 text-sm">NPTEL Course Content</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-slate-300 text-sm">Last Updated</p>
                          <p className="text-slate-400 text-xs">
                            {new Date(submission.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
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

        {/* Learning Journey Timeline */}
        <Card className="bg-slate-800/50 border-slate-700 mt-8">
          <CardHeader>
            <CardTitle className="text-white">Learning Journey Timeline</CardTitle>
            <CardDescription className="text-slate-300">
              Visual representation of your progress through the course
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-600"></div>

              <div className="space-y-6">
                {submissionsData.map((submission, index) => {
                  const StatusIcon = submission.statusInfo.icon
                  const isCompleted = submission.status === "completed"
                  const isInProgress = submission.status === "in_progress"

                  return (
                    <div key={submission.week} className="relative flex items-center gap-4">
                      {/* Timeline dot */}
                      <div
                        className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                          isCompleted
                            ? "bg-green-600/20 border-green-400"
                            : isInProgress
                              ? "bg-yellow-600/20 border-yellow-400"
                              : "bg-slate-600/20 border-slate-400"
                        }`}
                      >
                        <StatusIcon
                          className={`h-5 w-5 ${
                            isCompleted ? "text-green-400" : isInProgress ? "text-yellow-400" : "text-slate-400"
                          }`}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-white font-medium">Week {submission.week}</h3>
                            <p className="text-slate-400 text-sm">NPTEL Course Module</p>
                          </div>
                          <Badge className={`${submission.statusInfo.bgColor} ${submission.statusInfo.color} border-0`}>
                            {submission.statusInfo.label}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
