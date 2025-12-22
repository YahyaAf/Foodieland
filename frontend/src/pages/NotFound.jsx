import { Link } from 'react-router-dom'
import { FaHome, FaSearch, FaExclamationTriangle } from 'react-icons/fa'

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8 animate-bounce">
          <FaExclamationTriangle className="text-yellow-500 text-8xl mx-auto mb-4" />
        </div>

        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4">
          404
        </h1>

        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Oops! Page Not Found
        </h2>

        <p className="text-xl text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <FaSearch className="text-blue-600 text-3xl mx-auto mb-3" />
              <p className="text-gray-700 font-medium">Lost your way?</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <FaHome className="text-purple-600 text-3xl mx-auto mb-3" />
              <p className="text-gray-700 font-medium">Let's go back home</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition transform hover:scale-105 flex items-center justify-center gap-2 text-lg font-semibold shadow-lg"
          >
            <FaHome /> Go Home
          </Link>
        </div>

        <div className="mt-12">
          <p className="text-gray-500 text-sm">
            Error Code: 404 | Page Not Found
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFound