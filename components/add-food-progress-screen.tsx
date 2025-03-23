"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Search, Trash2, ChevronRight, ArrowLeft } from "lucide-react"

interface AddFoodProgressScreenProps {
  navigateTo: (screen: string) => void
  username: string
  onFoodSelected?: (foods: any[]) => void
}

export default function AddFoodProgressScreen({ navigateTo, username, onFoodSelected }: AddFoodProgressScreenProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFoods, setSelectedFoods] = useState<any[]>([])
  const [searchResults, setSearchResults] = useState<any[]>([])
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchResultsRef = useRef<HTMLDivElement>(null)

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

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setSearchResults([])
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

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
      // If food already exists, don't add it again
      return
    } else {
      // Add new food with default quantity of 1
      setSelectedFoods([...selectedFoods, { ...food, quantity: "1" }])
    }

    // Clear search after adding
    setSearchTerm("")
    setSearchResults([])
  }

  const removeFood = (foodId: number) => {
    setSelectedFoods(selectedFoods.filter((item) => item.id !== foodId))
  }

  const updateQuantity = (foodId: number, newQuantity: string) => {
    // Allow only numbers and decimal point
    const sanitizedQuantity = newQuantity.replace(/[^0-9.]/g, "")

    setSelectedFoods(
      selectedFoods.map((item) => (item.id === foodId ? { ...item, quantity: sanitizedQuantity } : item)),
    )
  }

  const handleContinue = () => {
    // Store selected foods in localStorage for the confirmation screen
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedFoods", JSON.stringify(selectedFoods))
    }

    // If callback provided, pass the selected foods
    if (onFoodSelected) {
      onFoodSelected(selectedFoods)
    }

    // Navigate to confirmation screen
    navigateTo("confirmFoodProgress")
  }

  return (
    <div className="flex flex-col h-full min-h-screen w-full max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-lg">
      {/* Simple header without profile and notifications */}
      <div className="bg-light-blue p-4 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="p-0 mr-2 h-8 w-8 text-primary-blue"
          onClick={() => navigateTo("nutritionInfo")}
        >
          <ArrowLeft className="h-5 w-5 text-primary-blue" />
        </Button>
        <div>
          <h1 className="text-lg font-medium text-primary-blue">Tambah Progress Harian</h1>
          <p className="text-xs text-primary-blue mt-1">Cari dan tambahkan makanan yang dikonsumsi</p>
        </div>
      </div>

      <div className="flex-1 p-4 bg-bg-light overflow-y-auto flex flex-col justify-between">
        {/* Search Bar with Dropdown Results */}
        <div className="relative mb-4">
          <div className="bg-white rounded-lg flex items-center p-2 border border-border-gray">
            <input
              ref={searchInputRef}
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

          {/* Search Results Dropdown - Now positioned directly below the search bar */}
          {searchResults.length > 0 && (
            <div
              ref={searchResultsRef}
              className="absolute z-10 left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-border-gray max-h-60 overflow-y-auto"
            >
              <div className="p-2">
                <h3 className="text-sm font-medium text-primary-purple mb-2">Hasil Pencarian</h3>
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

        {/* Selected Foods */}
        {selectedFoods.length > 0 && (
          <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <h2 className="text-base font-semibold text-primary-purple mb-3">Makanan yang Dipilih</h2>

            <div className="space-y-3">
              {selectedFoods.map((food) => (
                <div key={food.id} className="flex items-center justify-between p-3 bg-bg-purple rounded-lg">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{food.name}</h3>
                    <p className="text-xs text-text-gray">
                      {Number.parseFloat(food.quantity) * food.calories} kkal total
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={food.quantity}
                        onChange={(e) => updateQuantity(food.id, e.target.value)}
                        className="w-16 p-1 text-center rounded-lg border border-border-gray text-sm focus:outline-none focus:ring-1 focus:ring-primary-purple"
                      />
                      <span className="ml-1 text-xs text-text-gray">{food.unit}</span>
                    </div>

                    <Button
                      onClick={() => removeFood(food.id)}
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
          </div>
        )}

        {selectedFoods.length > 0 && (
          <Button
            onClick={handleContinue}
            className="w-full bg-primary-purple text-white flex items-center justify-center gap-1"
          >
            Lanjutkan <ChevronRight size={16} />
          </Button>
        )}
      </div>
    </div>
  )
}

