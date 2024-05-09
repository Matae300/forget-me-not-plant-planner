const NotesList = ({ userNotes }) => {
  if (!userNotes.length) {
    return <h3>No Tasks Yet</h3>;
  }

  return (
    <div>
      <h3>Notes</h3>
      {userNotes.map((userNotes) => (
        <div key={userNotes._id} className="card mb-3">
          <div className="card-body bg-light p-2">
            <p>Name: {userNotes.noteName}</p>
            <p>Text: {userNotes.noteText}</p>
            <button>DELETE NOTE</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
