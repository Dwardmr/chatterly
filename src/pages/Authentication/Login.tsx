import { useState } from 'react';
import { 
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Link as ChakraLink,
  useToast,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik';
import { AuthActionContainer, SubmitButtonWrapper } from './SignUp';
import { AuthSignInCredentialsType } from '../../hooks/types';
import { useSignIn, useGetUser } from '../../hooks/authenticationHooks';
import LogInError from './LogInError';
import { useContextUser } from '../../context/user/useUser';
import AuthenticationSuccess from './AuthenticationSuccess';

const Login = () => {
  const { user } = useContextUser();
  const { signIn, signInError } = useSignIn();
  useGetUser();
  const toast = useToast();

  const [show, setShow] = useState(false);
  const handleViewPassword = () => setShow(!show);

  const handleSubmit = async (values: AuthSignInCredentialsType, actions: FormikHelpers<AuthSignInCredentialsType>) => {
    await signIn(values);
    actions.setSubmitting(false);
  };
  const displayToast = () => {
    toast({
      title: 'Welcome back',
      description: "Successfully logged in.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return(
    <>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values, actions) => handleSubmit(values, actions)}
      >
        {(props) => (
          <Form>
            <Field name="email">
              {({ field, form }: FieldProps<string, AuthSignInCredentialsType>) => (
                <FormControl id="email" isRequired isInvalid={!!form.errors.email && form.touched.email}>
                  <FormLabel>Email</FormLabel>
                  <Input {...field} type="email" placeholder="john.doe@mail.com" />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }: FieldProps<string, AuthSignInCredentialsType>) => (
                <FormControl id="password" isRequired isInvalid={!!form.errors.password && form.touched.password}>
                  <FormLabel mt={4}>Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      {...field}
                      pr="4.5rem"
                      type={show ? 'text' : 'password'}
                      placeholder="Enter your password"
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleViewPassword}>
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <AuthActionContainer>
              <SubmitButtonWrapper>
                <Button
                  colorScheme="blue"
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Submit
                </Button>
              </SubmitButtonWrapper>
              <ChakraLink><Link to='../signup'>Don't have an account yet? Sign up</Link></ChakraLink>
            </AuthActionContainer>
            <LogInError error={signInError} />
            <AuthenticationSuccess data={user} displayToast={displayToast} />
          </Form>
        )}
      </Formik>
    </>
  );
}
export default Login;