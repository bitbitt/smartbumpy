import MobileHeader from "@/components/mobile-header"

export default function LoadingScreen() {
  return (
    <div className="flex flex-col h-full min-h-screen w-full max-w-md bg-white rounded-xl overflow-hidden shadow-lg">
      <MobileHeader />

      <div className="bg-light-blue p-6 flex-1 flex flex-col">
        <h1 className="text-xl font-bold text-primary-purple mt-2">Selamat datang, Bumpies!</h1>

        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="w-24 h-24 rounded-full bg-primary-purple flex items-center justify-center mb-6 animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
          </div>

          <h2 className="text-xl font-bold text-primary-purple mb-2">SmartBump</h2>

          <p className="text-center text-text-gray">Memuat...</p>
        </div>
      </div>
    </div>
  )
}

