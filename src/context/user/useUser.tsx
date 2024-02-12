import { useContext } from 'react';
import { UserContext } from './UserContext';

export const useContextUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};