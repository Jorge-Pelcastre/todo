/* eslint-disable react/jsx-props-no-spreading */
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { swapTasks } from "../features/tasks/taskSlice";
import Task from "./Task";

function TasksList({ type, icon }) {
  const tasks = useSelector((state) =>
    state.tasks.filter((t) => t.status === type)
  );
  const dispatch = useDispatch();
  const handleDragEnd = ({ source, destination }) => {
    if (source && destination) {
      dispatch(swapTasks([source.index, destination.index, source.droppableId]));
    }
  };

  return (
    <div className="tasks-list">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="tasks-list-icon">
          <FontAwesomeIcon icon={icon} size="2xl"/>
        </div>
        <Droppable droppableId={type}>
          {(droppableProvided) => (
            <div
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
                      status={task.status}
                      description={task.description}
                      draggableProvided={draggableProvided}
                    />
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default TasksList;
