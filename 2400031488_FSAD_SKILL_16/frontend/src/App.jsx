import { useEffect, useState } from 'react'
import AddStudent from './components/AddStudent'
import StudentList from './components/StudentList'
import {
  addStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from './services/studentApi'
import './App.css'

function App() {
  const [students, setStudents] = useState([])
  const [activeStudent, setActiveStudent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [error, setError] = useState('')

  const fetchStudents = async () => {
    try {
      setIsLoading(true)
      const studentList = await getStudents()
      setStudents(Array.isArray(studentList) ? studentList : [])
      setError('')
    } catch {
      setError('Unable to load students. Make sure the backend is running on port 8080.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const handleSaveStudent = async (formData) => {
    try {
      setIsSaving(true)

      if (activeStudent) {
        await updateStudent(activeStudent.id, formData)
      } else {
        await addStudent(formData)
      }

      setActiveStudent(null)
      setError('')
      await fetchStudents()
    } catch {
      setError('Unable to save the student record. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteStudent = async (id) => {
    try {
      setDeletingId(id)
      await deleteStudent(id)

      if (activeStudent?.id === id) {
        setActiveStudent(null)
      }

      setError('')
      await fetchStudents()
    } catch {
      setError('Unable to delete the student record. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

  const handleEditStudent = (student) => {
    setActiveStudent(student)
    setError('')
  }

  const handleCancelEdit = () => {
    setActiveStudent(null)
  }

  const totalStudents = students.length

  return (
    <main className="app-shell">
      <section className="hero-banner">
        <div>
          <p className="eyebrow">Skill 16 - Swagger + CRUD</p>
          <h1>Student Management System with API Documentation</h1>
          <p className="hero-copy">
            React handles the user interface while Spring Boot powers the REST API for
            adding, viewing, retrieving, updating, and deleting student records. Swagger
            UI documents every endpoint, schema, and validation response.
          </p>
          <div className="hero-actions">
            <a
              className="docs-link primary-btn"
              href="http://localhost:8080/swagger-ui.html"
              target="_blank"
              rel="noreferrer"
            >
              Open Swagger UI
            </a>
          </div>
        </div>

        <div className="stats-grid">
          <article className="stat-card">
            <span>Total Students</span>
            <strong>{totalStudents}</strong>
          </article>
          <article className="stat-card">
            <span>Backend API</span>
            <strong>Spring Boot</strong>
          </article>
          <article className="stat-card">
            <span>Documentation</span>
            <strong>Swagger UI</strong>
          </article>
        </div>
      </section>

      {error ? <p className="status-banner error-banner">{error}</p> : null}
      <p className="status-banner docs-banner">
        Swagger URL: <code>http://localhost:8080/swagger-ui.html</code>
      </p>

      <section className="content-grid">
        <AddStudent
          activeStudent={activeStudent}
          onSave={handleSaveStudent}
          onCancel={handleCancelEdit}
          isSaving={isSaving}
        />
        <StudentList
          students={students}
          isLoading={isLoading}
          onEdit={handleEditStudent}
          onDelete={handleDeleteStudent}
          deletingId={deletingId}
        />
      </section>
    </main>
  )
}

export default App
