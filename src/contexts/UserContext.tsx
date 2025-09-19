import { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  isSignedIn: boolean;
  sectionName: string | null;
  classCode: string | null;
  setIsSignedIn: (signedIn: boolean) => void;
  setSectionInfo: (sectionName: string, classCode: string) => void;
  clearUserData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [isSignedIn, setIsSignedIn] = useState(() => {
    return localStorage.getItem('isSignedIn') === 'true';
  });
  
  const [sectionName, setSectionName] = useState<string | null>(() => {
    return localStorage.getItem('sectionName');
  });
  
  const [classCode, setClassCode] = useState<string | null>(() => {
    return localStorage.getItem('classCode');
  });

  const setSectionInfo = (newSectionName: string, newClassCode: string) => {
    setSectionName(newSectionName);
    setClassCode(newClassCode);
    localStorage.setItem('sectionName', newSectionName);
    localStorage.setItem('classCode', newClassCode);
  };

  const clearUserData = () => {
    setIsSignedIn(false);
    setSectionName(null);
    setClassCode(null);
    localStorage.removeItem('isSignedIn');
    localStorage.removeItem('sectionName');
    localStorage.removeItem('classCode');
  };

  const handleSetIsSignedIn = (signedIn: boolean) => {
    setIsSignedIn(signedIn);
    localStorage.setItem('isSignedIn', signedIn.toString());
  };

  const value = {
    isSignedIn,
    sectionName,
    classCode,
    setIsSignedIn: handleSetIsSignedIn,
    setSectionInfo,
    clearUserData,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};