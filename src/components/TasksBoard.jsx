import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DragDropContext } from "@hello-pangea/dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import TasksList from "./TasksList";
import { swapTasks, changeStatus } from "../features/tasks/taskSlice";

function TasksBoard() {
  const dispatch = useDispatch();
  const handleDragEnd = (event) => {
    const { source, destination } = event;
    if(!destination) return;
    if(source.droppableId === destination.droppableId) {
      dispatch(swapTasks([source.index, destination.index, source.droppableId]));
    } else {
      dispatch(changeStatus([source.index, source.droppableId, destination.droppableId]));
    }
  };

  return (
    <div className="tasks-board">
      <div className="tasks-list-container">
        <DragDropContext onDragEnd={handleDragEnd} className="tasks-list-container">
          <TasksList type="pending" icon={faSquare}/>
          <TasksList type="inProgress" icon={faSpinner}/>
          <TasksList type="complete" icon={faCheck}/>
        </DragDropContext>
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
