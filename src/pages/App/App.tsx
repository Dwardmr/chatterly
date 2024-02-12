import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import styled from 'styled-components';
import { MessagesProvider } from '../../context/messages/MessagesContext';
import { UserProvider } from '../../context/user/UserContext';
import AppContenxtWrapper from './AppContenxtWrapper';

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: normal;
  padding-top: 24px;
  height: calc(100dvh - 64px);
  background-color: #fcfcfc;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 580px;
  height: 100%;
`;

type AppProps = {
  children: React.ReactElement
}

const App = ({ children }: AppProps) => {
  return (
    <div>
      <UserProvider>
        <MessagesProvider>
          <NavBar />
          <AppWrapper>
            <ContentWrapper>
              <AppContenxtWrapper>
                {children}
              </AppContenxtWrapper>
            </ContentWrapper>
          </AppWrapper>
        </MessagesProvider>
      </UserProvider>
    </div >
  );
}

export default App;
