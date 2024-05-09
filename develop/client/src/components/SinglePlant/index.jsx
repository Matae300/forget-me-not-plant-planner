import Plants from '../../assets/images/plant.jpg'

const SinglePlant = ({ plant }) => {
  if (!plant) {
    return <h3>No Plant Selected</h3>;
  }

  const renderNotesList = (userNotes) => {
    if (!userNotes || userNotes.length === 0) {
      return <p>N/A</p>;
    }
    return (
      <ul>
        {userNotes.map((userNotes) => (
          <li key={userNotes._id}>
            <p>Note Name: {userNotes.noteName}</p>
            <p>Text: {userNotes.noteText}</p>
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
            <h2>Other Tasks:</h2>
            {renderNotesList(plant.userNotes)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePlant;
