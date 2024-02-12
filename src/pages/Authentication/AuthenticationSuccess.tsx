import { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';

interface SignUpSuccessProps {
  data: User | null;
  displayToast?: () => void;
  isSignUp?: boolean;
}

const AuthenticationSuccess = ({ data, displayToast, isSignUp }: SignUpSuccessProps) => {
  const { setSubmitting, resetForm } = useFormikContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      displayToast && displayToast();
      setSubmitting(false);
      resetForm();
      isSignUp ? navigate('/login') : navigate('/')
    }
  }, [data, navigate, resetForm, setSubmitting, displayToast, isSignUp]);

  return null;
};

export default AuthenticationSuccess