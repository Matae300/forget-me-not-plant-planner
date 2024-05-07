import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_OTHERTASK } from '../../utils/mutations';
import { QUERY_MYTASKS, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

const AddTaskForm = ({}) => {
  const [plantId, setPlantId] = useState('');
  const [taskName, setTaskName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [dates, setDates] = useState('');

  const [addTask, { error }] = useMutation(ADD_OTHERTASK, {
    refetchQueries: [
     QUERY_MYTASKS, 
     'getTasks',
     QUERY_ME, 
     'me'
    ],
  }); ;

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

      setPlantId('');
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
      case 'plantId':
        setPlantId(value);
        break;
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

          <label htmlFor="plantId">plantId:</label>
          <input
            type="text"
            id="plantId"
            name="plantId"
            placeholder="Enter plantId"
            value={plantId}
            onChange={handleChange}
          />
          <br/>
          <select
            id="taskName"
            name="taskName"
            value={taskName}
            onChange={handleChange}
          >
            <option value="">Select Task</option>
            <option value="planting">Planting</option>
            <option value="pruning">Pruning</option>
            <option value="fertilizing">Fertilizing</option>
          </select>
          <br/>
          <label htmlFor="instructions">Instructions:</label>
          <input
            type="text"
            id="instructions"
            name="instructions"
            placeholder="Enter instructions"
            value={instructions}
            onChange={handleChange}
          />
          <br/>
          <label htmlFor="dates">Dates:</label>
          <input
            type="text"
            id="dates"
            name="dates"
            placeholder="YYYY/MM/DD"
            value={dates}
            onChange={handleChange}
          />
          <br/>
          <button type="submit">Add Task</button>
        </form>
      ) : (
        <p>You need to be logged in to add a task. Please log in or sign up.</p>
      )}
    </div>
  );
};

export default AddTaskForm;