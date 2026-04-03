import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [about, setAbout] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch(`${API}/todos`).then(r => r.json()),
      fetch(`${API}/about`).then(r => r.json()),
    ]).then(([todosData, aboutData]) => {
      setTodos(todosData)
      setAbout(aboutData)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const addTodo = async () => {
    if (!input.trim()) return
    const res = await fetch(`${API}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: input })
    })
    const newTodo = await res.json()
    setTodos([newTodo, ...todos])
    setInput('')
  }

  const toggleTodo = async (id) => {
    const res = await fetch(`${API}/todos/${id}`, { method: 'PUT' })
    const updated = await res.json()
    setTodos(todos.map(t => t.id === id ? updated : t))
  }

  const deleteTodo = async (id) => {
    await fetch(`${API}/todos/${id}`, { method: 'DELETE' })
    setTodos(todos.filter(t => t.id !== id))
  }

  const styles = {
    container: {
      maxWidth: 620,
      margin: '40px auto',
      fontFamily: "'Segoe UI', sans-serif",
      padding: '0 20px',
      color: '#1a1a2e',
    },
    header: {
      textAlign: 'center',
      marginBottom: 28,
    },
    title: {
      fontSize: 28,
      fontWeight: 700,
      color: '#3b4fd8',
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 14,
      color: '#888',
    },
    infoCard: {
      background: 'linear-gradient(135deg, #667eea22, #764ba222)',
      border: '1px solid #667eea44',
      borderRadius: 12,
      padding: '14px 18px',
      marginBottom: 24,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    },
    avatar: {
      width: 42,
      height: 42,
      borderRadius: '50%',
      background: '#4f6ef7',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontSize: 20,
      flexShrink: 0,
    },
    infoText: {
      fontSize: 14,
      lineHeight: 1.6,
    },
    inputRow: {
      display: 'flex',
      gap: 8,
      marginBottom: 20,
    },
    input: {
      flex: 1,
      padding: '11px 16px',
      borderRadius: 10,
      border: '1.5px solid #dde',
      fontSize: 15,
      outline: 'none',
      transition: 'border-color 0.2s',
    },
    btn: {
      padding: '11px 22px',
      background: '#4f6ef7',
      color: '#fff',
      border: 'none',
      borderRadius: 10,
      cursor: 'pointer',
      fontSize: 15,
      fontWeight: 600,
    },
    todoItem: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '13px 16px',
      background: '#fff',
      borderRadius: 10,
      border: '1px solid #eef',
      marginBottom: 8,
      boxShadow: '0 1px 4px #0001',
      transition: 'transform 0.1s',
    },
    checkbox: {
      width: 18,
      height: 18,
      cursor: 'pointer',
      accentColor: '#4f6ef7',
    },
    todoText: (done) => ({
      flex: 1,
      fontSize: 15,
      textDecoration: done ? 'line-through' : 'none',
      color: done ? '#aaa' : '#222',
    }),
    deleteBtn: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: 18,
      color: '#e55',
      lineHeight: 1,
    },
    empty: {
      textAlign: 'center',
      color: '#bbb',
      padding: '32px 0',
      fontSize: 15,
    },
    count: {
      fontSize: 13,
      color: '#888',
      marginBottom: 10,
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.title}>📝 Todo App</div>
        <div style={styles.subtitle}>DevOps Project - 22CT4</div>
      </div>

      {about && (
        <div style={styles.infoCard}>
          <div style={styles.avatar}>👤</div>
          <div style={styles.infoText}>
            <strong>{about.name}</strong><br />
            MSSV: {about.student_id} &nbsp;|&nbsp; Lớp: {about.class}
          </div>
        </div>
      )}

      <div style={styles.inputRow}>
        <input
          style={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="Nhập công việc cần làm..."
        />
        <button style={styles.btn} onClick={addTodo}>Thêm</button>
      </div>

      {!loading && (
        <div style={styles.count}>
          {todos.filter(t => !t.done).length} việc chưa xong · {todos.filter(t => t.done).length} đã hoàn thành
        </div>
      )}

      {loading ? (
        <div style={styles.empty}>Đang tải...</div>
      ) : todos.length === 0 ? (
        <div style={styles.empty}>Chưa có công việc nào 🎉</div>
      ) : (
        todos.map(todo => (
          <div key={todo.id} style={styles.todoItem}>
            <input
              type="checkbox"
              style={styles.checkbox}
              checked={!!todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={styles.todoText(todo.done)}>{todo.title}</span>
            <button style={styles.deleteBtn} onClick={() => deleteTodo(todo.id)}>✕</button>
          </div>
        ))
      )}
    </div>
  )
}
