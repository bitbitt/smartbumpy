"use client"

import MobileHeader from "@/components/mobile-header"
import BottomNavigation from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface NutritionDetailScreenProps {
  navigateTo: (screen: string) => void
  username: string
}

export default function NutritionDetailScreen({ navigateTo, username }: NutritionDetailScreenProps) {
  const nutritionItems = [
    { name: "Energi", value: "1200", unit: "kkal", target: "2000", percentage: 60 },
    { name: "Karbohidrat", value: "150", unit: "g", target: "250", percentage: 60 },
    { name: "Protein", value: "45", unit: "g", target: "60", percentage: 75 },
    { name: "Lemak", value: "35", unit: "g", target: "65", percentage: 54 },
    { name: "Serat", value: "12", unit: "g", target: "25", percentage: 48 },
    { name: "Vitamin A", value: "450", unit: "mcg", target: "700", percentage: 64 },
    { name: "Vitamin C", value: "35", unit: "mg", target: "85", percentage: 41 },
    { name: "Vitamin D", value: "5", unit: "mcg", target: "15", percentage: 33 },
    { name: "Kalsium", value: "500", unit: "mg", target: "1000", percentage: 50 },
    { name: "Zat Besi", value: "12", unit: "mg", target: "27", percentage: 44 },
    { name: "Asam Folat", value: "320", unit: "mcg", target: "600", percentage: 53 },
  ]

  return (
    <div className="flex flex-col h-[600px] w-full max-w-md bg-white rounded-xl overflow-hidden shadow-lg">
      <MobileHeader />

      <div className="bg-light-blue p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="p-0 mr-2 h-8 w-8" onClick={() => navigateTo("nutritionInfo")}>
            <ArrowLeft className="h-5 w-5 text-primary-purple" />
          </Button>
          <div>
            <h1 className="text-lg font-medium text-primary-purple">Detail Nutrisi</h1>
            <p className="text-xs text-text-gray">Kebutuhan gizi harian</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 bg-bg-light overflow-y-auto">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-base font-semibold text-primary-purple mb-4">Kebutuhan Gizi Harian</h2>

          <div className="space-y-3">
            {nutritionItems.map((item, index) => (
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
        </div>
      </div>

      <BottomNavigation currentScreen="nutritionInfo" navigateTo={navigateTo} />
    </div>
  )
}

