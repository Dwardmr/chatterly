import { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { useToast } from '@chakra-ui/react';
import { LoginErrorProps } from './LogInError';

const SignUpError = ({ error }: LoginErrorProps) => {
  const { setErrors, setSubmitting } = useFormikContext();
  const toast = useToast();

  useEffect(() => {
    if (error) {
      switch (error.name) {
        case 'AuthWeakPasswordError':
          setErrors({ password: error?.message });
          setSubmitting(false);
          break;
        case 'AuthApiError':
          toast({
            title: 'whoops! 😅',
            description: 'Something went wrong in our side of things, try again later.',
            status: 'error',
            duration: 10000,
            isClosable: true,
          });
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
export default SignUpError;