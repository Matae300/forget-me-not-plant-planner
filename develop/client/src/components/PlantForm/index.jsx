import { useState } from "react";
import { ADD_PLANT } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import "./PlantForm.css";

export default function PlantForm({ toggleForm }) {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("");
  const [interval, setInterval] = useState("");
  const [frequencyUnit, setFrequencyUnit] = useState("");
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [sunExposure, setSunExposure] = useState("");
  const [growingMonths, setGrowingMonths] = useState("");
  const [bloomingMonths, setBloomingMonths] = useState("");
  const [error, setError] = useState("");

  const [addPlant] = useMutation(ADD_PLANT);

  const handleSelect = (event) => {
    setFrequencyUnit(event.target.value);

  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {

      const { data } = await addPlant({
        variables: {
          name,
          wateringTask: {
            instructions: task,
            frequencyCount: parseInt(frequency),
            frequencyUnit,
            frequencyInterval: parseInt(interval),
          },
          description,
          photoUrl,
          sunExposure,
          growingMonths,
          bloomingMonths
        },
      });

      setName('');
      setDescription('');
      setSunExposure('');
      setGrowingMonths('');
      setBloomingMonths('');
      setTask('');
      setError(''); 
      setFrequency("");
      setFrequencyUnit('');
      setInterval("");
      toggleForm();
    } catch (err) {
      setError("Error: Check your plant fields");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        return setName(value);
      case "frequency":
        return setFrequency(value);
      case "interval":
        return setInterval(value);
      case "task":
        return setTask(value);
      case "description":
        return setDescription(value);
      case "photoUrl":
        return setPhotoUrl(value);
      case "sunExposure":
        return setSunExposure(value);
      case "growingMonths":
        return setGrowingMonths(value);
      case "bloomingMonths":
        return setBloomingMonths(value);
      default:
        break;
    }
  };
  return (
    <>
      <h2 className="header">Add to My Garden</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <div>
            <label htmlFor="name">Plant Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <label htmlFor="frequency">Watering Frequency</label>
            <input
              type="text"
              id="frequency"
              name="frequency"
              value={frequency}
              onChange={handleChange}
            ></input>
            <label htmlFor="frequency">time(s)</label>
          </div>
          <div>
            <label htmlFor="interval">every</label>
            <input
              type="text"
              id="interval"
              name="interval"
              value={interval}
              onChange={handleChange}
            ></input>
            <select className="options" value={frequencyUnit} onChange={handleSelect}>
              <option value="">Select</option>
              <option value="week">Weeks</option>
              <option value="month">Months</option>
            </select>
          </div>
        </div>
        <div className="additional">
          <label htmlFor="task">Instructions:</label>
          <input
            type="text"
            id="task"
            name="task"
            
            value={task}
            onChange={handleChange}
          ></input>
          <div>
            <h3>Additional Info:</h3>
            <div>
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                
                value={description}
                onChange={handleChange}
              ></input>
              <label htmlFor="photoUrl">Photo Url:</label>
              <input
                type="text"
                id="photoUrl"
                name="photoUrl"
                
                value={photoUrl}
                onChange={handleChange}
              ></input>
              <label htmlFor="sunExposure">Sun Exposure:</label>
              <input
                type="text"
                id="sunExposure"
                name="sunExposure"
                
                value={sunExposure}
                onChange={handleChange}
              ></input>
              <label htmlFor="growingMonths">Growing Months:</label>
              <input
                type="text"
                id="growingMonths"
                name="growingMonths"
                
                value={growingMonths}
                onChange={handleChange}
              ></input>
              <label htmlFor="bloomingMonths">Blooming Months:</label>
              <input
                type="text"
                id="bloomingMonths"
                name="bloomingMonths"
                
                value={bloomingMonths}
                onChange={handleChange}
              ></input>
            </div>
          </div>
        </div>
        <button type="submit" className="submit">
          Add Plant
        </button>
      </form>
      <div>{error}</div>
      <button
       type="button"
       onClick={toggleForm}
       className="submit"
       >Cancel</button>
    </>
  );
}
