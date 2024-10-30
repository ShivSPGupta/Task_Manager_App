import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { modifyTask, fetchTasks } from '../redux/taskSlice';

const TaskDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const task = useSelector((state) =>
    state.tasks.tasks.find((task) => task._id === id)
  );
  const [status, setStatus] = useState(task ? task.status : '');

  useEffect(() => {
    if (!task) {
      dispatch(fetchTasks());
    }
  }, [dispatch, task]);

  const handleStatusChange = () => {
    dispatch(modifyTask(id, { ...task, status }));
  };

  return (
    <div>
      {task ? (
        <>
          <h1>{task.name}</h1>
          <p>{task.description}</p>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={handleStatusChange}>Update Status</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TaskDetails;
