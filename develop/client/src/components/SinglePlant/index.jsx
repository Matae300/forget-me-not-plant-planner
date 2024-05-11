import Plants from '../../assets/images/plant.jpg'

const SinglePlant = ({ plant }) => {
  if (!plant) {
    return <h3>No Plant Selected</h3>;
  }

  const renderNotesList = (notes) => {
    if (!notes || notes.length === 0) {
      return <p>N/A</p>;
    }
    return (
      <ul>
        {notes.map((notes) => (
          <li key={notes._id}>
            <p>Note Name: {notes.noteName}</p>
            <p>Text: {notes.noteText}</p>
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
            {renderNotesList(plant.userNotes)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePlant;