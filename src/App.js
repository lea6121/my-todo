import './App.css'
import React from 'react'
import { useState } from 'react'

function Todo({ todo, index, completeTodo, undoTodo, deleteTodo }) {
  return (
    <li className="todo-item">
      <div className={todo.isCompleted ? 'completed' : 'undo'}>
        <label
          className="form-check-label1"
          for="{todo.index}"
          style={{
            textDecoration: todo.isCompleted ? 'line-through' : 'none',
            fontStyle: todo.isCompleted ? 'italic' : ''
          }}
        >
          {todo.text}
        </label>
      </div>
      <div className="todo-btn">
        <button
          type="button"
          className={
            todo.isCompleted
              ? 'btn btn-outline-success'
              : 'btn btn-outline-danger'
          }
          onClick={
            todo.isCompleted ? () => undoTodo(index) : () => completeTodo(index)
          }
        >
          {todo.isCompleted ? 'done' : 'undone'}
        </button>
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={() => deleteTodo(index)}
        >
          Delete
        </button>
      </div>
    </li>
  )
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value) return
    addTodo(value)
    setValue('')
  }

  return (
    <form className="input-group mb-3" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="What do you want to get done today..."
      />
    </form>
  )
}

function App() {
  const [todos, setTodos] = useState([
    { text: 'Finish Todo', isCompleted: true },
    { text: 'Watch NBA', isCompleted: false },
    { text: '陪呆呆貓玩耍', isCompleted: false }
  ])
  const [filter, setFilter] = useState('all')

  const addTodo = (text) => {
    const newTodos = [...todos, { text, isCompleted: false }]
    setTodos(newTodos)
  }

  const completeTodo = (index) => {
    const newTodos = [...todos]
    newTodos[index].isCompleted = true
    setTodos(newTodos)
  }

  const undoTodo = (index) => {
    const newTodos = [...todos]
    newTodos[index].isCompleted = false
    setTodos(newTodos)
  }

  const deleteTodo = (index) => {
    const newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  const deleteAllTodo = () => {
    const newTodos = [...todos]
    newTodos.splice(0, newTodos.length)
    setTodos(newTodos)
  }

  const renderAll = () => {
    setFilter('all')
  }

  const renderUndone = () => {
    setFilter('undone')
  }

  const renderDone = () => {
    setFilter('done')
  }

  return (
    <div className="wrapper">
      <header></header>

      <section className="todo">
        <div className="todo-container">
          <div className="todo-top">
            <h1>React Todo App</h1>
          </div>
        </div>

        <div className="todo-wrapper">
          <TodoForm addTodo={addTodo} />
          <div className="todo-content">
            <ul className="todo-list">
              {todos
                .filter((todo) => {
                  if (filter === 'all') return todo
                  if (filter === 'done') return todo.isCompleted
                  return !todo.isCompleted
                })
                .map((todo, index) => (
                  <Todo
                    key={index}
                    index={index}
                    todo={todo}
                    undoTodo={undoTodo}
                    completeTodo={completeTodo}
                    deleteTodo={deleteTodo}
                  />
                ))}
            </ul>
            <div className="todo-controller">
              <div className="btn-group me-2" role="group">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-all"
                  onClick={renderAll}
                >
                  all
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-active"
                  onClick={renderUndone}
                >
                  active
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-completed"
                  onClick={renderDone}
                >
                  completed
                </button>
              </div>

              <div>
                <button
                  type="button"
                  className="btn btn-dark delete-all"
                  onClick={() => deleteAllTodo()}
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
