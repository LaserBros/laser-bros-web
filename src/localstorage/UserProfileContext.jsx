// UserContext.js
import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [name, setName] = useState(localStorage.getItem("full_name") || "");
  const [image, setImage] = useState(
    localStorage.getItem("profile_image") || ""
  ); // new state for image

  const updateName = (newName) => {
    setName(newName);
    localStorage.setItem("full_name", newName);
  };

  const updateImage = (newImage) => {
    setImage(newImage);
    localStorage.setItem("profile_image", newImage);
  };

  return (
    <UserContext.Provider value={{ name, updateName, image, updateImage }}>
      {children}
    </UserContext.Provider>
  );
};
