import React, { createContext, useContext, useState } from 'react';

interface AppContextValue {
  darkMode: boolean;
  toggleDarkMode: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (v: boolean) => void;
}

const AppContext = createContext<AppContextValue>({} as AppContextValue);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function toggleDarkMode() {
    setDarkMode(d => {
      const next = !d;
      document.documentElement.classList.toggle('dark', next);
      return next;
    });
  }

  return (
    <AppContext.Provider value={{ darkMode, toggleDarkMode, searchQuery, setSearchQuery, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
