/* eslint-disable react/jsx-props-no-spreading */
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { deleteTask } from "../features/tasks/taskSlice";

const reactSwal = withReactContent(Swal);

function Task({ id, title, description, draggableProvided }) {
  const dispatch = useDispatch();
  const handleDelete = (idTask) => {
    reactSwal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "purple",
        confirmButtonText: "Delete"
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteTask(idTask));
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
  };

  return (
    <div
      {...draggableProvided.draggableProps}
      ref={draggableProvided.innerRef}
      {...draggableProvided.dragHandleProps}
      className="task"
    >
      <div className="task-title">
        <strong>{title}</strong>
        <span>
          <button
            type="button"
            onClick={() => handleDelete(id)}
            className="cancel-button"
          >
            <FontAwesomeIcon icon={faTrash} style={{ color: "purple" }} />
          </button>
          <Link to={`/${id}/edit`}>
            <FontAwesomeIcon icon={faEdit} />
          </Link>
        </span>
      </div>
      <p className="task-description">{description}</p>
    </div>
  );
}

export default Task;
