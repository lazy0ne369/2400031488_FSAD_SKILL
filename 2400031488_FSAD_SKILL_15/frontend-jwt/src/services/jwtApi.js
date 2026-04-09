import axios from 'axios'

const authApi = axios.create()

const authorizedConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

export const loginUser = async (credentials) => {
  const response = await authApi.post('/login', credentials)
  return response.data
}

export const getEmployeeProfile = async (token) => {
  const response = await authApi.get('/employee/profile', authorizedConfig(token))
  return response.data
}

export const runAdminAdd = async (token) => {
  const response = await authApi.get('/admin/add', authorizedConfig(token))
  return response.data
}

export const runAdminDelete = async (token) => {
  const response = await authApi.get('/admin/delete', authorizedConfig(token))
  return response.data
}
