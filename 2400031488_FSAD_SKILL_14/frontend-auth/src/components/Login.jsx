import { useState } from 'react'

const initialForm = {
  username: '',
  password: '',
}

function Login({ onLogin, onShowRegister, loading }) {
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
    const success = await onLogin(formData)

    if (success) {
      setFormData(initialForm)
    }
  }

  return (
    <section className="card auth-card">
      <h1>Login</h1>
      <p className="subtle-text">Use your registered username and password to continue.</p>

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
          {loading ? 'Checking...' : 'Login'}
        </button>
      </form>

      <button type="button" className="text-btn" onClick={onShowRegister}>
        Need an account? Register
      </button>
    </section>
  )
}

export default Login
