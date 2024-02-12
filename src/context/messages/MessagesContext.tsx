import { createContext, FC, ReactNode, useState, Dispatch, SetStateAction } from 'react';
import { MessageWithUserArrayType } from '../../hooks/types';

interface MessagesContextType {
  messages: MessageWithUserArrayType;
  setMessages: Dispatch<SetStateAction<MessageWithUserArrayType>>;
}

export const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

interface MessagesProviderProps {
  children: ReactNode;
}

export const MessagesProvider: FC<MessagesProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<MessageWithUserArrayType>([]);

  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};

