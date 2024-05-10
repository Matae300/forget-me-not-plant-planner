import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_NOTE } from '../../utils/mutations';
import { QUERY_MYNOTES } from '../../utils/queries';

const NotesList = ({ notes }) => {
  const [notesList, setNotesList] = useState(notes); // State to store notes list
  const { refetch: refetchNotes } = useQuery(QUERY_MYNOTES);
  const [removeNoteMutation] = useMutation(REMOVE_NOTE);

  const handleDeleteNote = async (userNotesId) => {
    try {
      await removeNoteMutation({ variables: { userNotesId } });
      setNotesList(notesList.filter((note) => note._id !== userNotesId)); // Update notes list in state
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  useEffect(() => {
    const updateNotesList = async () => {
      try {
        const { data } = await refetchNotes(); // Refetch notes data
        setNotesList(data.myNotes); // Update notes list in state with refetched data
      } catch (error) {
        console.error('Error refetching notes:', error);
      }
    };

    updateNotesList(); // Call the update function on component mount
  }, [refetchNotes]);

  if (!notesList.length) {
    return <h3>No Notes Yet</h3>;
  }

  return (
    <div>
      <h3>Notes</h3>
      {notesList.map((note) => (
        <div key={note._id} className="card mb-3">
          <div className="card-body bg-light p-2">
            <p>Name: {note.noteName}</p>
            <p>Text: {note.noteText}</p>
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteNote(note._id)}
            >
              DELETE NOTE
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
