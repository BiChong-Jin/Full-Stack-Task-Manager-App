import axios from "axios";
import React from "react";

function TodoItem(props) {
    const deleteTodoHandler = (title) => {
        axios.delete(`https://task-manager-api-txf8.onrender.com/api/todo/${title}`) 
        .then(res => console.log(res.data))}
            return (
                <div>
                    <p>
                        <span style={{fontWeight:'bold, underline', color:'white'}}>{props.todo.title} : </span> <span style={{ color: 'white' }}>{props.todo.description}</span>
                        <button onClick={() => deleteTodoHandler(props.todo.title)} className="btn btn-outline-danger my-2 mx-2" style={{'borderRadius':'50px',}}>X</button>
                        <hr></hr>
                    </p>
                </div>
            )
};

export default TodoItem;
