import React, { createContext, useContext, useState } from 'react';

const PlantDataContext = createContext();

export const usePlantData = () => useContext(PlantDataContext);

export const PlantDataProvider = ({ children }) => {
    const [selectedPlant, setSelectedPlant] = useState(null);
    return (
        <PlantDataContext.Provider value={{ selectedPlant, setSelectedPlant }}>
            {children}
        </PlantDataContext.Provider>
    );
};