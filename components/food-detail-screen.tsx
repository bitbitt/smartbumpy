import MobileHeader from "@/components/mobile-header"
import BottomNavigation from "@/components/bottom-navigation"
import HeaderWithProfile from "@/components/header-with-profile"

interface FoodDetailScreenProps {
  navigateTo: (screen: string) => void
  username: string
}

export default function FoodDetailScreen({ navigateTo, username }: FoodDetailScreenProps) {
  const nutritionItems = [
    { name: "Karbohidrat", value: "25.0 gram" },
    { name: "Protein", value: "10.0 gram" },
    { name: "Lemak", value: "5.0 gram" },
    { name: "Serat", value: "2.0 gram" },
    { name: "Gula", value: "1.5 gram" },
    { name: "Sodium", value: "400 mg" },
    { name: "Kalium", value: "300 mg" },
    { name: "Vitamin A", value: "10%" },
    { name: "Vitamin C", value: "15%" },
    { name: "Kalsium", value: "8%" },
    { name: "Zat Besi", value: "10%" },
  ]

  return (
    <div className="flex flex-col h-[600px] w-full max-w-md bg-white rounded-xl overflow-hidden shadow-lg">
      <MobileHeader />

      <HeaderWithProfile
        title="Informasi Gizi Detail"
        subtitle="Nasi Ayam Bumbu Kecap"
        navigateTo={navigateTo}
        username={username}
      />

      <div className="flex-1 p-4 bg-bg-purple overflow-y-auto">
        <div className="bg-white rounded-xl p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-medium">Progresmu</h2>
            <span className="text-xs font-medium text-primary-blue">70%</span>
          </div>

          <div className="progress-container mb-4">
            <div className="progress-bar" style={{ width: "70%" }}></div>
          </div>

          <div className="space-y-2">
            {nutritionItems.map((item, index) => (
              <div key={index} className="flex justify-between text-xs">
                <span>{item.name}</span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation currentScreen="foodDetail" navigateTo={navigateTo} />
    </div>
  )
}

