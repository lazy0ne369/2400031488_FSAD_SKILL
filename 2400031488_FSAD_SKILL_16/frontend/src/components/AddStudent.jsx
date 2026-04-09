import { useEffect, useState } from 'react'

const initialForm = {
  name: '',
  email: '',
  course: '',
}

function AddStudent({ activeStudent, onSave, onCancel, isSaving }) {
  const [formData, setFormData] = useState(initialForm)

  useEffect(() => {
    if (activeStudent) {
      setFormData({
        name: activeStudent.name,
        email: activeStudent.email,
        course: activeStudent.course,
      })
      return
    }

    setFormData(initialForm)
  }, [activeStudent])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await onSave({
      name: formData.name.trim(),
      email: formData.email.trim(),
      course: formData.course.trim(),
    })

    if (!activeStudent) {
      setFormData(initialForm)
    }
  }

  return (
    <section className="panel form-panel">
      <div className="panel-heading">
        <p className="eyebrow">{activeStudent ? 'Update student' : 'Add student'}</p>
        <h2>{activeStudent ? 'Edit existing record' : 'Create a new record'}</h2>
        <p className="panel-copy">
          Capture the student&apos;s name, email, and course, then send the details to the
          Spring Boot API.
        </p>
      </div>

      <form className="student-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter student name"
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter student email"
            required
          />
        </label>

        <label>
          Course
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="Enter course name"
            required
          />
        </label>

        <div className="form-actions">
          <button type="submit" className="primary-btn" disabled={isSaving}>
            {isSaving ? 'Saving...' : activeStudent ? 'Update Student' : 'Add Student'}
          </button>
          {activeStudent ? (
            <button type="button" className="secondary-btn" onClick={onCancel}>
              Cancel Edit
            </button>
          ) : null}
        </div>
      </form>
    </section>
  )
}

export default AddStudent
