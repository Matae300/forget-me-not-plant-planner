import React from 'react';

const SinglePlant = ({ plant }) => {
  if (!plant) {
    return <h3>No Plant Selected</h3>;
  }

  return (
    <div>
      <h3>Plant Details</h3>
      <div key={plant._id} className="card mb-3">
        <div className="card-body bg-light p-2">
          <p>Name: {plant.name}</p>
          <p>Id: {plant._id}</p>
          <img src={plant.photoUrl} alt={plant.name} />
          <p>Instructions: {plant.wateringTask.instructions}</p>
        </div>
      </div>
    </div>
  );
};

export default SinglePlant;
