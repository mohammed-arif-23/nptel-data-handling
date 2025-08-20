"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <header className="border-b border-gray-600 bg-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">IT</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Department of IT - NPTEL Course Tracker</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Select Your Class</h2>
          <p className="text-lg text-white mb-8">Choose your class to start tracking your NPTEL course</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <Card className="bg-gray-800 border-gray-600 hover:bg-gray-700 transition-colors">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-gray-700 rounded-full w-fit">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">II-IT</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild className="w-full bg-gray-700 hover:bg-gray-600 text-white">
                <Link href="/register?class=II-IT">Join II-IT</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-600 hover:bg-gray-700 transition-colors">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-gray-700 rounded-full w-fit">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">III-IT</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild className="w-full bg-gray-700 hover:bg-gray-600 text-white">
                <Link href="/register?class=III-IT">Join III-IT</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Link href="/login" className="text-blue-400 hover:text-blue-300 underline">
            Already registered? Login with your register number
          </Link>
        </div>
      </main>
    </div>
  )
}
