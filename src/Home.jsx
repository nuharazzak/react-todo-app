import { useState,useEffect } from 'react';
import './Home.css';

function Home() {

    
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");

        return savedTasks ? JSON.parse(savedTasks) : [];
        });

    const [newTask, setNewTask] = useState('');

    useEffect(() => {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }, [tasks]);

    function handleInputChange(event){
      setNewTask(event.target.value);
      console.log("New Task:", event.target.value);
    }

    function handleAddTask() {
      if (newTask.trim() === '') {
        console.log("Task cannot be empty");
        return;
      }

       const task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
    };

      setTasks((previousTasks) => [...previousTasks, task]);
      setNewTask('');
    }

    function handleToggleTask(id) {
    setTasks((previousTasks) =>
        previousTasks.map((task) =>
            task.id === id
                ? { ...task, completed: !task.completed }
                : task
        )
    );
  }

    function handleDeleteTask(id) {
        setTasks((previousTasks) =>
            previousTasks.filter((task) => task.id !== id)
        );
    }

    const completedTasks = tasks.filter((task) => task.completed).length;
   

  return (
    <>
     <div className="todo-page">
        <div className="todo-card">

            <div className="todo-header">
              <div className="todo-stats">
                <div className="stat-box">
                    <span className="stat-number">{tasks.length}</span>
                    <span className="stat-label">Total Tasks</span>
                </div>

                <div className="stat-box">
                    <span className="stat-number">{completedTasks}</span>
                    <span className="stat-label">Completed</span>
                </div>

                <div className="stat-box">
                    <span className="stat-number">
                        {tasks.length - completedTasks}
                    </span>
                    <span className="stat-label">Remaining</span>
                </div>
            </div>
                <h1>My To-Do List</h1>
                <p>Organize your day, one task at a time.</p>
            </div>
    
           <div>
      
      
      <div className="todo-input-group">
        <input
            type="text"
            className="form-control todo-input"
            placeholder="✍️ What do you need to do?"
            value={newTask}
            onChange={handleInputChange}
        />

    <button
            type="button"
            className="add-button"
            onClick={handleAddTask}
        >
            + Add Task
    </button>

    
      </div>
    </div>

    <div className="task-section">
    <h2>Your Tasks</h2>

          {tasks.length === 0 ? (
              <p className="empty-message">
                  No tasks yet. Add your first task!
              </p>
          ) : (
        <ul className="task-list">
              {tasks.map((task) => (
                  <li
                      key={task.id}
                      className={`task-item ${task.completed ? "completed" : ""}`}
                  >
                      <label className="task-label">
                          <input
                              type="checkbox"
                              checked={task.completed}
                              onChange={() => handleToggleTask(task.id)}
                          />

                          <span className="task-text">
                              {task.text}
                          </span>
                      </label>
                      <button
                          type="button"
                          className="delete-button"
                          onClick={() => handleDeleteTask(task.id)}
                          aria-label={`Delete ${task.text}`}
                          title="Delete task"
                      >
                          🗑️
                      </button>
                  </li>
              ))}
          </ul>
              )}
    </div>

   
   
    </div>
    
    </div>
    
 
    
    </>

     );
   
}

export default Home;