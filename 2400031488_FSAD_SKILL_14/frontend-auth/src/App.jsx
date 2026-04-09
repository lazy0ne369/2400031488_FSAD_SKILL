import { useEffect, useState } from 'react'
import Home from './components/Home'
import Login from './components/Login'
import Navigation from './components/Navigation'
import Profile from './components/Profile'
import Register from './components/Register'
import { getUserProfile, loginUser, registerUser } from './services/authApi'
import './App.css'

const getErrorMessage = (error, fallbackMessage) => {
  const responseData = error.response?.data

  if (typeof responseData === 'string' && responseData.trim()) {
    return responseData
  }

  if (responseData?.message) {
    return responseData.message
  }

  return fallbackMessage
}

function App() {
  const [currentView, setCurrentView] = useState('login')
  const [storedUsername, setStoredUsername] = useState(
    () => sessionStorage.getItem('loggedInUser') || ''
  )
  const [profile, setProfile] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [profileLoading, setProfileLoading] = useState(false)

  useEffect(() => {
    const username = sessionStorage.getItem('loggedInUser')

    if (username) {
      setStoredUsername(username)
      setCurrentView('home')
      return
    }

    setCurrentView('login')
  }, [])

  useEffect(() => {
    if (!storedUsername || currentView !== 'profile') {
      return
    }

    const loadProfile = async () => {
      try {
        setProfileLoading(true)
        const profileData = await getUserProfile(storedUsername)
        if (profileData?.username) {
          setProfile(profileData)
          setMessage('')
          return
        }

        setProfile(null)
        setMessage('Profile data is unavailable for this user.')
      } catch {
        setProfile(null)
        setMessage('Unable to load profile details.')
      } finally {
        setProfileLoading(false)
      }
    }

    loadProfile()
  }, [currentView, storedUsername])

  const handleRegister = async (formData) => {
    try {
      setLoading(true)
      const responseMessage = await registerUser(formData)
      setMessage(responseMessage || 'Registration successful. Please login.')
      setCurrentView('login')
      return true
    } catch (error) {
      setMessage(getErrorMessage(error, 'Registration failed.'))
      return false
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (formData) => {
    try {
      setLoading(true)
      const user = await loginUser(formData)
      if (!user?.username) {
        setMessage('Invalid username or password.')
        return false
      }

      sessionStorage.setItem('loggedInUser', user.username)
      setStoredUsername(user.username)
      setProfile(user)
      setCurrentView('home')
      setMessage('')
      return true
    } catch (error) {
      setMessage(getErrorMessage(error, 'Login failed.'))
      return false
    } finally {
      setLoading(false)
    }
  }

  const handleNavigate = (view) => {
    const username = sessionStorage.getItem('loggedInUser')

    if (!username) {
      setStoredUsername('')
      setCurrentView('login')
      setMessage('Please login first.')
      return
    }

    setCurrentView(view)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('loggedInUser')
    setStoredUsername('')
    setProfile(null)
    setCurrentView('login')
    setMessage('You have been logged out.')
  }

  const renderGuestView = () => {
    if (currentView === 'register') {
      return (
        <Register
          onRegister={handleRegister}
          onShowLogin={() => {
            setCurrentView('login')
            setMessage('')
          }}
          loading={loading}
        />
      )
    }

    return (
      <Login
        onLogin={handleLogin}
        onShowRegister={() => {
          setCurrentView('register')
          setMessage('')
        }}
        loading={loading}
      />
    )
  }

  const renderProtectedView = () => {
    if (currentView === 'profile') {
      return <Profile profile={profile} loading={profileLoading} />
    }

    return <Home username={storedUsername} />
  }

  return (
    <main className="app-shell">
      <section className="hero-strip">
        <h2>Skill 14</h2>
        <p>Minimal user authentication and session management with React and Spring Boot.</p>
      </section>

      {message ? <p className="message-banner">{message}</p> : null}

      {storedUsername ? (
        <>
          <Navigation
            currentView={currentView}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            username={storedUsername}
          />
          {renderProtectedView()}
        </>
      ) : (
        renderGuestView()
      )}
    </main>
  )
}

export default App
