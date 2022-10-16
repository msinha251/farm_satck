import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoListView from './components/TodoListView';

function App() {
  // set variables
  const [todoList , setTodoList] = useState([]);
  const [title , setTitle] = useState("");
  const [description , setDescription] = useState("");

  // read all todos from backend
  useEffect(() => {
    axios.get('http://localhost:8000/api/todo')
    .then((response) => {
      setTodoList(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);

  // Post a todo
  const addTodoHandler = () => {
    axios.post('http://localhost:8000/api/todo/', { 'title': title, 'description': description })
      .then(res => console.log(res))
  };
  return (
    <div className="App list-group-item justify-content-between align-items-center mx-auto style={{width: 400px, backgroundColor: 'lightblue', marginTop: 15px}}">
      <h1 className="card text-white bg-primary mb-1 sytle={{maxWidth: 20rem;}}">Task Manager</h1>
      <h6 className="card text-white bg-primary mb-3">FASTAPI - React - MongoDB</h6>
      <div className="card-body">
        <h5 className="card text-white bg-dark mb-3">Add your Task</h5>
        <span className="card-text">
          <input className="mb-2 form-control titleIn" type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
          <input className="mb-2 form-control descIn" type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
          <button className="btn btn-outline-primary mx-2 mb-3 addBtn" style={{'border-radius': '50px', 'font-weight': 'bold'}} onClick={addTodoHandler}>Add</button>
        </span>


        <h5 className="card text-white bg-dark mb-3">Your Tasks</h5>
        <div className="card-text">
          <TodoListView todoList={todoList} />
        </div>
      </div>
      <h6 className="card text-dark bg-warning py-1 mb-0" >CopyRight 2022 - All Rights Reserved</h6>
    </div>
    
  );
}

export default App;
