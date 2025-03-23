"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import LoadingScreen from "@/components/loading-screen"
import HomeScreen from "@/components/home-screen"
import NutritionInfoScreen from "@/components/nutrition-info-screen"
import FoodDetailScreen from "@/components/food-detail-screen"
import ChildMonitorScreen from "@/components/child-monitor-screen"
import ChildDetailScreen from "@/components/child-detail-screen"
import NutritionGuideScreen from "@/components/nutrition-guide-screen"
import CameraScreen from "@/components/camera-screen"
import ProfileScreen from "@/components/profile-screen"
import ChatbotScreen from "@/components/chatbot-screen"
import NotificationsScreen from "@/components/notifications-screen"
import MedicalStaffScreen from "@/components/medical-staff-screen"
import SpecializationScreen from "@/components/specialization-screen"
import HospitalSelectionScreen from "@/components/hospital-selection-screen"
import DoctorProfileScreen from "@/components/doctor-profile-screen"
import DoctorChatScreen from "@/components/doctor-chat-screen"
import AddFoodProgressScreen from "@/components/add-food-progress-screen"
import ConfirmFoodProgressScreen from "@/components/confirm-food-progress-screen"
import RecipeDetailScreen from "@/components/recipe-detail-screen"
import RecipeListScreen from "@/components/recipe-list-screen"
import FoodPreferencesScreen from "@/components/food-preferences-screen"

// Import the ProtectedRoute component at the top
import ProtectedRoute from "@/components/protected-route"

// Wrap the entire component with ProtectedRoute
export default function App() {
  const [currentScreen, setCurrentScreen] = useState("loading")
  const [selectedChild, setSelectedChild] = useState(null)
  const [navigationHistory, setNavigationHistory] = useState<string[]>([])
  const { user, loading } = useAuth()
  const router = useRouter()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  // Simulate loading screen for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        setCurrentScreen("home")
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [user])

  // If still loading auth state, show loading screen
  if (loading || !user) {
    return <LoadingScreen />
  }

  // Update the navigateTo function to track navigation history
  const navigateTo = (screen: string) => {
    if (screen === "login") {
      setNavigationHistory([])
    } else {
      // Store navigation history for proper back button functionality
      if (currentScreen !== "loading") {
        // Don't add duplicate consecutive screens to history
        if (navigationHistory.length === 0 || navigationHistory[navigationHistory.length - 1] !== currentScreen) {
          setNavigationHistory([...navigationHistory, currentScreen])
        }

        // Store in localStorage for components that need it
        if (typeof window !== "undefined") {
          localStorage.setItem("previousScreen", currentScreen)

          // Special handling for food preferences screen to prevent loops
          if (currentScreen === "profile" && screen === "foodPreferences") {
            localStorage.setItem("cameFromProfile", "true")
          }

          // When going back from food preferences to profile, mark it
          if (currentScreen === "foodPreferences" && screen === "profile") {
            localStorage.setItem("cameFromFoodPreferences", "true")
          }
        }
      }
    }

    setCurrentScreen(screen)
  }

  // Extract recipe ID from screen name if it's a recipe detail screen
  const getRecipeId = () => {
    if (currentScreen.startsWith("recipeDetail-")) {
      return Number.parseInt(currentScreen.split("-")[1], 10)
    }
    return 0
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen flex items-center justify-center bg-bg-light">
        <div className="w-full max-w-md mx-auto h-full min-h-screen flex flex-col overflow-hidden">
          {currentScreen === "loading" && <LoadingScreen />}

          {currentScreen === "home" && (
            <HomeScreen navigateTo={navigateTo} username={user?.user_metadata?.username || user?.email} />
          )}

          {currentScreen === "nutritionInfo" && (
            <NutritionInfoScreen navigateTo={navigateTo} username={user?.user_metadata?.username || user?.email} />
          )}

          {currentScreen === "addFoodProgress" && (
            <AddFoodProgressScreen navigateTo={navigateTo} username={user?.user_metadata?.username || user?.email} />
          )}

          {currentScreen === "confirmFoodProgress" && (
            <ConfirmFoodProgressScreen
              navigateTo={navigateTo}
              username={user?.user_metadata?.username || user?.email}
            />
          )}

          {currentScreen === "foodDetail" && (
            <FoodDetailScreen navigateTo={navigateTo} username={user?.user_metadata?.username || user?.email} />
          )}

          {currentScreen === "childMonitor" && (
            <ChildMonitorScreen
              navigateTo={navigateTo}
              setSelectedChild={setSelectedChild}
              username={user?.user_metadata?.username || user?.email}
            />
          )}

          {currentScreen === "childDetail" && (
            <ChildDetailScreen
              navigateTo={navigateTo}
              selectedChild={selectedChild}
              username={user?.user_metadata?.username || user?.email}
            />
          )}

          {currentScreen === "nutritionGuide" && (
            <NutritionGuideScreen navigateTo={navigateTo} username={user?.user_metadata?.username || user?.email} />
          )}

          {currentScreen === "camera" && <CameraScreen navigateTo={navigateTo} />}

          {currentScreen === "profile" && (
            <ProfileScreen navigateTo={navigateTo} username={user?.user_metadata?.username || user?.email} />
          )}

          {currentScreen === "chatbot" && <ChatbotScreen navigateTo={navigateTo} />}

          {currentScreen === "notifications" && (
            <NotificationsScreen navigateTo={navigateTo} username={user?.user_metadata?.username || user?.email} />
          )}

          {currentScreen === "specialization" && <SpecializationScreen navigateTo={navigateTo} />}

          {currentScreen === "hospitalSelection" && <HospitalSelectionScreen navigateTo={navigateTo} />}

          {currentScreen === "medicalStaff" && (
            <MedicalStaffScreen navigateTo={navigateTo} username={user?.user_metadata?.username || user?.email} />
          )}

          {currentScreen === "doctorProfile" && <DoctorProfileScreen navigateTo={navigateTo} />}

          {currentScreen === "doctorChat" && <DoctorChatScreen navigateTo={navigateTo} />}

          {currentScreen === "recipeList" && <RecipeListScreen navigateTo={navigateTo} />}

          {currentScreen.startsWith("recipeDetail-") && (
            <RecipeDetailScreen navigateTo={navigateTo} recipeId={getRecipeId()} />
          )}

          {currentScreen === "foodPreferences" && (
            <FoodPreferencesScreen navigateTo={navigateTo} username={user?.user_metadata?.username || user?.email} />
          )}
        </div>
      </main>
    </ProtectedRoute>
  )
}

