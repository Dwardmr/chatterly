import { useState, useEffect } from 'react';
import supabase from '../util/supabaseClient';
import { AuthSignUpCredentialsType, AuthSignInCredentialsType, ApiErrorType } from './types';
import { useContextUser } from '../context/user/useUser';

export const useSignUp = () => {
  const { setUser } = useContextUser();
  const [signUpLoading, setSignUpLoading] = useState<boolean>(false);
  const [signUpError, setSignUpError] = useState<ApiErrorType | null>(null);

  const signUp = async ({ email, password, username, chat_color }: AuthSignUpCredentialsType) => {
    setSignUpLoading(true);
    setUser(null);
    setSignUpError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            chat_color
          },
        },
      });
      if (error) {
        setSignUpError({
          name: error.name,
          message: error.message,
        });
        setUser(null);
      } else{
        setUser(data?.user);
        setSignUpError(null);
      }
    } 
    finally {
      setSignUpLoading(false);
    }
  };

  return { signUp, signUpLoading, signUpError };
};

export const useSignIn = () => {
  const { setUser } = useContextUser();
  const [signInLoading, setSignInLoading] = useState<boolean>(false);
  const [signInError, setSignInError] = useState<ApiErrorType | null>(null);

  const signIn = async ({ email, password }: AuthSignInCredentialsType) => {
    setSignInLoading(true);
    setSignInError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setSignInError({
          name: error.name,
          message: error.message,
        });
        setUser(null);
      } else {
        setUser(data.user);
        setSignInError(null);
      }
    } finally {
      setSignInLoading(false);
    }
  };

  return { signIn, signInLoading, signInError };
};

export const useLogout = () => {
  const { setUser } = useContextUser();
  const [logoutLoading, setSignoutLoading] = useState<boolean>(false);
  const [logoutError, setLogoutError] = useState<ApiErrorType | null>(null);

  const logout = async () => {
    setUser(null);
    setSignoutLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setLogoutError({
          name: error.name,
          message: error.message,
        });
      }
    } finally {
      setSignoutLoading(false);
    }
  };
  return { logout, logoutLoading, logoutError };
};

export const useGetUser = () => {
  const { setUser } = useContextUser();
  const [getUserLoading, setGetUserLoading] = useState<boolean>(true);
  const [getUserError, setGetUserError] = useState<ApiErrorType | null>(null);

  useEffect(() => {
    const getUser = async () => {
      setGetUserLoading(true);
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        setGetUserError({
          name: error.name,
          message: error.message,
        });
      } else{
        setUser(data?.user);
        setGetUserError(null);
      }
      setGetUserLoading(false);
    };

    getUser();
  }, [setUser]);

  return { getUserLoading, getUserError };
};
