import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { recipeService } from '../services/recipeService'
import { categoryService } from '../services/categoryService'
import RecipeCard from '../components/RecipeCard'
import Footer from '../components/Footer'
import { FaClock, FaUtensils, FaSearch } from 'react-icons/fa'

function Home() {
  const [recipes, setRecipes] = useState([])
  const [allRecipes, setAllRecipes] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [recipesData, categoriesData] = await Promise.all([
        recipeService.getAllRecipes(),
        categoryService.getAllCategories()
      ])
      setAllRecipes(recipesData)
      setRecipes(recipesData)
      setCategories(categoriesData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    applyFilters()
  }

  const applyFilters = () => {
    let filtered = allRecipes

    if (searchTerm.trim()) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(recipe =>
        recipe.category?.id === parseInt(selectedCategory)
      )
    }

    setRecipes(filtered)
  }

  const handleCategoryClick = (categoryId) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory('')
    } else {
      setSelectedCategory(categoryId)
    }
  }

  useEffect(() => {
    applyFilters()
  }, [selectedCategory])

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <section className="relative bg-gradient-to-br from-blue-50 to-orange-50 py-20 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-sm font-medium text-gray-700">Hot Recipes</span>
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                  Spicy delicious<br />
                  chicken wings
                </h1>
                
                <p className="text-gray-600 text-lg mb-8 max-w-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <div className="flex items-center gap-8 mb-8">
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg">
                    <FaClock className="text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">30 Minutes</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg">
                    <FaUtensils className="text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Chicken</span>
                  </div>
                </div>

                <Link
                  to="/"
                  className="inline-block bg-gray-900 text-white px-8 py-4 rounded-2xl hover:bg-gray-800 transition font-semibold"
                >
                  View Recipe →
                </Link>
              </div>

              <div className="relative">
                <div className="absolute -top-8 -right-8 w-64 h-64 bg-orange-200 rounded-full opacity-30 blur-3xl"></div>
                <div className="relative bg-white rounded-3xl p-4 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80"
                    alt="Chicken Wings"
                    className="w-full h-auto rounded-2xl object-cover"
                  />
                  <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                        5.0
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Rating</p>
                        <p className="font-semibold text-gray-900">⭐⭐⭐⭐⭐</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Categories</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.slice(0, 6).map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`group relative rounded-3xl p-6 transition-all duration-300 cursor-pointer ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-br from-orange-400 to-orange-500 shadow-xl scale-105'
                      : 'bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-lg'
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-white shadow-md flex items-center justify-center text-4xl transition-transform ${
                      selectedCategory === category.id ? 'scale-110' : 'group-hover:scale-105'
                    }`}>
                      {category.name.includes('Break') ? '🥞' :
                       category.name.includes('Vegan') ? '🥗' :
                       category.name.includes('Meat') ? '🍖' :
                       category.name.includes('Dessert') ? '🧁' :
                       category.name.includes('Lunch') ? '🍝' :
                       category.name.includes('Chocolate') ? '🍫' : '🍽️'}
                    </div>
                    <p className={`font-semibold ${
                      selectedCategory === category.id ? 'text-white' : 'text-gray-800'
                    }`}>
                      {category.name}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple and tasty recipes</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm mb-8 max-w-4xl mx-auto">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search recipes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-6 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition font-medium whitespace-nowrap"
                >
                  Search
                </button>
              </form>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-4"></div>
                <p className="text-xl text-gray-600">Loading recipes...</p>
              </div>
            ) : recipes.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🍽️</div>
                <p className="text-gray-600 text-xl">
                  {searchTerm || selectedCategory ? 'No recipes found. Try different filters.' : 'No recipes available yet'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  )
}

export default Home
