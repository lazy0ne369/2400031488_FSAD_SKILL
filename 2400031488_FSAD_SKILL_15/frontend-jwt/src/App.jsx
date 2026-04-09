import { useEffect, useState } from 'react'
import './App.css'
import {
  getEmployeeProfile,
  loginUser,
  runAdminAdd,
  runAdminDelete,
} from './services/jwtApi'

const initialCredentials = {
  username: '',
  password: '',
}

const decodeJwt = (token) => {
  try {
    const [, payload] = token.split('.')
    if (!payload) {
      return null
    }

    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/')
    const decoded = window.atob(normalized)
    return JSON.parse(decoded)
  } catch {
    return null
  }
}

function App() {
  const [credentials, setCredentials] = useState(initialCredentials)
  const [token, setToken] = useState(() => sessionStorage.getItem('skill15Token') || '')
  const [username, setUsername] = useState(() => sessionStorage.getItem('skill15User') || '')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('Use a user already stored in the jwt_db.users table.')
  const [statusKind, setStatusKind] = useState('info')
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [isRunningAction, setIsRunningAction] = useState(false)
  const [result, setResult] = useState('')

  useEffect(() => {
    if (!token) {
      setRole('')
      return
    }

    const payload = decodeJwt(token)
    setRole(payload?.role || '')
  }, [token])

  const handleChange = (event) => {
    const { name, value } = event.target
    setCredentials((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const setFeedback = (message, kind = 'info') => {
    setStatus(message)
    setStatusKind(kind)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      setIsLoggingIn(true)
      const nextToken = await loginUser({
        username: credentials.username.trim(),
        password: credentials.password,
      })

      if (!nextToken) {
        setFeedback('Login failed. Check the username, password, and backend data.', 'error')
        return
      }

      const trimmedUsername = credentials.username.trim()
      setToken(nextToken)
      setUsername(trimmedUsername)
      setResult('')
      sessionStorage.setItem('skill15Token', nextToken)
      sessionStorage.setItem('skill15User', trimmedUsername)
      setCredentials(initialCredentials)
      setFeedback('JWT received. You can now test the protected endpoints.')
    } catch (error) {
      setFeedback(
        error.response?.data?.message || 'Login failed. Make sure the backend is running and the user exists.',
        'error'
      )
    } finally {
      setIsLoggingIn(false)
    }
  }

  const runProtectedAction = async (action) => {
    try {
      setIsRunningAction(true)
      const responseText = await action(token)
      setResult(responseText)
      setFeedback('Protected endpoint executed successfully.')
    } catch (error) {
      setResult('')
      setFeedback(
        error.response?.data?.message ||
          `Request failed with status ${error.response?.status || 'unknown'}.`,
        'error'
      )
    } finally {
      setIsRunningAction(false)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('skill15Token')
    sessionStorage.removeItem('skill15User')
    setToken('')
    setUsername('')
    setRole('')
    setResult('')
    setFeedback('Session cleared. Log in again to create a new JWT.')
  }

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div>
          <span className="eyebrow">Skill 15</span>
          <h1>JWT Role-Based Access Tester</h1>
          <p className="hero-copy">
            This frontend matches the existing backend exactly: it logs in through /login,
            stores the JWT locally, and uses that token to call the protected employee and
            admin endpoints.
          </p>
        </div>

        <div className="hero-stats">
          <article className="stat-card">
            <span>Login Endpoint</span>
            <strong>/login</strong>
          </article>
          <article className="stat-card">
            <span>Protected Routes</span>
            <strong>/employee/* and /admin/*</strong>
          </article>
          <article className="stat-card">
            <span>Detected Role</span>
            <strong>{role || 'Not logged in'}</strong>
          </article>
        </div>
      </section>

      {status ? (
        <p className={statusKind === 'error' ? 'status-banner error' : 'status-banner'}>
          {status}
        </p>
      ) : null}

      <section className="content-grid">
        <section className="panel">
          <h2>Login</h2>
          <p className="panel-copy">
            Enter credentials for a user already stored in the backend database. The backend
            returns only a JWT token, so this screen focuses on token-based access checks.
          </p>

          <form className="login-form" onSubmit={handleLogin}>
            <label>
              Username
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </label>

            <div className="button-row">
              <button type="submit" className="primary-btn" disabled={isLoggingIn}>
                {isLoggingIn ? 'Signing in...' : 'Get JWT Token'}
              </button>
              <button
                type="button"
                className="secondary-btn"
                onClick={handleLogout}
                disabled={!token}
              >
                Clear Session
              </button>
            </div>
          </form>

          <div className="note-box">
            <p>
              The backend does not expose registration. Add users directly to jwt_db.users with
              a BCrypt-hashed password and a role such as ADMIN or EMPLOYEE.
            </p>
          </div>
        </section>

        <section className="panel">
          <h2>Access Checks</h2>
          <p className="panel-copy">
            Use the stored JWT to test whichever endpoints your role is allowed to access.
          </p>

          <div className="meta-grid">
            <div>
              <span>Active User</span>
              <p>{username || 'No active session'}</p>
            </div>
            <div>
              <span>Role Claim</span>
              <p>{role || 'Unknown until login'}</p>
            </div>
          </div>

          <div className="action-grid">
            <button
              type="button"
              className="secondary-btn"
              onClick={() => runProtectedAction(getEmployeeProfile)}
              disabled={!token || isRunningAction}
            >
              Employee Profile
            </button>
            <button
              type="button"
              className="primary-btn"
              onClick={() => runProtectedAction(runAdminAdd)}
              disabled={!token || isRunningAction}
            >
              Admin Add
            </button>
            <button
              type="button"
              className="danger-btn"
              onClick={() => runProtectedAction(runAdminDelete)}
              disabled={!token || isRunningAction}
            >
              Admin Delete
            </button>
          </div>

          {result ? (
            <div className="result-card">
              <span>Backend Response</span>
              <p>{result}</p>
            </div>
          ) : (
            <div className="result-card">
              <span>Backend Response</span>
              <p className="placeholder-copy">
                Run one of the protected actions after logging in to see the backend reply.
              </p>
            </div>
          )}

          {token ? (
            <div className="token-box">
              <span>JWT Preview</span>
              <code>{token}</code>
            </div>
          ) : null}
        </section>
      </section>
    </main>
  )
}

export default App
