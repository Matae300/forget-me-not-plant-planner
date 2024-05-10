import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USERNOTES } from '../../utils/mutations';
import { QUERY_MYNOTES, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

const AddNoteForm = ({}) => {
  const [name, setName] = useState('');
  const [noteName, setNoteName] = useState('');
  const [noteText, setNoteText] = useState('');
  const [error, setError] = useState('');

  const [addNote] = useMutation(ADD_USERNOTES, {
    refetchQueries: [
     QUERY_MYNOTES, 
     'getNotes',
     QUERY_ME, 
     'me'
    ],
    errorPolicy: 'all',
  }); ;

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      setError('Please enter your plant name.');
      return;
    }
    if (!noteName.trim()) {
      setError('Please select note name.');
      return;
    }
    if (!noteText.trim()) {
      setError('Please enter text');
      return;
    }
    
    try {
      const { data } = await addNote({
        variables: {
          name,
          noteName,
          noteText,
        },
      });

      setName('');
      setNoteName('');
      setNoteText('');
    } catch (err) {
      console.error('Error adding plant:', err);
      setError('Failed to add note. Please try again.');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'noteName':
        setNoteName(value);
        break;
      case 'noteText':
        setNoteText(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h3>Add Note</h3>
      {Auth.loggedIn() ? (
        <form onSubmit={handleFormSubmit}>
           {error && <div className="error-message">{error}</div>}
          <label htmlFor="name">Plant's Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter name"
            value={name}
            onChange={handleChange}
          />
          <br/>
          <label htmlFor="noteName">Note Name:</label>
          <input
            type="text"
            id="noteName"
            name="noteName"
            placeholder="Enter name"
            value={noteName}
            onChange={handleChange}
          />
          <br/>
          <label htmlFor="noteText">Note Text:</label>
          <input
            type="text"
            id="noteText"
            name="noteText"
            placeholder="Enter note"
            value={noteText}
            onChange={handleChange}
          />
          <br/>
          <button type="submit">Add Note</button>
        </form>
      ) : (
        <p>You need to be logged in to add a note. Please log in or sign up.</p>
      )}
    </div>
  );
};

export default AddNoteForm;