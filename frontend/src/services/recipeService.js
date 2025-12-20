import axiosInstance from './axiosInstance'
import { toast } from 'react-toastify'

export const recipeService = {
  getAllRecipes: async (filters = {}) => {
    try {
      const params = new URLSearchParams()
      
      if (filters.search) params.append('search', filters.search)
      if (filters.categoryId) params.append('categoryId', filters.categoryId)
      if (filters.authorId) params.append('authorId', filters.authorId)
      
      const queryString = params.toString()
      const url = queryString ? `/recipes?${queryString}` : '/recipes'
      
      const response = await axiosInstance.get(url)
      return response.data
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch recipes'
      toast.error(errorMessage)
      throw error
    }
  },

  getRecipeById:  async (id) => {
    try {
      const response = await axiosInstance.get(`/recipes/${id}`)
      return response.data
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch recipe'
      toast.error(errorMessage)
      throw error
    }
  },

  createRecipe: async (recipeData) => {
    try {
      const response = await axiosInstance.post('/recipes', recipeData)
      toast.success('Recipe created successfully!')
      return response.data
    } catch (error) {
      if (error.response?.data) {
        const errorData = error.response.data
        
        if (errorData.message) {
          toast.error(errorData.message)
        } else if (errorData.errors) {
          Object.values(errorData.errors).forEach(err => toast.error(err))
        } else {
          toast.error('Failed to create recipe')
        }
      } else {
        toast.error('Network error. Please try again.')
      }
      throw error
    }
  },

  updateRecipe: async (id, recipeData) => {
    try {
      const response = await axiosInstance.put(`/recipes/${id}`, recipeData)
      toast.success('Recipe updated successfully!')
      return response.data
    } catch (error) {
      if (error.response?.data) {
        const errorData = error.response.data
        
        if (errorData.message) {
          toast.error(errorData.message)
        } else if (errorData.errors) {
          Object.values(errorData.errors).forEach(err => toast.error(err))
        } else {
          toast.error('Failed to update recipe')
        }
      } else {
        toast.error('Network error. Please try again.')
      }
      throw error
    }
  },

  deleteRecipe: async (id) => {
    try {
      await axiosInstance.delete(`/recipes/${id}`)
      toast.success('Recipe deleted successfully!')
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete recipe'
      toast.error(errorMessage)
      throw error
    }
  },

  searchRecipes: async (searchTerm) => {
    try {
      const response = await axiosInstance.get(`/recipes?search=${searchTerm}`)
      return response.data
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Search failed'
      toast.error(errorMessage)
      throw error
    }
  },

  filterByCategory: async (categoryId) => {
    try {
      const response = await axiosInstance.get(`/recipes?categoryId=${categoryId}`)
      return response.data
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to filter recipes'
      toast.error(errorMessage)
      throw error
    }
  },

  filterByAuthor: async (authorId) => {
    try {
      const response = await axiosInstance.get(`/recipes?authorId=${authorId}`)
      return response.data
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to filter recipes'
      toast.error(errorMessage)
      throw error
    }
  },
}