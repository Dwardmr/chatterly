import React from 'react';
import { useGetUser } from '../../hooks/authenticationHooks';

interface AppContextWrapperProps {
  children: React.ReactNode;
}

const AppContenxtWrapper = ({ children }: AppContextWrapperProps) => {
  useGetUser();
  return children
}
export default AppContenxtWrapper;