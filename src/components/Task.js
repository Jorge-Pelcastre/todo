import { useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/taskSlice";

function Task({id, title, description, complete}) {
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteTask(id));
    }
    return (
        <div>
            <h3>
                <input type='checkbox' value={complete}/>
                {title}
                <button onClick={e => handleDelete(id)}>x</button>
            </h3>
            <p>
                {description}
            </p>
        </div>
    );
}

export default Task;