// context/JobContext.js
"use client";
import React, { createContext, useContext, useState } from "react";

// Create context
const JobContext = createContext();

// Export a provider
export const JobProvider = ({ children }) => {
  const [selectedJobId, setSelectedJobId] = useState(null);

  return (
    <JobContext.Provider value={{ selectedJobId, setSelectedJobId }}>
      {children}
    </JobContext.Provider>
  );
};

// Custom hook to use context
export const useJobContext = () => useContext(JobContext);
