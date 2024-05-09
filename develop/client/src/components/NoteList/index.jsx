const NotesList = ({ notes }) => {
  if (!notes.length) {
    return <h3>No Notes Yet</h3>;
  }

  return (
    <div>
      <h3>Notes</h3>
      {notes.map((notes) => (
        <div key={notes._id} className="card mb-3">
          <div className="card-body bg-light p-2">
            <p>Name: {notes.noteName}</p>
            <p>Text: {notes.noteText}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
