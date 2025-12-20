import { useState, useEffect, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { categoryService } from '../services/categoryService'
import { recipeService } from '../services/recipeService'
import { FaPlus, FaEdit, FaTrash, FaUsers, FaUtensils, FaTags } from 'react-icons/fa'

function Dashboard() {
  const { user, loading: authLoading } = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState('categories')
  const [categories, setCategories] = useState([])
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [formData, setFormData] = useState({})

  const fetchData = async () => {
    try {
      setLoading(true)
      const categoriesData = await categoryService.getAllCategories()
      setCategories(categoriesData)
      
      if (activeTab === 'recipes' && user) {
        const recipesData = await recipeService.getAllRecipes({ authorId: user.id })
        setRecipes(recipesData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!authLoading && user && user.role === 'ADMIN') {
      fetchData()
    }
  }, [activeTab, authLoading, user])

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/" replace />
  }

  const handleAddClick = () => {
    setEditMode(false)
    setCurrentItem(null)
    if (activeTab === 'categories') {
      setFormData({ name: '', slug: '' })
    } else {
      setFormData({ title: '', slug: '', description: '', imageUrl: '', prepTime: '', cookTime: '', servings: '', categoryId: '' })
    }
    setShowModal(true)
  }

  const handleEditClick = (item) => {
    setEditMode(true)
    setCurrentItem(item)
    if (activeTab === 'categories') {
      setFormData({ name: item.name, slug: item.slug || '' })
    } else {
      setFormData({
        title: item.title || '',
        slug: item.slug || '',
        description: item.description || '',
        imageUrl: item.imageUrl || '',
        prepTime: item.prepTime || '',
        cookTime: item.cookTime || '',
        servings: item.servings || '',
        categoryId: item.category?.id || item.categoryId || ''
      })
    }
    setShowModal(true)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (activeTab === 'categories') {
        if (editMode) {
          await categoryService.updateCategory(currentItem.id, formData)
        } else {
          await categoryService.createCategory(formData)
        }
      } else {
        if (editMode) {
          await recipeService.updateRecipe(currentItem.id, formData)
        } else {
          await recipeService.createRecipe(formData)
        }
      }
      setShowModal(false)
      fetchData()
    } catch (error) {
      console.error('Error saving:', error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        if (activeTab === 'categories') {
          await categoryService.deleteCategory(id)
        } else {
          await recipeService.deleteRecipe(id)
        }
        fetchData()
      } catch (error) {
        console.error('Error deleting:', error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-blue-100">Manage your categories and recipes</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('categories')}
              className={`flex-1 py-4 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
                activeTab === 'categories'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaTags /> Categories
            </button>
            <button
              onClick={() => setActiveTab('recipes')}
              className={`flex-1 py-4 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
                activeTab === 'recipes'
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaUtensils /> Recipes
            </button>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {activeTab === 'categories' ? 'Categories' : 'Recipes'}
            </h2>
            <button
              onClick={handleAddClick}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 flex items-center gap-2 shadow-lg"
            >
              <FaPlus /> Add {activeTab === 'categories' ? 'Category' : 'Recipe'}
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="text-2xl text-gray-600">Loading...</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 border-b-2 border-gray-200">
                    <th className="px-6 py-4 text-left text-gray-700 font-semibold">
                      {activeTab === 'categories' ? 'Name' : 'Title'}
                    </th>
                    {activeTab === 'categories' ? (
                      <th className="px-6 py-4 text-left text-gray-700 font-semibold">Slug</th>
                    ) : (
                      <>
                        <th className="px-6 py-4 text-left text-gray-700 font-semibold">Category</th>
                        <th className="px-6 py-4 text-left text-gray-700 font-semibold">Author</th>
                      </>
                    )}
                    <th className="px-6 py-4 text-right text-gray-700 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activeTab === 'categories' ? (
                    categories.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="px-6 py-12 text-center text-gray-500">
                          No categories found
                        </td>
                      </tr>
                    ) : (
                      categories.map((category) => (
                        <tr key={category.id} className="border-b hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-800">{category.name}</td>
                          <td className="px-6 py-4 text-gray-600">{category.slug || '-'}</td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => handleEditClick(category)}
                              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(category.id)}
                              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))
                    )
                  ) : recipes.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                        No recipes found
                      </td>
                    </tr>
                  ) : (
                    recipes.map((recipe) => (
                      <tr key={recipe.id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-800">{recipe.title}</td>
                        <td className="px-6 py-4 text-gray-600">{recipe.category?.name || '-'}</td>
                        <td className="px-6 py-4 text-gray-600">{recipe.author?.username || '-'}</td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleEditClick(recipe)}
                            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(recipe.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                {editMode ? 'Edit' : 'Add'} {activeTab === 'categories' ? 'Category' : 'Recipe'}
              </h2>

              <form onSubmit={handleSubmit}>
                {activeTab === 'categories' ? (
                  <>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2 font-medium">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block text-gray-700 mb-2 font-medium">Slug *</label>
                      <input
                        type="text"
                        name="slug"
                        value={formData.slug || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2 font-medium">Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2 font-medium">Slug *</label>
                      <input
                        type="text"
                        name="slug"
                        value={formData.slug || ''}
                        onChange={handleChange}
                        placeholder="e.g., moroccan-tagine"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Use only lowercase letters, numbers, and hyphens
                      </p>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2 font-medium">Description *</label>
                      <textarea
                        name="description"
                        value={formData.description || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        rows="3"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2 font-medium">Image URL</label>
                      <input
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl || ''}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Optional: Add an image URL for your recipe
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium">Category *</label>
                        <select
                          name="categoryId"
                          value={formData.categoryId || ''}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          required
                        >
                          <option value="">Select Category</option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium">Servings *</label>
                        <input
                          type="number"
                          name="servings"
                          value={formData.servings || ''}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium">Prep Time (min) *</label>
                        <input
                          type="number"
                          name="prepTime"
                          value={formData.prepTime || ''}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium">Cook Time (min) *</label>
                        <input
                          type="number"
                          name="cookTime"
                          value={formData.cookTime || ''}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 font-semibold"
                  >
                    {editMode ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
