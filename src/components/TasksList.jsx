/* eslint-disable react/jsx-props-no-spreading */
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { swapTasks } from "../features/tasks/taskSlice";
import Task from "./Task";

function TasksList() {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const handleDragEnd = ({ source, destination }) => {
    if (source && destination) {
      dispatch(swapTasks([source.index, destination.index]));
    }
  };

  return (
    <div className="tasks-list">
      <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks-container">
          {(droppableProvided) => (
            <ul
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
              className="tasks-container"
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(draggableProvided) => (
                    <Task
                      id={task.id}
                      title={task.title}
                      complete={task.complete}
                      description={task.description}
                      draggableProvided={draggableProvided}/>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </ul>
          )}
        </Droppable>
        <div className="add-task">
          <Link to="/create" className="add-task-link">
            <FontAwesomeIcon icon={faCirclePlus} size="2xl" />
          </Link>
        </div>
      </DragDropContext>
    </div>
  );
}

export default TasksList;
