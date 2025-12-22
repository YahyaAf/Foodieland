import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { recipeService } from '../services/recipeService'
import Footer from '../components/Footer'
import { FaClock, FaUtensils, FaUser, FaArrowLeft, FaPrint, FaShareAlt, FaCalendar } from 'react-icons/fa'

function RecipeDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [recipe, setRecipe] = useState(null)
  const [relatedRecipes, setRelatedRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecipe()
  }, [id])

  const fetchRecipe = async () => {
    try {
      setLoading(true)
      const data = await recipeService.getRecipeById(id)
      setRecipe(data)
      
      if (data.category?.id) {
        const related = await recipeService.getAllRecipes({ categoryId: data.category.id })
        setRelatedRecipes(related.filter(r => r.id !== parseInt(id)).slice(0, 3))
      }
    } catch (error) {
      console.error('Error fetching recipe:', error)
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading recipe...</p>
        </div>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🍽️</div>
          <p className="text-2xl text-gray-600">Recipe not found</p>
        </div>
      </div>
    )
  }

  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0)
  
  const isValidImageUrl = recipe.imageUrl && 
    (recipe.imageUrl.startsWith('http://') || recipe.imageUrl.startsWith('https://')) &&
    !recipe.imageUrl.includes('noha.in') &&
    !recipe.imageUrl.includes('gafotus.me.uk')

  const ingredients = [
    '1 tablespoon olive oil',
    '2 cloves garlic, minced',
    '1 onion, chopped',
    '2 cups chicken stock',
    '1 cup heavy cream',
    'Salt and pepper to taste',
    'Fresh parsley for garnish'
  ]

  const directions = [
    {
      step: 1,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&q=80'
    },
    {
      step: 2,
      text: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc vulputate libero et velit interdum.',
      image: 'https://images.unsplash.com/photo-1556910163-8e33e3f1d3f8?w=400&q=80'
    },
    {
      step: 3,
      text: 'Donec et nibh maximus, congue est eu, mattis nunc. Praesent ut quam quis quam venenatis fringilla. Morbi vestibulum id tellus malesuada.',
      image: null
    }
  ]

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 font-medium text-sm sm:text-base"
          >
            <FaArrowLeft /> Back to Home
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden mb-4 sm:mb-6 lg:mb-8">
                <div className="relative h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  {isValidImageUrl ? (
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400 text-9xl">🍽️</div>'
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
                      🍽️
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-6 lg:p-8">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                    {recipe.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <FaUser className="text-blue-600 text-xs sm:text-sm" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">By</p>
                        <p className="text-xs sm:text-sm font-semibold text-gray-900">
                          {recipe.author?.username || 'Anonymous'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <FaCalendar className="text-orange-600 text-xs sm:text-sm" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Published</p>
                        <p className="text-xs sm:text-sm font-semibold text-gray-900">
                          {new Date(recipe.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6 lg:mb-8">
                    <button className="flex items-center gap-1.5 sm:gap-2 bg-gray-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:bg-gray-800 transition font-medium text-xs sm:text-sm">
                      <FaPrint className="text-xs sm:text-sm" /> <span className="hidden sm:inline">PRINT</span><span className="sm:hidden">Print</span>
                    </button>
                    <button className="flex items-center gap-1.5 sm:gap-2 bg-gray-100 text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:bg-gray-200 transition font-medium text-xs sm:text-sm">
                      <FaShareAlt className="text-xs sm:text-sm" /> <span className="hidden sm:inline">SHARE</span><span className="sm:hidden">Share</span>
                    </button>
                  </div>

                  <div className="prose max-w-none">
                    <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed">
                      {recipe.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Ingredients</h2>
                <ul className="space-y-2 sm:space-y-3">
                  {ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm sm:text-base">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Directions</h2>
                <div className="space-y-6 sm:space-y-8">
                  {directions.map((direction) => (
                    <div key={direction.step} className="flex gap-3 sm:gap-4 md:gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-base sm:text-lg">
                          {direction.step}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">{direction.text}</p>
                        {direction.image && (
                          <img
                            src={direction.image}
                            alt={`Step ${direction.step}`}
                            className="w-full h-auto object-cover rounded-2xl"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Nutrition Information</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center py-2 sm:py-3 border-b border-orange-200">
                    <span className="text-gray-700 font-medium text-sm sm:text-base">Calories</span>
                    <span className="text-gray-900 font-semibold text-sm sm:text-base">219 kcal</span>
                  </div>
                  <div className="flex justify-between items-center py-2 sm:py-3 border-b border-orange-200">
                    <span className="text-gray-700 font-medium text-sm sm:text-base">Total Fat</span>
                    <span className="text-gray-900 font-semibold text-sm sm:text-base">10.7g</span>
                  </div>
                  <div className="flex justify-between items-center py-2 sm:py-3 border-b border-orange-200">
                    <span className="text-gray-700 font-medium text-sm sm:text-base">Protein</span>
                    <span className="text-gray-900 font-semibold text-sm sm:text-base">7.9g</span>
                  </div>
                  <div className="flex justify-between items-center py-2 sm:py-3 border-b border-orange-200">
                    <span className="text-gray-700 font-medium text-sm sm:text-base">Carbohydrate</span>
                    <span className="text-gray-900 font-semibold text-sm sm:text-base">22.3g</span>
                  </div>
                  <div className="flex justify-between items-center py-2 sm:py-3">
                    <span className="text-gray-700 font-medium text-sm sm:text-base">Cholesterol</span>
                    <span className="text-gray-900 font-semibold text-sm sm:text-base">37.4mg</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 mt-4 sm:mt-6 leading-relaxed">
                  Adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
                </p>
              </div>

              {relatedRecipes.length > 0 && (
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Other Recipes</h3>
                  <div className="space-y-3 sm:space-y-4">
                    {relatedRecipes.map((relatedRecipe) => (
                      <Link
                        key={relatedRecipe.id}
                        to={`/recipes/${relatedRecipe.id}`}
                        className="group block"
                      >
                        <div className="flex gap-3 sm:gap-4 items-center p-2 sm:p-3 rounded-xl sm:rounded-2xl hover:bg-gray-50 transition">
                          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg sm:rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                            {relatedRecipe.imageUrl ? (
                              <img
                                src={relatedRecipe.imageUrl}
                                alt={relatedRecipe.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-2xl sm:text-3xl">
                                🍽️
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm sm:text-base text-gray-900 group-hover:text-orange-500 transition line-clamp-2 mb-1">
                              {relatedRecipe.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-500">
                              By {relatedRecipe.author?.name || 'Anonymous'}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default RecipeDetails
