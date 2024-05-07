import React from 'react';

const SinglePlant = ({ plant }) => {
  if (!plant) {
    return <h3>No Plant Selected</h3>;
  }

  const renderTaskList = (tasks) => {
    if (!tasks || tasks.length === 0) {
      return <p>N/A</p>;
    }
    return (
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <p>Task Name: {task.taskName}</p>
            <p>Instructions: {task.instructions}</p>
            <p>Dates: {task.dates}</p>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h3>Plant Details</h3>
      <div key={plant._id} className="card mb-3">
        <div className="card-body bg-light p-2">
          <p>Name: {plant.name}</p>
          <p>Id: {plant._id}</p>
          <img src={plant.photoUrl} alt={plant.name} />
          <p>Description: {plant.description || 'N/A'}</p>
          <p>Sun Exposure: {plant.sunExposure || 'N/A'}</p>
          <p>Growing Months: {plant.growingMonths || 'N/A'}</p>
          <p>Blooming Months: {plant.bloomingMonths || 'N/A'}</p>
          <p>Watering Instructions: {plant.wateringTask.instructions || 'N/A'}</p>
          <div>
            <h2>Other Tasks:</h2>
            {renderTaskList(plant.otherTasks)}
          </div>
          <p>User Notes: {plant.userNotes || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default SinglePlant;
