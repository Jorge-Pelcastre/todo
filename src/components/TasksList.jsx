/* eslint-disable react/jsx-props-no-spreading */
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import Task from "./Task";

function TasksList({ type, icon }) {
  const tasks = useSelector((state) =>
    state.tasks.filter((t) => t.status === type)
  );

  return (
    <div className="tasks-list">

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
    </div>
  );
}

export default TasksList;
