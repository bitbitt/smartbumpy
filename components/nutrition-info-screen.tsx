"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import MobileHeader from "@/components/mobile-header"
import BottomNavigation from "@/components/bottom-navigation"
import HeaderWithProfile from "@/components/header-with-profile"
import CircularProgress from "@/components/circular-progress"
import { ChevronRight } from "lucide-react"

// Import progress utilities
import { useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { createClient } from "@/lib/supabase/client"

interface NutritionInfoScreenProps {
  navigateTo: (screen: string) => void
  username: string
}

export default function NutritionInfoScreen({ navigateTo, username }: NutritionInfoScreenProps) {
  const [isNutritionModalOpen, setIsNutritionModalOpen] = useState(false)
  const [nutritionData, setNutritionData] = useState({
    calories: { value: 1200, target: 2000, percentage: 60 },
    carbs: { value: 150, target: 250, percentage: 60 },
    protein: { value: 45, target: 60, percentage: 75 },
    fat: { value: 35, target: 65, percentage: 54 },
    fiber: { value: 12, target: 25, percentage: 48 },
    vitaminA: { value: 450, target: 700, percentage: 64 },
    vitaminC: { value: 35, target: 85, percentage: 41 },
    vitaminD: { value: 5, target: 15, percentage: 33 },
    calcium: { value: 500, target: 1000, percentage: 50 },
    iron: { value: 12, target: 27, percentage: 44 },
    folicAcid: { value: 320, target: 600, percentage: 53 },
  })

  // Calculate overall progress
  const overallProgress = Math.round(
    Object.values(nutritionData).reduce((sum, item) => sum + item.percentage, 0) / Object.keys(nutritionData).length,
  )

  const { user } = useAuth()

  // Load nutrition progress from Supabase on component mount
  useEffect(() => {
    const loadProgress = async () => {
      if (!user) return

      try {
        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split("T")[0]

        // Create a Supabase client
        const supabase = createClient()

        // Fetch today's progress from Supabase
        const { data, error } = await supabase
          .from("nutrition_progress")
          .select("*")
          .eq("user_id", user.id)
          .eq("date", today)
          .single()

        if (error) {
          if (error.code === "PGRST116") {
            // No data found for today, create a new entry
            const { error: insertError } = await supabase.from("nutrition_progress").insert({
              user_id: user.id,
              date: today,
              calories: 0,
              carbs: 0,
              protein: 0,
              fat: 0,
              fiber: 0,
              vitamin_a: 0,
              vitamin_c: 0,
              vitamin_d: 0,
              calcium: 0,
              iron: 0,
              folic_acid: 0,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })

            if (insertError) {
              console.error("Error creating new progress:", insertError)
            }

            // Try to load from localStorage as fallback
            if (typeof window !== "undefined") {
              const storedProgress = localStorage.getItem("nutritionProgress")
              if (storedProgress) {
                const progress = JSON.parse(storedProgress)
                setNutritionData((prevData) => {
                  const updatedData = { ...prevData }

                  if (progress.calories !== undefined) {
                    updatedData.calories.value = progress.calories
                    updatedData.calories.percentage = Math.round(
                      (progress.calories / updatedData.calories.target) * 100,
                    )
                  }

                  if (progress.carbs !== undefined) {
                    updatedData.carbs.value = progress.carbs
                    updatedData.carbs.percentage = Math.round((progress.carbs / updatedData.carbs.target) * 100)
                  }

                  if (progress.protein !== undefined) {
                    updatedData.protein.value = progress.protein
                    updatedData.protein.percentage = Math.round((progress.protein / updatedData.protein.target) * 100)
                  }

                  if (progress.fat !== undefined) {
                    updatedData.fat.value = progress.fat
                    updatedData.fat.percentage = Math.round((progress.fat / updatedData.fat.target) * 100)
                  }

                  if (progress.fiber !== undefined) {
                    updatedData.fiber.value = progress.fiber
                    updatedData.fiber.percentage = Math.round((progress.fiber / updatedData.fiber.target) * 100)
                  }

                  if (progress.vitaminA !== undefined) {
                    updatedData.vitaminA.value = progress.vitaminA
                    updatedData.vitaminA.percentage = Math.round(
                      (progress.vitaminA / updatedData.vitaminA.target) * 100,
                    )
                  }

                  if (progress.vitaminC !== undefined) {
                    updatedData.vitaminC.value = progress.vitaminC
                    updatedData.vitaminC.percentage = Math.round(
                      (progress.vitaminC / updatedData.vitaminC.target) * 100,
                    )
                  }

                  if (progress.vitaminD !== undefined) {
                    updatedData.vitaminD.value = progress.vitaminD
                    updatedData.vitaminD.percentage = Math.round(
                      (progress.vitaminD / updatedData.vitaminD.target) * 100,
                    )
                  }

                  if (progress.calcium !== undefined) {
                    updatedData.calcium.value = progress.calcium
                    updatedData.calcium.percentage = Math.round((progress.calcium / updatedData.calcium.target) * 100)
                  }

                  if (progress.iron !== undefined) {
                    updatedData.iron.value = progress.iron
                    updatedData.iron.percentage = Math.round((progress.iron / updatedData.iron.target) * 100)
                  }

                  if (progress.folicAcid !== undefined) {
                    updatedData.folicAcid.value = progress.folicAcid
                    updatedData.folicAcid.percentage = Math.round(
                      (progress.folicAcid / updatedData.folicAcid.target) * 100,
                    )
                  }

                  return updatedData
                })
              }
            }

            return
          }
          console.error("Error fetching nutrition progress:", error)
          return
        }

        // Update nutrition data with stored progress
        setNutritionData((prevData) => {
          const updatedData = { ...prevData }

          // Make sure we're using the actual values from the database
          updatedData.calories.value = data.calories || 0
          updatedData.calories.percentage = Math.round((data.calories / updatedData.calories.target) * 100) || 0

          updatedData.carbs.value = data.carbs || 0
          updatedData.carbs.percentage = Math.round((data.carbs / updatedData.carbs.target) * 100) || 0

          updatedData.protein.value = data.protein || 0
          updatedData.protein.percentage = Math.round((data.protein / updatedData.protein.target) * 100) || 0

          updatedData.fat.value = data.fat || 0
          updatedData.fat.percentage = Math.round((data.fat / updatedData.fat.target) * 100) || 0

          updatedData.fiber.value = data.fiber || 0
          updatedData.fiber.percentage = Math.round((data.fiber / updatedData.fiber.target) * 100) || 0

          updatedData.vitaminA.value = data.vitamin_a || 0
          updatedData.vitaminA.percentage = Math.round((data.vitamin_a / updatedData.vitaminA.target) * 100) || 0

          updatedData.vitaminC.value = data.vitamin_c || 0
          updatedData.vitaminC.percentage = Math.round((data.vitamin_c / updatedData.vitaminC.target) * 100) || 0

          updatedData.vitaminD.value = data.vitamin_d || 0
          updatedData.vitaminD.percentage = Math.round((data.vitamin_d / updatedData.vitaminD.target) * 100) || 0

          updatedData.calcium.value = data.calcium || 0
          updatedData.calcium.percentage = Math.round((data.calcium / updatedData.calcium.target) * 100) || 0

          updatedData.iron.value = data.iron || 0
          updatedData.iron.percentage = Math.round((data.iron / updatedData.iron.target) * 100) || 0

          updatedData.folicAcid.value = data.folic_acid || 0
          updatedData.folicAcid.percentage = Math.round((data.folic_acid / updatedData.folicAcid.target) * 100) || 0

          return updatedData
        })
      } catch (error) {
        console.error("Error loading nutrition progress:", error)
      }
    }

    loadProgress()

    // Add a listener for when the user returns to this screen
    const handleFocus = () => {
      loadProgress()
    }

    // Add event listener for when the window gets focus
    window.addEventListener("focus", handleFocus)

    // Clean up
    return () => {
      window.removeEventListener("focus", handleFocus)
    }
  }, [user])

  // Format nutrition items for display
  const nutritionItems = [
    {
      name: "Energi",
      value: nutritionData.calories.value.toFixed(0),
      unit: "kkal",
      target: nutritionData.calories.target,
      percentage: nutritionData.calories.percentage,
    },
    {
      name: "Karbohidrat",
      value: nutritionData.carbs.value.toFixed(0),
      unit: "g",
      target: nutritionData.carbs.target,
      percentage: nutritionData.carbs.percentage,
    },
    {
      name: "Protein",
      value: nutritionData.protein.value.toFixed(0),
      unit: "g",
      target: nutritionData.protein.target,
      percentage: nutritionData.carbs.percentage,
    },
    {
      name: "Lemak",
      value: nutritionData.fat.value.toFixed(0),
      unit: "g",
      target: nutritionData.fat.target,
      percentage: nutritionData.fat.percentage,
    },
  ]

  const allNutritionItems = [
    ...nutritionItems,
    {
      name: "Serat",
      value: nutritionData.fiber.value.toFixed(0),
      unit: "g",
      target: nutritionData.fiber.target,
      percentage: nutritionData.fiber.percentage,
    },
    {
      name: "Vitamin A",
      value: nutritionData.vitaminA.value.toFixed(0),
      unit: "mcg",
      target: nutritionData.vitaminA.target,
      percentage: nutritionData.vitaminA.percentage,
    },
    {
      name: "Vitamin C",
      value: nutritionData.vitaminC.value.toFixed(0),
      unit: "mg",
      target: nutritionData.vitaminC.target,
      percentage: nutritionData.vitaminC.percentage,
    },
    {
      name: "Vitamin D",
      value: nutritionData.vitaminD.value.toFixed(0),
      unit: "mcg",
      target: nutritionData.vitaminD.target,
      percentage: nutritionData.vitaminD.percentage,
    },
    {
      name: "Kalsium",
      value: nutritionData.calcium.value.toFixed(0),
      unit: "mg",
      target: nutritionData.calcium.target,
      percentage: nutritionData.calcium.percentage,
    },
    {
      name: "Zat Besi",
      value: nutritionData.iron.value.toFixed(0),
      unit: "mg",
      target: nutritionData.iron.target,
      percentage: nutritionData.iron.percentage,
    },
    {
      name: "Asam Folat",
      value: nutritionData.folicAcid.value.toFixed(0),
      unit: "mcg",
      target: nutritionData.folicAcid.target,
      percentage: nutritionData.folicAcid.percentage,
    },
  ]

  const recommendedRecipes = [
    {
      name: "Nasi Ayam",
      image: "/placeholder.svg?height=60&width=60",
      description: "Bumbu Kecap",
    },
    {
      name: "Kangkung Gizi",
      image: "/placeholder.svg?height=60&width=60",
      description: "Tumis",
    },
    {
      name: "Ayam Goreng",
      image: "/placeholder.svg?height=60&width=60",
      description: "Yogyakarta",
    },
  ]

  return (
    <div className="flex flex-col h-full min-h-screen w-full max-w-md mx-auto bg-bg-light rounded-xl overflow-hidden shadow-lg">
      <MobileHeader />

      <HeaderWithProfile navigateTo={navigateTo} username={username} />

      <div className="flex-1 p-4 pb-20 overflow-y-auto">
        {/* Nutrition Monitor - Updated to single circle with details */}
        <div className="bg-light-blue rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-primary-blue">Kebutuhan Gizi Harian</h2>
          </div>

          <div className="flex items-start mb-4">
            <div className="mr-4 relative">
              <CircularProgress percentage={overallProgress} size={100} strokeWidth={10} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-primary-blue">{overallProgress}%</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-2">
              {nutritionItems.map((item, index) => (
                <div key={index} className="bg-primary-blue text-white rounded-lg px-3 py-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm">
                      {item.value} / {item.target} {item.unit}
                    </span>
                  </div>
                </div>
              ))}

              <div className="flex justify-end mt-1">
                <button
                  onClick={() => setIsNutritionModalOpen(true)}
                  className="text-sm text-primary-blue flex items-center"
                >
                  Selengkapnya <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          </div>

          <Button
            onClick={() => navigateTo("addFoodProgress")}
            className="w-full bg-primary-blue text-white flex items-center justify-center gap-2 py-3 font-medium"
          >
            Tambahkan Progresmu! <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Recipe Recommendations */}
        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-base font-semibold text-primary-purple">Rekomendasi Resep</h2>
          </div>

          <div className="space-y-3">
            {recommendedRecipes.map((recipe, index) => (
              <div
                key={index}
                className="flex items-center bg-bg-purple rounded-xl p-3 cursor-pointer"
                onClick={() => navigateTo(`recipeDetail-${index}`)}
              >
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                  <img
                    src={recipe.image || "/placeholder.svg"}
                    alt={recipe.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-primary-purple">{recipe.name}</h3>
                  <p className="text-xs text-primary-purple">{recipe.description}</p>
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={() => navigateTo("recipeList")}
            className="w-full bg-primary-purple text-white mt-3 flex items-center justify-center font-medium"
          >
            Lihat Rekomendasi Lainnya
          </Button>
        </div>
      </div>

      <BottomNavigation currentScreen="nutritionInfo" navigateTo={navigateTo} />

      {/* Nutrition Details Modal */}
      <Modal isOpen={isNutritionModalOpen} onClose={() => setIsNutritionModalOpen(false)} title="Detail Kebutuhan Gizi">
        <div className="space-y-3">
          {allNutritionItems.map((item, index) => (
            <div key={index} className="bg-bg-purple p-3 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">{item.name}</span>
                <span className="text-xs text-primary-blue">
                  {item.value}/{item.target} {item.unit}
                </span>
              </div>
              <div className="h-2 bg-lighter-blue rounded-full overflow-hidden">
                <div className="h-full bg-primary-blue rounded-full" style={{ width: `${item.percentage}%` }}></div>
              </div>
              <div className="flex justify-end mt-1">
                <span className="text-xs text-text-gray">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  )
}

