import React from 'react';
import {
  Box,
  Text
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import SignUp from './SignUp';
import Login from './Login';

const AuthenticationContainer = styled(Box)`
  width: 100%;
  display: flex;
  box-shadow: 0px 2px 4px rgba(0,0,0,0.2), 0px 4px 5px rgba(0,0,0,0.14), 0px 1px 10px rgba(0,0,0,0.12);
  flex-direction: column;
  gap: 1rem;
`;

const AuthenticationPage = () => {
  const location = useLocation();

  return(
    <AuthenticationContainer borderWidth='1px' borderRadius='lg' overflow='hidden' padding={16} paddingTop={8}>
      {
        location.pathname === '/signup' && <>
          <Text fontSize='3xl'>Create new account</Text>
          <SignUp />
        </>
      }
      {
        location.pathname === '/login' && <>
          <Text fontSize='3xl'>Log in</Text>
          <Login />
        </>
      }
    </AuthenticationContainer>
  );
}
export default AuthenticationPage;