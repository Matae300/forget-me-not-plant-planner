import React, { createContext, useState, useContext, useReducer } from 'react';
import { reducer } from './reducers';

// Create a context for managing plant-related state
export const PlantContext = createContext();

// Custom hook to access plant-related state and functions
export const usePlant = () => useContext(PlantContext);

// Provider component to wrap the app and provide plant-related state
export const PlantProvider = ({ children }) => {
  const [plantsColor, setPlantsColor] = useState(true);
  const [state, dispatch] = useReducer(reducer, { plants: [] }); // Initial state for plants is an empty array

  return (
    <PlantContext.Provider value={{ plantsColor, setPlantsColor, state, dispatch }}>
      {children}
    </PlantContext.Provider>
  );
};
