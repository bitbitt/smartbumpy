"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Search, Plus } from "lucide-react"
import MobileHeader from "@/components/mobile-header"
import { Modal } from "@/components/ui/modal"

interface FoodPreferencesScreenProps {
  navigateTo: (screen: string) => void
  username: string
}

export default function FoodPreferencesScreen({ navigateTo, username }: FoodPreferencesScreenProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [customIngredient, setCustomIngredient] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Food categories and ingredients
  const foodCategories = [
    {
      name: "Sumber Karbohidrat",
      ingredients: ["Nasi Putih", "Nasi Merah", "Kentang", "Ubi", "Singkong", "Jagung", "Roti Gandum", "Oatmeal"],
    },
    {
      name: "Sumber Protein Hewani",
      ingredients: ["Ayam", "Ikan", "Telur", "Daging Sapi", "Daging Kambing", "Udang", "Cumi", "Hati Ayam"],
    },
    {
      name: "Sumber Protein Nabati",
      ingredients: ["Tempe", "Tahu", "Kacang Tanah", "Kacang Kedelai", "Kacang Merah", "Kacang Hijau", "Edamame"],
    },
    {
      name: "Sayuran",
      ingredients: [
        "Bayam",
        "Kangkung",
        "Brokoli",
        "Wortel",
        "Kembang Kol",
        "Sawi",
        "Tomat",
        "Terong",
        "Kacang Panjang",
        "Labu Siam",
      ],
    },
    {
      name: "Buah-buahan",
      ingredients: ["Pisang", "Apel", "Jeruk", "Pepaya", "Semangka", "Melon", "Mangga", "Alpukat", "Jambu Biji"],
    },
    {
      name: "Sumber Lemak Sehat",
      ingredients: ["Minyak Zaitun", "Minyak Kelapa", "Kacang Almond", "Kacang Mete", "Alpukat"],
    },
    {
      name: "Bumbu dan Rempah",
      ingredients: [
        "Bawang Merah",
        "Bawang Putih",
        "Jahe",
        "Kunyit",
        "Lengkuas",
        "Serai",
        "Daun Salam",
        "Daun Jeruk",
        "Kemiri",
        "Ketumbar",
      ],
    },
  ]

  // Load saved preferences on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPreferences = localStorage.getItem("foodPreferences")
      if (savedPreferences) {
        setSelectedPreferences(JSON.parse(savedPreferences))
      }
    }
  }, [])

  // Filter ingredients based on search term
  const getFilteredIngredients = () => {
    if (!searchTerm.trim()) return []

    const results: string[] = []
    foodCategories.forEach((category) => {
      const filtered = category.ingredients.filter((ingredient) =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      results.push(...filtered)
    })
    return results
  }

  const filteredIngredients = getFilteredIngredients()

  const toggleIngredient = (ingredient: string) => {
    if (selectedPreferences.includes(ingredient)) {
      setSelectedPreferences(selectedPreferences.filter((item) => item !== ingredient))
    } else {
      setSelectedPreferences([...selectedPreferences, ingredient])
    }
  }

  const addCustomIngredient = () => {
    if (customIngredient.trim() && !selectedPreferences.includes(customIngredient.trim())) {
      setSelectedPreferences([...selectedPreferences, customIngredient.trim()])
      setCustomIngredient("")
      setShowAddModal(false)
    }
  }

  const handleSavePreferences = () => {
    setIsSaving(true)

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("foodPreferences", JSON.stringify(selectedPreferences))
    }

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setShowSuccess(true)

      // Auto-close success message after 1.5 seconds
      setTimeout(() => {
        setShowSuccess(false)

        // When going back to profile, mark that we're coming from food preferences
        if (typeof window !== "undefined") {
          localStorage.setItem("cameFromFoodPreferences", "true")
        }

        navigateTo("profile")
      }, 1500)
    }, 1000)
  }

  const handleBack = () => {
    // When going back to profile, mark that we're coming from food preferences
    if (typeof window !== "undefined") {
      localStorage.setItem("cameFromFoodPreferences", "true")
    }

    navigateTo("profile")
  }

  return (
    <div className="flex flex-col h-full min-h-screen w-full max-w-md bg-white rounded-xl overflow-hidden shadow-lg">
      <MobileHeader />

      <div className="bg-primary-purple p-4 flex items-center">
        <Button variant="ghost" size="sm" className="p-0 mr-2 h-8 w-8 text-white" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-lg font-semibold text-white">Preferensi Bahan Makanan</h1>
          <p className="text-xs text-white/80">Pilih bahan makanan yang Anda sukai</p>
        </div>
      </div>

      <div className="p-4">
        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="bg-bg-light rounded-lg flex items-center p-3">
            <Search className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari bahan makanan..."
              className="bg-transparent border-none flex-1 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Search Results */}
        {searchTerm.trim() && filteredIngredients.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-primary-purple mb-2">Hasil Pencarian</h2>
            <div className="bg-white rounded-lg border border-border-gray p-3">
              <div className="flex flex-wrap gap-2">
                {filteredIngredients.map((ingredient, index) => (
                  <button
                    key={index}
                    onClick={() => toggleIngredient(ingredient)}
                    className={`px-3 py-1 rounded-full text-xs flex items-center ${
                      selectedPreferences.includes(ingredient)
                        ? "bg-primary-purple text-white"
                        : "bg-bg-light text-text-gray"
                    }`}
                  >
                    {ingredient}
                    {selectedPreferences.includes(ingredient) && <Check className="h-3 w-3 ml-1" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Selected Preferences */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-semibold text-primary-purple">Bahan Makanan Pilihan</h2>
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-7 text-primary-blue flex items-center text-xs"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="h-4 w-4 mr-1" />
              Tambah Bahan
            </Button>
          </div>

          {selectedPreferences.length === 0 ? (
            <div className="bg-white rounded-lg border border-border-gray p-4 text-center">
              <p className="text-sm text-text-gray">Belum ada bahan makanan yang dipilih</p>
              <p className="text-xs text-text-gray mt-1">Cari atau tambahkan bahan makanan yang Anda sukai</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-border-gray p-3">
              <div className="flex flex-wrap gap-2">
                {selectedPreferences.map((ingredient, index) => (
                  <button
                    key={index}
                    onClick={() => toggleIngredient(ingredient)}
                    className="px-3 py-1 rounded-full text-xs bg-primary-purple text-white flex items-center"
                  >
                    {ingredient}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="flex-1 overflow-y-auto pb-20">
          <h2 className="text-sm font-semibold text-primary-purple mb-2">Kategori Bahan Makanan</h2>

          <div className="space-y-4">
            {foodCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-lg border border-border-gray p-3">
                <h3 className="text-sm font-medium text-primary-blue mb-2">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.ingredients.map((ingredient, ingredientIndex) => (
                    <button
                      key={ingredientIndex}
                      onClick={() => toggleIngredient(ingredient)}
                      className={`px-3 py-1 rounded-full text-xs flex items-center ${
                        selectedPreferences.includes(ingredient)
                          ? "bg-primary-purple text-white"
                          : "bg-bg-light text-text-gray"
                      }`}
                    >
                      {ingredient}
                      {selectedPreferences.includes(ingredient) && <Check className="h-3 w-3 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Save Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t border-border-gray">
        <Button onClick={handleSavePreferences} className="w-full bg-primary-purple text-white" disabled={isSaving}>
          {isSaving ? "Menyimpan..." : "Simpan Preferensi"}
        </Button>
      </div>

      {/* Add Custom Ingredient Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Tambah Bahan Makanan">
        <div className="p-2 space-y-4">
          <div>
            <label htmlFor="customIngredient" className="block text-sm font-medium text-text-gray mb-1">
              Nama Bahan Makanan
            </label>
            <input
              id="customIngredient"
              type="text"
              value={customIngredient}
              onChange={(e) => setCustomIngredient(e.target.value)}
              className="w-full p-3 rounded-lg border border-border-gray"
              placeholder="Masukkan nama bahan makanan"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setShowAddModal(false)}>
              Batal
            </Button>
            <Button
              className="flex-1 bg-primary-purple text-white"
              onClick={addCustomIngredient}
              disabled={!customIngredient.trim()}
            >
              Tambahkan
            </Button>
          </div>
        </div>
      </Modal>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl p-6 max-w-xs w-full animate-in fade-in zoom-in duration-300">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-success-green flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-lg font-medium text-primary-purple mb-2">Berhasil!</h2>
              <p className="text-sm text-text-gray text-center">Preferensi bahan makanan Anda telah disimpan</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

