"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function NPTELRegistrationGuide() {
  const registrationSteps = [
    {
      title: "Screenshot for Illustration",
      description: "Open the Below Link to Register for NPTEL Course \n ",
      screenshot: "/nptel.jpeg"
    },
  ]

  return (
    <div className="min-h-screen text-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
         
          <h1 className="text-3xl sm:text-4xl font-bold text-center flex-grow">
            NPTEL Course Registration Guide
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Guide Steps */}
          <div className="space-y-6">
            {registrationSteps.map((step, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-black">Follow these Steps: </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">1. Click and Open the Below Link to Register for NPTEL Course</p>
                  <a 
                    className="text-black font-bold mt-4 mb-4 block hover:underline" 
                    href="https://swayam.gov.in/explorer" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    https://swayam.gov.in/explorer
                  </a>
                  <p className="text-gray-600 mb-4 mt-4">2. Scroll and Find Category </p>
                  <p className="text-gray-600 mb-4">3. Select "Engineering and Technology"</p>
                  <p className="text-gray-600 mb-4">4. Then in Below Sub-Category Select "Computer Science and Engineering"</p>
                  <p className="text-gray-600 mb-4">5. Choose Your Preferred Course and Register</p>
                  <p className="text-gray-600 mb-4">6. Then Select the Course You Prefer to Learn</p>
                  <p className="text-gray-600 mb-4">7. Click Join Button</p>
                  <p className="text-gray-600 mb-4">8. Fill up your Details and Enroll your course</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            {registrationSteps.map((step, index) => (
              <div key={index} className="glass rounded-lg overflow-hidden">
                <div className="relative w-[100%] aspect-[9/16]">
                  <Image 
                    src={step.screenshot} 
                    alt={`Screenshot for ${step.title}`} 
                    fill 
                    className="object-contain"
                  />
                </div>
                <div className="p-4 flex flex-col gap-4">
                  <p className="text-black text-center">{step.title}</p>
                  <Button 
            asChild 
            variant="outline" 
            className="text-black hover:bg-white/20"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
