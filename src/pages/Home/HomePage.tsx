import React from 'react';
import styled from 'styled-components';
import InfiniteMessagesScroll from '../../components/InfiniteMessagesScroll/InfiniteMessagesScroll';
import { useGetMessages, useSubscribeToMessages } from '../../hooks/messageHooks';
import ChatContent from './ChatContent';
import { useContextMessages } from '../../context/messages/useMessages';

interface TopContentProps {
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch';
}

const HomeWrapper = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TopContent = styled.div <TopContentProps>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  overflow-y: scroll;
  margin-bottom: 8px;
  justify-content: ${(props) => props.justifyContent || 'normal'};
  /* justify-content: center */
`;

const BottomContent = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 8px;
`;


const Home = () => {
  const { getMessagesStatus, getMessagesError } = useGetMessages();
  const { messages } = useContextMessages();
  useSubscribeToMessages();
  return(
    <HomeWrapper>
      <p>{getMessagesError?.message}</p>
      <TopContent justifyContent={!messages.length && getMessagesStatus === 'success' ? 'center' : undefined}>
        <InfiniteMessagesScroll data={messages} status={getMessagesStatus} error={getMessagesError} />
      </TopContent>
      <BottomContent>
        <ChatContent />
      </BottomContent>
    </HomeWrapper>
  );
};

export default Home;