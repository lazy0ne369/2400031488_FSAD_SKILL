import axios from 'axios'
import { useEffect, useState } from 'react'

const emptyPostForm = {
  title: '',
  body: '',
  userId: '1',
}

function FakePostList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedUserId, setSelectedUserId] = useState('all')
  const [formData, setFormData] = useState(emptyPostForm)
  const [editingPostId, setEditingPostId] = useState(null)

  async function loadPosts(signal) {
    try {
      setLoading(true)
      setError('')

      const response = await axios.get('https://dummyjson.com/posts', {
        signal,
      })

      setPosts(response.data.posts ?? [])
      setEditingPostId(null)
      setFormData(emptyPostForm)
    } catch (err) {
      if (err.name !== 'CanceledError' && err.code !== 'ERR_CANCELED') {
        setError(err.message || 'Unable to load fake API posts.')
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    const controller = new AbortController()
    loadPosts(controller.signal)
    return () => controller.abort()
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

  function resetForm() {
    setFormData(emptyPostForm)
    setEditingPostId(null)
  }

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedTitle = formData.title.trim()
    const trimmedBody = formData.body.trim()
    const normalizedUserId = formData.userId.trim()

    if (!trimmedTitle || !trimmedBody || !normalizedUserId) {
      setError('Please fill in title, body, and user ID before saving.')
      return
    }

    setError('')

    if (editingPostId !== null) {
      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          post.id === editingPostId
            ? {
                ...post,
                title: trimmedTitle,
                body: trimmedBody,
                userId: Number(normalizedUserId),
              }
            : post,
        ),
      )
    } else {
      const nextId =
        posts.length > 0
          ? Math.max(...posts.map((post) => Number(post.id))) + 1
          : 1

      setPosts((currentPosts) => [
        {
          id: nextId,
          title: trimmedTitle,
          body: trimmedBody,
          userId: Number(normalizedUserId),
        },
        ...currentPosts,
      ])
    }

    resetForm()
  }

  function handleEdit(post) {
    setEditingPostId(post.id)
    setFormData({
      title: post.title,
      body: post.body,
      userId: String(post.userId),
    })
    setError('')
  }

  function handleDelete(postId) {
    setPosts((currentPosts) => currentPosts.filter((post) => post.id !== postId))

    if (editingPostId === postId) {
      resetForm()
    }
  }

  const filteredPosts =
    selectedUserId === 'all'
      ? posts
      : posts.filter((post) => String(post.userId) === selectedUserId)

  const userIds = [...new Set(posts.map((post) => post.userId))].sort(
    (firstId, secondId) => firstId - secondId,
  )

  return (
    <section className="content-card">
      <div className="crud-layout">
        <form className="form-card" onSubmit={handleSubmit}>
          <div className="panel-heading">
            <span className="eyebrow">CRUD</span>
            <h2>{editingPostId !== null ? 'Update Post' : 'Create Post'}</h2>
          </div>

          <div className="field-grid">
            <label className="form-field">
              <span>Title</span>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter post title"
              />
            </label>

            <label className="form-field field-span-full">
              <span>Body</span>
              <textarea
                name="body"
                value={formData.body}
                onChange={handleChange}
                placeholder="Enter post description"
                rows="4"
              />
            </label>

            <label className="form-field">
              <span>User ID</span>
              <input
                type="number"
                min="1"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                placeholder="Enter user id"
              />
            </label>
          </div>

          <div className="button-row">
            <button type="submit" className="action-button">
              {editingPostId !== null ? 'Update Post' : 'Create Post'}
            </button>
            <button
              type="button"
              className="action-button secondary"
              onClick={resetForm}
            >
              Clear Form
            </button>
          </div>

          <p className="support-text">
            Posts are fetched from DummyJSON and then updated locally so the app
            can demonstrate full CRUD behavior.
          </p>
        </form>
      </div>

      <div className="toolbar">
        <div>
          <h3>Posts from DummyJSON</h3>
          <p>Using axios with refresh, filtering, and in-memory CRUD actions.</p>
        </div>

        <div className="toolbar-actions">
          <label className="filter-control">
            <span>Filter by user ID</span>
            <select
              value={selectedUserId}
              onChange={(event) => setSelectedUserId(event.target.value)}
            >
              <option value="all">All users</option>
              {userIds.map((userId) => (
                <option key={userId} value={String(userId)}>
                  User {userId}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            className="action-button"
            onClick={() => loadPosts()}
          >
            Refresh
          </button>
        </div>
      </div>

      {loading && <div className="status-box">Loading posts...</div>}
      {error && !loading && <div className="status-box error">{error}</div>}

      {!loading && !error && (
        <>
          <div className="list-summary">
            <h3>Available posts</h3>
            <span>{filteredPosts.length} records shown</span>
          </div>

          <div className="post-grid">
            {filteredPosts.map((post) => (
              <article key={post.id} className="data-card post-card">
                <div className="post-meta">User ID: {post.userId}</div>
                <h4>{post.title}</h4>
                <p>{post.body}</p>
                <div className="card-actions">
                  <button
                    type="button"
                    className="action-button secondary"
                    onClick={() => handleEdit(post)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="action-button danger"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="empty-state">
              No posts match the selected user filter.
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default FakePostList
