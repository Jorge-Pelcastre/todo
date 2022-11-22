import { useSelector } from 'react-redux';
import Task from './Task';

function TasksList() {
    const tasks = useSelector(state => state.tasks);

    return (
        <div>
            {tasks.map(({id, title, description, complete}) => 
            <Task key={id} id={id} title={title} description={description} complete={complete}/>)}
        </div>
    );
}

export default TasksList;