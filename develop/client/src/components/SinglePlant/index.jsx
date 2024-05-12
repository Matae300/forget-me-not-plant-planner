import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_MYPLANTS } from '../../utils/queries';

import Plants from '../../assets/images/plant.jpg';

const SinglePlant = ({ plant }) => {
  const { loading, error, data, refetch } = useQuery(QUERY_MYPLANTS);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 1000); //refetch every second

    return () => clearInterval(interval); 
  }, [refetch]); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data.</p>;

  const { myPlants } = data;

  if (!plant) {
    return <h3>No Plant Selected</h3>;
  }

  const renderNotesList = (notes) => {
    if (!notes || notes.length === 0) {
      return <p>N/A</p>;
    }
    return (
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <p>Note Name: {note.noteName}</p>
            <p>Text: {note.noteText}</p>
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
          <img src={Plants} alt={plant.name} />
          <p>Description: {plant.description || 'N/A'}</p>
          <p>Sun Exposure: {plant.sunExposure || 'N/A'}</p>
          <p>Growing Months: {plant.growingMonths || 'N/A'}</p>
          <p>Blooming Months: {plant.bloomingMonths || 'N/A'}</p>
          <p>Watering Instructions: {plant.wateringTask.instructions || 'N/A'}</p>
          <div>
            <h2>Notes:</h2>
            {renderNotesList(myPlants[0]?.userNotes)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePlant;
