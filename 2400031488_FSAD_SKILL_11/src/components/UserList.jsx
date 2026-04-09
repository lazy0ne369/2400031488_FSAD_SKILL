import { useEffect, useState } from 'react'

const indianNames = [
  'Aarav Sharma',
  'Diya Nair',
  'Vivaan Reddy',
  'Ananya Kapoor',
  'Arjun Verma',
  'Sneha Iyer',
  'Rohan Malhotra',
  'Kavya Menon',
  'Aditya Kulkarni',
  'Meera Patel',
]

function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadUsers() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users',
          { signal: controller.signal },
        )

        if (!response.ok) {
          throw new Error('Unable to fetch the API users right now.')
        }

        const data = await response.json()
        const localizedUsers = data.map((user, index) => ({
          ...user,
          name: indianNames[index] ?? user.name,
        }))

        setUsers(localizedUsers)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Something went wrong while loading users.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadUsers()

    return () => controller.abort()
  }, [])

  if (loading) {
    return <div className="status-box">Loading API users...</div>
  }

  if (error) {
    return <div className="status-box error">{error}</div>
  }

  return (
    <section className="content-card">
      <div className="list-summary">
        <h3>Users from JSONPlaceholder</h3>
        <span>{users.length} Indian user personas</span>
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
          </article>
        ))}
      </div>
    </section>
  )
}

export default UserList
