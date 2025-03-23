import MobileHeader from "@/components/mobile-header"
import BottomNavigation from "@/components/bottom-navigation"
import HeaderWithProfile from "@/components/header-with-profile"

interface NutritionGuideScreenProps {
  navigateTo: (screen: string) => void
  username: string
}

export default function NutritionGuideScreen({ navigateTo, username }: NutritionGuideScreenProps) {
  return (
    <div className="flex flex-col h-[600px] w-full max-w-md bg-white rounded-xl overflow-hidden shadow-lg">
      <MobileHeader />

      <HeaderWithProfile
        title="Bagaimana Cara Mengukur Kandungan Gizi di Makananmu?"
        navigateTo={navigateTo}
        username={username}
      />

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="mb-4">
          <img
            src="/placeholder.svg?height=200&width=350"
            alt="Food measurement guide"
            className="w-full h-48 object-cover rounded-xl mb-3"
          />

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-1">Alat dan bahan:</h3>
              <ul className="text-xs text-text-gray space-y-1">
                <li>• Timbangan dapur</li>
                <li>• Gelas ukur</li>
                <li>• Sendok takar</li>
                <li>• Buku catatan</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-1">Cara Mengukur dengan Alat:</h3>
              <ol className="text-xs text-text-gray space-y-1">
                <li>1. Siapkan timbangan yang sudah dikalibrasi</li>
                <li>2. Timbang makanan sebelum dimasak untuk hasil yang lebih akurat</li>
                <li>3. Catat berat dalam gram</li>
                <li>4. Gunakan aplikasi SmartBump untuk menghitung kandungan gizi</li>
              </ol>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-1">Gunakan Metode Perkiraan:</h3>
              <ul className="text-xs text-text-gray space-y-1">
                <li>• 1 genggam nasi = sekitar 100 gram</li>
                <li>• 1 telapak tangan daging = sekitar 85 gram</li>
                <li>• 1 ibu jari = sekitar 1 sendok makan minyak</li>
                <li>• 1 kepalan tangan = sekitar 1 porsi sayuran</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-1">Saran Gizi dari Ahli:</h3>
              <ul className="text-xs text-text-gray space-y-1">
                <li>• Seimbangkan karbohidrat, protein, dan lemak</li>
                <li>• Perhatikan ukuran porsi</li>
                <li>• Makan beragam warna makanan untuk nutrisi lengkap</li>
                <li>• Minum cukup air</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-1">Cara Membaca Label Gizi:</h3>
              <ul className="text-xs text-text-gray space-y-1">
                <li>• Perhatikan ukuran saji</li>
                <li>• Cek jumlah kalori per sajian</li>
                <li>• Perhatikan kandungan lemak jenuh dan gula</li>
                <li>• Bandingkan dengan kebutuhan harian</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation currentScreen="nutritionGuide" navigateTo={navigateTo} />
    </div>
  )
}

