import { useState } from 'react'

const initialForm = {
  username: '',
  password: '',
}

function Register({ onRegister, onShowLogin, loading }) {
  const [formData, setFormData] = useState(initialForm)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const created = await onRegister(formData)

    if (created) {
      setFormData(initialForm)
    }
  }

  return (
    <section className="card auth-card">
      <h1>Create account</h1>
      <p className="subtle-text">Register with the username and password fields supported by the backend.</p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? 'Creating...' : 'Register'}
        </button>
      </form>

      <button type="button" className="text-btn" onClick={onShowLogin}>
        Already have an account? Login
      </button>
    </section>
  )
}

export default Register
