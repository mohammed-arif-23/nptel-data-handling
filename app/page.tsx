"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GraduationCap, LogIn, UserPlus } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="text-center max-w-md w-full">
       
        <h2 className="text-xl text-black mb-4">NPTEL Course Completion Tracker</h2>
        <div className="flex justify-center mb-8">
          <img src={'placeholder-home.png'} className="w-[75%]"/>
        </div>
        <div className="space-y-4">
        <Button 
            asChild 
            variant="outline" 
            className="w-full text-black hover:bg-white/20"
          >
            <Link href="/NPTEL">
           
            Guide for Enrolling NPTEL Course
            </Link>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            className="w-full text-black hover:bg-white/20"
          >
            <Link href="/login">
              <LogIn className="h-5 w-5 mr-2" />
              Login
            </Link>
          </Button>
          
          <Button 
            asChild 
            variant="outline" 
            className="w-full text-black hover:bg-white/20"
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
