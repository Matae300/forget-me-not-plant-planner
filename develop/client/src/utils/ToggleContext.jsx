import React, { createContext, useState, useContext } from 'react';

const ToggleContext = createContext();

export const useToggle = () => useContext(ToggleContext);

export const ToggleProvider = ({ children }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const showDropdownMenu = () => {
    setShowDropdown(true);
  };

  const hideDropdownMenu = () => {
    setShowDropdown(false);
  };

  return (
    <ToggleContext.Provider value={{ showDropdown, showDropdownMenu, hideDropdownMenu }}>
      {children}
    </ToggleContext.Provider>
  );
};