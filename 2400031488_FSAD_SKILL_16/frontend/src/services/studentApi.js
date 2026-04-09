import axios from 'axios'

const studentApi = axios.create({
  baseURL: '/students',
})

export const getStudents = async () => {
  const response = await studentApi.get('/')
  return response.data
}

export const addStudent = async (student) => {
  const response = await studentApi.post('/', student)
  return response.data
}

export const updateStudent = async (id, student) => {
  const response = await studentApi.put(`/${id}`, student)
  return response.data
}

export const deleteStudent = async (id) => {
  await studentApi.delete(`/${id}`)
}
