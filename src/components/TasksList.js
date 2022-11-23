import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Task from './Task';
import TaskForm from './TaskForm';

function TasksList() {
    const tasks = useSelector(state => state.tasks);
    const [create, setCreate] = useState(false);

    return (
        <div>
            {tasks.map(({id, title, description, complete}) => 
            <Task key={id} id={id} title={title} description={description} complete={complete}/>)}
            {create 
                ? <TaskForm close={() => setCreate(false)}/>
                : <button type='button' onClick={() => setCreate(true)}>create</button>}
        </div>
    );
}

export default TasksList;