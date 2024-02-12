import React from 'react';
import { Button } from '@chakra-ui/react';

const ChatColorIdentity = ({ color }: { color: string }) => {
  return <Button
    key={color}
    aria-label={color}
    background={color}
    height="22px"
    width="22px"
    padding={0}
    minWidth="unset"
    borderRadius={3}
    _hover={{ background: color }}
  ></Button>;
}
export default ChatColorIdentity;