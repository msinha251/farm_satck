import axios from "axios";
import React from "react";

function TodoItem(props){
    const deleteTodoHandler = (title) => {
        axios.delete(`http://localhost:8000/api/todo/${title}`)
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error))
    }
    return(
        <div>
            <p>
                <span style={{'font-weight': 'bold'}}>{props.todo.title} : </span> {props.todo.description}
                <button className="btn btn-outline-danger mx-2 mb-3" style={{'border-radius': '50px'}} onClick={() => deleteTodoHandler(props.todo.title)}>X</button>
                <hr />
            </p>
        </div>
    )
}
export default TodoItem;
