"use client"

import { useState } from "react"
import MobileHeader from "@/components/mobile-header"
import BottomNavigation from "@/components/bottom-navigation"
import HeaderWithProfile from "@/components/header-with-profile"
import { Search, ChevronRight } from "lucide-react"

interface HomeScreenProps {
  navigateTo: (screen: string) => void
  username: string
}

export default function HomeScreen({ navigateTo, username }: HomeScreenProps) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [activeEducationSlide, setActiveEducationSlide] = useState(0)

  const newsItems = [
    {
      id: 1,
      title: "Makanan Bergizi untuk Ibu Hamil",
      image: "/images/healthy-foods.png",
      date: "2 jam yang lalu",
      url: "https://example.com/news/protein-ibu-hamil",
    },
    {
      id: 2,
      title: "Mencegah Stunting Sejak Dini",
      image: "/placeholder.svg?height=200&width=350",
      date: "5 jam yang lalu",
      url: "https://example.com/news/mencegah-stunting",
    },
    {
      id: 3,
      title: "Makanan Bergizi untuk Tumbuh Kembang Optimal",
      image: "/placeholder.svg?height=200&width=350",
      date: "1 hari yang lalu",
      url: "https://example.com/news/makanan-bergizi",
    },
  ]

  const educationItems = [
    {
      id: 1,
      title: "Panduan Nutrisi Seimbang untuk Ibu Hamil",
      image: "/images/healthy-foods.png",
      duration: "5 menit",
      url: "https://example.com/education/stunting",
    },
    {
      id: 2,
      title: "Nutrisi Penting untuk Ibu Hamil",
      image: "/placeholder.svg?height=200&width=350",
      duration: "7 menit",
      url: "https://example.com/education/nutrisi-ibu-hamil",
    },
    {
      id: 3,
      title: "Pola Makan Sehat untuk Mencegah Stunting",
      image: "/placeholder.svg?height=200&width=350",
      duration: "4 menit",
      url: "https://example.com/education/pola-makan-sehat",
    },
  ]

  const handleOpenExternalLink = (url: string) => {
    // In a real app, this would open the URL in a browser
    window.open(url, "_blank")
  }

  return (
    <div className="flex flex-col h-full min-h-screen w-full max-w-md bg-bg-light rounded-xl overflow-hidden shadow-lg font-poppins">
      <MobileHeader />

      <HeaderWithProfile navigateTo={navigateTo} username={username} />

      {/* Add padding-bottom to ensure content doesn't get hidden behind the bottom navigation */}
      <div className="flex-1 px-4 pb-20 overflow-y-auto">
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="bg-white rounded-full flex items-center p-3 shadow-sm">
            <input
              type="text"
              placeholder="Cari..."
              className="bg-transparent border-none flex-1 text-sm focus:outline-none"
            />
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* News Carousel */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <span className="text-sm font-semibold text-primary-blue bg-light-blue px-4 py-1 rounded-full">
              #BERITA
            </span>
          </div>

          <div className="relative">
            <div className="rounded-xl overflow-hidden shadow-sm">
              <div className="relative">
                <img
                  src={newsItems[activeSlide].image || "/placeholder.svg"}
                  alt={newsItems[activeSlide].title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center p-4">
                  {/* Increased left padding to match the image */}
                  <div className="pl-12 pr-12">
                    <h3 className="text-lg font-semibold text-white mb-2">{newsItems[activeSlide].title}</h3>
                    <button
                      className="bg-primary-blue text-white text-xs px-4 py-2 rounded-full w-fit flex items-center"
                      onClick={() => handleOpenExternalLink(newsItems[activeSlide].url)}
                    >
                      Baca lebih lanjut <ChevronRight className="h-3 w-3 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation buttons - conditionally rendered based on current slide */}
            {activeSlide > 0 && (
              <button
                className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-primary-blue rounded-full p-2 shadow-sm"
                onClick={() => setActiveSlide((prev) => prev - 1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}

            {activeSlide < newsItems.length - 1 && (
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary-blue rounded-full p-2 shadow-sm"
                onClick={() => setActiveSlide((prev) => prev + 1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}

            {/* Dots indicator */}
            <div className="flex justify-center mt-3">
              {newsItems.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full mx-1 ${index === activeSlide ? "bg-primary-blue" : "bg-gray-300"}`}
                  onClick={() => setActiveSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Education Carousel */}
        <div className="mb-4">
          <div className="flex items-center mb-3">
            <span className="text-sm font-semibold text-primary-purple bg-light-purple px-4 py-1 rounded-full">
              #EDUKASI
            </span>
          </div>

          <div className="relative">
            <div className="rounded-xl overflow-hidden shadow-sm">
              <div className="relative">
                <img
                  src={educationItems[activeEducationSlide].image || "/placeholder.svg"}
                  alt={educationItems[activeEducationSlide].title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center p-4">
                  {/* Increased left padding to match the image */}
                  <div className="pl-12 pr-12">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {educationItems[activeEducationSlide].title}
                    </h3>
                    <button
                      className="bg-primary-purple text-white text-xs px-4 py-2 rounded-full w-fit flex items-center"
                      onClick={() => handleOpenExternalLink(educationItems[activeEducationSlide].url)}
                    >
                      Baca lebih lanjut <ChevronRight className="h-3 w-3 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation buttons - conditionally rendered based on current slide */}
            {activeEducationSlide > 0 && (
              <button
                className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-primary-purple rounded-full p-2 shadow-sm"
                onClick={() => setActiveEducationSlide((prev) => prev - 1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}

            {activeEducationSlide < educationItems.length - 1 && (
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary-purple rounded-full p-2 shadow-sm"
                onClick={() => setActiveEducationSlide((prev) => prev + 1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}

            {/* Dots indicator */}
            <div className="flex justify-center mt-3">
              {educationItems.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full mx-1 ${index === activeEducationSlide ? "bg-primary-purple" : "bg-gray-300"}`}
                  onClick={() => setActiveEducationSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation currentScreen="home" navigateTo={navigateTo} />
    </div>
  )
}

