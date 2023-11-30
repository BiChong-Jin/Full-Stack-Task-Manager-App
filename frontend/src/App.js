import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoView from './componenets/TodoListView';

function App() {

  const [todolist, setTodoList] = useState([{}])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

    // read all todos from backend
    useEffect(() => {
      axios.get('https://task-manager-api-txf8.onrender.com/api/todo')
        .then(res => {
          setTodoList(res.data)
        })
    }, [title]); // add an empty array as second parameter here for there are infinite loop occuring.

    // post a task
    const addTodoHandler = () => {
      axios.post('https://task-manager-api-txf8.onrender.com/api/todo/', {'title':title, 'description':desc})
      .then(res => console.log(res))
    };


  return (
      <div className='app-container'>
      <div className='center-container'>    
      <div className="App list-group-item justify-content-center align-items-center mx-auto" style={{"width":"400px", "backgroundColor":"transparent"}}>
      <h1 className='card text-white bg-primary mb-1' styleName="max-width: 20rem;">Task Manager</h1>
      <h6 className='card text-white bg-primary mb-3'>What do you want to do?</h6>
        <div className='card-body'>
        <h5 className='card text-white bg-dark mb-3'>Add Your Task</h5>
          <span className='card-text'>
          <input className='mb-2 form-control titleIn' onChange={event => setTitle(event.target.value)} placeholder='タイトル'/>
          <input className='mb-2 form-control desIn' onChange={event => setDesc(event.target.value)} placeholder='内容'/>
          <button 
            className='btn btn-outline-primary mx-2 mb-3' 
            style={{'borderRadius':'50px',"font-weight":"bold"}} 
            onClick={() => {
              addTodoHandler();
              window.location.reload();
            }}
          >
            Add Task
          </button>
          </span>

          <h5 className='card text-white bg-dark mb-3'>Your Tasks</h5>
          <div>
            <TodoView todoList={todolist}/>
          </div>
        </div>
        <h6 className='card text-dark bg-warning py-1 mb-0'>Full Stack App <a href='https://github.com/TechWithJin/Full-Stack-Task-Manager-App'>TechWithJin</a></h6>
      </div>
      </div>
      </div>
  );
}


export default App;
