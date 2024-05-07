import React from 'react';

const TaskList = ({ tasks }) => {
  if (!tasks.length) {
    return <h3>No Tasks Yet</h3>;
  }

  return (
    <div>
      <h3>Tasks</h3>
      {tasks.map((task) => (
        <div key={task._id} className="card mb-3">
          <div className="card-body bg-light p-2">
            <p>Task Name: {task.taskName}</p>
            <p>Instructions: {task.instructions}</p>
            <p>Dates: {task.dates}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
