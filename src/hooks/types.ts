import { Tables } from '../util/supabaseTypes';
import { Session, User, WeakPassword } from '@supabase/supabase-js';
import { UserContextType } from '../context/user/UserContext';

export type MessageWithUserArrayType = (
  Omit<Tables<'messages'>, 'user_id'> & {
    users: Omit<Tables<'users'>, 'created_at'>;
  }
)[];

export type SingleMessageWithUserType = MessageWithUserArrayType[number];

export type MessageStatus = 'idle' | 'sending' | 'error' | 'success';

export type GetMessageStatus = 'idle' | 'loading' | 'error' | 'success';

export type AuthSignUpCredentialsType = {
  email: string;
  password: string;
  username: string;
  chat_color: string;
};

export type SignUpDataStateType = {
  user: User | null;
  session: Session | null;
} | null;


export type ApiErrorType = {
  name: string;
  message: string;
};

export type AuthSignInCredentialsType = {
  email: string;
  password: string;
};

export type SignInDataStateType = SignUpDataStateType extends null ? { 
  weakPassword?: null; 
} : SignUpDataStateType & { 
  weakPassword?: WeakPassword | null; 
};

export type UseLogoutPropsType = Pick<UserContextType, 'setUser'>;