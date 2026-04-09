function Profile({ profile, loading }) {
  return (
    <section className="card page-card">
      <h1>Profile</h1>
      {loading ? (
        <p className="page-text">Loading profile...</p>
      ) : profile ? (
        <div className="profile-grid">
          <div>
            <span className="field-label">Username</span>
            <p>{profile.username}</p>
          </div>
          <div>
            <span className="field-label">Backend status</span>
            <p>Loaded from the in-memory Spring service.</p>
          </div>
        </div>
      ) : (
        <p className="page-text">Profile data is unavailable.</p>
      )}
    </section>
  )
}

export default Profile
