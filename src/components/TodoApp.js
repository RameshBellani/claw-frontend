import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoApp.css';

const API_URL = 'https://claw-server.onrender.com/api/todos';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [editing, setEditing] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found. Please log in.');
        return;
      }
      const response = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
      console.log('Fetched todos:', response.data);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error.response ? error.response.data : error.message);
    }
  };

  const addTodo = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found. Please log in.');
        return;
      }
      await axios.post(API_URL, { title }, { headers: { Authorization: `Bearer ${token}` } });
      setTitle('');
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error.response ? error.response.data : error.message);
    }
  };

  const updateTodo = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found. Please log in.');
        return;
      }
      await axios.put(`${API_URL}/${id}`, { title: newTitle, completed: false }, { headers: { Authorization: `Bearer ${token}` } });
      setEditing(null);
      setNewTitle('');
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error.response ? error.response.data : error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found. Please log in.');
        return;
      }
      await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <div className="todo-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.length > 0 ? (
          todos.map(todo => (
            <li key={todo._id}>
              {editing === todo._id ? (
                <div>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                  <button onClick={() => updateTodo(todo._id)}>Save</button>
                  <button onClick={() => setEditing(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <span>{todo.title}</span>
                  <button onClick={() => setEditing(todo._id)}>Edit</button>
                  <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                </div>
              )}
            </li>
          ))
        ) : (
          <p>No todos found. Add a new todo!</p>
        )}
      </ul>
    </div>
  );
}

export default TodoApp;
