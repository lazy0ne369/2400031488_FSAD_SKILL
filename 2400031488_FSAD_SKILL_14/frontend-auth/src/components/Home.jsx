function Home({ username }) {
  return (
    <section className="card page-card">
      <h1>Home</h1>
      <p className="page-text">
        Welcome, {username}. You are logged in and using the Spring Boot in-memory auth demo.
      </p>
    </section>
  )
}

export default Home
