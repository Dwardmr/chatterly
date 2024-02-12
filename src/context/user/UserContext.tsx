import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { User } from '@supabase/supabase-js';

export interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
