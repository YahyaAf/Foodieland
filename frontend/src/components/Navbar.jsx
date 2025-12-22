import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa'

function Navbar() {
  const { user, logout, loading } = useContext(AuthContext)
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
      navigate('/login')
      setMobileMenuOpen(false)
    } catch (error) {
      toast.error('Logout failed')
    }
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-3xl">🍽️</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Foodieland
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
            </Link>

            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : user ? (
              <>
                {user.role === 'ADMIN' && (
                  <Link 
                    to="/dashboard" 
                    className="text-gray-700 hover:text-orange-500 font-medium transition-colors relative group"
                  >
                    Dashboard
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                )}

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                    <FaUser className="text-orange-500" />
                    <span className="text-gray-700 font-medium">{user.username}</span>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-500 text-white px-6 py-2.5 rounded-full hover:bg-red-600 transition-colors font-medium"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
                >
                  Login
                </Link>

                <Link 
                  to="/register" 
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2.5 rounded-full hover:from-orange-600 hover:to-red-600 transition-all font-medium shadow-md hover:shadow-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <FaTimes className="text-2xl text-gray-700" />
            ) : (
              <FaBars className="text-2xl text-gray-700" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-orange-500 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Home
              </Link>

              {loading ? (
                <div className="flex items-center justify-center py-4">
                  <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : user ? (
                <>
                  {user.role === 'ADMIN' && (
                    <Link 
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-gray-700 hover:text-orange-500 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Dashboard
                    </Link>
                  )}

                  <div className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-lg">
                    <FaUser className="text-orange-500" />
                    <span className="text-gray-700 font-medium">{user.username}</span>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 hover:text-orange-500 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Login
                  </Link>

                  <Link 
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all font-medium text-center shadow-md"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar