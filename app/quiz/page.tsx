"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(26)
  const [selectedFrequency, setSelectedFrequency] = useState<string | null>(null)
  const router = useRouter()

  const totalSteps = 28
  const progress = (currentStep / totalSteps) * 100

  const handleFrequencySelect = (frequency: string) => {
    setSelectedFrequency(frequency)
    // Auto-advance after selection or add a continue button
    setTimeout(() => {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1)
      } else {
        // Navigate to results or final page
        router.push("/results")
      }
    }, 500)
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      router.push("/")
    }
  }

  const frequencyOptions = [
    {
      id: "daily",
      label: "Daily",
      emoji: "😊"
    },
    {
      id: "weekly", 
      label: "Weekly",
      emoji: "😄"
    },
    {
      id: "monthly",
      label: "Monthly", 
      emoji: "🙂"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              <span className="text-lg font-semibold text-gray-800">MOONGRADE</span>
            </div>

            <div className="text-sm text-gray-600 font-medium">
              {currentStep}/{totalSteps}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <Progress value={progress} className="h-1" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-12 leading-relaxed">
            How often do you want to get updates on<br />
            your horoscopes and future predictions?
          </h1>

          <div className="space-y-4 max-w-md mx-auto">
            {frequencyOptions.map((option) => (
              <Card
                key={option.id}
                className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                  selectedFrequency === option.id
                    ? "border-purple-400 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleFrequencySelect(option.id)}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="text-lg font-medium text-gray-800">
                    {option.label}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}