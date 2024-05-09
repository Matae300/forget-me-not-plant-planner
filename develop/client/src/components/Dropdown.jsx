import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_PLANTS } from '../utils/queries';  

function Dropdown() {
  const { loading, error, data } = useQuery(QUERY_ALL_PLANTS);
  const [selectedItem, setSelectedItem] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data && data.allPlants.length === 0) return <p>No plants available to select.</p>;

  const handleChange = (event) => {
    setSelectedItem(event.target.value);
  };

  return (
    <div>
      <div>
        <select value={selectedItem} onChange={handleChange}>
          <option value="">Select a plant</option>
          {data.allPlants.map((plant) => (
            <option key={plant._id} value={plant._id}>
              {plant.name}
            </option>
          ))}
        </select>
      </div>
        <div>
          <p>testing</p>
        </div>
    </div>
  );
}

export default Dropdown;