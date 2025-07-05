"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const router = useRouter()

  const totalSteps = 28
  const progress = (currentStep / totalSteps) * 100

  const handleAnswer = (answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentStep]: answer
    }))
    
    // Auto-advance to next step
    setTimeout(() => {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1)
      } else {
        // Navigate to results
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-12 leading-relaxed">
              What's your zodiac sign?
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Aries", "Taurus", "Gemini", "Cancer", 
                "Leo", "Virgo", "Libra", "Scorpio",
                "Sagittarius", "Capricorn", "Aquarius", "Pisces"
              ].map((sign) => (
                <Card
                  key={sign}
                  className="p-4 cursor-pointer transition-all duration-200 hover:shadow-md border-2 hover:border-purple-400"
                  onClick={() => handleAnswer(sign)}
                >
                  <div className="text-center">
                    <span className="text-lg font-medium text-gray-800">{sign}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )

      case 26:
        return (
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-12 leading-relaxed">
              How often do you want to get updates on<br />
              your horoscopes and future predictions?
            </h1>
            <div className="space-y-4 max-w-md mx-auto">
              {[
                { id: "daily", label: "Daily", emoji: "😊" },
                { id: "weekly", label: "Weekly", emoji: "😄" },
                { id: "monthly", label: "Monthly", emoji: "🙂" }
              ].map((option) => (
                <Card
                  key={option.id}
                  className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                    answers[currentStep] === option.id
                      ? "border-purple-400 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleAnswer(option.id)}
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
        )

      default:
        return (
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-12 leading-relaxed">
              Quiz Step {currentStep}
            </h1>
            <p className="text-gray-600 mb-8">
              This is a placeholder for step {currentStep}. Add your question content here.
            </p>
            <div className="space-y-4 max-w-md mx-auto">
              <Card
                className="p-6 cursor-pointer transition-all duration-200 hover:shadow-md border-2 hover:border-purple-400"
                onClick={() => handleAnswer("option1")}
              >
                <span className="text-lg font-medium text-gray-800">Option 1</span>
              </Card>
              <Card
                className="p-6 cursor-pointer transition-all duration-200 hover:shadow-md border-2 hover:border-purple-400"
                onClick={() => handleAnswer("option2")}
              >
                <span className="text-lg font-medium text-gray-800">Option 2</span>
              </Card>
            </div>
          </div>
        )
    }
  }

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
        {renderStep()}
      </main>
    </div>
  )
}