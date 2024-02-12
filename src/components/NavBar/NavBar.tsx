import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';

const NavBarWrapper = styled.div`
  height: 64px;
  width: 100%;
  background-color: #2b6cb0;
  border-bottom: 1px solid #161925;
  display: flex;
  justify-content: space-between;
  padding: 8px;
`;

const NavBar = () => {
  return(
    <NavBarWrapper>
      <Logo />
    </NavBarWrapper>
  );
}

export default NavBar;
