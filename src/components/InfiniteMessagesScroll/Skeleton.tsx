import React from 'react';
import { Stack, Skeleton as ChakraSkeleton } from '@chakra-ui/react';

const Skeleton = () => {
  return(
    <Stack>
      <ChakraSkeleton height='4rem' />
      <ChakraSkeleton height='4rem' />
      <ChakraSkeleton height='4rem' />
    </Stack>
  );
}
export default Skeleton;