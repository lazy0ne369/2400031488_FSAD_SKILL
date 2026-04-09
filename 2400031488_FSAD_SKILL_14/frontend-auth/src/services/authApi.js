import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_URL || '/api'

const authApi = axios.create({
  baseURL: apiBaseUrl,
})

export const registerUser = async (userData) => {
  const response = await authApi.post('/register', userData)
  return response.data
}

export const loginUser = async (credentials) => {
  const response = await authApi.post('/login', credentials)
  return response.data
}

export const getUserProfile = async (username) => {
  const response = await authApi.get(`/profile/${username}`)
  return response.data
}
