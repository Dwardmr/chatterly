import React from 'react';
import Message from '../Message/Message';
import styled from 'styled-components';
import { MessageWithUserArrayType, ApiErrorType, GetMessageStatus } from '../../hooks/types';
import EmptyState from './EmptyState';
import Skeleton from './Skeleton';

const InfiniteScrollWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export type InfiniteMessagesScrollProps = {
  data: MessageWithUserArrayType,
  status: GetMessageStatus,
  error: ApiErrorType | null,
}

const InfiniteMessagesScroll = ({ data, status, error }: InfiniteMessagesScrollProps) => {

  if (status === 'loading') return <Skeleton />;
  
  if (status === 'error') return <EmptyState error={error} />;

  if (status === 'success' && data.length === 0) return <EmptyState />;

  return(
    <InfiniteScrollWrapper>
      {data.length > 0 && data.map((message, index) => 
        <Message 
          data={message}
          key={`${message.id}-${index}`} 
        />
        )}
    </InfiniteScrollWrapper>
  )
};

export default InfiniteMessagesScroll;