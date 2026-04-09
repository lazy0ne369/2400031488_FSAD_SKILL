function StudentList({ students, isLoading, onEdit, onDelete, deletingId }) {
  return (
    <section className="panel list-panel">
      <div className="panel-heading">
        <p className="eyebrow">Student list</p>
        <h2>All student records</h2>
        <p className="panel-copy">
          The table refreshes after every add, update, and delete without reloading the page.
        </p>
      </div>

      <div className="table-shell">
        <table className="student-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="table-feedback">
                  Loading students...
                </td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan="5" className="table-feedback">
                  No students found. Add the first record using the form.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.course}</td>
                  <td>
                    <div className="row-actions">
                      <button
                        type="button"
                        className="secondary-btn small-btn"
                        onClick={() => onEdit(student)}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="danger-btn small-btn"
                        onClick={() => onDelete(student.id)}
                        disabled={deletingId === student.id}
                      >
                        {deletingId === student.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default StudentList
