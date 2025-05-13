// ThemeContext.js
import React, { createContext, useContext, useState,useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const [theme, setTheme] = useState(savedTheme);

    const togglenewTheme = () => {
        const newTheme = theme === 'light' ? 'light' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        // Update body class based on theme state
        document.body.className = theme === 'light' ? 'light' : 'light';
    }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, togglenewTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
