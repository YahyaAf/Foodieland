import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { recipeService } from '../services/recipeService'
import { categoryService } from '../services/categoryService'
import { AuthContext } from '../context/AuthContext'
import RecipeCard from '../components/RecipeCard'
import { FaPlus, FaSearch } from 'react-icons/fa'

function Recipes() {
  const { user } = useContext(AuthContext)
  const [recipes, setRecipes] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [showMyRecipes, setShowMyRecipes] = useState(false)

  useEffect(() => {
    fetchCategories()
    fetchRecipes()
  }, [])

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAllCategories()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchRecipes = async () => {
    try {
      setLoading(true)
      const filters = {}
      
      if (searchTerm) filters.search = searchTerm
      if (selectedCategory) filters.categoryId = selectedCategory
      if (showMyRecipes && user) filters.authorId = user.id
      
      const data = await recipeService.getAllRecipes(filters)
      setRecipes(data)
    } catch (error) {
      console.error('Error fetching recipes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchRecipes()
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  const handleMyRecipesToggle = () => {
    setShowMyRecipes(! showMyRecipes)
  }

  useEffect(() => {
    fetchRecipes()
  }, [selectedCategory, showMyRecipes])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Recipes</h1>
          
          {user && (
            <Link
              to="/recipes/new"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 flex items-center gap-2"
            >
              <FaPlus /> Add Recipe
            </Link>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md: grid-cols-3 gap-4">
            
            <form onSubmit={handleSearch} className="md:col-span-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target. value)}
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
                >
                  <FaSearch /> Search
                </button>
              </div>
            </form>

            <div>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="w-full px-4 py-2 border rounded-lg focus: outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {user && (
            <div className="mt-4 flex items-center gap-2">
              <input
                type="checkbox"
                id="myRecipes"
                checked={showMyRecipes}
                onChange={handleMyRecipesToggle}
                className="w-4 h-4 text-blue-500 focus:ring-blue-500 rounded"
              />
              <label htmlFor="myRecipes" className="text-gray-700 cursor-pointer">
                Show only my recipes
              </label>
            </div>
          )}
        </div>

        {recipes.length === 0 ?  (
          <div className="text-center text-gray-600 text-xl py-12">
            {searchTerm || selectedCategory || showMyRecipes
              ? 'No recipes found.  Try different filters.'
              : 'No recipes yet. Be the first to add one!  🍽️'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default Recipes