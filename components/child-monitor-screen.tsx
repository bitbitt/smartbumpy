"use client"

import { useState } from "react"
import MobileHeader from "@/components/mobile-header"
import BottomNavigation from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"
import { PlusCircle, ArrowLeft } from "lucide-react"
import HeaderWithProfile from "@/components/header-with-profile"
import PhotoUpload from "@/components/photo-upload"

interface ChildMonitorScreenProps {
  navigateTo: (screen: string) => void
  setSelectedChild?: (child: any) => void
  username: string
}

export default function ChildMonitorScreen({ navigateTo, setSelectedChild, username }: ChildMonitorScreenProps) {
  const [children, setChildren] = useState<any[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [showChildDataForm, setShowChildDataForm] = useState(false)
  const [newChildName, setNewChildName] = useState("")
  const [childData, setChildData] = useState({
    name: "",
    birthDate: "",
    gender: "",
    isPremature: "",
    birthWeight: "",
    birthHeight: "",
    headCircumference: "",
    upperArmCircumference: "",
    hasAllergies: "",
    motherHeight: "",
    fatherHeight: "",
    photo: null,
  })

  const handleAddChild = () => {
    if (newChildName.trim()) {
      setChildData({
        ...childData,
        name: newChildName,
      })
      setShowAddForm(false)
      setShowChildDataForm(true)
    }
  }

  const handleChildDataChange = (field: string, value: string) => {
    setChildData({
      ...childData,
      [field]: value,
    })
  }

  const handleSaveChildData = () => {
    // Create a new child object with all the data
    // Ensure the birth date is properly formatted
    const birthDateValue = childData.birthDate ? new Date(childData.birthDate).toISOString().split("T")[0] : ""

    const newChild = {
      id: Date.now(),
      name: childData.name,
      birthDate: birthDateValue,
      gender: childData.gender,
      isPremature: childData.isPremature === "Ya",
      birthWeight: Number.parseFloat(childData.birthWeight) || 0,
      birthHeight: Number.parseFloat(childData.birthHeight) || 0,
      headCircumference: Number.parseFloat(childData.headCircumference) || 0,
      upperArmCircumference: Number.parseFloat(childData.upperArmCircumference) || 0,
      hasAllergies: childData.hasAllergies === "Ya",
      motherHeight: Number.parseFloat(childData.motherHeight) || 0,
      fatherHeight: Number.parseFloat(childData.fatherHeight) || 0,
      photo: childData.photo,
      week: Math.floor(Math.random() * 40) + 1, // Random week between 1-40 for demo
    }

    // Add the new child to the list
    setChildren([...children, newChild])

    // Reset forms
    setNewChildName("")
    setChildData({
      name: "",
      birthDate: "",
      gender: "",
      isPremature: "",
      birthWeight: "",
      birthHeight: "",
      headCircumference: "",
      upperArmCircumference: "",
      hasAllergies: "",
      motherHeight: "",
      fatherHeight: "",
      photo: null,
    })
    setShowChildDataForm(false)

    // Store in localStorage for persistence
    if (typeof window !== "undefined") {
      const storedChildren = JSON.parse(localStorage.getItem("children") || "[]")
      localStorage.setItem("children", JSON.stringify([...storedChildren, newChild]))
    }
  }

  const handleSelectChild = (child: any) => {
    // In a real app, we would store the selected child in a global state
    // For this demo, we'll just navigate to the child detail screen
    if (setSelectedChild) {
      setSelectedChild(child)
    }
    navigateTo("childDetail")
  }

  // Load children from localStorage on component mount
  useState(() => {
    if (typeof window !== "undefined") {
      const storedChildren = localStorage.getItem("children")
      if (storedChildren) {
        setChildren(JSON.parse(storedChildren))
      }
    }
  })

  return (
    <div className="flex flex-col h-full min-h-screen w-full max-w-md bg-bg-light rounded-xl overflow-hidden shadow-lg font-poppins">
      <MobileHeader />

      {showChildDataForm ? (
        <>
          <div className="bg-primary-blue p-4 flex items-center">
            <Button variant="ghost" size="sm" className="p-0 mr-2 h-8 w-8" onClick={() => setShowChildDataForm(false)}>
              <ArrowLeft className="h-5 w-5 text-white" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-white">Kembali</h1>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-white">
            <h2 className="text-base font-semibold text-primary-blue mb-4">Data Anak</h2>

            <div className="mb-4 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-lighter-blue border-2 border-dashed border-primary-blue flex items-center justify-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-primary-blue"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <span className="text-xs text-primary-blue">Unggah Foto</span>
            </div>

            <div className="space-y-4 pb-4">
              <div>
                <label className="block text-sm font-medium text-primary-blue mb-1">
                  Nama Lengkap<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={childData.name}
                  onChange={(e) => handleChildDataChange("name", e.target.value)}
                  className="w-full p-3 rounded-lg border border-border-gray"
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-blue mb-1">
                  Tanggal Lahir<span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={childData.birthDate}
                  onChange={(e) => handleChildDataChange("birthDate", e.target.value)}
                  className="w-full p-3 rounded-lg border border-border-gray"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-blue mb-1">
                  Jenis Kelamin<span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Laki-laki"
                      checked={childData.gender === "Laki-laki"}
                      onChange={(e) => handleChildDataChange("gender", e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm">Laki-laki</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Perempuan"
                      checked={childData.gender === "Perempuan"}
                      onChange={(e) => handleChildDataChange("gender", e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm">Perempuan</span>
                  </label>
                </div>
              </div>

              <h3 className="text-sm font-semibold text-primary-blue">Data Kelahiran</h3>

              <div>
                <label className="block text-sm font-medium text-primary-blue mb-1">Foto Anak</label>
                <PhotoUpload
                  onPhotoUploaded={(url) => {
                    handleChildDataChange("photo", url)
                  }}
                  folder="children"
                  shape="square"
                  className="mx-auto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-blue mb-1">
                  Apakah anak lahir prematur?<span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="isPremature"
                      value="Ya"
                      checked={childData.isPremature === "Ya"}
                      onChange={(e) => handleChildDataChange("isPremature", e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm">Ya</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="isPremature"
                      value="Tidak"
                      checked={childData.isPremature === "Tidak"}
                      onChange={(e) => handleChildDataChange("isPremature", e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm">Tidak</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-blue mb-1">
                  Berat Badan saat lahir (kg)<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={childData.birthWeight}
                  onChange={(e) => handleChildDataChange("birthWeight", e.target.value)}
                  className="w-full p-3 rounded-lg border border-border-gray"
                  placeholder="Masukkan berat badan"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-blue mb-1">
                  Tinggi Badan saat lahir (cm)<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={childData.birthHeight}
                  onChange={(e) => handleChildDataChange("birthHeight", e.target.value)}
                  className="w-full p-3 rounded-lg border border-border-gray"
                  placeholder="Masukkan tinggi badan"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-blue mb-1">
                  Lingkar Kepala saat lahir (cm)<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={childData.headCircumference}
                  onChange={(e) => handleChildDataChange("headCircumference", e.target.value)}
                  className="w-full p-3 rounded-lg border border-border-gray"
                  placeholder="Masukkan lingkar kepala"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-blue mb-1">
                  Lingkar Lengan Atas saat lahir (cm)<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={childData.upperArmCircumference}
                  onChange={(e) => handleChildDataChange("upperArmCircumference", e.target.value)}
                  className="w-full p-3 rounded-lg border border-border-gray"
                  placeholder="Masukkan lingkar lengan atas"
                />
              </div>

              <h3 className="text-sm font-semibold text-primary-blue">Profil Tambahan</h3>

              <div>
                <label className="block text-sm font-medium text-primary-blue mb-1">Apakah anak memiliki alergi?</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasAllergies"
                      value="Ya"
                      checked={childData.hasAllergies === "Ya"}
                      onChange={(e) => handleChildDataChange("hasAllergies", e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm">Ya</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasAllergies"
                      value="Tidak"
                      checked={childData.hasAllergies === "Tidak"}
                      onChange={(e) => handleChildDataChange("hasAllergies", e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm">Tidak</span>
                  </label>
                </div>
              </div>

              <h3 className="text-sm font-semibold text-primary-blue">Tinggi Badan Orang Tua</h3>

              <div>
                <label className="block text-sm font-medium text-primary-blue mb-1">Tinggi Badan Ibu (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={childData.motherHeight}
                  onChange={(e) => handleChildDataChange("motherHeight", e.target.value)}
                  className="w-full p-3 rounded-lg border border-border-gray"
                  placeholder="Masukkan tinggi badan ibu"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-blue mb-1">Tinggi Badan Ayah (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={childData.fatherHeight}
                  onChange={(e) => handleChildDataChange("fatherHeight", e.target.value)}
                  className="w-full p-3 rounded-lg border border-border-gray"
                  placeholder="Masukkan tinggi badan ayah"
                />
              </div>

              <Button onClick={handleSaveChildData} className="w-full bg-primary-blue text-white py-3 font-medium">
                Simpan
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <HeaderWithProfile navigateTo={navigateTo} username={username} />

          <div className="flex-1 p-4 pb-20 overflow-y-auto">
            {children.length === 0 && !showAddForm ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-24 h-24 rounded-full bg-lighter-blue flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-primary-blue"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <p className="text-center text-primary-blue">
                  Belum ada data anak. Tambahkan data anak untuk memantau perkembangannya.
                </p>
                <Button
                  onClick={() => setShowAddForm(true)}
                  className="bg-primary-blue text-white flex items-center gap-2 font-medium mt-4"
                >
                  <PlusCircle size={16} />
                  Tambah Anak
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-4 bg-light-blue p-4 rounded-xl">
                  <h2 className="text-base font-semibold mb-2 text-primary-blue">Daftar Anak</h2>

                  {children.map((child) => (
                    <div
                      key={child.id}
                      className="flex items-center justify-between p-3 rounded-xl mb-3 border border-light-blue bg-white cursor-pointer hover:bg-lighter-blue transition-colors"
                      onClick={() => handleSelectChild(child)}
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-3 bg-primary-blue flex items-center justify-center">
                          {child.photo ? (
                            <img
                              src={child.photo || "/placeholder.svg"}
                              alt={child.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-lg font-semibold text-white">
                              {child.name.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-medium">{child.name}</h3>
                          <p className="text-xs text-primary-blue">
                            {child.gender}
                            {child.birthDate
                              ? ` ${new Date(child.birthDate).toLocaleDateString()}`
                              : " Tanggal lahir belum diisi"}
                          </p>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-primary-blue"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  ))}

                  {!showAddForm && (
                    <Button
                      onClick={() => setShowAddForm(true)}
                      className="w-full bg-primary-blue text-white flex items-center justify-center gap-2 mt-4 font-medium"
                    >
                      <PlusCircle size={16} />
                      Tambah Anak Lainnya
                    </Button>
                  )}
                </div>
              </>
            )}

            {showAddForm && (
              <div className="bg-lighter-blue rounded-xl p-4 mb-4">
                <h3 className="text-sm font-semibold text-primary-blue mb-3">Tambah Data Anak</h3>
                <div className="mb-3">
                  <label htmlFor="childName" className="block text-xs text-primary-blue mb-1">
                    Nama Anak
                  </label>
                  <input
                    type="text"
                    id="childName"
                    value={newChildName}
                    onChange={(e) => setNewChildName(e.target.value)}
                    className="w-full p-2 rounded-lg border border-border-gray"
                    placeholder="Masukkan nama anak"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowAddForm(false)} className="flex-1">
                    Batal
                  </Button>
                  <Button
                    onClick={handleAddChild}
                    className="flex-1 bg-primary-blue text-white font-medium"
                    disabled={!newChildName.trim()}
                  >
                    Lanjutkan
                  </Button>
                </div>
              </div>
            )}
          </div>

          <BottomNavigation currentScreen="childMonitor" navigateTo={navigateTo} />
        </>
      )}
    </div>
  )
}

