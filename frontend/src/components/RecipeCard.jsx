import { Link } from 'react-router-dom'
import { FaClock, FaUtensils, FaUser } from 'react-icons/fa'

function RecipeCard({ recipe }) {
  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0)
  
  // 👇 Validate image URL
  const isValidImageUrl = recipe.imageUrl && 
    (recipe.imageUrl.startsWith('http://') || recipe.imageUrl.startsWith('https://')) &&
    !recipe.imageUrl.includes('noha.in') &&
    !recipe.imageUrl.includes('gafotus.me. uk')

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      
      {/* Image */}
      <div className="h-48 overflow-hidden bg-gray-200">
        {isValidImageUrl ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.parentElement. innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400 text-4xl">🍽️</div>'
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
            🍽️
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        
        {/* Category Badge */}
        <div className="mb-2">
          <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
            {recipe.category?. name || 'Uncategorized'}
          </span>
        </div>

        {/* Title */}
        <Link to={`/recipes/${recipe.id}`}>
          <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition line-clamp-2">
            {recipe.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {recipe.description || 'No description available'}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          
          {/* Total Time */}
          {totalTime > 0 && (
            <div className="flex items-center gap-1">
              <FaClock className="text-orange-500" />
              <span>{totalTime} min</span>
            </div>
          )}

          {/* Servings */}
          {recipe.servings && (
            <div className="flex items-center gap-1">
              <FaUtensils className="text-green-500" />
              <span>{recipe.servings} servings</span>
            </div>
          )}
        </div>

        {/* Author */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
          <FaUser className="text-gray-400 text-sm" />
          <span className="text-sm text-gray-600">
            {recipe.author?.name || 'Anonymous'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard