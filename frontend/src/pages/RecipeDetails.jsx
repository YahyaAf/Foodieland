import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { recipeService } from '../services/recipeService'
import { FaClock, FaUtensils, FaUser, FaArrowLeft, FaTag } from 'react-icons/fa'

function RecipeDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecipe()
  }, [id])

  const fetchRecipe = async () => {
    try {
      setLoading(true)
      const data = await recipeService. getRecipeById(id)
      setRecipe(data)
    } catch (error) {
      console.error('Error fetching recipe:', error)
      navigate('/recipes')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading... </div>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Recipe not found</div>
      </div>
    )
  }

  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0)
  
  const isValidImageUrl = recipe.imageUrl && 
    (recipe. imageUrl.startsWith('http://') || recipe.imageUrl.startsWith('https://')) &&
    !recipe.imageUrl.includes('noha.in') &&
    !recipe.imageUrl.includes('gafotus. me.uk')

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        <Link
          to="/recipes"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <FaArrowLeft /> Back to Recipes
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          
          <div className="h-96 overflow-hidden bg-gray-200">
            {isValidImageUrl ? (
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400 text-8xl">🍽️</div>'
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-8xl">
                🍽️
              </div>
            )}
          </div>

          <div className="p-8">
            
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 text-sm font-semibold px-4 py-2 rounded-full">
                <FaTag />
                {recipe.category?.name || 'Uncategorized'}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {recipe.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6 pb-6 border-b">
              
              <div className="flex items-center gap-2">
                <FaUser className="text-blue-500" />
                <span>
                  <span className="font-semibold">Author:</span> {recipe. author?.username || 'Anonymous'}
                </span>
              </div>

              {recipe.prepTime > 0 && (
                <div className="flex items-center gap-2">
                  <FaClock className="text-orange-500" />
                  <span>
                    <span className="font-semibold">Prep: </span> {recipe.prepTime} min
                  </span>
                </div>
              )}

              {recipe.cookTime > 0 && (
                <div className="flex items-center gap-2">
                  <FaClock className="text-red-500" />
                  <span>
                    <span className="font-semibold">Cook:</span> {recipe.cookTime} min
                  </span>
                </div>
              )}

              {totalTime > 0 && (
                <div className="flex items-center gap-2">
                  <FaClock className="text-green-500" />
                  <span>
                    <span className="font-semibold">Total:</span> {totalTime} min
                  </span>
                </div>
              )}

              {recipe.servings && (
                <div className="flex items-center gap-2">
                  <FaUtensils className="text-purple-500" />
                  <span>
                    <span className="font-semibold">Servings:</span> {recipe.servings}
                  </span>
                </div>
              )}
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                {recipe.description || 'No description available. '}
              </p>
            </div>

            <div className="mt-6 pt-6 border-t text-sm text-gray-500">
              <p>
                Created:  {new Date(recipe.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              {recipe.updatedAt && recipe.updatedAt !== recipe.createdAt && (
                <p className="mt-1">
                  Last updated: {new Date(recipe.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month:  'long',
                    day: 'numeric'
                  })}
                </p>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default RecipeDetails