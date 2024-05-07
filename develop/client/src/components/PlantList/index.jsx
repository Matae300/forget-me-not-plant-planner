import React from 'react';

const PlantList = ({ plants, name }) => {
  if (!plants.length) {
    return <h3>No Plants Yet</h3>;
  }

  return (
    <div>
      <h3>{name}</h3>
      {plants.map((plant) => (
        <div key={plant._id} className="card mb-3">
          <h4 className="card-header bg-primary text-light p-2 m-0">
            Plant
          </h4>
          <div className="card-body bg-light p-2">
            <p>Name: {plant.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlantList;