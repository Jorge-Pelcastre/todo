import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import TasksList from "./TasksList";

function TasksBoard() {
  return (
    <div className="tasks-board">
      <div className="tasks-container">
        <TasksList type="pending" icon={faSquare}/>
        <TasksList type="inProgress" icon={faSpinner}/>
        <TasksList type="complete" icon={faCheck}/>
      </div>
      <div className="add-task">
        <Link to="/create" className="add-task-link">
          <FontAwesomeIcon icon={faCirclePlus} size="2xl" />
        </Link>
      </div>
    </div>
  );
}

export default TasksBoard;
