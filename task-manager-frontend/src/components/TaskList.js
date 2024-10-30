import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../redux/taskSlice';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div>
      <h1>Task List</h1>
      <Link to="/tasks/new">Create New Task</Link>
      {tasks.map((task) => (
        <div key={task._id}>
          <Link to={`/tasks/${task._id}`}>
            <h2>{task.name}</h2>
          </Link>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
