"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function HomePage() {
  const [selectedGender, setSelectedGender] = useState<string | null>(null)
  const router = useRouter()

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender)
    // Navegar para a página do quiz
    router.push("/quiz")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-6xl">♈</div>
        <div className="absolute top-40 right-20 text-4xl">♊</div>
        <div className="absolute top-60 left-1/4 text-5xl">♌</div>
        <div className="absolute bottom-40 right-10 text-6xl">♓</div>
        <div className="absolute bottom-60 left-20 text-4xl">♐</div>
        <div className="absolute top-80 right-1/3 text-5xl">♎</div>
        <div className="absolute bottom-20 left-1/3 text-4xl">♒</div>
      </div>

      {/* Header */}
      <header className="relative z-10 pt-8 pb-4">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
            <span className="text-xl font-semibold text-gray-800">MOONGRADE</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Discover your true life path and
            <br />
            improve relationships with astrology
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Take a 1-minute quiz to receive your personal astrological
            <br />
            guidance plan to navigate your love life & personal growth.
          </p>

          {/* Gender selection */}
          <div className="mb-16">
            <p className="text-gray-700 mb-8 text-lg">Select your gender:</p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
              {/* Male option */}
              <Card
                className="relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg w-full md:w-80"
                onClick={() => handleGenderSelect("male")}
              >
                <div className="bg-gradient-to-b from-blue-200 to-blue-300 p-8 pb-4">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=128&width=128"
                      alt="Male option"
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                </div>
                <Button
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white py-4 text-lg font-semibold rounded-none rounded-b-lg"
                  size="lg"
                >
                  Male
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Card>

              {/* Female option */}
              <Card
                className="relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg w-full md:w-80"
                onClick={() => handleGenderSelect("female")}
              >
                <div className="bg-gradient-to-b from-yellow-200 to-yellow-300 p-8 pb-4">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=128&width=128"
                      alt="Female option"
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                </div>
                <Button
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-4 text-lg font-semibold rounded-none rounded-b-lg"
                  size="lg"
                >
                  Female
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-auto py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-4">
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">
              Terms & Conditions
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">
              Privacy Policy
            </a>
          </div>

          <div className="text-center text-xs text-gray-400 space-y-1">
            <p>Disclaimer: Results may vary from person to person</p>
            <p>© 2025 Moongrade. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
