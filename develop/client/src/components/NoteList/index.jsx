import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_NOTE } from '../../utils/mutations';
import { QUERY_MYPLANTS } from '../../utils/queries';

const NotesList = ({ plants }) => {
  const [notesList, setNotesList] = useState(plants);
  const [removeNoteMutation] = useMutation(REMOVE_NOTE);
  const { data: myPlantsData } = useQuery(QUERY_MYPLANTS);

  const handleDeleteNote = async (userNotesId) => {
    try {
      await removeNoteMutation({ variables: { userNotesId } });
      setNotesList((prevNotesList) =>
        prevNotesList.map((note) => ({
          ...note,
          userNotes: note.userNotes.filter((n) => n._id !== userNotesId),
        }))
      );
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  useEffect(() => {
    if (myPlantsData) {
      setNotesList(myPlantsData.myPlants);
    }
  }, [myPlantsData]);

  if (!notesList.length) {
    return <h3>No Notes Yet</h3>;
  }

  return (
    <div>
      {notesList.map((plant) => (
        <div key={plant._id} className="card mb-3">
          <div className="card-body bg-light p-2">
            <p>Plant: {plant.name}</p>
            {plant.userNotes.length > 0 ? (
              plant.userNotes.map((plantNote) => (
                <div key={plantNote._id} className="card mb-3">
                  <p>Note Name: {plantNote.noteName}</p>
                  <p>Note Text: {plantNote.noteText}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteNote(plantNote._id)}
                  >
                    🗑️
                  </button>
                </div>
              ))
            ) : (
              <div className="grey-note">
                <p>This plant has no notes.</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
