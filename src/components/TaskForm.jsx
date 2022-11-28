import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { Link, useParams, useNavigate } from "react-router-dom";
import { addTask, updateTask } from "../features/tasks/taskSlice";
import useForm from "../hooks/useForm";
import { Input, Textarea, Select } from "./formComponents";

const taskStatus = ['pending', 'inProgress', 'complete'];

function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const getTask = () => {
    if (id) {
      const task = tasks.find((t) => t.id === id);
      if (task) return task;
    }
    return {
      title: "",
      description: "",
      status: taskStatus[0]
    };
  };

  const onSubmit = (task) => {
    if (id !== undefined) {
      dispatch(updateTask({ ...task, id }));
    } else {
      dispatch(addTask({ ...task, id: uuid() }));
    }
    navigate("/");
  };

  const rules = {
    title: `required|max:30|unique:${(id
      ? tasks.filter((t) => t.id !== id).map((t) => t.title)
      : tasks.map((t) => t.title)
    ).join()}`,
    description: "max:256",
    status: `only:${taskStatus.join()}`
  };

  const { handleInput, handleSubmit, data, errors } = useForm({
    onSubmit,
    initial: getTask(),
    rules
  });

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <Input
        name="title"
        handleInput={handleInput}
        value={data.title}
        required
        errors={errors}
      />
      <Textarea
        name="description"
        handleInput={handleInput}
        value={data.description}
        rows="6"
        errors={errors}
      />
      <Select
        name="status"
        options={[
          ["pending", "Pending"],
          ["inProgress", "In Progress"],
          ["complete", "Complete"]
        ]}
        handleInput={handleInput}
        value={data.status}
        errors={errors}
      />
      <div className="form-actions">
        <button type="submit" className="btn-block btn-accent">
          Save
        </button>
        <Link to="/" className="btn-block btn-secondary">
          Cancel
        </Link>
      </div>
    </form>
  );
}

export default TaskForm;
