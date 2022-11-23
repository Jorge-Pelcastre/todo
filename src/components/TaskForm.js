import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask } from '../features/tasks/taskSlice';
import { v4 as uuid } from 'uuid';
import { Link, useParams, useNavigate } from 'react-router-dom';

function TaskForm({ data }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks);
    const [task, setTask] = useState(() => {
        if (id) {
            const task = tasks.find(task => task.id === id);
            if (task) return task;
        }
        return {
            title: '',
            description: '',
            complete: false
        }
    });

    const handleInput = ({ target }) => {
        const { name, value } = target;
        setTask(task => ({ ...task, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id !== undefined) {
            dispatch(updateTask({ ...task, id }));
        } else {
            dispatch(addTask({ ...task, id: uuid() }));
        }
        navigate('/');
    }

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <div className='input-group'>
                <label htmlFor="title">Name <span className='input-required'>*</span></label>
                <input name="title" id="title" onInput={handleInput} defaultValue={task.title} />
            </div>
            <div className='input-group'>
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" onInput={handleInput} defaultValue={task.description}></textarea>
            </div>
            <div className='input-check-group'>
                <input id="complete" name="complete" type="checkbox" defaultChecked={task.complete} onInput={handleInput} />
                <label htmlFor="complete">Complete</label>
            </div>
            <div className='form-actions'>
                <button type="submit" className='btn-block btn-accent'>Save</button>
                <Link to="/" className='btn-block btn-secondary'>Cancel</Link>
            </div>
        </form>
    );
}

export default TaskForm;