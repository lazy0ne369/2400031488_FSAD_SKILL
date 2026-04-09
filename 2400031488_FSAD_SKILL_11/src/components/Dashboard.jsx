const navItems = [
  {
    id: 'home',
    label: 'Home',
    helper: 'Project overview',
  },
  {
    id: 'local-users',
    label: 'Local Users',
    helper: 'Fetch local JSON',
  },
  {
    id: 'users-api',
    label: 'Users API',
    helper: 'Fetch JSONPlaceholder',
  },
  {
    id: 'fake-posts',
    label: 'Fake API Posts',
    helper: 'Axios + filter',
  },
]

function Dashboard({ currentRoute }) {
  return (
    <nav className="dashboard-nav" aria-label="Dashboard navigation">
      {navItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`nav-link ${currentRoute === item.id ? 'active' : ''}`}
        >
          <span>{item.label}</span>
          <small>{item.helper}</small>
        </a>
      ))}
    </nav>
  )
}

export default Dashboard
