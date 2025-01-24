import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const getTasks = () => {
    axios
      .get('http://localhost:9090/todo/tasks')
      .then((res) => setTasks(res.data.tasks))
      .catch((err) => console.error('Error fetching tasks:', err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      axios
        .put(`http://localhost:9090/todo/tasks/${editId}`, { task })
        .then(() => {
          getTasks();
          setTask('');
          setIsEdit(false);
          setEditId(null);
        })
        .catch((err) => console.error('Error updating task:', err));
    } else {
      axios
        .post('http://localhost:9090/todo/tasks', { task })
        .then(() => {
          getTasks();
          setTask('');
        })
        .catch((err) => console.error('Error adding task:', err));
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:9090/todo/tasks/${id}`)
      .then(() => getTasks())
      .catch((err) => console.error('Error deleting task:', err));
  };

  const handleEdit = (task) => {
    setTask(task.task);
    setIsEdit(true);
    setEditId(task._id);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>ToDo List</h1>
      </div>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          placeholder="Add your task"
          value={task}
          onChange={handleInputChange}
          className="task-input"
        />
        <button type="submit" className="add-btn">
          {isEdit ? 'Update' : '+'}
        </button>
      </form>
      <div className="todo-list">
        {tasks.map((task) => (
          <div key={task._id} className="todo-item">
            <p className={`todo-text ${task.completed ? 'completed' : ''}`}>
              {task.task}
            </p>
            <div className="todo-actions">
              <button
                className="edit-btn"
                onClick={() => handleEdit(task)}
              >
                <FaPencilAlt />
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(task._id)}
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
