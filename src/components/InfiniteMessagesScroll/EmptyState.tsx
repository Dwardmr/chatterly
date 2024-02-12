import React from 'react';
import {
  Text,
} from '@chakra-ui/react';
import {
  ChatIcon,
} from '@chakra-ui/icons';
import styled from 'styled-components';
import { ApiErrorType } from '../../hooks/types';

interface EmptyStateProps {
  error?: ApiErrorType | null;
}

const EmptyStateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const EmptyState = ({ error }: EmptyStateProps) => {
  return(
    <EmptyStateWrapper>
      <ChatIcon boxSize={24} color={error ? '#C55D5D' : '#A9A9A9'} />
      <TextWrapper>
        <Text fontSize='4xl' color='#A9A9A9'>{ error ? "Something went wrong" : 'No messages to show here... yet'}</Text>
        <Text fontSize='lg' color='#A9A9A9'>{error ? error.message : 'Be the first to kick off the conversation!'}</Text>
      </TextWrapper>
    </EmptyStateWrapper>
  );
}
export default EmptyState;