function Task({id, title, description, complete}) {
    return (
        <div>
            <h3>
                <input type='checkbox' value={complete}/>
                {title}
            </h3>
            <p>
                {description}
            </p>
        </div>
    );
}

export default Task;