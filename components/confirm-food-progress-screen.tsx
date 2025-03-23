"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { ArrowLeft, Check, ChevronRight, Plus, Minus, Trash2, Search } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { createClient } from "@/lib/supabase/client"

interface ConfirmFoodProgressScreenProps {
  navigateTo: (screen: string) => void
  username: string
  onConfirm?: (foods: any[]) => void
}

export default function ConfirmFoodProgressScreen({ navigateTo, username, onConfirm }: ConfirmFoodProgressScreenProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [selectedFoods, setSelectedFoods] = useState<any[]>([])
  const [isNutritionModalOpen, setIsNutritionModalOpen] = useState(false)
  const [isAddFoodModalOpen, setIsAddFoodModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isFromCamera, setIsFromCamera] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Add state for delete confirmation modal
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false)
  const [foodToDelete, setFoodToDelete] = useState<number | null>(null)

  // Food database (in a real app, this would come from an API)
  const foodDatabase = [
    { id: 1, name: "Nasi Putih", unit: "gram", calories: 1.3, carbs: 0.28, protein: 0.026, fat: 0.003 },
    { id: 2, name: "Nasi Merah", unit: "gram", calories: 1.1, carbs: 0.23, protein: 0.025, fat: 0.003 },
    { id: 3, name: "Ayam Goreng", unit: "gram", calories: 2.4, carbs: 0.04, protein: 0.3, fat: 0.15 },
    { id: 4, name: "Ayam Panggang", unit: "gram", calories: 1.9, carbs: 0.0, protein: 0.31, fat: 0.08 },
    { id: 5, name: "Telur Rebus", unit: "butir", calories: 77, carbs: 0.6, protein: 6.3, fat: 5.3 },
    { id: 6, name: "Telur Dadar", unit: "butir", calories: 93, carbs: 0.6, protein: 6.1, fat: 7.2 },
    { id: 7, name: "Tempe Goreng", unit: "potong", calories: 160, carbs: 7.8, protein: 11, fat: 11 },
    { id: 8, name: "Tahu Goreng", unit: "potong", calories: 78, carbs: 1.9, protein: 8.5, fat: 5.0 },
    { id: 9, name: "Sayur Bayam", unit: "gram", calories: 0.23, carbs: 0.036, protein: 0.029, fat: 0.003 },
    { id: 10, name: "Kangkung", unit: "gram", calories: 0.19, carbs: 0.032, protein: 0.026, fat: 0.002 },
    { id: 11, name: "Wortel", unit: "gram", calories: 0.41, carbs: 0.096, protein: 0.009, fat: 0.002 },
    { id: 12, name: "Kentang", unit: "gram", calories: 0.77, carbs: 0.17, protein: 0.02, fat: 0.001 },
    { id: 13, name: "Ikan Salmon", unit: "gram", calories: 2.08, carbs: 0, protein: 0.22, fat: 0.13 },
    { id: 14, name: "Ikan Tuna", unit: "gram", calories: 1.32, carbs: 0, protein: 0.28, fat: 0.01 },
    { id: 15, name: "Daging Sapi", unit: "gram", calories: 2.5, carbs: 0, protein: 0.26, fat: 0.15 },
  ]

  // Load selected foods from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFoods = localStorage.getItem("selectedFoods")
      if (storedFoods) {
        setSelectedFoods(JSON.parse(storedFoods))
      }

      // Check if coming from camera
      const previousScreen = localStorage.getItem("previousScreen")
      if (previousScreen === "camera") {
        setIsFromCamera(true)
      }
    }
  }, [])

  // Calculate totals
  const totals = selectedFoods.reduce(
    (acc, food) => {
      const quantity = Number.parseFloat(food.quantity) || 0
      return {
        calories: acc.calories + food.calories * quantity,
        carbs: acc.carbs + food.carbs * quantity,
        protein: acc.protein + food.protein * quantity,
        fat: acc.fat + food.fat * quantity,
        // Add other nutrients that might be in the food database
        fiber: acc.fiber + (food.fiber || 0) * quantity,
        vitaminA: acc.vitaminA + (food.vitaminA || 0) * quantity,
        vitaminC: acc.vitaminC + (food.vitaminC || 0) * quantity,
        vitaminD: acc.vitaminD + (food.vitaminD || 0) * quantity,
        calcium: acc.calcium + (food.calcium || 0) * quantity,
        iron: acc.iron + (food.iron || 0) * quantity,
        folicAcid: acc.folicAcid + (food.folicAcid || 0) * quantity,
      }
    },
    {
      calories: 0,
      carbs: 0,
      protein: 0,
      fat: 0,
      fiber: 0,
      vitaminA: 0,
      vitaminC: 0,
      vitaminD: 0,
      calcium: 0,
      iron: 0,
      folicAcid: 0,
    },
  )

  // Calculate contribution percentages (in a real app, these would be based on user's daily targets)
  const dailyTargets = {
    calories: 2000,
    carbs: 250,
    protein: 60,
    fat: 65,
    fiber: 25,
    vitaminA: 700,
    vitaminC: 85,
    vitaminD: 15,
    calcium: 1000,
    iron: 27,
    folicAcid: 600,
  }

  const contributions = {
    calories: Math.round((totals.calories / dailyTargets.calories) * 100),
    carbs: Math.round((totals.carbs / dailyTargets.carbs) * 100),
    protein: Math.round((totals.protein / dailyTargets.protein) * 100),
    fat: Math.round((totals.fat / dailyTargets.fat) * 100),
  }

  // Format all nutrition items for the detailed modal
  const allNutritionItems = [
    {
      name: "Energi",
      value: totals.calories.toFixed(1),
      unit: "kkal",
      target: dailyTargets.calories,
      percentage: contributions.calories,
    },
    {
      name: "Karbohidrat",
      value: totals.carbs.toFixed(1),
      unit: "g",
      target: dailyTargets.carbs,
      percentage: Math.round((totals.carbs / dailyTargets.carbs) * 100),
    },
    {
      name: "Protein",
      value: totals.protein.toFixed(1),
      unit: "g",
      target: dailyTargets.protein,
      percentage: Math.round((totals.protein / dailyTargets.protein) * 100),
    },
    {
      name: "Lemak",
      value: totals.fat.toFixed(1),
      unit: "g",
      target: dailyTargets.fat,
      percentage: Math.round((totals.fat / dailyTargets.fat) * 100),
    },
    {
      name: "Serat",
      value: totals.fiber.toFixed(1),
      unit: "g",
      target: dailyTargets.fiber,
      percentage: Math.round((totals.fiber / dailyTargets.fiber) * 100),
    },
    {
      name: "Vitamin A",
      value: totals.vitaminA.toFixed(1),
      unit: "mcg",
      target: dailyTargets.vitaminA,
      percentage: Math.round((totals.vitaminA / dailyTargets.vitaminA) * 100),
    },
    {
      name: "Vitamin C",
      value: totals.vitaminC.toFixed(1),
      unit: "mg",
      target: dailyTargets.vitaminC,
      percentage: Math.round((totals.vitaminC / dailyTargets.vitaminC) * 100),
    },
    {
      name: "Vitamin D",
      value: totals.vitaminD.toFixed(1),
      unit: "mcg",
      target: dailyTargets.vitaminD,
      percentage: Math.round((totals.vitaminD / dailyTargets.vitaminD) * 100),
    },
    {
      name: "Kalsium",
      value: totals.calcium.toFixed(1),
      unit: "mg",
      target: dailyTargets.calcium,
      percentage: Math.round((totals.calcium / dailyTargets.calcium) * 100),
    },
    {
      name: "Zat Besi",
      value: totals.iron.toFixed(1),
      unit: "mg",
      target: dailyTargets.iron,
      percentage: Math.round((totals.iron / dailyTargets.iron) * 100),
    },
    {
      name: "Asam Folat",
      value: totals.folicAcid.toFixed(1),
      unit: "mcg",
      target: dailyTargets.folicAcid,
      percentage: Math.round((totals.folicAcid / dailyTargets.folicAcid) * 100),
    },
  ]

  const { user } = useAuth()

  // Replace the handleConfirm function with this improved version

  const handleConfirm = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      if (!user) {
        throw new Error("User not authenticated")
      }

      // Use localStorage to update progress as a fallback
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "nutritionProgress",
          JSON.stringify({
            calories: totals.calories,
            carbs: totals.carbs,
            protein: totals.protein,
            fat: totals.fat,
            fiber: totals.fiber,
            vitaminA: totals.vitaminA,
            vitaminC: totals.vitaminC,
            vitaminD: totals.vitaminD,
            calcium: totals.calcium,
            iron: totals.iron,
            folicAcid: totals.folicAcid,
            lastUpdated: new Date().toISOString(),
          }),
        )
      }

      // Try to update Supabase directly
      try {
        // Create a Supabase client
        const supabase = createClient()

        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split("T")[0]

        // Check if there's existing progress for today
        const { data, error } = await supabase
          .from("nutrition_progress")
          .select("id")
          .eq("user_id", user.id)
          .eq("date", today)
          .single()

        if (error && error.code !== "PGRST116") {
          console.error("Error checking existing progress:", error)
          throw error
        }

        const updateData = {
          user_id: user.id,
          date: today,
          calories: totals.calories,
          carbs: totals.carbs,
          protein: totals.protein,
          fat: totals.fat,
          fiber: totals.fiber,
          vitamin_a: totals.vitaminA,
          vitamin_c: totals.vitaminC,
          vitamin_d: totals.vitaminD,
          calcium: totals.calcium,
          iron: totals.iron,
          folic_acid: totals.folicAcid,
          updated_at: new Date().toISOString(),
        }

        if (data) {
          // Update existing entry
          const { error: updateError } = await supabase.from("nutrition_progress").update(updateData).eq("id", data.id)

          if (updateError) {
            console.error("Error updating progress:", updateError)
            throw updateError
          }
        } else {
          // Insert new entry
          updateData.created_at = new Date().toISOString()
          const { error: insertError } = await supabase.from("nutrition_progress").insert(updateData)

          if (insertError) {
            console.error("Error creating progress:", insertError)
            throw insertError
          }
        }
      } catch (dbError) {
        console.error("Error updating database:", dbError)
        // Continue with local storage only
      }

      // If callback provided, pass the selected foods
      if (onConfirm) {
        onConfirm(selectedFoods)
      }

      setIsSubmitting(false)
      setIsSuccess(true)

      // Navigate back to nutrition info after showing success
      setTimeout(() => {
        // Clear selected foods from localStorage
        if (typeof window !== "undefined") {
          localStorage.removeItem("selectedFoods")
        }

        navigateTo("nutritionInfo")
      }, 1500)
    } catch (error) {
      console.error("Error confirming food progress:", error)
      setIsSubmitting(false)
      setError("Gagal menyimpan progress. Silakan coba lagi.")
    }
  }

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([])
      return
    }

    const results = foodDatabase.filter((food) => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setSearchResults(results)
  }

  const addFood = (food: any) => {
    const existingFood = selectedFoods.find((item) => item.id === food.id)

    if (existingFood) {
      // If food already exists, update quantity
      setSelectedFoods(
        selectedFoods.map((item) =>
          item.id === food.id ? { ...item, quantity: (Number.parseFloat(item.quantity) + 1).toString() } : item,
        ),
      )
    } else {
      // Add new food with default quantity of 1
      setSelectedFoods([...selectedFoods, { ...food, quantity: "1" }])
    }

    // Clear search after adding
    setSearchTerm("")
    setSearchResults([])
    setIsAddFoodModalOpen(false)
  }

  const updateQuantity = (foodId: number, newQuantity: string) => {
    // Allow only numbers and decimal point
    const sanitizedQuantity = newQuantity.replace(/[^0-9.]/g, "")

    setSelectedFoods(
      selectedFoods.map((item) => (item.id === foodId ? { ...item, quantity: sanitizedQuantity } : item)),
    )
  }

  const incrementQuantity = (foodId: number) => {
    setSelectedFoods(
      selectedFoods.map((item) => {
        if (item.id === foodId) {
          const currentQuantity = Number.parseFloat(item.quantity) || 0
          return { ...item, quantity: (currentQuantity + 1).toString() }
        }
        return item
      }),
    )
  }

  const decrementQuantity = (foodId: number) => {
    setSelectedFoods(
      selectedFoods.map((item) => {
        if (item.id === foodId) {
          const currentQuantity = Number.parseFloat(item.quantity) || 0
          const newQuantity = Math.max(currentQuantity - 1, 0.1) // Prevent going below 0.1
          return { ...item, quantity: newQuantity.toString() }
        }
        return item
      }),
    )
  }

  // Get the previous screen from localStorage or default to home
  const getPreviousScreen = () => {
    if (typeof window !== "undefined") {
      return isFromCamera ? "camera" : "addFoodProgress"
    }
    return "addFoodProgress"
  }

  // Replace the handleRemoveFood function with this
  const handleRemoveFood = (foodId: number) => {
    setFoodToDelete(foodId)
    setIsDeleteConfirmModalOpen(true)
  }

  // Add confirmDelete function
  const confirmDelete = () => {
    if (foodToDelete !== null) {
      setSelectedFoods(selectedFoods.filter((item) => item.id !== foodToDelete))
      setFoodToDelete(null)
    }
    setIsDeleteConfirmModalOpen(false)
  }

  return (
    <div className="flex flex-col h-full min-h-screen w-full max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-lg">
      {/* Simple header without profile and notifications */}
      <div className="bg-light-blue p-4 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="p-0 mr-2 h-8 w-8 text-primary-blue"
          onClick={() => navigateTo(getPreviousScreen())}
          disabled={isSubmitting || isSuccess}
        >
          <ArrowLeft className="h-5 w-5 text-primary-blue" />
        </Button>
        <div>
          <h1 className="text-lg font-medium text-primary-blue">Konfirmasi Makanan</h1>
          <p className="text-xs text-primary-blue">Pastikan data sudah benar</p>
        </div>
      </div>

      <div className="flex-1 p-4 bg-bg-light overflow-y-auto">
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-16 h-16 rounded-full bg-success-green flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-lg font-medium text-primary-purple mb-2">Berhasil!</h2>
            <p className="text-sm text-text-gray text-center">Progress gizi harian Anda telah diperbarui</p>
          </div>
        ) : (
          <>
            {selectedFoods.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-sm text-text-gray text-center mb-4">Tidak ada makanan yang dipilih.</p>
                <Button
                  onClick={() => setIsAddFoodModalOpen(true)}
                  className="bg-primary-blue text-white flex items-center gap-2"
                >
                  <Plus size={16} /> Tambah Makanan
                </Button>
              </div>
            ) : (
              <>
                {/* Selected Foods Summary */}
                <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-base font-semibold text-primary-purple">Ringkasan Makanan</h2>
                    {isFromCamera && (
                      <Button
                        onClick={() => setIsAddFoodModalOpen(true)}
                        className="text-xs bg-primary-blue text-white flex items-center gap-1 py-1 px-2 h-8"
                      >
                        <Plus size={14} /> Tambah
                      </Button>
                    )}
                  </div>

                  <div className="space-y-3 mb-4">
                    {selectedFoods.map((food) => (
                      <div key={food.id} className="flex items-center justify-between p-3 bg-bg-purple rounded-lg">
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-primary-purple">{food.name}</h3>
                          <p className="text-xs text-primary-purple">
                            {(Number.parseFloat(food.quantity) * food.calories).toFixed(1)} kkal
                          </p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <div className="flex items-center border border-border-gray rounded-lg overflow-hidden">
                            <Button
                              onClick={() => decrementQuantity(food.id)}
                              variant="ghost"
                              size="sm"
                              className="p-0 h-8 w-8 rounded-none"
                            >
                              <Minus size={14} />
                            </Button>

                            <input
                              type="text"
                              value={food.quantity}
                              onChange={(e) => updateQuantity(food.id, e.target.value)}
                              className="w-12 p-1 text-center text-sm border-x border-border-gray focus:outline-none"
                            />

                            <Button
                              onClick={() => incrementQuantity(food.id)}
                              variant="ghost"
                              size="sm"
                              className="p-0 h-8 w-8 rounded-none"
                            >
                              <Plus size={14} />
                            </Button>
                          </div>

                          <span className="text-xs text-text-gray">{food.unit}</span>

                          <Button
                            onClick={() => handleRemoveFood(food.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-500 p-1 h-8 w-8"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border-gray pt-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-primary-purple">Total Kalori</span>
                      <span className="text-sm font-medium text-primary-purple">{totals.calories.toFixed(1)} kkal</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-text-gray">Karbohidrat</span>
                      <span className="text-sm text-primary-purple">{totals.carbs.toFixed(1)} g</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-text-gray">Protein</span>
                      <span className="text-sm text-primary-purple">{totals.protein.toFixed(1)} g</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-text-gray">Lemak</span>
                      <span className="text-sm text-primary-purple">{totals.fat.toFixed(1)} g</span>
                    </div>
                    <button
                      onClick={() => setIsNutritionModalOpen(true)}
                      className="text-xs text-primary-purple flex items-center mt-2"
                    >
                      Selengkapnya <ChevronRight className="h-3 w-3 ml-1" />
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                  <h2 className="text-base font-semibold text-primary-purple mb-2">Perkiraan Kontribusi</h2>
                  <p className="text-sm text-text-gray mb-3">
                    Makanan ini akan menambah progress gizi harian Anda sebesar:
                  </p>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Energi</span>
                      <span className="text-sm text-primary-purple">+{contributions.calories}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Karbohidrat</span>
                      <span className="text-sm text-primary-purple">+{contributions.carbs}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Protein</span>
                      <span className="text-sm text-primary-purple">+{contributions.protein}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Lemak</span>
                      <span className="text-sm text-primary-purple">+{contributions.fat}%</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-border-gray mt-2">
                      <span className="text-sm font-medium">Rata-rata Total</span>
                      <span className="text-sm text-primary-purple font-medium">
                        +
                        {Math.round(
                          (contributions.calories + contributions.carbs + contributions.protein + contributions.fat) /
                            4,
                        )}
                        %
                      </span>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                <Button onClick={handleConfirm} className="w-full bg-primary-purple text-white" disabled={isSubmitting}>
                  {isSubmitting ? "Memproses..." : "Konfirmasi"}
                </Button>
              </>
            )}
          </>
        )}
      </div>

      {/* Detailed Nutrition Modal */}
      <Modal isOpen={isNutritionModalOpen} onClose={() => setIsNutritionModalOpen(false)} title="Detail Gizi Makanan">
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

      {/* Add Food Modal */}
      <Modal isOpen={isAddFoodModalOpen} onClose={() => setIsAddFoodModalOpen(false)} title="Tambah Makanan">
        <div className="space-y-4">
          <div className="relative">
            <div className="bg-bg-purple rounded-lg flex items-center p-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  if (e.target.value.length >= 2) {
                    handleSearch()
                  } else {
                    setSearchResults([])
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch()
                  }
                }}
                placeholder="Cari bahan makanan..."
                className="bg-transparent border-none flex-1 text-sm focus:outline-none"
              />
              <Button onClick={handleSearch} variant="ghost" size="sm" className="p-1 h-8 w-8">
                <Search className="h-5 w-5 text-text-gray" />
              </Button>
            </div>

            {/* Search Results - Now positioned directly below the search field */}
            {searchResults.length > 0 && (
              <div className="mt-1 bg-white rounded-lg border border-border-gray max-h-60 overflow-y-auto">
                <div className="p-2">
                  <div className="space-y-2">
                    {searchResults.map((food) => (
                      <div key={food.id} className="flex items-center justify-between p-2 hover:bg-bg-light rounded-lg">
                        <div>
                          <h4 className="text-sm font-medium text-primary-purple">{food.name}</h4>
                          <p className="text-xs text-text-gray">
                            {food.calories} kkal/{food.unit}
                          </p>
                        </div>
                        <Button
                          onClick={() => addFood(food)}
                          className="bg-primary-blue text-white text-xs px-3 py-1 h-8"
                        >
                          Tambahkan
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {searchResults.length === 0 && (
            <p className="text-sm text-text-gray text-center">Ketik nama makanan untuk mencari</p>
          )}
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteConfirmModalOpen}
        onClose={() => setIsDeleteConfirmModalOpen(false)}
        title="Konfirmasi Hapus"
      >
        <div className="p-2">
          <p className="text-sm text-text-gray mb-4">Apakah Anda yakin ingin menghapus makanan ini?</p>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setIsDeleteConfirmModalOpen(false)}>
              Batal
            </Button>
            <Button className="flex-1 bg-red-500 text-white font-medium" onClick={confirmDelete}>
              Hapus
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

