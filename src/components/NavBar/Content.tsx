import React from 'react';
import styled from 'styled-components';
import {
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
} from '@chakra-ui/icons';

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Content = () => {
  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  }
  return (
    <ContentWrapper>
      <Menu>
        <MenuButton>
          <IconButton icon={<HamburgerIcon />} aria-label='Main Menu' />
        </MenuButton>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </ContentWrapper>
  );
};

// M7.715,4.929v3.857c0,0.179-0.063,0.331-0.188,0.456S7.25,9.429,7.071,9.429H0.644c-0.179,0-0.331-0.063-0.456-0.188S0,8.964,0,8.786V4.929c0-0.179,0.063-0.33,0.188-0.456c0.125-0.125,0.277-0.188,0.456-0.188h0.214V3c0-0.821,0.295-1.527,0.884-2.116C2.331,0.295,3.036,0,3.857,0s1.526,0.295,2.116,0.884C6.563,1.473,6.857,2.179,6.857,3v1.286h0.214c0.179,0,0.331,0.063,0.456,0.188C7.652,4.599,7.715,4.75,7.715,4.929z M2.144,4.286h3.428V3c0-0.473-0.167-0.877-0.502-1.212S4.33,1.286,3.857,1.286c-0.474,0-0.877,0.167-1.212,0.502S2.144,2.527,2.144,3V4.286z M4.715,6c0-0.236-0.084-0.438-0.251-0.606c-0.168-0.167-0.37-0.251-0.606-0.251S3.419,5.227,3.251,5.394C3.084,5.562,3,5.764,3,6c0,0.166,0.043,0.315,0.128,0.449c0.084,0.134,0.198,0.239,0.341,0.315L3.007,8.297C2.984,8.364,2.996,8.427,3.04,8.484c0.045,0.058,0.103,0.087,0.175,0.087H4.5c0.071,0,0.13-0.029,0.175-0.087C4.719,8.427,4.73,8.364,4.708,8.297L4.246,6.764c0.143-0.076,0.256-0.181,0.341-0.315S4.715,6.166,4.715,6z


export default Content;
