import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './pages/App/App';
import Home from './pages/Home/HomePage';
import AuthenticationPage from './pages/Authentication/AuthenticationPage';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <AuthenticationPage />,
  },
  {
    path: "/login",
    element: <AuthenticationPage />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <App>
        <RouterProvider router={router} />
      </App>
    </ChakraProvider>
  </React.StrictMode>,
)
