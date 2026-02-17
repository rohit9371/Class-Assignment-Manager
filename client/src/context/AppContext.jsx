import { createContext, useState } from 'react';

export const AppContent = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const[role, setRole]=useState('');

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  return (
    <AppContent.Provider 
      value={{ backendUrl, isLoggedin, setIsLoggedin, userData, setUserData, role, setRole }}
    >
      {children}
    </AppContent.Provider>
  );
};
