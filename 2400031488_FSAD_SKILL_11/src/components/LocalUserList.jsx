import { useEffect, useState } from 'react'

const emptyUserForm = {
  name: '',
  email: '',
  phone: '',
}

function LocalUserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')
  const [formError, setFormError] = useState('')
  const [formData, setFormData] = useState(emptyUserForm)
  const [editingUserId, setEditingUserId] = useState(null)

  useEffect(() => {
    let ignore = false

    async function loadUsers() {
      try {
        setLoading(true)
        setFetchError('')

        const response = await fetch('/users.json')
        if (!response.ok) {
          throw new Error('Unable to load local user data.')
        }

        const data = await response.json()
        if (!ignore) {
          setUsers(data)
        }
      } catch (err) {
        if (!ignore) {
          setFetchError(
            err.message || 'Something went wrong while fetching users.',
          )
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadUsers()

    return () => {
      ignore = true
    }
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

  function resetForm() {
    setFormData(emptyUserForm)
    setEditingUserId(null)
  }

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedName = formData.name.trim()
    const trimmedEmail = formData.email.trim()
    const trimmedPhone = formData.phone.trim()

    if (!trimmedName || !trimmedEmail || !trimmedPhone) {
      setFormError('Please fill in name, email, and phone before saving.')
      return
    }

    setFormError('')

    if (editingUserId !== null) {
      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === editingUserId
            ? {
                ...user,
                name: trimmedName,
                email: trimmedEmail,
                phone: trimmedPhone,
              }
            : user,
        ),
      )
    } else {
      const nextId =
        users.length > 0
          ? Math.max(...users.map((user) => Number(user.id))) + 1
          : 1

      setUsers((currentUsers) => [
        ...currentUsers,
        {
          id: nextId,
          name: trimmedName,
          email: trimmedEmail,
          phone: trimmedPhone,
        },
      ])
    }

    resetForm()
  }

  function handleEdit(user) {
    setEditingUserId(user.id)
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
    })
    setFormError('')
  }

  function handleDelete(userId) {
    setUsers((currentUsers) => currentUsers.filter((user) => user.id !== userId))

    if (editingUserId === userId) {
      resetForm()
    }
  }

  if (loading) {
    return <div className="status-box">Loading local users...</div>
  }

  if (fetchError) {
    return (
      <section className="content-card">
        <div className="status-box error">{fetchError}</div>
      </section>
    )
  }

  return (
    <section className="content-card">
      <div className="crud-layout">
        <form className="form-card" onSubmit={handleSubmit}>
          <div className="panel-heading">
            <span className="eyebrow">CRUD</span>
            <h2>{editingUserId !== null ? 'Update User' : 'Add User'}</h2>
          </div>

          <div className="field-grid">
            <label className="form-field">
              <span>Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter user name"
              />
            </label>

            <label className="form-field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
              />
            </label>

            <label className="form-field">
              <span>Phone</span>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </label>
          </div>

          <div className="button-row">
            <button type="submit" className="action-button">
              {editingUserId !== null ? 'Update User' : 'Create User'}
            </button>
            <button
              type="button"
              className="action-button secondary"
              onClick={resetForm}
            >
              Clear Form
            </button>
          </div>

          <p className="support-text">
            Users are first fetched from local JSON and then managed inside React
            state for CRUD practice.
          </p>

          {formError && <div className="status-box error">{formError}</div>}
        </form>
      </div>

      <div className="list-summary">
        <h3>Users from local JSON</h3>
        <span>{users.length} records</span>
      </div>

      <div className="user-grid">
        {users.map((user) => (
          <article key={user.id} className="data-card">
            <h4>{user.name}</h4>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <div className="card-actions">
              <button
                type="button"
                className="action-button secondary"
                onClick={() => handleEdit(user)}
              >
                Edit
              </button>
              <button
                type="button"
                className="action-button danger"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default LocalUserList
