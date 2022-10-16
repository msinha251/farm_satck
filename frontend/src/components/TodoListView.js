import TodoItem from "./Todo"

function TodoListView(props) {
    return (
        <div>
            <ul>
                {props.todoList.map((todo) => (
                    <TodoItem todo={todo} />
                ))}
            </ul>
        </div>
    )
}

export default TodoListView
