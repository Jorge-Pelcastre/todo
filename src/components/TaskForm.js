import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '../features/tasks/taskSlice';
import { v4 as uuid } from 'uuid';

function TaskForm({ data, close }) {
    const [task, setTask] = useState({
        title: data?.title ?? '',
        description: data?.description ?? '',
        complete: data?.complete ?? false
    });

    const dispatch = useDispatch();

    const handleInput = ({ target }) => {
        const { name, value } = target;
        setTask(task => ({ ...task, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.id !== undefined) {
            dispatch(updateTask({ ...task, id: data.id }));
        } else {
            dispatch(addTask({ ...task, id: uuid() }));
        }
        close();
    }

    const handleClose = () => {
        close();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>name</label>
                <input name="title" onInput={handleInput} defaultValue={task.title} />
            </div>
            <div>
                <label>description</label>
                <textarea name="description" onInput={handleInput} defaultValue={task.description}></textarea>
            </div>
            <div>
                <label>complete</label>
                <input name="complete" type="checkbox" defaultChecked={task.complete} onInput={handleInput} />
            </div>
            <div>
                <button type="submit">Save</button>
                <button type="button" onClick={handleClose}>Cancel</button>
            </div>
        </form>
    );
}

export default TaskForm;