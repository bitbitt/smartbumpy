"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Camera, Upload, Zap, ZapOff, X } from "lucide-react"

interface CameraScreenProps {
  navigateTo: (screen: string) => void
}

export default function CameraScreen({ navigateTo }: CameraScreenProps) {
  const [analyzing, setAnalyzing] = useState(false)
  const [foodIdentified, setFoodIdentified] = useState(false)
  const [flashOn, setFlashOn] = useState(false)
  const [showFoodDetails, setShowFoodDetails] = useState(false)
  const [flashAnimation, setFlashAnimation] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [identifiedFood, setIdentifiedFood] = useState<null | {
    name: string
    calories: number
    carbs: number
    protein: number
    fat: number
    fiber: number
    vitaminA: number
    vitaminC: number
    calcium: number
    iron: number
  }>(null)

  // Flash animation effect
  useEffect(() => {
    if (flashAnimation) {
      const timer = setTimeout(() => {
        setFlashAnimation(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [flashAnimation])

  // Initialize camera when component mounts
  useEffect(() => {
    if (cameraActive && !capturedImage) {
      initCamera()
    }

    // Cleanup function to stop camera when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [cameraActive])

  const initCamera = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError("Kamera tidak didukung di perangkat ini")
        setCameraPermission(false)
        return
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // Use back camera if available
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraPermission(true)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setCameraError("Tidak dapat mengakses kamera. Pastikan Anda telah memberikan izin.")
      setCameraPermission(false)
    }
  }

  const handleCapture = () => {
    if (capturedImage) {
      // If we already have a captured image, analyze it
      analyzeImage()
      return
    }

    if (flashOn) {
      setFlashAnimation(true)
    }

    // Capture image from video stream
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        // Draw current video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Convert canvas to data URL
        const imageDataUrl = canvas.toDataURL("image/jpeg")
        setCapturedImage(imageDataUrl)

        // Stop camera stream
        const stream = video.srcObject as MediaStream
        if (stream) {
          const tracks = stream.getTracks()
          tracks.forEach((track) => track.stop())
        }
        video.srcObject = null
      }
    }
  }

  const retakePhoto = () => {
    setCapturedImage(null)
    setFoodIdentified(false)
    setIdentifiedFood(null)
    setCameraActive(true)
    initCamera()
  }

  const analyzeImage = () => {
    setAnalyzing(true)

    // Simulate API call delay
    setTimeout(() => {
      setAnalyzing(false)
      setFoodIdentified(true)
      setIdentifiedFood({
        name: "Nasi Ayam Bumbu Kecap",
        calories: 350,
        carbs: 45,
        protein: 20,
        fat: 10,
        fiber: 3,
        vitaminA: 120,
        vitaminC: 15,
        calcium: 80,
        iron: 4,
      })
    }, 2000)
  }

  const handleShowDetails = () => {
    setShowFoodDetails(true)
  }

  const handleAddToNutrition = () => {
    // Store identified food in localStorage
    if (identifiedFood && typeof window !== "undefined") {
      const selectedFoods = [
        {
          id: Date.now(),
          name: identifiedFood.name,
          quantity: "1",
          unit: "porsi",
          calories: identifiedFood.calories,
          carbs: identifiedFood.carbs,
          protein: identifiedFood.protein,
          fat: identifiedFood.fat,
        },
      ]
      localStorage.setItem("selectedFoods", JSON.stringify(selectedFoods))
    }

    // Navigate to confirmation screen
    navigateTo("confirmFoodProgress")
  }

  const toggleFlash = () => {
    setFlashOn(!flashOn)

    // In a real implementation, you would toggle the flash using the camera API
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      const tracks = stream.getVideoTracks()

      if (tracks.length > 0) {
        const capabilities = tracks[0].getCapabilities()
        // Check if torch is supported
        if (capabilities.torch) {
          tracks[0]
            .applyConstraints({
              advanced: [{ torch: !flashOn }],
            })
            .catch((e) => console.error("Error toggling flash:", e))
        }
      }
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        setCapturedImage(event.target.result as string)
        analyzeImage()
      }
    }
    reader.readAsDataURL(file)
  }

  // If showing food details, render the food details screen
  if (showFoodDetails && identifiedFood) {
    return (
      <div className="flex flex-col h-full min-h-screen w-full max-w-md bg-white">
        <div className="bg-light-blue p-4 flex items-center">
          <Button variant="ghost" size="sm" className="p-0 mr-2 h-8 w-8" onClick={() => setShowFoodDetails(false)}>
            <ArrowLeft className="h-5 w-5 text-primary-purple" />
          </Button>
          <div>
            <h1 className="text-lg font-medium text-primary-purple">{identifiedFood.name}</h1>
            <p className="text-xs text-text-gray">Informasi Gizi</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {capturedImage ? (
            <img
              src={capturedImage || "/placeholder.svg"}
              alt={identifiedFood.name}
              className="w-full h-48 object-cover"
            />
          ) : (
            <img
              src="/placeholder.svg?height=200&width=350"
              alt={identifiedFood.name}
              className="w-full h-48 object-cover"
            />
          )}

          <div className="p-4">
            <div className="bg-bg-purple p-4 rounded-xl mb-4">
              <h2 className="text-base font-semibold text-primary-purple mb-3">Informasi Gizi</h2>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Kalori</span>
                  <span className="text-sm font-medium text-primary-blue">{identifiedFood.calories} kkal</span>
                </div>
                <div className="h-2 bg-lighter-blue rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-blue rounded-full"
                    style={{ width: `${(identifiedFood.calories / 2000) * 100}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Karbohidrat</span>
                  <span className="text-sm font-medium text-primary-blue">{identifiedFood.carbs}g</span>
                </div>
                <div className="h-2 bg-lighter-blue rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-blue rounded-full"
                    style={{ width: `${(identifiedFood.carbs / 250) * 100}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Protein</span>
                  <span className="text-sm font-medium text-primary-blue">{identifiedFood.protein}g</span>
                </div>
                <div className="h-2 bg-lighter-blue rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-blue rounded-full"
                    style={{ width: `${(identifiedFood.protein / 60) * 100}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Lemak</span>
                  <span className="text-sm font-medium text-primary-blue">{identifiedFood.fat}g</span>
                </div>
                <div className="h-2 bg-lighter-blue rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-blue rounded-full"
                    style={{ width: `${(identifiedFood.fat / 65) * 100}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Serat</span>
                  <span className="text-sm font-medium text-primary-blue">{identifiedFood.fiber}g</span>
                </div>
                <div className="h-2 bg-lighter-blue rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-blue rounded-full"
                    style={{ width: `${(identifiedFood.fiber / 25) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-border-gray mb-4">
              <h2 className="text-base font-semibold text-primary-purple mb-3">Mikronutrien</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-text-gray">Vitamin A</p>
                  <p className="text-sm font-medium text-primary-blue">{identifiedFood.vitaminA} mcg</p>
                </div>
                <div>
                  <p className="text-sm text-text-gray">Vitamin C</p>
                  <p className="text-sm font-medium text-primary-blue">{identifiedFood.vitaminC} mg</p>
                </div>
                <div>
                  <p className="text-sm text-text-gray">Kalsium</p>
                  <p className="text-sm font-medium text-primary-blue">{identifiedFood.calcium} mg</p>
                </div>
                <div>
                  <p className="text-sm text-text-gray">Zat Besi</p>
                  <p className="text-sm font-medium text-primary-blue">{identifiedFood.iron} mg</p>
                </div>
              </div>
            </div>

            <Button onClick={handleAddToNutrition} className="w-full bg-primary-purple text-white py-3 font-medium">
              Tambahkan ke Progress Harian
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Start camera view if not already active
  if (!cameraActive && !capturedImage) {
    return (
      <div className="flex flex-col h-full min-h-screen w-full max-w-md bg-black">
        <div className="absolute top-0 left-0 right-0 bg-primary-purple p-4 flex items-center justify-between z-10">
          <Button variant="ghost" size="sm" className="p-0 h-8 w-8 text-white" onClick={() => navigateTo("home")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold text-white">SmartBump</h1>
          <div className="w-8"></div> {/* Empty div for spacing */}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-24 h-24 rounded-full bg-primary-purple flex items-center justify-center mb-6">
            <Camera className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white mb-4">Kamera SmartBump</h2>
          <p className="text-center text-white mb-8">Ambil foto makanan untuk menganalisis kandungan gizinya</p>
          <Button
            onClick={() => setCameraActive(true)}
            className="bg-primary-blue text-white py-3 px-6 rounded-full font-medium mb-4"
          >
            Buka Kamera
          </Button>
          <p className="text-sm text-white/70 mb-2">atau</p>
          <Button
            variant="outline"
            className="bg-transparent text-white border-white py-3 px-6 rounded-full font-medium"
            onClick={() => document.getElementById("image-upload")?.click()}
          >
            Upload Foto
          </Button>
          <input type="file" id="image-upload" accept="image/*" className="hidden" onChange={handleFileUpload} />
        </div>
      </div>
    )
  }

  // Update the camera screen UI
  return (
    <div className="flex flex-col h-full min-h-screen w-full max-w-md bg-black">
      {/* Camera Viewfinder */}
      <div className="relative flex-1 flex items-center justify-center">
        {/* Flash overlay animation */}
        {flashAnimation && <div className="absolute inset-0 bg-white z-20 animate-flash opacity-70"></div>}

        {/* Purple header */}
        <div className="absolute top-0 left-0 right-0 bg-primary-purple p-4 flex items-center justify-between z-10">
          <Button variant="ghost" size="sm" className="p-0 h-8 w-8 text-white" onClick={() => navigateTo("home")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold text-white">SmartBump</h1>
          <div className="w-8"></div> {/* Empty div for spacing */}
        </div>

        {/* Camera permission error */}
        {cameraPermission === false && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-black/90 z-10">
            <div className="bg-white rounded-xl p-6 max-w-xs w-full text-center">
              <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center mx-auto mb-4">
                <X className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-medium text-primary-purple mb-2">Akses Kamera Ditolak</h3>
              <p className="text-sm text-text-gray mb-4">
                {cameraError || "Izinkan akses kamera untuk menggunakan fitur ini."}
              </p>
              <Button onClick={() => navigateTo("home")} className="w-full bg-primary-purple text-white">
                Kembali
              </Button>
            </div>
          </div>
        )}

        {/* Video element for camera stream */}
        {!capturedImage && cameraActive && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            onCanPlay={() => videoRef.current?.play()}
          />
        )}

        {/* Canvas for capturing image */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Display captured image */}
        {capturedImage && !analyzing && !foodIdentified && (
          <div className="absolute inset-0 flex items-center justify-center">
            <img src={capturedImage || "/placeholder.svg"} alt="Captured" className="w-full h-full object-contain" />
          </div>
        )}

        {analyzing && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-center text-white z-10">
            <div className="w-16 h-16 border-4 border-t-primary-blue border-primary-purple rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-medium mb-2">Menganalisis makanan...</p>
            <p className="text-sm text-white/70">Mohon tunggu sebentar</p>
          </div>
        )}

        {foodIdentified && identifiedFood && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
            <div className="bg-white rounded-xl p-6 w-5/6 max-w-xs">
              <h3 className="text-lg font-medium text-primary-purple mb-3">{identifiedFood.name}</h3>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Kalori:</span>
                  <span className="font-medium">{identifiedFood.calories} kkal</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Karbohidrat:</span>
                  <span className="font-medium">{identifiedFood.carbs}g</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Protein:</span>
                  <span className="font-medium">{identifiedFood.protein}g</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Lemak:</span>
                  <span className="font-medium">{identifiedFood.fat}g</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={retakePhoto} variant="outline" className="flex-1 text-xs">
                  Ulangi
                </Button>
                <Button onClick={handleShowDetails} className="flex-1 bg-primary-blue text-white text-xs">
                  Lihat Detail
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Camera Controls - Purple bar with buttons */}
      {!foodIdentified && (
        <div className="bg-primary-purple p-4 flex items-center justify-between">
          <Button
            variant="ghost"
            className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white relative"
            onClick={() => document.getElementById("image-upload")?.click()}
          >
            <Upload className="h-6 w-6" />
            <span className="absolute -bottom-6 text-xs text-white">Upload</span>
            <input type="file" id="image-upload" accept="image/*" className="hidden" onChange={handleFileUpload} />
          </Button>

          {/* Large circular camera button */}
          <div className="relative -top-8">
            <button
              onClick={handleCapture}
              className="w-20 h-20 rounded-full bg-lavender-100 flex items-center justify-center"
              disabled={analyzing}
            >
              <div className="w-16 h-16 rounded-full border-2 border-primary-purple flex items-center justify-center">
                {capturedImage ? (
                  <div className="h-8 w-8 text-primary-purple flex items-center justify-center">✓</div>
                ) : (
                  <Camera className="h-8 w-8 text-primary-purple" />
                )}
              </div>
            </button>
          </div>

          <Button
            variant="ghost"
            className={`w-12 h-12 rounded-full ${flashOn ? "bg-yellow-400/70" : "bg-white/20"} flex items-center justify-center text-white relative transition-colors duration-200`}
            onClick={toggleFlash}
          >
            {flashOn ? <Zap className="h-6 w-6" /> : <ZapOff className="h-6 w-6" />}
            <span className="absolute -bottom-6 text-xs text-white">Flash</span>
          </Button>
        </div>
      )}
    </div>
  )
}

