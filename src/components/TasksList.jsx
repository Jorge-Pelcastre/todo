import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import Task from './Task';

function TasksList() {
    const tasks = useSelector(state => state.tasks);

    return (
        <ul className='tasks-list'>
            {tasks.map(({id, title, description, complete}) => 
            <Task key={id} id={id} title={title} description={description} complete={complete}/>)}
            <li className="add-task">
                <Link to="/create" className='add-task-link'>
                    <FontAwesomeIcon icon={faCirclePlus} size="2xl" />
                </Link>
            </li>
        </ul>
    );
}

export default TasksList;