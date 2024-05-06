import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TASK } from '../../utils/mutations';
import Auth from '../../utils/auth';

const AddTaskForm = ({ plantId }) => {
  const [taskName, setTaskName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [dates, setDates] = useState('');

  const [addTask, { error }] = useMutation(ADD_TASK);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addTask({
        variables: {
          plantId,
          taskName,
          instructions,
          dates,
        },
      });

      setTaskName('');
      setInstructions('');
      setDates('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'taskName':
        setTaskName(value);
        break;
      case 'instructions':
        setInstructions(value);
        break;
      case 'dates':
        setDates(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h3>Add Task</h3>
      {Auth.loggedIn() ? (
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="taskName">Task Name:</label>
          <input
            type="text"
            id="taskName"
            name="taskName"
            placeholder="Enter task name"
            value={taskName}
            onChange={handleChange}
          />

          <label htmlFor="instructions">Instructions:</label>
          <input
            type="text"
            id="instructions"
            name="instructions"
            placeholder="Enter instructions"
            value={instructions}
            onChange={handleChange}
          />

          <label htmlFor="dates">Dates:</label>
          <input
            type="text"
            id="dates"
            name="dates"
            placeholder="YYYY/MM/DD"
            value={dates}
            onChange={handleChange}
          />

          <button type="submit">Add Task</button>
        </form>
      ) : (
        <p>You need to be logged in to add a task. Please log in or sign up.</p>
      )}
    </div>
  );
};

export default AddTaskForm;
