import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <>
      <Navbar />
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/" element={
          <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-4xl font-bold text-gray-800">
              🍽️ Welcome to Foodieland
            </h1>
          </div>
        } />
      </Routes>
    </>
  )
}

export default App
