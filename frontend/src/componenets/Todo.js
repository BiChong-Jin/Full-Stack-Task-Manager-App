import axios from "axios";
import React from "react";

function TodoItem(props) {
    const deleteTodoHandler = (title) => {
        axios.delete(`https://task-manager-api-txf8.onrender.com/api/todo/${title}`) 
        .then(res => console.log(res.data))}
            return (
                <div>
                    <p>
                        <span style={{fontWeight:'bold, underline'}}>{props.todo.title} : </span> {props.todo.description}
                        <button onClick={() => deleteTodoHandler(props.todo.title); window.location.deload()} className="btn btn-outline-danger my-2 mx-2" style={{'borderRadius':'50px',}}>X</button>
                        <hr></hr>
                    </p>
                </div>
            )
};

export default TodoItem;
