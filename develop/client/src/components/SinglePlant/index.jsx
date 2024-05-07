import React from 'react';

const SinglePlant = ({ plants, name }) => {
  if (!plants.length) {
    return <h3>No Plants Yet</h3>;
  }

  return (
    <div>
      <h3>Plants</h3>
        <div key={plant._id} className="card mb-3">
          <div className="card-body bg-light p-2">
            <p>Name: {plant.name}</p>
            <p>Id: {plant._id}</p>
            {plant.photoUrl}
            <p>Instructions: {plant.wateringTask.instructions}</p>
          </div>
        </div>
    </div>
  );
};

export default SinglePlant;