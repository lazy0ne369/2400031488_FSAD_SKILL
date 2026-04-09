import { useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('No backend response yet.')
  const [status, setStatus] = useState('Tap the button to call the Spring Boot API.')
  const [isLoading, setIsLoading] = useState(false)

  const handleBackendCheck = async () => {
    try {
      setIsLoading(true)
      setStatus('Contacting /api/test on the backend...')

      const response = await fetch('/api/test')
      const data = await response.text()

      if (!response.ok) {
        throw new Error(data || `Request failed with status ${response.status}`)
      }

      setMessage(data)
      setStatus('Connection successful. The frontend and backend are talking correctly.')
    } catch (error) {
      setMessage('Connection failed')
      setStatus(error.message || 'Unable to reach the backend. Make sure it is running on port 8080.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Skill 13</p>
          <h1>Frontend and Backend Integration Check</h1>
          <p className="hero-copy">
            This React frontend now matches the Spring Boot backend, which exposes a single
            test endpoint at <code>/api/test</code>.
          </p>
        </div>

        <div className="highlight-card">
          <span>Backend endpoint</span>
          <strong>GET /api/test</strong>
          <p>Expected response: Backend working</p>
        </div>
      </section>

      <section className="content-grid">
        <article className="panel action-panel">
          <h2>Run the API test</h2>
          <p className="panel-copy">
            Start the Spring Boot app, then use this button to confirm the frontend can fetch
            the backend message.
          </p>

          <button type="button" className="primary-btn" onClick={handleBackendCheck} disabled={isLoading}>
            {isLoading ? 'Checking...' : 'Check Backend'}
          </button>

          <p className="status-copy">{status}</p>
        </article>

        <article className="panel result-panel">
          <h2>Backend response</h2>
          <div className="response-box">
            <span>Response body</span>
            <strong>{message}</strong>
          </div>
        </article>
      </section>
    </main>
  )
}

export default App
