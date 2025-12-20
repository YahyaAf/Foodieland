import axiosInstance from './axiosInstance'
import { toast } from 'react-toastify'

export const categoryService = {
  getAllCategories: async () => {
    try {
      const response = await axiosInstance.get('/categories')
      return response.data
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch categories'
      toast.error(errorMessage)
      throw error
    }
  },

  getCategoryById: async (id) => {
    try {
      const response = await axiosInstance.get(`/categories/${id}`)
      return response.data
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch category'
      toast.error(errorMessage)
      throw error
    }
  },

  createCategory: async (categoryData) => {
    try {
      const response = await axiosInstance.post('/categories', categoryData)
      toast.success('Category created successfully!')
      return response.data
    } catch (error) {
      if (error.response?.data) {
        const errorData = error.response.data
        
        if (errorData.message) {
          toast.error(errorData.message)
        } else if (errorData.errors) {
          Object.values(errorData.errors).forEach(err => toast.error(err))
        } else {
          toast.error('Failed to create category')
        }
      } else {
        toast.error('Network error. Please try again.')
      }
      throw error
    }
  },

  updateCategory: async (id, categoryData) => {
    try {
      const response = await axiosInstance.put(`/categories/${id}`, categoryData)
      toast.success('Category updated successfully!')
      return response.data
    } catch (error) {
      if (error.response?.data) {
        const errorData = error.response.data
        
        if (errorData.message) {
          toast.error(errorData.message)
        } else if (errorData.errors) {
          Object.values(errorData.errors).forEach(err => toast.error(err))
        } else {
          toast.error('Failed to update category')
        }
      } else {
        toast.error('Network error. Please try again.')
      }
      throw error
    }
  },

  deleteCategory: async (id) => {
    try {
      const response = await axiosInstance.delete(`/categories/${id}`)
      toast.success('Category deleted successfully!')
      return response.data
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete category'
      toast.error(errorMessage)
      throw error
    }
  },
}