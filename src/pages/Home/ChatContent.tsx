import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { 
  Button,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ChatInput from '../../components/ChatInput/ChatInput';
import { usePostMessage } from '../../hooks/messageHooks';
import { useLogout } from '../../hooks/authenticationHooks';
import { useContextUser } from '../../context/user/useUser';
import ChatColorIdentity from './ChatColorIdentity';

const ChatWrapper = styled.div`
  width: 100%;
  padding: 16px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`;

const ButtonWrapper = styled.div`
  flex-grow: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const IdentityContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0.5rem 0;
  gap: 8px;
`;

const ChatContent = () => {
  const { user } = useContextUser();
  const { postMessage, postMessageStatus, setPostMessageStatus, postMessageError } = usePostMessage();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const toast = useToast();

  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if(postMessageStatus === 'success') {
      setMessage('');
      setPostMessageStatus('idle');
    }
    if(postMessageStatus === 'error') {
      toast({
        title: 'Couldn\'t send message',
        description: postMessageError?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
      setPostMessageStatus('idle');
    }
  }, [postMessageStatus, setPostMessageStatus, postMessageError, toast]);

  const submitData = async (): Promise<void> => {
    postMessage(message);
  }

  const handleLogOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout().then(() => {
      navigate('/login');
    });
  }

  return(
    <ChatWrapper>
      <ContentContainer>
        <ChatInput text={message} setText={setMessage} submit={submitData} status={postMessageStatus} error={postMessageError} />
        <IdentityContainer>
          <ChatColorIdentity color={user?.user_metadata?.chat_color} />
          <Text>{user?.user_metadata?.username}</Text>
        </IdentityContainer>
        <ButtonContainer>
          <ButtonWrapper>
            <Button onClick={handleLogOut}>Logout</Button>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button colorScheme='blue' onClick={submitData}>Chat</Button>
          </ButtonWrapper>
        </ButtonContainer>
      </ContentContainer>
    </ChatWrapper>
  );
}
export default ChatContent;