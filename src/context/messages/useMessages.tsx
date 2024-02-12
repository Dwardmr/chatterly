import { useContext } from 'react';
import { MessagesContext } from './MessagesContext';

export const useContextMessages = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
};