import { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { ApiErrorType } from '../../hooks/types';
import { useToast } from '@chakra-ui/react';

export interface LoginErrorProps {
  error: ApiErrorType | null;
}

const LogInError = ({ error }: LoginErrorProps) => {
  const { setErrors, setSubmitting } = useFormikContext();
  const toast = useToast();
  
  useEffect(() => {
    if (error) {
    switch (error.name) {
      case 'AuthApiError':
        setErrors({ email: error?.message });
        setSubmitting(false);
        break;
      default:
        toast({
          title: 'whoops! 😅',
          description: error.message,
          status: 'error',
          duration: 10000,
          isClosable: true,
        });
        setSubmitting(false);
        break;
    }
  }
  }, [error, setErrors, setSubmitting, toast]);

  return null;
}
export default LogInError;