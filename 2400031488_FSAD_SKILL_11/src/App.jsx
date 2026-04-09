import { useEffect, useState } from 'react'
import Dashboard from './components/Dashboard'
import FakePostList from './components/FakePostList'
import LocalUserList from './components/LocalUserList'
import UserList from './components/UserList'
import './App.css'

const routes = {
  home: {
    eyebrow: 'Skill 11',
    title: 'React API Integration Dashboard',
    description:
      'Explore how React components fetch local JSON data, public API users, and fake API posts using useState, useEffect, fetch(), axios, and CRUD state updates.',
  },
  'local-users': {
    eyebrow: 'Part A',
    title: 'Local Users',
    description: 'Data loaded from /users.json with the Fetch API and managed with CRUD actions.',
  },
  'users-api': {
    eyebrow: 'Part B',
    title: 'Users API',
    description:
      'Live user records from JSONPlaceholder using fetch(), presented with Indian user personas.',
  },
  'fake-posts': {
    eyebrow: 'Part C',
    title: 'Fake API Posts',
    description: 'DummyJSON posts loaded with axios, filtered by user ID, and editable in the UI.',
  },
}

function getRouteFromHash() {
  const hash = window.location.hash.replace('#', '')
  return routes[hash] ? hash : 'home'
}

function HomePanel() {
  return (
    <section className="content-card">
      <div className="panel-heading">
        <span className="eyebrow">Overview</span>
        <h2>What this app demonstrates</h2>
      </div>

      <div className="overview-grid">
        <article className="info-card">
          <h3>Local JSON</h3>
          <p>
            Load student-style records from the public folder and render loading
            and error states before the data arrives, then practice CRUD in
            component state.
          </p>
        </article>

        <article className="info-card">
          <h3>Public API</h3>
          <p>
            Call JSONPlaceholder with <code>fetch()</code> and display user
            details such as name, email, and phone.
          </p>
        </article>

        <article className="info-card">
          <h3>Axios + Filter</h3>
          <p>
            Retrieve post data with <code>axios</code>, refresh it on demand,
            filter the results by <code>userId</code>, and manage local CRUD
            actions.
          </p>
        </article>
      </div>
    </section>
  )
}

function App() {
  const [currentRoute, setCurrentRoute] = useState(() => getRouteFromHash())

  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = 'home'
    }

    const handleHashChange = () => {
      setCurrentRoute(getRouteFromHash())
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const currentView = routes[currentRoute]

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <p className="hero-tag">2400031488_FSAD_SKILL_11</p>
        <h1>News Portal Data Center</h1>
        <p className="hero-copy">
          A single dashboard for comparing local data, public API data, and fake
          API content inside one React application.
        </p>
      </section>

      <Dashboard currentRoute={currentRoute} />

      <section className="workspace-panel">
        <header className="workspace-header">
          <span className="eyebrow">{currentView.eyebrow}</span>
          <h2>{currentView.title}</h2>
          <p>{currentView.description}</p>
        </header>

        {currentRoute === 'home' && <HomePanel />}
        {currentRoute === 'local-users' && <LocalUserList />}
        {currentRoute === 'users-api' && <UserList />}
        {currentRoute === 'fake-posts' && <FakePostList />}
      </section>
    </main>
  )
}

export default App
