"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GraduationCap, LogIn, UserPlus } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="text-center max-w-md w-full">
        <div className="flex justify-center mb-8">
          <GraduationCap className="h-16 w-16 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">NPTEL Course Completion Tracker</h2>
        
        <div className="space-y-4">
          <Button 
            asChild 
            variant="outline" 
            className="w-full border-white-300 text-white hover:bg-gray-800 bg-transparent"
          >
            <Link href="/login">
              <LogIn className="h-5 w-5 mr-2" />
              Login
            </Link>
          </Button>
          
          <Button 
            asChild 
            variant="outline" 
            className="w-full border-white-300 text-white hover:bg-gray-800 bg-transparent"
          >
            <Link href="/regClasses">
              <UserPlus className="h-5 w-5 mr-2" />
              Register
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
