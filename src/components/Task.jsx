import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { deleteTask } from "../features/tasks/taskSlice";

function Task({ id, title, description, complete }) {
    const dispatch = useDispatch();

    const handleDelete = (idTask) => {
        dispatch(deleteTask(idTask));
    }

    return (
        <li className="task">
            <div className="task-check">
                <FontAwesomeIcon icon={complete ? faSquareCheck : faSquare}/>
            </div>
            <div className="task-content">
                <div className="task-title">
                    <strong>
                        {title}   
                    </strong>
                    <span>
                        <button type="button" onClick={() => handleDelete(id)} className="cancel-button">
                            <FontAwesomeIcon icon={faTrash}/>
                        </button>
                        <Link to={`/${id}/edit`}>
                            <FontAwesomeIcon icon={faEdit}/>
                        </Link>
                    </span>
                </div>
                <p className="task-description">
                    {description}
                </p>
            </div>
        </li>
    );
}

export default Task;