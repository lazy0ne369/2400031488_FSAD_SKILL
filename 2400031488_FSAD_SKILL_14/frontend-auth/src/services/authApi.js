import axios from 'axios'

const authApi = axios.create({
  baseURL: '/api',
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
