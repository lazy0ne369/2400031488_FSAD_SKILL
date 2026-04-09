function Navigation({ currentView, onNavigate, onLogout, username }) {
  return (
    <nav className="nav-bar">
      <div className="brand-block">
        <span className="brand-title">Auth App</span>
        <span className="brand-subtitle">{username}</span>
      </div>

      <div className="nav-actions">
        <button
          type="button"
          className={currentView === 'home' ? 'nav-link active' : 'nav-link'}
          onClick={() => onNavigate('home')}
        >
          Home
        </button>
        <button
          type="button"
          className={currentView === 'profile' ? 'nav-link active' : 'nav-link'}
          onClick={() => onNavigate('profile')}
        >
          Profile
        </button>
        <button type="button" className="nav-link logout-link" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navigation
