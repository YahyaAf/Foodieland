import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { recipeService } from '../services/recipeService'
import { categoryService } from '../services/categoryService'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'

function RecipeForm() {
  const { id } = useParams() 
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [editMode, setEditMode] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    imageUrl: '',
    prepTime: '',
    cookTime:  '',
    servings: '',
    categoryId: ''
  })

  useEffect(() => {
    if (!user) {
      toast.error('You must be logged in to create a recipe')
      navigate('/login')
    }
  }, [user, navigate])

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (id) {
      setEditMode(true)
      fetchRecipe()
    }
  }, [id])

  const fetchCategories = async () => {
    try {
      const data = await categoryService. getAllCategories()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchRecipe = async () => {
  try {
    const data = await recipeService.getRecipeById(id)
    
    if (String(data.author?.id) !== String(user?.id)) {
      toast.error('You can only edit your own recipes')
      navigate('/recipes')
      return
    }
    
    setFormData({
      title: data.title,
      slug: data.slug,
      description: data.description || '',
      imageUrl: data.imageUrl || '',
      prepTime: data.prepTime || '',
      cookTime: data.cookTime || '',
      servings:  data.servings || '',
      categoryId: data.category?.id || ''
    })
  } catch (error) {
    console.error('Error fetching recipe:', error)
    navigate('/recipes')
  }
}

  const handleChange = (e) => {
    const { name, value } = e.target
    
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const submitData = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description || null,
        imageUrl: formData.imageUrl || null,
        prepTime: formData.prepTime ?  parseInt(formData.prepTime) : 0,
        cookTime: formData.cookTime ? parseInt(formData.cookTime) : 0,
        servings: formData.servings ? parseInt(formData.servings) : 1,
        categoryId: parseInt(formData.categoryId)
      }

      if (editMode) {
        await recipeService.updateRecipe(id, submitData)
        navigate(`/recipes/${id}`)
      } else {
        const newRecipe = await recipeService.createRecipe(submitData)
        navigate(`/recipes/${newRecipe.id}`)
      }
    } catch (error) {
      console.error('Error saving recipe:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            {editMode ?  'Edit Recipe' : 'Add New Recipe'}
          </h1>
          <p className="text-gray-600 mt-2">
            {editMode ?  'Update your recipe details below' : 'Share your delicious recipe with the community'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
          
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Moroccan Tagine"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Slug *
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="e. g., moroccan-tagine"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus: ring-blue-500"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Use only lowercase letters, numbers, and hyphens
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Category *
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="6"
              placeholder="Describe your recipe, ingredients, and cooking steps..."
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData. imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus: ring-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              Paste a link to your recipe image
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Prep Time (min)
              </label>
              <input
                type="number"
                name="prepTime"
                value={formData.prepTime}
                onChange={handleChange}
                min="0"
                placeholder="15"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Cook Time (min)
              </label>
              <input
                type="number"
                name="cookTime"
                value={formData.cookTime}
                onChange={handleChange}
                min="0"
                placeholder="30"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Servings
              </label>
              <input
                type="number"
                name="servings"
                value={formData.servings}
                onChange={handleChange}
                min="1"
                placeholder="4"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ?  'Saving...' : editMode ? 'Update Recipe' : 'Create Recipe'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/recipes')}
              className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 font-semibold"
            >
              Cancel
            </button>
          </div>

        </form>

      </div>
    </div>
  )
}

export default RecipeForm