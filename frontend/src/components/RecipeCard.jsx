import { Link } from 'react-router-dom'
import { FaClock, FaUtensils, FaUser, FaHeart } from 'react-icons/fa'

function RecipeCard({ recipe }) {
  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0)
  
  const isValidImageUrl = recipe.imageUrl && 
    (recipe.imageUrl.startsWith('http://') || recipe.imageUrl.startsWith('https://')) &&
    !recipe.imageUrl.includes('noha.in') &&
    !recipe.imageUrl.includes('gafotus.me.uk')

  return (
    <Link to={`/recipes/${recipe.id}`} className="group block">
      <div className="bg-white rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          {isValidImageUrl ? (
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400 text-6xl">🍽️</div>'
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-6xl">
              🍽️
            </div>
          )}
          
          <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors">
            <FaHeart className="text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition line-clamp-2 leading-tight">
            {recipe.title}
          </h3>

          <div className="flex items-center gap-4 mb-4">
            {totalTime > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <FaClock className="text-gray-600 text-sm" />
                </div>
                <span className="text-sm font-medium text-gray-700">{totalTime} MIN</span>
              </div>
            )}

            {recipe.category?.name && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <FaUtensils className="text-gray-600 text-sm" />
                </div>
                <span className="text-sm font-medium text-gray-700">{recipe.category.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default RecipeCard