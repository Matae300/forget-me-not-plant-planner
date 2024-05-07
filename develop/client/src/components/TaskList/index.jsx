import React from 'react';

const TaskList = ({ tasks, name }) => {
  if (!tasks.length) {
    return <h3>No Tasks Yet</h3>;
  }

  return (
    <div>
      <h3>{name}</h3>
      {tasks.map((task) => (
        <div key={task._id} className="card mb-3">
          <h4 className="card-header bg-primary text-light p-2 m-0">
            Task
          </h4>
          <div className="card-body bg-light p-2">
            <p>Name: {task.taskName}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;