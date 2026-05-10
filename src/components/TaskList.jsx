import { useState } from 'react'

const INITIAL_TASKS = [
  { id: 1, text: 'Изучить React хуки', done: false },
  { id: 2, text: 'Настроить Vite проект', done: true },
  { id: 3, text: 'Создать первый компонент', done: true },
]

export default function TaskList() {
  const [tasks, setTasks] = useState(INITIAL_TASKS)
  const [input, setInput] = useState('')

  const addTask = () => {
    const text = input.trim()
    if (!text) return
    setTasks(prev => [...prev, { id: Date.now(), text, done: false }])
    setInput('')
  }

  const toggleTask = (id) =>
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    )

  const deleteTask = (id) =>
    setTasks(prev => prev.filter(t => t.id !== id))

  const done = tasks.filter(t => t.done).length

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Список задач</h2>
      <p style={styles.progress}>
        Выполнено: {done} / {tasks.length}
      </p>

      <div style={styles.inputRow}>
        <input
          style={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
          placeholder="Новая задача..."
        />
        <button style={styles.addBtn} onClick={addTask}>
          Добавить
        </button>
      </div>

      <ul style={styles.list}>
        {tasks.length === 0 && (
          <li style={styles.empty}>Нет задач. Добавьте первую!</li>
        )}
        {tasks.map(task => (
          <li key={task.id} style={styles.item}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
              style={styles.checkbox}
            />
            <span style={{ ...styles.text, ...(task.done ? styles.done : {}) }}>
              {task.text}
            </span>
            <button
              style={styles.deleteBtn}
              onClick={() => deleteTask(task.id)}
              aria-label="Удалить"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

const styles = {
  container: {
    background: '#1a1a2e',
    border: '1px solid #333',
    borderRadius: '12px',
    padding: '24px',
    maxWidth: '480px',
    margin: '32px auto',
    fontFamily: 'inherit',
  },
  title: {
    margin: '0 0 4px',
    fontSize: '1.2rem',
    color: '#e2e2e2',
  },
  progress: {
    margin: '0 0 16px',
    fontSize: '0.85rem',
    color: '#888',
  },
  inputRow: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px',
  },
  input: {
    flex: 1,
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid #444',
    background: '#0f0f1a',
    color: '#e2e2e2',
    fontSize: '0.95rem',
    outline: 'none',
  },
  addBtn: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    background: '#646cff',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '0.95rem',
  },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 12px',
    background: '#0f0f1a',
    borderRadius: '8px',
    border: '1px solid #2a2a3e',
  },
  checkbox: {
    width: '16px',
    height: '16px',
    cursor: 'pointer',
    accentColor: '#646cff',
  },
  text: {
    flex: 1,
    fontSize: '0.95rem',
    color: '#e2e2e2',
  },
  done: {
    textDecoration: 'line-through',
    color: '#555',
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    color: '#666',
    cursor: 'pointer',
    fontSize: '0.85rem',
    padding: '2px 4px',
    borderRadius: '4px',
  },
  empty: {
    color: '#555',
    textAlign: 'center',
    padding: '16px',
    fontSize: '0.9rem',
  },
}
