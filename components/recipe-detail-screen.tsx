"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { ArrowLeft, Clock, Users, ChevronRight, Check } from "lucide-react"

interface RecipeDetailScreenProps {
  navigateTo: (screen: string) => void
  recipeId: number
}

export default function RecipeDetailScreen({ navigateTo, recipeId }: RecipeDetailScreenProps) {
  const [isNutritionModalOpen, setIsNutritionModalOpen] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [recipe, setRecipe] = useState<any>(null)

  // Log the recipeId for debugging
  useEffect(() => {
    console.log("Recipe Detail Screen - recipeId:", recipeId)

    // In a real app, this would be an API call to fetch the recipe
    // For now, we'll simulate loading the recipe from our static data
    setLoading(true)

    try {
      // Simulate API call
      setTimeout(() => {
        const foundRecipe = recipes.find((r) => r.id === recipeId) || recipes[0]
        console.log("Found recipe:", foundRecipe)
        setRecipe(foundRecipe)
        setLoading(false)
      }, 500)
    } catch (err) {
      console.error("Error loading recipe:", err)
      setError("Gagal memuat resep. Silakan coba lagi.")
      setLoading(false)
    }
  }, [recipeId])

  // In a real app, this would come from an API or database
  const recipes = [
    {
      id: 0,
      name: "Nasi Ayam Bumbu Kecap",
      image: "/placeholder.svg?height=200&width=350",
      description: "Hidangan lezat dengan ayam yang dimasak dengan bumbu kecap manis dan rempah-rempah.",
      prepTime: "15 menit",
      cookTime: "30 menit",
      servings: 4,
      calories: 450,
      carbs: 45,
      protein: 30,
      fat: 15,
      fiber: 3,
      vitaminA: 120,
      vitaminC: 15,
      vitaminD: 2,
      calcium: 80,
      iron: 4,
      folicAcid: 60,
      ingredients: [
        "500g ayam potong",
        "3 siung bawang putih, cincang halus",
        "5 siung bawang merah, iris tipis",
        "2 sdm kecap manis",
        "1 sdm saus tiram",
        "1 sdt gula merah",
        "1/2 sdt merica bubuk",
        "1 batang serai, memarkan",
        "2 lembar daun salam",
        "2 cm jahe, memarkan",
        "Garam secukupnya",
        "2 sdm minyak untuk menumis",
        "200ml air",
      ],
      steps: [
        "Panaskan minyak, tumis bawang merah dan bawang putih hingga harum.",
        "Masukkan serai, daun salam, dan jahe. Tumis sebentar.",
        "Tambahkan ayam, aduk hingga berubah warna.",
        "Masukkan kecap manis, saus tiram, gula merah, merica, dan garam. Aduk rata.",
        "Tuang air, masak dengan api kecil hingga ayam matang dan bumbu  dan garam. Aduk rata.",
        "Tuang air, masak dengan api kecil hingga ayam matang dan bumbu meresap.",
        "Koreksi rasa, angkat dan sajikan dengan nasi putih hangat.",
      ],
    },
    {
      id: 1,
      name: "Tumis Kangkung Gizi",
      image: "/placeholder.svg?height=200&width=350",
      description: "Sayur kangkung yang ditumis dengan bumbu sederhana namun kaya nutrisi.",
      prepTime: "10 menit",
      cookTime: "5 menit",
      servings: 3,
      calories: 120,
      carbs: 15,
      protein: 5,
      fat: 6,
      fiber: 4,
      vitaminA: 200,
      vitaminC: 30,
      vitaminD: 0,
      calcium: 120,
      iron: 3,
      folicAcid: 80,
      ingredients: [
        "2 ikat kangkung, petik daunnya",
        "4 siung bawang merah, iris tipis",
        "3 siung bawang putih, cincang halus",
        "5 buah cabai merah, iris serong",
        "1 sdm saus tiram",
        "1/2 sdt gula pasir",
        "Garam secukupnya",
        "2 sdm minyak untuk menumis",
        "100ml air",
      ],
      steps: [
        "Cuci bersih kangkung, tiriskan.",
        "Panaskan minyak, tumis bawang merah dan bawang putih hingga harum.",
        "Masukkan cabai, tumis sebentar.",
        "Tambahkan kangkung, aduk rata.",
        "Masukkan saus tiram, gula, garam, dan air. Aduk rata.",
        "Masak sebentar hingga kangkung layu tapi masih renyah.",
        "Angkat dan sajikan.",
      ],
    },
    {
      id: 2,
      name: "Ayam Goreng Yogyakarta",
      image: "/placeholder.svg?height=200&width=350",
      description: "Ayam goreng dengan bumbu rempah khas Yogyakarta yang gurih dan lezat.",
      prepTime: "30 menit",
      cookTime: "20 menit",
      servings: 4,
      calories: 380,
      carbs: 10,
      protein: 35,
      fat: 22,
      fiber: 1,
      vitaminA: 80,
      vitaminC: 5,
      vitaminD: 1,
      calcium: 60,
      iron: 5,
      folicAcid: 40,
      ingredients: [
        "1 ekor ayam, potong 8 bagian",
        "6 siung bawang merah",
        "4 siung bawang putih",
        "3 butir kemiri, sangrai",
        "2 cm kunyit, bakar",
        "1 cm jahe",
        "1 sdt ketumbar bubuk",
        "2 lembar daun salam",
        "2 batang serai, memarkan",
        "3 lembar daun jeruk",
        "Garam secukupnya",
        "Minyak untuk menggoreng",
        "500ml air kelapa",
      ],
      steps: [
        "Haluskan bawang merah, bawang putih, kemiri, kunyit, jahe, dan ketumbar.",
        "Tumis bumbu halus hingga harum, masukkan daun salam, serai, dan daun jeruk.",
        "Masukkan ayam, aduk rata dengan bumbu.",
        "Tuang air kelapa, tambahkan garam. Masak hingga ayam empuk dan bumbu meresap.",
        "Angkat ayam, tiriskan.",
        "Goreng ayam dalam minyak panas hingga kecokelatan.",
        "Angkat dan sajikan dengan lalapan dan sambal.",
      ],
    },
    {
      id: 3,
      name: "Sup Sayur Ibu Hamil",
      image: "/placeholder.svg?height=200&width=350",
      description: "Sup sayuran bergizi tinggi yang cocok untuk ibu hamil.",
      prepTime: "15 menit",
      cookTime: "25 menit",
      servings: 4,
      calories: 200,
      carbs: 25,
      protein: 12,
      fat: 8,
      fiber: 6,
      vitaminA: 250,
      vitaminC: 45,
      vitaminD: 1,
      calcium: 150,
      iron: 4,
      folicAcid: 120,
      ingredients: [
        "2 buah wortel, potong dadu",
        "1 buah kentang, potong dadu",
        "100g brokoli, potong per kuntum",
        "100g kacang polong",
        "1 buah tomat, potong dadu",
        "2 batang daun bawang, iris halus",
        "2 siung bawang putih, cincang halus",
        "1 buah bawang bombay, cincang",
        "1 liter kaldu ayam",
        "2 sdm minyak zaitun",
        "1 sdt garam",
        "1/2 sdt merica bubuk",
        "1 sdt thyme kering",
      ],
      steps: [
        "Panaskan minyak zaitun, tumis bawang putih dan bawang bombay hingga harum.",
        "Tambahkan wortel dan kentang, aduk rata.",
        "Tuang kaldu ayam, masak hingga wortel dan kentang setengah matang.",
        "Masukkan brokoli dan kacang polong, masak hingga semua sayuran matang.",
        "Tambahkan tomat, daun bawang, garam, merica, dan thyme.",
        "Masak sebentar hingga semua bahan matang dan rasanya pas.",
        "Angkat dan sajikan hangat.",
      ],
    },
    {
      id: 4,
      name: "Smoothie Buah dan Sayur",
      image: "/placeholder.svg?height=200&width=350",
      description: "Minuman sehat dengan campuran buah dan sayuran segar.",
      prepTime: "10 menit",
      cookTime: "0 menit",
      servings: 2,
      calories: 180,
      carbs: 35,
      protein: 5,
      fat: 2,
      fiber: 8,
      vitaminA: 300,
      vitaminC: 80,
      vitaminD: 0,
      calcium: 100,
      iron: 2,
      folicAcid: 90,
      ingredients: [
        "1 buah pisang",
        "1 buah apel, buang bijinya",
        "1 genggam bayam",
        "1/2 buah alpukat",
        "200ml susu almond",
        "1 sdm madu",
        "5 butir es batu",
      ],
      steps: [
        "Cuci bersih semua buah dan sayuran.",
        "Potong-potong pisang, apel, dan alpukat.",
        "Masukkan semua bahan ke dalam blender.",
        "Blender hingga halus dan tercampur rata.",
        "Tuang ke dalam gelas dan sajikan segera.",
      ],
    },
    {
      id: 5,
      name: "Pepes Ikan Kaya Kalsium",
      image: "/placeholder.svg?height=200&width=350",
      description: "Ikan yang dibumbui dan dibungkus daun pisang, kaya akan kalsium.",
      prepTime: "20 menit",
      cookTime: "30 menit",
      servings: 3,
      calories: 320,
      carbs: 5,
      protein: 40,
      fat: 15,
      fiber: 2,
      vitaminA: 150,
      vitaminC: 20,
      vitaminD: 5,
      calcium: 250,
      iron: 3,
      folicAcid: 70,
      ingredients: [
        "500g ikan kembung, bersihkan",
        "6 siung bawang merah",
        "4 siung bawang putih",
        "3 buah cabai merah",
        "5 buah cabai rawit (sesuai selera)",
        "3 cm kunyit",
        "2 cm jahe",
        "3 butir kemiri, sangrai",
        "1 sdt ketumbar bubuk",
        "1 batang serai, memarkan",
        "3 lembar daun salam",
        "1 ikat kemangi",
        "1 buah tomat, potong dadu",
        "1 sdt garam",
        "1/2 sdt gula",
        "Daun pisang untuk membungkus",
      ],
      steps: [
        "Haluskan bawang merah, bawang putih, cabai, kunyit, jahe, dan kemiri.",
        "Campurkan bumbu halus dengan ketumbar, garam, dan gula.",
        "Lumuri ikan dengan bumbu halus, diamkan 15 menit.",
        "Siapkan daun pisang, letakkan serai dan daun salam.",
        "Letakkan ikan di atas daun, tambahkan kemangi dan tomat.",
        "Bungkus ikan dengan daun pisang, semat dengan lidi.",
        "Kukus pepes ikan selama 30 menit hingga matang.",
        "Angkat dan sajikan.",
      ],
    },
  ]

  // Format nutrition items for the detailed modal
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

  // If loading, show loading indicator
  if (loading) {
    return (
      <div className="flex flex-col h-full min-h-screen w-full max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-lg">
        <div className="bg-light-purple p-4 flex items-center">
          <Button variant="ghost" size="sm" className="p-0 mr-2 h-8 w-8" onClick={() => navigateTo("nutritionInfo")}>
            <ArrowLeft className="h-5 w-5 text-primary-purple" />
          </Button>
          <div>
            <h1 className="text-lg font-medium text-primary-purple">Detail Resep</h1>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-t-primary-blue border-primary-purple rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  // If error, show error message
  if (error || !recipe) {
    return (
      <div className="flex flex-col h-full min-h-screen w-full max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-lg">
        <div className="bg-light-purple p-4 flex items-center">
          <Button variant="ghost" size="sm" className="p-0 mr-2 h-8 w-8" onClick={() => navigateTo("nutritionInfo")}>
            <ArrowLeft className="h-5 w-5 text-primary-purple" />
          </Button>
          <div>
            <h1 className="text-lg font-medium text-primary-purple">Detail Resep</h1>
          </div>
        </div>

        <div className="flex-1 p-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            <p className="font-medium">Error</p>
            <p>{error || "Resep tidak ditemukan"}</p>
            <Button onClick={() => navigateTo("recipeList")} className="mt-4 bg-primary-purple text-white">
              Kembali ke Daftar Resep
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const nutritionItems = [
    {
      name: "Energi",
      value: recipe.calories,
      unit: "kkal",
      target: dailyTargets.calories,
      percentage: Math.round((recipe.calories / dailyTargets.calories) * 100),
    },
    {
      name: "Karbohidrat",
      value: recipe.carbs,
      unit: "g",
      target: dailyTargets.carbs,
      percentage: Math.round((recipe.carbs / dailyTargets.carbs) * 100),
    },
    {
      name: "Protein",
      value: recipe.protein,
      unit: "g",
      target: dailyTargets.protein,
      percentage: Math.round((recipe.protein / dailyTargets.protein) * 100),
    },
    {
      name: "Lemak",
      value: recipe.fat,
      unit: "g",
      target: dailyTargets.fat,
      percentage: Math.round((recipe.fat / dailyTargets.fat) * 100),
    },
    {
      name: "Serat",
      value: recipe.fiber,
      unit: "g",
      target: dailyTargets.fiber,
      percentage: Math.round((recipe.fiber / dailyTargets.fiber) * 100),
    },
    {
      name: "Vitamin A",
      value: recipe.vitaminA,
      unit: "mcg",
      target: dailyTargets.vitaminA,
      percentage: Math.round((recipe.vitaminA / dailyTargets.vitaminA) * 100),
    },
    {
      name: "Vitamin C",
      value: recipe.vitaminC,
      unit: "mg",
      target: dailyTargets.vitaminC,
      percentage: Math.round((recipe.vitaminC / dailyTargets.vitaminC) * 100),
    },
    {
      name: "Vitamin D",
      value: recipe.vitaminD,
      unit: "mcg",
      target: dailyTargets.vitaminD,
      percentage: Math.round((recipe.vitaminD / dailyTargets.vitaminD) * 100),
    },
    {
      name: "Kalsium",
      value: recipe.calcium,
      unit: "mg",
      target: dailyTargets.calcium,
      percentage: Math.round((recipe.calcium / dailyTargets.calcium) * 100),
    },
    {
      name: "Zat Besi",
      value: recipe.iron,
      unit: "mg",
      target: dailyTargets.iron,
      percentage: Math.round((recipe.iron / dailyTargets.iron) * 100),
    },
    {
      name: "Asam Folat",
      value: recipe.folicAcid,
      unit: "mcg",
      target: dailyTargets.folicAcid,
      percentage: Math.round((recipe.folicAcid / dailyTargets.folicAcid) * 100),
    },
  ]

  const handleAddToProgress = () => {
    setIsAdding(true)

    // Simulate API call to add recipe to daily progress
    setTimeout(() => {
      // Get current progress from localStorage
      if (typeof window !== "undefined") {
        const currentProgress = JSON.parse(localStorage.getItem("nutritionProgress") || "{}")

        // Update with recipe values
        const updatedProgress = {
          calories: (currentProgress.calories || 0) + recipe.calories,
          carbs: (currentProgress.carbs || 0) + recipe.carbs,
          protein: (currentProgress.protein || 0) + recipe.protein,
          fat: (currentProgress.fat || 0) + recipe.fat,
          fiber: (currentProgress.fiber || 0) + recipe.fiber,
          vitaminA: (currentProgress.vitaminA || 0) + recipe.vitaminA,
          vitaminC: (currentProgress.vitaminC || 0) + recipe.vitaminC,
          vitaminD: (currentProgress.vitaminD || 0) + recipe.vitaminD,
          calcium: (currentProgress.calcium || 0) + recipe.calcium,
          iron: (currentProgress.iron || 0) + recipe.iron,
          folicAcid: (currentProgress.folicAcid || 0) + recipe.folicAcid,
          lastUpdated: new Date().toISOString(),
        }

        // Save updated progress
        localStorage.setItem("nutritionProgress", JSON.stringify(updatedProgress))
      }

      setIsAdding(false)
      setIsSuccess(true)

      // Close success message after delay
      setTimeout(() => {
        setIsSuccess(false)
        setShowConfirmModal(false)
      }, 1500)
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full min-h-screen w-full max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-lg">
      {/* Simple header without profile and notifications */}
      <div className="bg-light-purple p-4 flex items-center">
        <Button variant="ghost" size="sm" className="p-0 mr-2 h-8 w-8" onClick={() => navigateTo("recipeList")}>
          <ArrowLeft className="h-5 w-5 text-primary-purple" />
        </Button>
        <div>
          <h1 className="text-lg font-medium text-primary-purple">{recipe.name}</h1>
          <p className="text-xs text-primary-purple">Tutorial memasak</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <img src={recipe.image || "/placeholder.svg"} alt={recipe.name} className="w-full h-48 object-cover" />

        <div className="p-4">
          <p className="text-sm text-primary-purple mb-4">{recipe.description}</p>

          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-primary-purple mr-1" />
              <span className="text-xs text-primary-purple">
                {recipe.prepTime} + {recipe.cookTime}
              </span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-primary-purple mr-1" />
              <span className="text-xs text-primary-purple">{recipe.servings} porsi</span>
            </div>
          </div>

          <div className="bg-bg-purple p-3 rounded-lg mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-primary-purple">Informasi Gizi (per porsi)</h3>
              <button
                onClick={() => setIsNutritionModalOpen(true)}
                className="text-xs text-primary-purple flex items-center"
              >
                Selengkapnya <ChevronRight className="h-3 w-3 ml-1" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="text-center">
                <p className="text-xs font-medium text-primary-purple">{recipe.calories}</p>
                <p className="text-xs text-primary-purple">kkal</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-primary-purple">{recipe.carbs}g</p>
                <p className="text-xs text-primary-purple">Karbo</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-primary-purple">{recipe.protein}g</p>
                <p className="text-xs text-primary-purple">Protein</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-primary-purple">{recipe.fat}g</p>
                <p className="text-xs text-primary-purple">Lemak</p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-medium text-primary-purple mb-2">Bahan-bahan</h3>
            <ul className="space-y-1">
              {recipe.ingredients.map((ingredient: string, index: number) => (
                <li key={index} className="text-xs flex items-start text-primary-purple">
                  <span className="h-2 w-2 rounded-full bg-primary-purple mt-1 mr-2 flex-shrink-0"></span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-medium text-primary-purple mb-2">Langkah-langkah</h3>
            <ol className="space-y-2">
              {recipe.steps.map((step: string, index: number) => (
                <li key={index} className="text-xs flex text-primary-purple">
                  <span className="h-5 w-5 rounded-full bg-primary-purple text-white flex-shrink-0 flex items-center justify-center text-xs mr-2">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <Button
            onClick={() => setShowConfirmModal(true)}
            className="w-full bg-primary-purple text-white mt-4 flex items-center justify-center font-medium"
          >
            Tambahkan ke Progress Harian
          </Button>
        </div>
      </div>

      {/* Detailed Nutrition Modal */}
      <Modal isOpen={isNutritionModalOpen} onClose={() => setIsNutritionModalOpen(false)} title="Detail Gizi Resep">
        <div className="space-y-3">
          {nutritionItems.map((item, index) => (
            <div key={index} className="bg-bg-purple p-3 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-primary-purple">{item.name}</span>
                <span className="text-xs text-primary-purple">
                  {item.value}/{item.target} {item.unit}
                </span>
              </div>
              <div className="h-2 bg-lighter-blue rounded-full overflow-hidden">
                <div className="h-full bg-primary-purple rounded-full" style={{ width: `${item.percentage}%` }}></div>
              </div>
              <div className="flex justify-end mt-1">
                <span className="text-xs text-primary-purple">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => !isAdding && setShowConfirmModal(false)}
        title="Tambahkan ke Progress Harian"
      >
        {isSuccess ? (
          <div className="p-4 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-success-green flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-medium text-primary-purple mb-2">Berhasil!</h3>
            <p className="text-sm text-primary-purple text-center">Resep telah ditambahkan ke progress harian Anda</p>
          </div>
        ) : (
          <div className="p-4">
            <p className="text-sm text-primary-purple mb-4">
              Apakah Anda yakin ingin menambahkan resep ini ke progress harian Anda?
            </p>
            <div className="bg-bg-purple p-3 rounded-lg mb-4">
              <h4 className="text-sm font-medium text-primary-purple mb-2">{recipe.name}</h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-primary-purple">
                <div>Kalori: {recipe.calories} kkal</div>
                <div>Karbohidrat: {recipe.carbs}g</div>
                <div>Protein: {recipe.protein}g</div>
                <div>Lemak: {recipe.fat}g</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowConfirmModal(false)}
                disabled={isAdding}
              >
                Batal
              </Button>
              <Button className="flex-1 bg-primary-purple text-white" onClick={handleAddToProgress} disabled={isAdding}>
                {isAdding ? "Menambahkan..." : "Tambahkan"}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

