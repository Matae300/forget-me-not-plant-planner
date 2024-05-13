import React from "react";

import { usePlantData } from "../utils/PlantDataContext";

const PlantDetail = () => {
    const { selectedPlant, setSelectedPlant } = usePlantData();
    if (!selectedPlant) return null;

    const handleClear = () => {
      setSelectedPlant(null);  // Clears the selected plant data
  };

    return (
        <div>
            <h2>{selectedPlant.name}</h2>
            <img src={selectedPlant.photoUrl} alt={`Image of ${selectedPlant.name}`}  style={{ maxWidth: '250px', maxHeight: '250px' }} />
            <p>
                <strong>{selectedPlant.description}</strong><br />
                <strong>Sun Exposure:</strong> {selectedPlant.sunExposure}<br />
                <strong>Growing Months:</strong> {selectedPlant.growingMonths}<br />
                <strong>Blooming Months:</strong> {selectedPlant.bloomingMonths}<br />
                <strong>Watering Instructions:</strong> {selectedPlant.wateringTask.instructions}<br />
                <strong>Watering Frequency:</strong> {selectedPlant.wateringTask.frequencyCount} time(s) a {selectedPlant.wateringTask.frequencyUnit} every {selectedPlant.wateringTask.frequencyInterval} day(s)
            </p>
            <button onClick={handleClear}>Close</button>
        </div>
    );
};

export default PlantDetail;