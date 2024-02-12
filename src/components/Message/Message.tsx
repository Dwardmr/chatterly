import React from 'react';
import styled from 'styled-components';
import { Box, Text } from '@chakra-ui/react';
import { SingleMessageWithUserType } from '../../hooks/types';
import { format } from 'date-fns';

type MessageProps = {
  data: SingleMessageWithUserType
}

const Card = styled(Box)`
  transition: background-color 200ms ease-in-out;
  background-color: #f5f5f5;

  &:hover {
    cursor: pointer;
    background-color: #e0e0e0;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const formatTimestamp = (dateString: SingleMessageWithUserType['created_at']): string => {
  const date = new Date(dateString);
  return format(date, 'HH:mm ')
}
const Message = ({ data }: MessageProps) => {
  const { username, chat_color } = data.users;
  const timestamp = formatTimestamp(data.created_at);
  return(
    <Card borderRadius='lg' overflow='hidden' p={2}>
      <HeaderContainer>
        <Text size='sm' color={`${chat_color}`}>{username}</Text>
        <Text size='xs' color='#9e9e9e'>&nbsp;•&nbsp;{timestamp}</Text>
      </HeaderContainer>
      <Text>{data.content}</Text>
    </Card>
  )
}

export default Message;