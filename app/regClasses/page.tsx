"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ArrowLeft } from "lucide-react"

export default function RegClassesPage() {
  return (
    <div className="min-h-[70vh] bg-black">
      <header className="border-b border-gray-800 bg-black">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button 
            asChild 
            variant="outline" 
            className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          <h1 className="text-lg sm:text-2xl font-bold text-white">Select Your Class</h1>
          <div className="w-20"></div> {/* Spacer to center the title */}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">Choose Your Class</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-2xl mx-auto">
          <Card className="bg-black border-white-300 hover:bg-gray-800 transition-colors">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-black border-white-300 rounded-full w-fit">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <CardTitle className="text-xl sm:text-2xl text-white">II-IT</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                asChild 
                className="w-full bg-black hover:bg-gray-700 text-white border border-white-300"
              >
                <Link href="/register?class=II-IT">Join II-IT</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-black border-white-300 hover:bg-gray-800 transition-colors">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-black border-white-300 rounded-full w-fit">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <CardTitle className="text-xl sm:text-2xl text-white">III-IT</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                asChild 
                className="w-full bg-black hover:bg-gray-700 text-white border border-white-300"
              >
                <Link href="/register?class=III-IT">Join III-IT</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-6 sm:mt-8">
          <Link href="/login" className="text-gray-300 hover:text-white underline text-sm sm:text-base">
            Already registered? Login with your register number
          </Link>
        </div>
      </main>
    </div>
  )
}
