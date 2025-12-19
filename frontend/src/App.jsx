import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
            � Foodieland
          </h1>
          <p className="text-gray-500 text-lg">Tailwind CSS Test Page</p>
        </div>

        {/* Test Card */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-xl p-6 text-white">
          <h2 className="text-3xl font-bold mb-2">✅ Tailwind Works!</h2>
          <p className="text-green-100">If you see colors and styles, Tailwind is working correctly.</p>
        </div>

        {/* Buttons Test */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-800">Interactive Test:</h3>
          <div className="flex gap-4 flex-wrap">
            <button 
              onClick={() => setCount(count + 1)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
            >
              Count: {count}
            </button>
            <button 
              onClick={() => setCount(0)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Utility Classes Test */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded">
            <p className="font-semibold text-red-700">Red Card</p>
          </div>
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold text-yellow-700">Yellow Card</p>
          </div>
          <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded">
            <p className="font-semibold text-green-700">Green Card</p>
          </div>
        </div>

        {/* Responsive Test */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h4 className="text-xl font-bold text-gray-800 mb-2">Responsive Test:</h4>
          <p className="text-sm md:text-base lg:text-lg xl:text-xl">
            This text changes size based on screen width 📱💻🖥️
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
