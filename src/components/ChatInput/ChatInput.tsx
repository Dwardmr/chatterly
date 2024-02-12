import { Dispatch, SetStateAction, KeyboardEvent} from 'react';
import { Textarea } from '@chakra-ui/react'
import { MessageStatus, ApiErrorType } from '../../hooks/types';

interface ChatInputProps {
  text: string,
  setText: Dispatch<SetStateAction<string>>;
  submit: () => void;
  status: MessageStatus;
  error: ApiErrorType | null;
}

export const ChatInput = ({ text, setText, submit, status, error }: ChatInputProps) => {

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.currentTarget.value.trim()) {
        submit();
      }
    }
  };

  return (
    <Textarea value={text} onChange={(e) => setText(e.target.value)} resize='none' onKeyDown={handleKeyDown} placeholder='Type to chat' disabled={status === 'sending'} isInvalid={!!error} />
  );
};

export default ChatInput;