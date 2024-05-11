import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_NOTE } from '../../utils/mutations';
import { QUERY_MYNOTES } from '../../utils/queries';

const NotesList = ({ notes }) => {
  const [notesList, setNotesList] = useState(notes);
  const { refetch: refetchNotes } = useQuery(QUERY_MYNOTES);
  const [removeNoteMutation] = useMutation(REMOVE_NOTE);

  const handleDeleteNote = async (userNotesId) => {
    try {
      await removeNoteMutation({ variables: { userNotesId } });
      setNotesList(notesList.filter((note) => note._id !== userNotesId));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  useEffect(() => {
    const updateNotesList = async () => {
      try {
        const { data } = await refetchNotes();
        setNotesList(data.myNotes);
      } catch (error) {
        console.error('Error refetching notes:', error);
      }
    };

    updateNotesList();
  }, [refetchNotes]);

  if (!notesList.length) {
    return <h3>No Notes Yet</h3>;
  }
  
  // Sort notesList by plant name before rendering
  const sortedNotesList = [...notesList].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  if (!sortedNotesList.length) {
    return <h3>No Notes Yet</h3>;
  }

  return (
    <div>
      {sortedNotesList.map((note) => (
        <div key={note._id} className="card mb-3">
          <div className="card-body bg-light p-2">
            <p>Plant: {note.name}</p>
            <p>Note: {note.noteName}</p>
            <p>{note.noteText}</p>
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