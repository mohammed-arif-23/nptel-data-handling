import type React from "react"
import type { Metadata } from "next"
import Image from "next/image"
import "./globals.css"

export const metadata: Metadata = {
  title: "NPTEL Tracker",
  description: "Track your NPTEL course progress",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          html {
            font-family: 'Poppins', sans-serif;
          }
        `}</style>
      </head>
      <body className="bg-black text-white font-['Poppins'] pt-[150px]">
        <header className="fixed top-0 left-0 w-full bg-black z-50 flex justify-center items-center py-4 shadow-lg">
          <div className="flex flex-col items-center">
            <Image 
              src="https://www.avsenggcollege.ac.in/img/autonomous%20ugc%20png-03-03-01.png" 
              alt="Department of IT" 
              width={300} 
              height={150} 
              className="object-contain"
            />
            <h1 className="text-2xl font-bold text-white mt-2">Department of IT</h1>
          </div>
        </header>
        <main className="container mx-auto px-4">
          {children}
        </main>
      </body>
    </html>
  )
}
