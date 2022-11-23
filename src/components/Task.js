import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/taskSlice";
import TaskForm from './TaskForm';

function Task({ id, title, description, complete }) {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);

    const handleDelete = (id) => {
        dispatch(deleteTask(id));
    }

    return (
        <div>
            {edit
                ? <TaskForm data={{ id, title, description, complete }} close={() => setEdit(false)} />
                : (
                    <>
                        <h3>
                            <input type='checkbox' value={complete} />
                            {title}
                            <button onClick={e => handleDelete(id)}>x</button>
                            <button onClick={e => setEdit(true)}>Edit</button>
                        </h3>
                        <p>
                            {description}
                        </p>
                    </>
                )
            }
        </div>
    );
}

export default Task;