"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, LogOut, Calendar, CheckCircle, Clock, BookOpen, BarChart3, TrendingUp, Lock, Unlock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
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
  week_1_updated_at: string
  week_2_updated_at: string
  week_3_updated_at: string
  week_4_updated_at: string
  week_5_updated_at: string
  week_6_updated_at: string
  week_7_updated_at: string
  week_8_updated_at: string
  week_9_updated_at: string
  week_10_updated_at: string
  week_11_updated_at: string
  week_12_updated_at: string
}

interface DashboardClientProps {
  user: any
  studentData: StudentData | null
  userClass: string | null
}

const statusOptions = [
  { value: "in_progress", label: "In Progress", icon: Clock, color: "text-yellow-600" },
  { value: "completed", label: "Completed", icon: CheckCircle, color: "text-green-600" },
]

export default function DashboardClient({ user, studentData, userClass }: DashboardClientProps) {
  const [student, setStudent] = useState<StudentData | null>(studentData)
  const [isUpdating, setIsUpdating] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [weekAccessStatus, setWeekAccessStatus] = useState<{
    isOpen: boolean
    nextOpenTime: Date | null
    timeRemaining: string
  }>({
    isOpen: false,
    nextOpenTime: null,
    timeRemaining: ""
  })
  const router = useRouter()
  const supabase = createClient()

  const courseDuration = student?.course_duration ? Number.parseInt(student.course_duration) : 12

  // Timer effect to update current time and check week access
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)
      checkWeekAccess(now)
    }, 100) // Update every 100ms for smoother countdown

    return () => clearInterval(timer)
  }, [])

  // Check if current week is open for updates
  const checkWeekAccess = (now: Date) => {
    const currentWeek = getCurrentWeek();

    // For week 1, always open
    if (currentWeek === 1) {
      setWeekAccessStatus({
        isOpen: true,
        nextOpenTime: null,
        timeRemaining: "Ready for submission"
      });
      return;
    }

    // For week N > 1, check previous week's updated_at
    if (student) {
      const prevWeek = currentWeek - 1;
      const prevWeekUpdateTime = student[`week_${prevWeek}_updated_at` as keyof StudentData] as string;
      if (prevWeekUpdateTime) {
        const lastUpdate = new Date(prevWeekUpdateTime);
        // Calculate next Monday 00:00 AM after lastUpdate
        const nextMonday = new Date(lastUpdate);
        nextMonday.setDate(lastUpdate.getDate() + ((8 - lastUpdate.getDay()) % 7 || 7)); // always next Monday
        nextMonday.setHours(0, 0, 0, 0);
        if (now < nextMonday) {
          // Still locked
          const remainingTime = nextMonday.getTime() - now.getTime();
          const remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
          const remainingHours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
          const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
          setWeekAccessStatus({
            isOpen: false,
            nextOpenTime: nextMonday,
            timeRemaining: `Unlocks in ${remainingDays}D ${remainingHours}H ${remainingMinutes}M ${remainingSeconds}s `
          });
          return;
        }
      }
    }
    // No lock or lock expired - week is open
    setWeekAccessStatus({
      isOpen: true,
      nextOpenTime: null,
      timeRemaining: "Ready for submission"
    });
  }

  const handleLogout = () => {
    localStorage.removeItem("student")
    router.push("/")
  }

  const updateWeekStatus = async (week: number, status: string) => {
    console.log("[v0] updateWeekStatus ENTRY - Function called with:", {
      week,
      status,
      hasStudent: !!student,
      studentRegisterNumber: student?.register_number,
      userClass,
      userClassType: typeof userClass,
    })

    if (!student) {
      console.log("[v0] updateWeekStatus EARLY RETURN - No student data")
      alert("Error: No student data found. Please logout and login again.")
      return
    }

    if (!userClass) {
      console.log("[v0] updateWeekStatus EARLY RETURN - No userClass data")
      alert("Error: No class information found. Please logout and login again.")
      return
    }

    console.log("[v0] updateWeekStatus PROCEEDING - All checks passed")

    setIsUpdating(true)
    const weekColumn = `week_${week}_status`
    const weekUpdatedAtColumn = `week_${week}_updated_at`
    const tableName = userClass === "II-IT" ? "ii_it_students" : "iii_it_students"
    const currentTimestamp = new Date().toISOString()

    try {
      console.log("[v0] Updating week status:", { week, status, tableName, register_number: student.register_number })

      // Update current week status and timestamp
      const { data, error } = await supabase
        .from(tableName)
        .update({ 
          [weekColumn]: status,
          [weekUpdatedAtColumn]: currentTimestamp
        })
        .eq("register_number", student.register_number)
        .select()
        .single()

      console.log("[v0] Update result:", { data, error })

      if (error) {
        console.error("[v0] Database update failed:", error)
        alert(`Failed to update status: ${error.message}`)
        setIsUpdating(false)
        return
      }

      if (!data) {
        console.error("[v0] No data returned from update")
        alert("Failed to update status: No data returned")
        setIsUpdating(false)
        return
      }

      console.log("[v0] Database update successful, updating local state")

      if (status === "completed" && week < courseDuration) {
        const nextWeekColumn = `week_${week + 1}_status`
        const nextWeekStatus = data[nextWeekColumn as keyof StudentData] as string

        console.log("[v0] Checking next week progression:", { nextWeekColumn, nextWeekStatus })

        if (nextWeekStatus === "not_started") {
          console.log("[v0] Setting next week to in_progress")
          const { data: updatedData, error: nextWeekError } = await supabase
            .from(tableName)
            .update({ [nextWeekColumn]: "in_progress" })
            .eq("register_number", student.register_number)
            .select()
            .single()

          if (nextWeekError) {
            console.error("[v0] Failed to update next week:", nextWeekError)
            // Still update current week even if next week update fails
            setStudent(data)
            localStorage.setItem("student", JSON.stringify(data))
          } else if (updatedData) {
            console.log("[v0] Next week updated successfully")
            setStudent(updatedData)
            localStorage.setItem("student", JSON.stringify(data))
          }
        } else {
          console.log("[v0] Next week already in progress or completed, not updating")
          setStudent(data)
          localStorage.setItem("student", JSON.stringify(data))
        }
      } else {
        console.log("[v0] No next week progression needed")
        setStudent(data)
        localStorage.setItem("student", JSON.stringify(data))
      }

      console.log("[v0] Status update completed successfully")
      
      // Redirect to success page instead of showing an alert
      router.push("/success")
    } catch (error) {
      console.error("[v0] Error updating week status:", error)
      alert(`Error updating status: ${error}`)
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

  // Calculate progress after all functions are defined
  const progress = calculateProgress()

  if (!student) {
    return (
      <div className="min-h-screen glass flex items-center justify-center p-6">
        <Card className="max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-black">Profile Setup Required</CardTitle>
            <CardDescription className="text-gray-600">
              Please complete your profile setup to access the dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-white/20 text-black hover:bg-white/20"
            >
              Logout and Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const classInfo = {
    "II-IT": { name: "II-IT", color: "blue", bgColor: "bg-blue-600/20", textColor: "text-blue-600" },
    "III-IT": { name: "III-IT", color: "emerald", bgColor: "bg-emerald-600/20", textColor: "text-emerald-600" },
  }

  const currentClass = userClass ? classInfo[userClass as keyof typeof classInfo] : classInfo["II-IT"]

  return (
    <div className="min-h-[70vh]">
      {/* Header */}
      <header className="border-b border-white/20 glass">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <h1 className="text-lg sm:text-2xl font-bold text-black">Student Name : {user.name}</h1>
            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <Button
                asChild
                variant="outline"
                className="flex-1 sm:flex-none text-black hover:bg-white/20 text-sm"
              >
                <Link href="/submissions">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Submissions
                </Link>
              </Button>
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
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* Simplified User Info and Progress */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
      

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-sm font-medium text-black ml-2">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-xl sm:text-2xl font-bold text-black">{progress.percentage}%</div>
                <Progress value={progress.percentage} color="black" className="h-2" />
                <p className="text-gray-600 text-xs sm:text-sm">
                  {progress.completed} of {courseDuration} weeks completed
                </p>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Weekly Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-black text-lg sm:text-xl">Current Week Progress</CardTitle>
            <CardDescription className="text-gray-600">
              Week {getCurrentWeek()} - {weekAccessStatus.isOpen ? 'Ready for submission' : ''}
            </CardDescription>
          </CardHeader>

          <div className="relative">
            {/* Overlay for locked state */}
            {!weekAccessStatus.isOpen && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center backdrop-blur-xl bg-white/10 rounded-xl">
                <Lock className="h-14 w-14 text-red-500 mb-2" />
                <div className="text-3xl font-mono font-bold text-red-700 mb-1">
                  {/* Only show the time part, e.g. '2d 3h 12m' */}
                  {weekAccessStatus.timeRemaining.replace(/Unlocks in /, '').replace(/ \(.*\)/, '')}
                </div>
                <div className="text-xs text-red-700 text-center">
                   {(() => {
                    const match = weekAccessStatus.timeRemaining.match(/\((.*)\)/);
                    return match ? match[1] : '';
                  })()}
                </div>
              </div>
            )}

            <CardContent className={weekAccessStatus.isOpen ? '' : 'pointer-events-none select-none opacity-60'}>
              <div className="grid gap-4">
                {(() => {
                  const week = getCurrentWeek();
                  const status = getWeekStatus(week);
                  const statusInfo = getStatusInfo(status);
                  const StatusIcon = statusInfo.icon;

                  return (
                    <div
                      key={week}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-2 rounded-lg gap-4"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-black text-base sm:text-lg font-bold">
                          {week}
                        </div>
                        <div className="flex-1 sm:flex-none">
                          <h3 className="text-black font-semibold text-base sm:text-lg">Week {week}</h3>
                          <p className="text-gray-800 text-sm">NPTEL Course Content</p>
                          <p className="text-gray-500 text-xs sm:text-sm">Current active week</p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                        <div className={`flex items-center gap-2 ${statusInfo.color}`}>
                          <span className="font-medium text-sm sm:text-base">
                            <span className="text-black">Current Progress :</span> {statusInfo.label}
                          </span>
                        </div>
                        <Select
                          value={status}
                          onValueChange={(value: string) => {
                            if (weekAccessStatus.isOpen) {
                              updateWeekStatus(week, value);
                            }
                          }}
                          disabled={isUpdating || !weekAccessStatus.isOpen}
                        >
                          <SelectTrigger className={`w-full sm:w-40 ${weekAccessStatus.isOpen ? 'bg-black text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-white-300">
                            {statusOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                                className="text-black data-[state=checked]:bg-transparent data-[state=checked]:text-black"
                              >
                                <div className={`flex ${option.color} items-center gap-2`}>
                                  <option.icon className={`h-4 w-4 ${option.color}`} />
                                  {option.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </CardContent>
          </div>
        </Card>
      </main>
    </div>
  )
}
