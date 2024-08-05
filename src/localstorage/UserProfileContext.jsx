// UserContext.js
import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [name, setName] = useState(localStorage.getItem("full_name") || "");

  const updateName = (newName) => {
    setName(newName);
    localStorage.setItem("full_name", newName);
  };

  return (
    <UserContext.Provider value={{ name, updateName }}>
      {children}
    </UserContext.Provider>
  );
};
