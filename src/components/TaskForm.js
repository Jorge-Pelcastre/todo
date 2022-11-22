import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/taskSlice';
import { v4 as uuid} from 'uuid';

function TaskForm() {
    const [task, setTask] = useState({
        title: '',
        description: '',
        complete: false
    });

    const dispatch = useDispatch();

    const handleInput = ({target}) => {
        const {name, value} = target;
        setTask(task => ({...task, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addTask({...task, id: uuid()}));
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <div>
                <label>name</label>
                <input name="title" onInput={handleInput}/>
            </div>
            <div>
                <label>description</label>
                <textarea name="description" onInput={handleInput}></textarea>
            </div>
            <div>
                <label>complete</label>
                <input name="complete" type="checkbox" onInput={handleInput}/>
            </div>
            <div>
                <button type="submit">Save</button>
            </div>
        </form>
    );
}

export default TaskForm;