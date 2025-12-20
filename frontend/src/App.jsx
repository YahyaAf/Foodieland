import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Categories from './pages/Categories'
import Recipes from './pages/Recipes'              
import RecipeDetails from './pages/RecipeDetails'  
import RecipeForm from './pages/RecipeForm'        

function App() {
  return (
    <>
      <Navbar />
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/categories" element={<Categories />} />
        
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/new" element={<RecipeForm />} />
        <Route path="/recipes/edit/:id" element={<RecipeForm />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        
        <Route path="/" element={
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-800 mb-4">
                🍽️ Foodieland
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover and share amazing recipes
              </p>
              <div className="flex gap-4 justify-center">
                <a
                  href="/recipes"
                  className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 font-semibold text-lg"
                >
                  Browse Recipes
                </a>
                <a
                  href="/categories"
                  className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 font-semibold text-lg"
                >
                  Explore Categories
                </a>
              </div>
            </div>
          </div>
        } />
      </Routes>
    </>
  )
}

export default App