"use client"

import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, any>>({})
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]) // Moved useState here
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null)
  const [birthMonth, setBirthMonth] = useState<string>("")
  const [birthDay, setBirthDay] = useState<string>("")
  const [birthYear, setBirthYear] = useState<string>("")
  const [birthHour, setBirthHour] = useState<string>("")
  const [birthMinute, setBirthMinute] = useState<string>("")
  const [birthPeriod, setBirthPeriod] = useState<string>("")
  const [birthLocation, setBirthLocation] = useState<string>("")
  const [progress, setProgress] = useState(0)
  const [selectedGender, setSelectedGender] = useState<string>("")
  const [selectedPartnerGender, setSelectedPartnerGender] = useState<string>("")
  const [partnerBirthMonth, setPartnerBirthMonth] = useState<string>("")
  const [partnerBirthDay, setPartnerBirthDay] = useState<string>("")
  const [partnerBirthYear, setPartnerBirthYear] = useState<string>("")
  const [partnerBirthHour, setPartnerBirthHour] = useState<string>("")
  const [partnerBirthMinute, setPartnerBirthMinute] = useState<string>("")
  const [partnerBirthPeriod, setPartnerBirthPeriod] = useState<string>("")
  const [partnerBirthLocation, setPartnerBirthLocation] = useState<string>("")
  const [partnerLogicEmotion, setPartnerLogicEmotion] = useState<string>("")
  const [loveLanguage, setLoveLanguage] = useState<string>("")
  const [compatibilityProgress, setCompatibilityProgress] = useState(0)
  // Add new state for additional goals after the existing state declarations
  const [additionalGoals, setAdditionalGoals] = useState<string[]>([])
  // Add new state for curiosity agreement after the existing state declarations:
  const [curiosityAgreement, setCuriosityAgreement] = useState<string>("")
  // Add new state for life event dates after the existing state declarations:
  const [lifeEventDates, setLifeEventDates] = useState<string[]>([])

  const totalSteps = 28
  const router = useRouter()

  // Add the additional goals options array after the existing arrays
  const additionalGoalsOptions = [
    {
      id: "stronger-friendships",
      label: "Build stronger friendships",
      icon: "🤝",
    },
    {
      id: "understand-myself",
      label: "Understand myself better",
      icon: "🔍",
    },
    {
      id: "life-path-purpose",
      label: "Discover my life path & purpose",
      icon: "🗺️",
    },
    {
      id: "grow-spiritually",
      label: "Grow spiritually",
      icon: "🧘",
    },
    {
      id: "find-happiness",
      label: "Find happiness",
      icon: "✨",
    },
    {
      id: "improve-finances",
      label: "Improve finances",
      icon: "💰",
    },
    {
      id: "successful-career",
      label: "Have a successful career",
      icon: "📈",
    },
  ]

  // Add the curiosity agreement options array after the existing arrays:
  const curiosityOptions = [
    {
      id: "strongly-agree",
      label: "Strongly agree",
      icon: "✅",
    },
    {
      id: "somewhat-agree",
      label: "Somewhat agree",
      icon: "❓",
    },
    {
      id: "disagree",
      label: "Disagree",
      icon: "❌",
    },
  ]

  // Add the life event dates options array after the existing arrays:
  const lifeEventOptions = [
    {
      id: "conceive-child",
      label: "When is the best time to conceive a child",
      icon: "👶",
    },
    {
      id: "resolve-conflicts",
      label: "Best dates for resolving conflicts",
      icon: "💬",
    },
    {
      id: "career-changes",
      label: "Key dates for career changes",
      icon: "💼",
    },
    {
      id: "meet-perfect-match",
      label: "When will I meet my perfect match",
      icon: "💑",
    },
    {
      id: "start-relationship",
      label: "Best time to start a new relationship",
      icon: "❤️",
    },
    {
      id: "other",
      label: "Other",
      icon: "🤔",
    },
  ]

  // Update the useEffect to handle both step 13 and step 21 loading animations
  useEffect(() => {
    if (currentStep === 13) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer)
            // Auto advance to next step after reaching 100%
            setTimeout(() => {
              setCurrentStep(14)
            }, 2000)
            return 100
          }
          return prev + 1
        })
      }, 50)

      return () => clearInterval(timer)
    }

    if (currentStep === 21) {
      const timer = setInterval(() => {
        setCompatibilityProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer)
            // Auto advance to next step after reaching 100%
            setTimeout(() => {
              setCurrentStep(22)
            }, 2000)
            return 100
          }
          return prev + 1
        })
      }, 50)

      return () => clearInterval(timer)
    }
  }, [currentStep])

  const handleLevelSelect = (level: string) => {
    setSelectedLevel(level)
    setQuizAnswers((prev) => ({ ...prev, astrologyLevel: level }))
    // Avançar para próxima etapa após um pequeno delay
    setTimeout(() => {
      setCurrentStep(3)
    }, 300)
  }

  const handleBack = () => {
    if (currentStep === 1) {
      router.push("/")
    } else {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleContinue = () => {
    setCurrentStep(currentStep + 1)
  }

  const handleGoalToggle = (goalId: string) => {
    setSelectedGoals((prev) => {
      if (prev.includes(goalId)) {
        return prev.filter((id) => id !== goalId)
      } else {
        return [...prev, goalId]
      }
    })
  }

  const handleGoalsContinue = () => {
    if (selectedGoals.length > 0) {
      setQuizAnswers((prev) => ({ ...prev, relationshipGoals: selectedGoals }))
      setCurrentStep(6)
    }
  }

  const handleAdditionalGoalToggle = (goalId: string) => {
    setAdditionalGoals((prev) => {
      if (prev.includes(goalId)) {
        return prev.filter((id) => id !== goalId)
      } else {
        return [...prev, goalId]
      }
    })
  }

  const handleAdditionalGoalsContinue = () => {
    if (additionalGoals.length > 0) {
      setQuizAnswers((prev) => ({ ...prev, additionalGoals: additionalGoals }))
      setCurrentStep(24)
    }
  }

  const handleValueToggle = (valueId: string) => {
    setSelectedValues((prev) => {
      if (prev.includes(valueId)) {
        return prev.filter((id) => id !== valueId)
      } else {
        return [...prev, valueId]
      }
    })
  }

  const handleValuesContinue = () => {
    if (selectedValues.length > 0) {
      setQuizAnswers((prev) => ({ ...prev, relationshipValues: selectedValues }))
      setCurrentStep(8)
    }
  }

  const progressPercentage = (currentStep / totalSteps) * 100

  const levels = [
    {
      id: "beginner",
      label: "Beginner",
      icon: "👶",
      description: "New to astrology",
    },
    {
      id: "intermediate",
      label: "Intermediate",
      icon: "⚡",
      description: "Some knowledge of astrology",
    },
    {
      id: "expert",
      label: "Expert",
      icon: "🎓",
      description: "Advanced astrology knowledge",
    },
  ]

  const relationshipOptions = [
    {
      id: "single",
      label: "Single",
      icon: "😊",
    },
    {
      id: "single-crush",
      label: "Single, but have a crush",
      icon: "🥰",
    },
    {
      id: "dating",
      label: "Dating",
      icon: "💖",
    },
    {
      id: "living-together",
      label: "Living together",
      icon: "🏠",
    },
    {
      id: "engaged",
      label: "Engaged",
      icon: "💍",
    },
    {
      id: "married",
      label: "Married",
      icon: "❤️",
    },
    {
      id: "complicated",
      label: "It's complicated",
      icon: "💔",
    },
  ]

  const relationshipGoals = [
    {
      id: "perfect-partner",
      label: "Find my perfect partner",
      icon: "👫",
    },
    {
      id: "check-compatibility",
      label: "Check compatibility",
      icon: "🍀",
    },
    {
      id: "improve-sexual-life",
      label: "Improve my sexual life",
      icon: "💖",
    },
    {
      id: "find-true-love",
      label: "Find my true love",
      icon: "❤️",
    },
    {
      id: "get-married",
      label: "Get married",
      icon: "💍",
    },
    {
      id: "make-crush-fall",
      label: "Make my crush fall in love with me",
      icon: "💖",
    },
    {
      id: "other",
      label: "Other",
      icon: "🤔",
    },
  ]

  const relationshipValues = [
    {
      id: "mutual-support",
      label: "Mutual support",
      icon: "👫",
    },
    {
      id: "intimacy",
      label: "Intimacy",
      icon: "💖",
    },
    {
      id: "safety",
      label: "Safety",
      icon: "🔒",
    },
    {
      id: "having-family",
      label: "Having a family",
      icon: "👨‍👩‍👧‍👦",
    },
    {
      id: "emotional-connection",
      label: "Emotional connection",
      icon: "💖",
    },
    {
      id: "beautiful-memories",
      label: "Beautiful memories",
      icon: "❤️",
    },
  ]

  const loveLifeEmotions = [
    {
      id: "loved",
      label: "Loved",
      icon: "🥰",
    },
    {
      id: "satisfied",
      label: "Satisfied",
      icon: "😌",
    },
    {
      id: "uncertain",
      label: "Uncertain",
      icon: "🤔",
    },
    {
      id: "tired",
      label: "Tired",
      icon: "😴",
    },
    {
      id: "anxious",
      label: "Anxious",
      icon: "😰",
    },
    {
      id: "disappointed",
      label: "Disappointed",
      icon: "😞",
    },
  ]

  const genderOptions = [
    {
      id: "male",
      label: "Male",
      icon: "👨",
    },
    {
      id: "female",
      label: "Female",
      icon: "👩",
    },
  ]

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString())

  const years = Array.from({ length: 80 }, (_, i) => (2024 - i).toString())

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString())
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"))
  const periods = ["AM", "PM"]

  const getZodiacSign = (month: string, day: string) => {
    const monthNum = months.indexOf(month) + 1
    const dayNum = Number.parseInt(day)

    if ((monthNum === 3 && dayNum >= 21) || (monthNum === 4 && dayNum <= 19)) return "aries"
    if ((monthNum === 4 && dayNum >= 20) || (monthNum === 5 && dayNum <= 20)) return "taurus"
    if ((monthNum === 5 && dayNum >= 21) || (monthNum === 6 && dayNum <= 20)) return "gemini"
    if ((monthNum === 6 && dayNum >= 21) || (monthNum === 7 && dayNum <= 22)) return "cancer"
    if ((monthNum === 7 && dayNum >= 23) || (monthNum === 8 && dayNum <= 22)) return "leo"
    if ((monthNum === 8 && dayNum >= 23) || (monthNum === 9 && dayNum <= 22)) return "virgo"
    if ((monthNum === 9 && dayNum >= 23) || (monthNum === 10 && dayNum <= 22)) return "libra"
    if ((monthNum === 10 && dayNum >= 23) || (monthNum === 11 && dayNum <= 21)) return "scorpio"
    if ((monthNum === 11 && dayNum >= 22) || (monthNum === 12 && dayNum <= 21)) return "sagittarius"
    if ((monthNum === 12 && dayNum >= 22) || (monthNum === 1 && dayNum <= 19)) return "capricorn"
    if ((monthNum === 1 && dayNum >= 20) || (monthNum === 2 && dayNum <= 18)) return "aquarius"
    if ((monthNum === 2 && dayNum >= 19) || (monthNum === 3 && dayNum <= 20)) return "pisces"

    return "sagittarius" // fallback
  }

  const zodiacSigns = {
    aries: {
      name: "Aries",
      description: `As a${selectedGender ? ` ${selectedGender}` : ""} Aries, you are bold and ambitious, with a natural leadership quality and pioneering spirit.`,
      svg: <Image src="/aries.svg" alt="Aries constellation" width={364} height={179} className="mx-auto" />,
    },
    taurus: {
      name: "Taurus",
      description: `As a${selectedGender ? ` ${selectedGender}` : ""} Taurus, you are reliable and practical, with a love for comfort and a strong determination.`,
      svg: <Image src="/taurus.svg" alt="Taurus constellation" width={364} height={179} className="mx-auto" />,
    },
    gemini: {
      name: "Gemini",
      description: `As a${selectedGender ? ` ${selectedGender}` : ""} Gemini, you are curious and adaptable, with excellent communication skills and a dual nature.`,
      svg: <Image src="/gemini.svg" alt="Gemini constellation" width={364} height={179} className="mx-auto" />,
    },
    cancer: {
      name: "Cancer",
      description: `As a${selectedGender ? ` ${selectedGender}` : ""} Cancer, you are nurturing and intuitive, with strong emotional intelligence and protective instincts.`,
      svg: <Image src="/cancer.svg" alt="Cancer constellation" width={364} height={179} className="mx-auto" />,
    },
    leo: {
      name: "Leo",
      description: `As a${selectedGender ? ` ${selectedGender}` : ""} Leo, you are confident and charismatic, with natural leadership abilities and a generous heart.`,
      svg: <Image src="/leo.svg" alt="Leo constellation" width={364} height={179} className="mx-auto" />,
    },
    virgo: {
      name: "Virgo",
      description: `As a${selectedGender ? ` ${selectedGender}` : ""} Virgo, you are analytical and practical, with attention to detail and a desire for perfection.`,
      svg: <Image src="/virgo.svg" alt="Virgo constellation" width={364} height={179} className="mx-auto" />,
    },
    libra: {
      name: "Libra",
      description: `As a${selectedGender ? ` ${selectedGender}` : ""} Libra, you are diplomatic and fair-minded, with a natural sense of balance and harmony.`,
      svg: <Image src="/libra.svg" alt="Libra constellation" width={364} height={179} className="mx-auto" />,
    },
    scorpio: {
      name: "Scorpio",
      description: `As a${selectedGender ? ` ${selectedGender}` : ""} Scorpio, you are intense and passionate, with deep emotional insight and transformative power.`,
      svg: <Image src="/scorpio.svg" alt="Scorpio constellation" width={364} height={179} className="mx-auto" />,
    },
    sagittarius: {
      name: "Sagittarius",
      description: `As a${selectedGender ? ` ${selectedGender}` : ""} Sagittarius, you are adventurous and optimistic, with a love for exploration and a natural curiosity about the world.`,
      svg: (
        <Image src="/sagittarius.svg" alt="Sagittarius constellation" width={364} height={179} className="mx-auto" />
      ),
    },
    capricorn: {
      name: "Capricorn",
      description: `As a${selectedGender ? ` ${selectedGender}` : ""} Capricorn, you are ambitious and disciplined, with strong determination and practical wisdom.`,
      svg: <Image src="/capricorn.svg" alt="Capricorn constellation" width={364} height={179} className="mx-auto" />,
    },
    aquarius: {
      name: "Aquarius",
      description: `As a${selectedGender ? ` ${selectedGender}` : ""} Aquarius, you are independent and innovative, with humanitarian ideals and original thinking.`,
      svg: <Image src="/aquarius.svg" alt="Aquarius constellation" width={364} height={179} className="mx-auto" />,
    },
    pisces: {
      name: "Pisces",
      description: `As a${selectedGender ? ` ${selectedGender}` : ""} Pisces, you are compassionate and intuitive, with deep empathy and artistic sensibilities.`,
      svg: <Image src="/pisces.svg" alt="Pisces constellation" width={364} height={179} className="mx-auto" />,
    },
  }

  const handleBirthDateContinue = () => {
    if (birthMonth && birthDay && birthYear) {
      setQuizAnswers((prev) => ({
        ...prev,
        birthDate: { month: birthMonth, day: birthDay, year: birthYear },
      }))
      setCurrentStep(11)
    }
  }

  const handleBirthTimeContinue = () => {
    if (birthHour && birthMinute && birthPeriod) {
      setQuizAnswers((prev) => ({
        ...prev,
        birthTime: { hour: birthHour, minute: birthMinute, period: birthPeriod },
      }))
      setCurrentStep(12)
    }
  }

  const handleDontKnowTime = () => {
    setQuizAnswers((prev) => ({
      ...prev,
      birthTime: "unknown",
    }))
    setCurrentStep(12)
  }

  const handleBirthLocationContinue = () => {
    if (birthLocation.trim()) {
      setQuizAnswers((prev) => ({
        ...prev,
        birthLocation: birthLocation.trim(),
      }))
      setCurrentStep(13)
    }
  }

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender)
    setQuizAnswers((prev) => ({ ...prev, gender: gender }))
    setTimeout(() => {
      setCurrentStep(2)
    }, 300)
  }

  const handlePartnerGenderSelect = (gender: string) => {
    setSelectedPartnerGender(gender)
    setQuizAnswers((prev) => ({ ...prev, partnerGender: gender }))
    setTimeout(() => {
      setCurrentStep(16)
    }, 300)
  }

  const handlePartnerBirthDateContinue = () => {
    if (partnerBirthMonth && partnerBirthDay && partnerBirthYear) {
      setQuizAnswers((prev) => ({
        ...prev,
        partnerBirthDate: { month: partnerBirthMonth, day: partnerBirthDay, year: partnerBirthYear },
      }))
      setCurrentStep(17)
    }
  }

  const handlePartnerBirthTimeContinue = () => {
    if (partnerBirthHour && partnerBirthMinute && partnerBirthPeriod) {
      setQuizAnswers((prev) => ({
        ...prev,
        partnerBirthTime: { hour: partnerBirthHour, minute: partnerBirthMinute, period: partnerBirthPeriod },
      }))
      setCurrentStep(18)
    }
  }

  const handlePartnerDontKnowTime = () => {
    setQuizAnswers((prev) => ({
      ...prev,
      partnerBirthTime: "unknown",
    }))
    setCurrentStep(18)
  }

  const handlePartnerBirthLocationContinue = () => {
    if (partnerBirthLocation.trim()) {
      setQuizAnswers((prev) => ({
        ...prev,
        partnerBirthLocation: partnerBirthLocation.trim(),
      }))
      setCurrentStep(19)
    }
  }

  const handlePartnerDontKnowLocation = () => {
    setQuizAnswers((prev) => ({
      ...prev,
      partnerBirthLocation: "unknown",
    }))
    setCurrentStep(19)
  }

  const handlePartnerLogicEmotionSelect = (choice: string) => {
    setPartnerLogicEmotion(choice)
    setQuizAnswers((prev) => ({ ...prev, partnerLogicEmotion: choice }))
    setTimeout(() => {
      setCurrentStep(20)
    }, 300)
  }

  const handleLoveLanguageSelect = (language: string) => {
    setLoveLanguage(language)
    setQuizAnswers((prev) => ({ ...prev, loveLanguage: language }))
    setTimeout(() => {
      setCurrentStep(21)
    }, 300)
  }

  // Add handler function after the existing handlers:
  const handleCuriositySelect = (agreement: string) => {
    setCuriosityAgreement(agreement)
    setQuizAnswers((prev) => ({ ...prev, curiosityAgreement: agreement }))
    setTimeout(() => {
      setCurrentStep(25)
    }, 300)
  }

  // Add handler functions after the existing handlers:
  const handleLifeEventToggle = (eventId: string) => {
    setLifeEventDates((prev) => {
      if (prev.includes(eventId)) {
        return prev.filter((id) => id !== eventId)
      } else {
        return [...prev, eventId]
      }
    })
  }

  const handleLifeEventsContinue = () => {
    if (lifeEventDates.length > 0) {
      setQuizAnswers((prev) => ({ ...prev, lifeEventDates: lifeEventDates }))
      setCurrentStep(26)
    }
  }

  // Step 1: Gender Selection
  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Back button */}
              <Button variant="ghost" size="sm" onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Button>

              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <span className="text-xl font-semibold text-gray-800">MOONGRADE</span>
              </div>

              {/* Progress indicator */}
              <div className="text-sm text-gray-600 font-medium">
                {currentStep}/{totalSteps}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            {/* Question */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What is your gender?</h1>
            </div>

            {/* Answer options */}
            <div className="space-y-4">
              {genderOptions.map((gender) => (
                <Card
                  key={gender.id}
                  className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] border-2 ${
                    selectedGender === gender.id
                      ? "border-purple-400 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleGenderSelect(gender.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{gender.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{gender.label}</h3>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 transition-colors ${
                        selectedGender === gender.id ? "border-purple-400 bg-purple-400" : "border-gray-300"
                      }`}
                    >
                      {selectedGender === gender.id && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Step 2: Astrology Level Selection
  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Back button */}
              <Button variant="ghost" size="sm" onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Button>

              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <span className="text-xl font-semibold text-gray-800">MOONGRADE</span>
              </div>

              {/* Progress indicator */}
              <div className="text-sm text-gray-600 font-medium">
                {currentStep}/{totalSteps}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            {/* Question */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How familiar are you with astrology?
              </h1>
            </div>

            {/* Answer options */}
            <div className="space-y-4">
              {levels.map((level) => (
                <Card
                  key={level.id}
                  className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] border-2 ${
                    selectedLevel === level.id
                      ? "border-purple-400 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleLevelSelect(level.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{level.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{level.label}</h3>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 transition-colors ${
                        selectedLevel === level.id ? "border-purple-400 bg-purple-400" : "border-gray-300"
                      }`}
                    >
                      {selectedLevel === level.id && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Step 3: Information Page
  if (currentStep === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-800 via-slate-700 to-slate-900 relative overflow-hidden">
        {/* Background SVG */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('/svg-image-3.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Header */}
        <header className="sticky top-0 bg-slate-800/80 backdrop-blur-sm border-b border-slate-600 z-10 relative">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Back button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="p-2 hover:bg-slate-700 rounded-full text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>

              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <span className="text-xl font-semibold text-white">MOONGRADE</span>
              </div>

              {/* Progress indicator */}
              <div className="text-sm text-gray-300 font-medium">
                {currentStep}/{totalSteps}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <Progress value={progressPercentage} className="h-2 bg-slate-600" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Navigate your <span className="text-yellow-400">love & personal</span> life with
              <br />
              astrology
            </h1>

            {/* Description */}
            <div className="max-w-3xl mx-auto mb-16">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Our personalized guidance plans go beyond just looking at your
                <br />
                Zodiac sign. We analyze your unique birth chart using
                <br />
                astronomical data from <span className="font-semibold text-white">NASA</span> and insights from{" "}
                <span className="font-semibold text-white">2.9M</span>
                <br />
                <span className="font-semibold text-white">successful users</span>.
              </p>
            </div>

            {/* Continue button */}
            <div className="flex justify-center">
              <Button
                onClick={handleContinue}
                size="lg"
                className="px-12 py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-lg rounded-full transition-all duration-200 hover:scale-105"
              >
                Continue
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Step 4: Relationship Status
  if (currentStep === 4) {
    const handleRelationshipSelect = (status: string) => {
      setQuizAnswers((prev) => ({ ...prev, relationshipStatus: status }))
      // Avançar para próxima etapa após um pequeno delay
      setTimeout(() => {
        setCurrentStep(5)
      }, 300)
      setQuizAnswers((prev) => ({ ...prev, relationshipStatus: status }))
      // Avançar para próxima etapa após um pequeno delay
      setTimeout(() => {
        setCurrentStep(5)
      }, 300)
    }

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Back button */}
              <Button variant="ghost" size="sm" onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Button>

              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <span className="text-xl font-semibold text-gray-800">MOONGRADE</span>
              </div>

              {/* Progress indicator */}
              <div className="text-sm text-gray-600 font-medium">
                {currentStep}/{totalSteps}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            {/* Question */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What's your relationship status?</h1>
            </div>

            {/* Answer options */}
            <div className="space-y-4">
              {relationshipOptions.map((option) => (
                <Card
                  key={option.id}
                  className="p-6 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] border-2 border-gray-200 hover:border-gray-300"
                  onClick={() => handleRelationshipSelect(option.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{option.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{option.label}</h3>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Step 5: Relationship Goals (Multiple Selection)
  if (currentStep === 5) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Back button */}
              <Button variant="ghost" size="sm" onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Button>

              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <span className="text-xl font-semibold text-gray-800">MOONGRADE</span>
              </div>

              {/* Progress indicator */}
              <div className="text-sm text-gray-600 font-medium">
                {currentStep}/{totalSteps}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            {/* Question */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What are your relationship goals?</h1>
              <p className="text-gray-600">Choose all that apply</p>
            </div>

            {/* Answer options */}
            <div className="space-y-4 mb-8">
              {relationshipGoals.map((goal) => (
                <Card
                  key={goal.id}
                  className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] border-2 ${
                    selectedGoals.includes(goal.id)
                      ? "border-purple-400 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleGoalToggle(goal.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{goal.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{goal.label}</h3>
                    </div>
                    <div
                      className={`w-5 h-5 rounded border-2 transition-colors ${
                        selectedGoals.includes(goal.id) ? "border-purple-400 bg-purple-400" : "border-gray-300"
                      }`}
                    >
                      {selectedGoals.includes(goal.id) && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-sm"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Continue button */}
            <div className="text-center">
              <Button
                onClick={handleGoalsContinue}
                disabled={selectedGoals.length === 0}
                size="lg"
                className="px-12 py-4 bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-full transition-all duration-200"
              >
                Continue
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Step 6: Personalized Plan Information
  if (currentStep === 6) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-800 via-slate-700 to-slate-900 relative overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 bg-slate-800/80 backdrop-blur-sm border-b border-slate-600 z-10 relative">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Back button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="p-2 hover:bg-slate-700 rounded-full text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>

              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <span className="text-xl font-semibold text-white">MOONGRADE</span>
              </div>

              {/* Progress indicator */}
              <div className="text-sm text-gray-300 font-medium">
                {currentStep}/{totalSteps}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <Progress value={progressPercentage} className="h-2 bg-slate-600" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Your personalized plan will guide you
              <br />
              to <span className="text-yellow-400">a future full of love & happiness</span>
            </h1>

            {/* Description */}
            <div className="max-w-3xl mx-auto mb-16">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                And the best part? You don't need to change anything — we'll
                <br />
                help you navigate the destiny that's already in motion.
              </p>
            </div>

            {/* Romantic illustration */}
            <div className="mb-16 flex justify-center">
              <div className="relative">
                <Image
                  src="https://i.ibb.co/wNTyZJbS/Mg-Info-Couple1.webp"
                  alt="Romantic couple illustration"
                  width={300}
                  height={300}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Continue button */}
            <div className="flex justify-center">
              <Button
                onClick={handleContinue}
                size="lg"
                className="px-12 py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-lg rounded-full transition-all duration-200 hover:scale-105"
              >
                Continue
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Step 7: Relationship Values (Multiple Selection)
  if (currentStep === 7) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Back button */}
              <Button variant="ghost" size="sm" onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Button>

              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <span className="text-xl font-semibold text-gray-800">MOONGRADE</span>
              </div>

              {/* Progress indicator */}
              <div className="text-sm text-gray-600 font-medium">
                {currentStep}/{totalSteps}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            {/* Question */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What do you value most in a relationship?
              </h1>
              <p className="text-gray-600">Choose all that apply</p>
            </div>

            {/* Answer options */}
            <div className="space-y-4 mb-8">
              {relationshipValues.map((value) => (
                <Card
                  key={value.id}
                  className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] border-2 ${
                    selectedValues.includes(value.id)
                      ? "border-purple-400 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleValueToggle(value.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{value.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{value.label}</h3>
                    </div>
                    <div
                      className={`w-5 h-5 rounded border-2 transition-colors ${
                        selectedValues.includes(value.id) ? "border-purple-400 bg-purple-400" : "border-gray-300"
                      }`}
                    >
                      {selectedValues.includes(value.id) && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-sm"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Continue button */}
            <div className="text-center">
              <Button
                onClick={handleValuesContinue}
                disabled={selectedValues.length === 0}
                size="lg"
                className="px-12 py-4 bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-full transition-all duration-200"
              >
                Continue
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Step 8: Love Life Emotions (Single Selection)
  if (currentStep === 8) {
    const handleEmotionSelect = (emotion: string) => {
      setSelectedEmotion(emotion)
      setQuizAnswers((prev) => ({ ...prev, loveLifeEmotion: emotion }))
      // Avançar para próxima etapa após um pequeno delay
      setTimeout(() => {
        setCurrentStep(9)
      }, 300)
    }

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Back button */}
              <Button variant="ghost" size="sm" onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Button>

              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <span className="text-xl font-semibold text-gray-800">MOONGRADE</span>
              </div>

              {/* Progress indicator */}
              <div className="text-sm text-gray-600 font-medium">
                {currentStep}/{totalSteps}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            {/* Question */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What emotion best describes your love life?
              </h1>
            </div>

            {/* Answer options */}
            <div className="space-y-4">
              {loveLifeEmotions.map((emotion) => (
                <Card
                  key={emotion.id}
                  className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] border-2 ${
                    selectedEmotion === emotion.id
                      ? "border-purple-400 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleEmotionSelect(emotion.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{emotion.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{emotion.label}</h3>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 transition-colors ${
                        selectedEmotion === emotion.id ? "border-purple-400 bg-purple-400" : "border-gray-300"
                      }`}
                    >
                      {selectedEmotion === emotion.id && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Step 9: Relationship Compatibility Information
  if (currentStep === 9) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-800 via-slate-700 to-slate-900 relative overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 bg-slate-800/80 backdrop-blur-sm border-b border-slate-600 z-10 relative">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Back button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="p-2 hover:bg-slate-700 rounded-full text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>

              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <span className="text-xl font-semibold text-white">MOONGRADE</span>
              </div>

              {/* Progress indicator */}
              <div className="text-sm text-gray-300 font-medium">
                {currentStep}/{totalSteps}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <Progress value={progressPercentage} className="h-2 bg-slate-600" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              What do the stars say about <span className="text-yellow-400">your</span>
              <br />
              <span className="text-yellow-400">relationship?</span>
            </h1>

            {/* Description */}
            <div className="max-w-3xl mx-auto mb-16">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Let's check your compatibility and gain insights into your love life.
              </p>
            </div>

            {/* Couple illustration */}
            <div className="mb-16 flex justify-center">
              <div className="relative">
                <Image
                  src="https://i.ibb.co/KzWYmwjF/Mg-Info-Couple2.png"
                  alt="Couple embracing illustration"
                  width={300}
                  height={340}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Continue button */}
            <div className="flex justify-center">
              <Button
                onClick={handleContinue}
                size="lg"
                className="px-12 py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-lg rounded-full transition-all duration-200 hover:scale-105"
              >
                Continue
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Step 10: Birth Date Collection
  if (currentStep === 10) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background SVG */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('/svg-image-3.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-10 relative">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Back button */}
              <Button variant="ghost" size="sm" onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Button>

              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <span className="text-xl font-semibold text-gray-800">MOONGRADE</span>
              </div>

              {/* Progress indicator */}
              <div className="text-sm text-gray-600 font-medium">
                {currentStep}/{totalSteps}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-12 relative z-10">
          <div className="max-w-2xl mx-auto">
            {/* Question */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What's your date of birth?</h1>
              <p className="text-gray-600">
                We need this to determine the planetary placements at the time of your birth.
              </p>
            </div>

            {/* Date selectors */}
            <div className="space-y-6 mb-12">
              {/* Month selector */}
              <div>
                <select
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(e.target.value)}
                  className="w-full p-4 text-lg border-2 border-gray-200 rounded-full focus:border-purple-400 focus:outline-none bg-white"
                >
                  <option value="">Select Month</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              {/* Day selector */}
              <div>
                <select
                  value={birthDay}
                  onChange={(e) => setBirthDay(e.target.value)}
                  className="w-full p-4 text-lg border-2 border-gray-200 rounded-full focus:border-purple-400 focus:outline-none bg-white"
                >
                  <option value="">Select Day</option>
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year selector */}
              <div>
                <select
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  className="w-full p-4 text-lg border-2 border-gray-200 rounded-full focus:border-purple-400 focus:outline-none bg-white"
                >
                  <option value="">Select Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Continue button */}
            <div className="text-center">
              <Button
                onClick={handleBirthDateContinue}
                disabled={!birthMonth || !birthDay || !birthYear}
                size="lg"
                className="w-full max-w-md px-12 py-4 bg-slate-800 hover:bg-slate-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-full transition-all duration-200"
              >
                Continue
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Step 11: Birth Time Collection
  if (currentStep === 11) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background SVG */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('/svg-image-11.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-10 relative">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Back button */}
              <Button variant="ghost" size="sm" onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Button>

              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <span className="text-xl font-semibold text-gray-800">MOONGRADE</span>
              </div>

              {/* Progress indicator */}
              <div className="text-sm text-gray-600 font-medium">
                {currentStep}/{totalSteps}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-12 relative z-10">
          <div className="max-w-2xl mx-auto">
            {/* Question */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What is your time of birth?</h1>
              <p className="text-gray-600">
                We need this to determine the planetary placements at the time of your birth. If you don't know this
                information, you can still get plenty of useful insights.
              </p>
            </div>

            {/* Time selectors */}
            <div className="flex gap-4 justify-center mb-12">
              {/* Hour selector */}
              <div className="flex-1 max-w-[120px]">
                <select
                  value={birthHour}
                  onChange={(e) => setBirthHour(e.target.value)}
                  className="w-full p-4 text-lg border-2 border-gray-200 rounded-full focus:border-purple-400 focus:outline-none bg-white text-center"
                >
                  <option value="">12</option>
                  {hours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
              </div>

              {/* Minute selector */}
              <div className="flex-1 max-w-[120px]">
                <select
                  value={birthMinute}
                  onChange={(e) => setBirthMinute(e.target.value)}
                  className="w-full p-4 text-lg border-2 border-gray-200 rounded-full focus:border-purple-400 focus:outline-none bg-white text-center"
                >
                  <option value="">00</option>
                  {minutes.map((minute) => (
                    <option key={minute} value={minute}>
                      {minute}
                    </option>
                  ))}
                </select>
              </div>

              {/* AM/PM selector */}
              <div className="flex-1 max-w-[120px]">
                <select
                  value={birthPeriod}
                  onChange={(e) => setBirthPeriod(e.target.value)}
                  className="w-full p-4 text-lg border-2 border-gray-200 rounded-full focus:border-purple-400 focus:outline-none bg-white text-center"
                >
                  <option value="">PM</option>
                  {periods.map((period) => (
                    <option key={period} value={period}>
                      {period}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-4 text-center">
              <Button
                onClick={handleBirthTimeContinue}
                disabled={!birthHour || !birthMinute || !birthPeriod}
                size="lg"
                className="w-full max-w-md px-12 py-4 bg-slate-800 hover:bg-slate-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-full transition-all duration-200"
              >
                Continue
              </Button>

              <Button
                onClick={handleDontKnowTime}
                variant="outline"
                size="lg"
                className="w-full max-w-md px-12 py-4 border-2 border-gray-300 hover:border-gray-400 text-slate-800 font-semibold text-lg rounded-full transition-all duration-200 bg-transparent"
              >
                I don't know
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Step 12: Birth Location Collection
  if (currentStep === 12) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background SVG */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('/svg-image-11.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-10 relative">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Back button */}
              <Button variant="ghost" size="sm" onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Button>

              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <span className="text-xl font-semibold text-gray-800">MOONGRADE</span>
              </div>

              {/* Progress indicator */}
              <div className="text-sm text-gray-600 font-medium">
                {currentStep}/{totalSteps}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-12 relative z-10">
          <div className="max-w-2xl mx-auto">
            {/* Question */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What is your place of birth?</h1>
              <p className="text-gray-600">
                We need this to determine the planetary placements at the place of your birth.
              </p>
            </div>

            {/* Location input */}
            <div className="mb-12">
              <input
                type="text"
                value={birthLocation}
                onChange={(e) => setBirthLocation(e.target.value)}
                placeholder="Type in your place of birth"
                className="w-full p-4 text-lg border-2 border-gray-200 rounded-full focus:border-purple-400 focus:outline-none bg-white"
              />
            </div>

            {/* Continue button */}
            <div className="text-center">
              <Button
                onClick={handleBirthLocationContinue}
                disabled={!birthLocation.trim()}
                size="lg"
                className="w-full max-w-md px-12 py-4 bg-slate-400 hover:bg-slate-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-full transition-all duration-200"
              >
                Continue
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Step 13: Birth Chart Analysis Loading
  if (currentStep === 13) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-800 via-slate-700 to-slate-900 relative overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 bg-slate-800/80 backdrop-blur-sm border-b border-slate-600 z-10 relative">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Back button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="p-2 hover:bg-slate-700 rounded-full text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>

              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <span className="text-xl font-semibold text-white">MOONGRADE</span>
              </div>

              {/* Progress indicator */}
              <div className="text-sm text-gray-300 font-medium">
                {currentStep}/{totalSteps}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <Progress value={progressPercentage} className="h-2 bg-slate-600" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-16">Analyzing your unique birth chart...</h1>

            {/* Progress Circle */}
            <div className="relative w-64 h-64 mx-auto mb-12">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle cx="50" cy="50" r="45" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="8" fill="none" />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#FCD34D"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                  className="transition-all duration-300 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-bold text-yellow-400">{progress}%</span>
              </div>
            </div>

            {/* Stats */}
            <div className="mb-12">
              <div className="text-2xl font-bold text-yellow-400 mb-2">2.9+ million people</div>
              <div className="text-gray-300">have chosen Moongrade</div>
            </div>

            {/* Testimonial Card */}
            <div className="bg-white rounded-lg p-6 text-left max-w-md mx-auto">
              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-green-500 rounded-sm"></div>
                ))}
              </div>

              {/* Title */}
              <h3 className="font-semibold text-gray-900 mb-2">Most accurate future predictions</h3>

              {/* Review text */}
              <p className="text-sm text-gray-700 leading-relaxed">
                I got out of my toxic relationship last spring thanks to Moongrade. It said I'm gonna meet my soulmate
                in 3 months, and we just got engaged last week! It's crazy how accurate their future predictions are.
              </p>

              {/* Reviewer */}
              <div className="text-xs text-gray-500 mt-3">Emily, 26</div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Step 14: Zodiac Sign Reveal
  if (currentStep === 14) {
    const currentZodiacSign = getZodiacSign(birthMonth, birthDay)
    const zodiacData = zodiacSigns[currentZodiacSign as keyof typeof zodiacSigns]

    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-800 via-slate-700 to-slate-900 relative overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 bg-slate-800/80 backdrop-blur-sm border-b border-slate-600 z-10 relative">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Back button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="p-2 hover:bg-slate-700 rounded-full text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>

              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <span className="text-xl font-semibold text-white">MOONGRADE</span>
              </div>

              {/* Progress indicator */}
              <div className="text-sm text-gray-300 font-medium">
                {currentStep}/{totalSteps}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <Progress value={progressPercentage} className="h-2 bg-slate-600" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-16 relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)]">
          <div className="max-w-md mx-auto text-center">
            {/* Zodiac Card */}
            <div className="bg-slate-700/50 backdrop-blur-sm rounded-3xl p-12 mb-8 border border-slate-600/50">
              {/* Dynamic Zodiac Constellation */}
              <div className="mb-8">{zodiacData.svg}</div>

              {/* Sign Name */}
              <h2 className="text-3xl font-bold text-white mb-6">{zodiacData.name}</h2>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed text-lg">{zodiacData.description}</p>
            </div>

            {/* Continue button */}
            <Button
              onClick={handleContinue}
              size="lg"
              className="w-full max-w-sm px-12 py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-lg rounded-full transition-all duration-200 hover:scale-105"
            >
              Continue
            </Button>
          </div>
        </main>
      </div>
    )
  }

  // Step 15: Partner Gender Selection
  if (currentStep === 15) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Back button */}
              <Button variant="ghost" size="sm" onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Button>

              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <span className="text-xl font-semibold text-gray-800">MOONGRADE</span>
              </div>

              {/* Progress indicator */}
              <div className="text-sm text-gray-600 font-medium">
                {currentStep}/{totalSteps}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            {/* Question */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What is your partner's gender?</h1>
            </div>

            {/* Answer options */}
            <div className="space-y-4">
              {genderOptions.map((gender) => (
                <Card
                  key={gender.id}
                  className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] border-2 ${
                    selectedPartnerGender === gender.id
                      ? "border-purple-400 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handlePartnerGenderSelect(gender.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{gender.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{gender.label}</h3>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 transition-colors ${
                        selectedPartnerGender === gender.id ? "border-purple-400 bg-purple-400" : "border-gray-300"
                      }`}
                    >
                      {selectedPartnerGender === gender.id && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Step 16: Partner Birth Date Collection
  if (currentStep === 16) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background SVG */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('/svg-image-3.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-10 relative">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Back button */}
              <Button variant="ghost" size="sm" onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Button>

              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <span className="text-xl font-semibold text-gray-800">MOONGRADE</span>
              </div>

              {/* Progress indicator */}
              <div className="text-sm text-gray-600 font-medium">
                {currentStep}/{totalSteps}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-12 relative z-10">
          <div className="max-w-2xl mx-auto">
            {/* Question */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What is your partner's date of birth?
              </h1>
              <p className="text-gray-600">
                We need this to determine the planetary placements at the time of your partner's birth.
              </p>
            </div>

            {/* Date selectors */}
            <div className="space-y-6 mb-12">
              {/* Month selector */}
              <div>
                <select
                  value={partnerBirthMonth}
                  onChange={(e) => setPartnerBirthMonth(e.target.value)}
                  className="w-full p-4 text-lg border-2 border-gray-200 rounded-full focus:border-purple-400 focus:outline-none bg-white"
                >
                  <option value="">Month</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              {/* Day selector */}
              <div>
                <select
                  value={partnerBirthDay}
                  onChange={(e) => setPartnerBirthDay(e.target.value)}
                  className="w-full p-4 text-lg border-2 border-gray-200 rounded-full focus:border-purple-400 focus:outline-none bg-white"
                >
                  <option value="">Day</option>
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year selector */}
              <div>
                <select
                  value={partnerBirthYear}
                  onChange={(e) => setPartnerBirthYear(e.target.value)}
                  className="w-full p-4 text-lg border-2 border-gray-200 rounded-full focus:border-purple-400 focus:outline-none bg-white"
                >
                  <option value="">Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Continue button */}
          <div className="text-center">
            <Button
              onClick={handlePartnerBirthDateContinue}
              disabled={!partnerBirthMonth || !partnerBirthDay || !partnerBirthYear}
              size="lg"
              className="w-full max-w-md px-12 py-4 bg-slate-400 hover:bg-slate-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-full transition-all duration-200"
            >
              Continue
            </Button>
          </div>
        </main>
      </div>
    )
  }

  // Step 17: Partner Birth Time Collection
  if (currentStep === 17) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background SVG */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('/svg-image-11.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-10 relative">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Back button */}
              <Button variant="ghost" size="sm" onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Button>

              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <span className="text-xl font-semibold text-gray-800">MOONGRADE</span>
              </div>

              {/* Progress indicator */}
              <div className="text-sm text-gray-600 font-medium">
                {currentStep}/{totalSteps}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-12 relative z-10">
          <div className="max-w-2xl mx-auto">
            {/* Question */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What is time of your partner's birth?
              </h1>
              <p className="text-gray-600">
                We need this to determine the planetary placements at the time of your partner's birth. If you don't
                know this information, you can still get plenty of useful insights.
              </p>
            </div>

            {/* Time selectors */}
            <div className="flex gap-4 justify-center mb-12">
              {/* Hour selector */}
              <div className="flex-1 max-w-[120px]">
                <select
                  value={partnerBirthHour}
                  onChange={(e) => setPartnerBirthHour(e.target.value)}
                  className="w-full p-4 text-lg border-2 border-gray-200 rounded-full focus:border-purple-400 focus:outline-none bg-white text-center"
                >
                  <option value="">12</option>
                  {hours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
              </div>

              {/* Minute selector */}
              <div className="flex-1 max-w-[120px]">
                <select
                  value={partnerBirthMinute}
                  onChange={(e) => setPartnerBirthMinute(e.target.value)}
                  className="w-full p-4 text-lg border-2 border-gray-200 rounded-full focus:border-purple-400 focus:outline-none bg-white text-center"
                >
                  <option value="">00</option>
                  {minutes.map((minute) => (
                    <option key={minute} value={minute}>
                      {minute}
                    </option>
                  ))}
                </select>
              </div>

              {/* AM/PM selector */}
              <div className="flex-1 max-w-[120px]">
                <select
                  value={partnerBirthPeriod}
                  onChange={(e) => setPartnerBirthPeriod(e.target.value)}
                  className="w-full p-4 text-lg border-2 border-gray-200 rounded-full focus:border-purple-400 focus:outline-none bg-white text-center"
                >
                  <option value="">PM</option>
                  {periods.map((period) => (
                    <option key={period} value={period}>
                      {period}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-4 text-center">
            <Button
              onClick={handlePartnerBirthTimeContinue}
              disabled={!partnerBirthHour || !partnerBirthMinute || !partnerBirthPeriod}
              size="lg"
              className="w-full max-w-md px-12 py-4 bg-slate-800 hover:bg-slate-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-full transition-all duration-200"
            >
              Continue
            </Button>

            <Button
              onClick={handlePartnerDontKnowTime}
              variant="outline"
              size="lg"
              className="w-full max-w-md px-12 py-4 border-2 border-gray-300 hover:border-gray-400 text-slate-800 font-semibold text-lg rounded-full transition-all duration-200 bg-transparent"
            >
              I don't know
            </Button>
          </div>
        </main>
      </div>
    )
  }

  // Add Step 18: Partner Birth Location Collection after Step 17
  // Step 18: Partner Birth Location Collection
  if (currentStep === 18) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background astrological chart */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('/svg-image-3.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-10 relative">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Back button */}
              <Button variant="ghost" size="sm" onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Button>

              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <span className="text-xl font-semibold text-gray-800">MOONGRADE</span>
              </div>

              {/* Progress indicator */}
              <div className="text-sm text-gray-600 font-medium">
                {currentStep}/{totalSteps}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-12 relative z-10">
          <div className="max-w-2xl mx-auto">
            {/* Question */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What is your partner's place of birth?
              </h1>
              <p className="text-gray-600">
                We need this to determine the planetary placements at the place of your partner's birth.
              </p>
            </div>

            {/* Location input */}
            <div className="mb-12">
              <input
                type="text"
                value={partnerBirthLocation}
                onChange={(e) => setPartnerBirthLocation(e.target.value)}
                placeholder="Type in the place of your partner's birth"
                className="w-full p-4 text-lg border-2 border-gray-200 rounded-full focus:border-purple-400 focus:outline-none bg-white"
              />
            </div>

            {/* Buttons */}
            <div className="space-y-4 text-center">
              <Button
                onClick={handlePartnerBirthLocationContinue}
                disabled={!partnerBirthLocation.trim()}
                size="lg"
                className="w-full max-w-md px-12 py-4 bg-slate-400 hover:bg-slate-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-full transition-all duration-200"
              >
                Continue
              </Button>

              <Button
                onClick={handlePartnerDontKnowLocation}
                variant="outline"
                size="lg"
                className="w-full max-w-md px-12 py-4 border-2 border-gray-300 hover:border-gray-400 text-slate-800 font-semibold text-lg rounded-full transition-all duration-200 bg-transparent"
              >
                I don't know
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Add the logic/emotion options array after the existing arrays
  const logicEmotionOptions = [
    {
      id: "logic",
      label: "Logic",
      icon: "🧠",
    },
    {
      id: "emotions",
      label: "Emotions",
      icon: "❤️",
    },
    {
      id: "both",
      label: "A bit of both",
      icon: "⚖️",
    },
  ]

  // Add Step 19: Partner Logic vs Emotions after Step 18
  // Step 19: Partner Logic vs Emotions
  if (currentStep === 19) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Back button */}
              <Button variant="ghost" size="sm" onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Button>

              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <span className="text-xl font-semibold text-gray-800">MOONGRADE</span>
              </div>

              {/* Progress indicator */}
              <div className="text-sm text-gray-600 font-medium">
                {currentStep}/{totalSteps}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            {/* Question */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Does your partner act more on logic or emotions?
              </h1>
            </div>

            {/* Answer options */}
            <div className="space-y-4">
              {logicEmotionOptions.map((option) => (
                <Card
                  key={option.id}
                  className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] border-2 ${
                    partnerLogicEmotion === option.id
                      ? "border-purple-400 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handlePartnerLogicEmotionSelect(option.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{option.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{option.label}</h3>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 transition-colors ${
                        partnerLogicEmotion === option.id ? "border-purple-400 bg-purple-400" : "border-gray-300"
                      }`}
                    >
                      {partnerLogicEmotion === option.id && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Add the love language options array after the existing arrays
  const loveLanguageOptions = [
    {
      id: "words-of-affirmation",
      label: "Words of affirmation",
      icon: "❤️",
    },
    {
      id: "quality-time",
      label: "Quality time together",
      icon: "🎊",
    },
    {
      id: "physical-touch",
      label: "Physical touch",
      icon: "🤝",
    },
    {
      id: "gifts",
      label: "Gifts",
      icon: "🎁",
    },
    {
      id: "acts-of-service",
      label: "Acts of service",
      icon: "🤲",
    },
  ]

  // Add Step 20: Love Language Selection after Step 19
  // Step 20: Love Language Selection
  if (currentStep === 20) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Back button */}
              <Button variant="ghost" size="sm" onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Button>

              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <span className="text-xl font-semibold text-gray-800">MOONGRADE</span>
              </div>

              {/* Progress indicator */}
              <div className="text-sm text-gray-600 font-medium">
                {currentStep}/{totalSteps}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            {/* Question */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What is your love language?</h1>
            </div>

            {/* Answer options */}
            <div className="space-y-4">
              {loveLanguageOptions.map((option) => (
                <Card
                  key={option.id}
                  className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] border-2 ${
                    loveLanguage === option.id
                      ? "border-purple-400 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleLoveLanguageSelect(option.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{option.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{option.label}</h3>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 transition-colors ${
                        loveLanguage === option.id ? "border-purple-400 bg-purple-400" : "border-gray-300"
                      }`}
                    >
                      {loveLanguage === option.id && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Add Step 21: Compatibility Analysis Loading after Step 20
  // Step 21: Compatibility Analysis Loading
  if (currentStep === 21) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-800 via-slate-700 to-slate-900 relative overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 bg-slate-800/80 backdrop-blur-sm border-b border-slate-600 z-10 relative">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Back button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="p-2 hover:bg-slate-700 rounded-full text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>

              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <span className="text-xl font-semibold text-white">MOONGRADE</span>
              </div>

              {/* Progress indicator */}
              <div className="text-sm text-gray-300 font-medium">
                {currentStep}/{totalSteps}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <Progress value={progressPercentage} className="h-2 bg-slate-600" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-16">Analyzing your compatibility...</h1>

            {/* Progress Circle */}
            <div className="relative w-64 h-64 mx-auto mb-12">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle cx="50" cy="50" r="45" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="8" fill="none" />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#FCD34D"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - compatibilityProgress / 100)}`}
                  className="transition-all duration-300 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-bold text-yellow-400">{compatibilityProgress}%</span>
              </div>
            </div>

            {/* Testimonial Card */}
            <div className="bg-white rounded-lg p-6 text-left max-w-md mx-auto">
              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-green-500 rounded-sm"></div>
                ))}
              </div>

              {/* Title */}
              <h3 className="font-semibold text-gray-900 mb-2">Helped me find true love</h3>

              {/* Review text */}
              <p className="text-sm text-gray-700 leading-relaxed">
                Being single for over a year made me feel desperate, but thanks to the personalized relationship
                guidance plan and compatibility reports, I finally found my true love, Mike ❤️ We're so happy together,
                and I just moved into his apartment!
              </p>

              {/* Reviewer */}
              <div className="text-xs text-gray-500 mt-3">Olivia, 1987</div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Add Step 22: Zodiac Compatibility Results after Step 21
  // Step 22: Zodiac Compatibility Results
  if (currentStep === 22) {
    const userZodiacSign = getZodiacSign(birthMonth, birthDay)
    const partnerZodiacSign = getZodiacSign(partnerBirthMonth, partnerBirthDay)
    const userZodiacData = zodiacSigns[userZodiacSign as keyof typeof zodiacSigns]
    const partnerZodiacData = zodiacSigns[partnerZodiacSign as keyof typeof zodiacSigns]

    // Generate compatibility percentage (this could be made more sophisticated)
    const compatibilityPercentage = Math.floor(Math.random() * 5) + 2.1 // Random between 2.1-7.1%

    // Replace the current image src logic in both zodiac sign containers with:
    const getZodiacImageUrl = (sign: string) => {
      const zodiacImageMap = {
        aquarius:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aquarius-vYQPHHMNWdxzLMFTHLmqOBD3JnDBJ9.webp",
        aries: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aries-mK8mX4BVtMONngFBcChaLm4GcV3jHy.webp",
        taurus: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/taurus-2s7afofsveQlj3X6y5jOqM6yuN4bO7.webp",
        pisces: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pisces-sxUqsrrFUp8f6SI673AEexphTlMcLb.webp",
        cancer: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cancer-JAEzmyN4OqYBE5Mz6K3H10T1LlWZWl.webp",
        leo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/leo-8FE4W0vKtlIVnLrMDWrFOMzcW8uMUt.webp",
        sagittarius:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sagittarius-eZ4QNzXU7t2c7Mlo2T10ATYI3c8dqO.webp",
        libra: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/libra-OZeOAeEby2A87OMMmKLF5lfzHKGewK.webp",
        scorpio: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/scorpio-NCHGHgt81WkgqTU7Xh1DS88bV6680c.webp",
        virgo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/virgo-DiNRHZmhAy60RE7PVicf8PGVxQbUmN.webp",
        gemini: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gemini-3ah9Vu2HRb93LfjprPVIBP36I9YpCP.webp",
        capricorn:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/capricorn-TYCfxNjko6L7SNRnABW0M7TefgDkb8.webp",
      }
      return zodiacImageMap[sign as keyof typeof zodiacImageMap] || zodiacImageMap.aquarius
    }

    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-800 via-slate-700 to-slate-900 relative overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 bg-slate-800/80 backdrop-blur-sm border-b border-slate-600 z-10 relative">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Back button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="p-2 hover:bg-slate-700 rounded-full text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>

              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <span className="text-xl font-semibold text-white">MOONGRADE</span>
              </div>

              {/* Progress indicator */}
              <div className="text-sm text-gray-300 font-medium">
                {currentStep}/{totalSteps}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <Progress value={progressPercentage} className="h-2 bg-slate-600" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-16 relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)]">
          <div className="max-w-2xl mx-auto text-center">
            {/* Zodiac Signs Display */}
            <div className="flex items-center justify-center gap-12 mb-12">
              {/* User's Zodiac Sign */}
              <div className="bg-slate-700/50 backdrop-blur-sm rounded-3xl p-12 border border-slate-600/50 min-w-[240px] min-h-[240px] flex items-center justify-center">
                <Image
                  src={getZodiacImageUrl(userZodiacSign) || "/placeholder.svg"}
                  alt={`${userZodiacData.name} constellation`}
                  width={180}
                  height={180}
                  className="mx-auto"
                />
              </div>

              {/* Plus symbol */}
              <div className="text-4xl font-bold text-white">+</div>

              {/* Partner's Zodiac Sign */}
              <div className="bg-slate-700/50 backdrop-blur-sm rounded-3xl p-12 border border-slate-600/50 min-w-[240px] min-h-[240px] flex items-center justify-center">
                <Image
                  src={getZodiacImageUrl(partnerZodiacSign) || "/placeholder.svg"}
                  alt={`${partnerZodiacData.name} constellation`}
                  width={180}
                  height={180}
                  className="mx-auto"
                />
              </div>
            </div>

            {/* Compatibility Message */}
            <div className="mb-12">
              <h1 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-4 leading-tight">
                Only {compatibilityPercentage.toFixed(1)}% of {userZodiacData.name} + {partnerZodiacData.name} couples
                have such
                <br />
                intuitive understanding of each other's needs!
              </h1>

              <p className="text-lg text-gray-300 leading-relaxed">
                We will help you use your strengths to build a deeper, more
                <br />
                passionate connection.
              </p>
            </div>

            {/* Continue button */}
            <Button
              onClick={() => setCurrentStep(23)}
              size="lg"
              className="w-full max-w-sm px-12 py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-lg rounded-full transition-all duration-200 hover:scale-105"
            >
              Continue
            </Button>
          </div>
        </main>
      </div>
    )
  }

  // Add Step 23: Additional Goals (Multiple Selection) after Step 22
  if (currentStep === 23) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Back button */}
              <Button variant="ghost" size="sm" onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Button>

              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <span className="text-xl font-semibold text-gray-800">MOONGRADE</span>
              </div>

              {/* Progress indicator */}
              <div className="text-sm text-gray-600 font-medium">
                {currentStep}/{totalSteps}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            {/* Question */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                In addition to your relationship goals, what other goals do you want to achieve?
              </h1>
              <p className="text-gray-600">Choose all that apply</p>
            </div>

            {/* Answer options */}
            <div className="space-y-4 mb-8">
              {additionalGoalsOptions.map((goal) => (
                <Card
                  key={goal.id}
                  className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] border-2 ${
                    additionalGoals.includes(goal.id)
                      ? "border-purple-400 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleAdditionalGoalToggle(goal.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{goal.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{goal.label}</h3>
                    </div>
                    <div
                      className={`w-5 h-5 rounded border-2 transition-colors ${
                        additionalGoals.includes(goal.id) ? "border-purple-400 bg-purple-400" : "border-gray-300"
                      }`}
                    >
                      {additionalGoals.includes(goal.id) && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-sm"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Continue button */}
            <div className="text-center">
              <Button
                onClick={handleAdditionalGoalsContinue}
                disabled={additionalGoals.length === 0}
                size="lg"
                className="px-12 py-4 bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-full transition-all duration-200"
              >
                Continue
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Step 24 after Step 23 and before the fallback return:
  // Step 24: Curiosity Agreement
  if (currentStep === 24) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Back button */}
              <Button variant="ghost" size="sm" onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Button>

              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <span className="text-xl font-semibold text-gray-800">MOONGRADE</span>
              </div>

              {/* Progress indicator */}
              <div className="text-sm text-gray-600 font-medium">
                {currentStep}/{totalSteps}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            {/* Question */}
            <div className="text-center mb-12">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                Do you agree with the following statement?
              </h1>

              {/* Statement */}
              <div className="mb-12">
                <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-medium">
                  "I have a curious mind and I always want to learn and grow."
                </p>
              </div>
            </div>

            {/* Answer options */}
            <div className="space-y-4">
              {curiosityOptions.map((option) => (
                <Card
                  key={option.id}
                  className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] border-2 ${
                    curiosityAgreement === option.id
                      ? "border-purple-400 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleCuriositySelect(option.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{option.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{option.label}</h3>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 transition-colors ${
                        curiosityAgreement === option.id ? "border-purple-400 bg-purple-400" : "border-gray-300"
                      }`}
                    >
                      {curiosityAgreement === option.id && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Add Step 25: Life Event Dates Selection after Step 24 and before the fallback return:
  // Step 25: Life Event Dates Selection
  if (currentStep === 25) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-10">
          <div className="container mx-auto px-4 py-4">
            {/* Back button */}
            <Button variant="ghost" size="sm" onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Button>

            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              <span className="text-xl font-semibold text-gray-800">MOONGRADE</span>
            </div>

            {/* Progress indicator */}
            <div className="text-sm text-gray-600 font-medium">
              {currentStep}/{totalSteps}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            {/* Question */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Which important life event dates would you like to know?
              </h1>
              <p className="text-gray-600">Choose all that apply</p>
            </div>

            {/* Answer options */}
            <div className="space-y-4 mb-8">
              {lifeEventOptions.map((event) => (
                <Card
                  key={event.id}
                  className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] border-2 ${
                    lifeEventDates.includes(event.id)
                      ? "border-purple-400 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleLifeEventToggle(event.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{event.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{event.label}</h3>
                    </div>
                    <div
                      className={`w-5 h-5 rounded border-2 transition-colors ${
                        lifeEventDates.includes(event.id) ? "border-purple-400 bg-purple-400" : "border-gray-300"
                      }`}
                    >
                      {lifeEventDates.includes(event.id) && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-sm"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Continue button */}
            <div className="text-center">
              <Button
                onClick={handleLifeEventsContinue}
                disabled={lifeEventDates.length === 0}
                size="lg"
                className="px-12 py-4 bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-full transition-all duration-200"
              >
                Continue
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Step 4 e próximas etapas podem ser adicionadas aqui
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Step {currentStep}</h1>
        <p className="text-gray-600 mb-8">Esta é a etapa {currentStep} do quiz.</p>
        <Button onClick={handleContinue} className="mr-4">
          Continue
        </Button>
        <Button onClick={handleBack} variant="outline">
          Back
        </Button>
      </div>
    </div>
  )
}
