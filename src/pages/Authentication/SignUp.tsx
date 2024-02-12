import { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Link as ChakraLink,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, FieldProps } from 'formik';
import { useSignUp } from '../../hooks/authenticationHooks';
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import { AuthSignUpCredentialsType } from '../../hooks/types';
import SignUpError from './SignUpError';
import AuthenticationSuccess from './AuthenticationSuccess';
import { useContextUser } from '../../context/user/useUser';

export const AuthActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

export const SubmitButtonWrapper = styled.div`
  flex-grow: 0;
`;

const SignUp = () => {
  const { user } = useContextUser();
  const { signUp, signUpError } = useSignUp();
  const [show, setShow] = useState(false);
  const handleViewPassword = () => setShow(!show);
  const toast = useToast();

  const handleSubmit = async (values: AuthSignUpCredentialsType, ) => await signUp(values);

  const displayToast = () => {
    toast({
      title: 'Account Created! 🎉',
      description: "A confirmation email has been sent to your inbox.",
      status: 'success',
      duration: 10000,
      isClosable: true,
    });
  };

  return (
    <Formik
      initialValues={{ email: '', password: '', username: '', chat_color: '' }}
      onSubmit={async (values) => handleSubmit(values)}
    >
      {(props) => (
        <Form>
          <Field name="email">
            {({ field, form }: FieldProps<string, AuthSignUpCredentialsType>) => (
              <FormControl id="email" isRequired isInvalid={!!form.errors.email && form.touched.email}>
                <FormLabel>Email</FormLabel>
                <Input {...field} type="email" placeholder="john.doe@mail.com" />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="password">
            {({ field, form }: FieldProps<string, AuthSignUpCredentialsType>) => (
              <FormControl id="password" isRequired isInvalid={!!form.errors.password && form.touched.password}>
                <FormLabel mt={4}>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    {...field}
                    pr="4.5rem"
                    type={show ? 'text' : 'password'}
                    placeholder="Enter a password"
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
          <Field name="username">
            {({ field, form }: FieldProps<string, AuthSignUpCredentialsType>) => (
              <FormControl id="username" isRequired isInvalid={!!form.errors.username && form.touched.username}>
                <FormLabel mt={4}>Username</FormLabel>
                <Input {...field} type="text" placeholder="Example: MightyDuck08" />
                <FormErrorMessage>{form.errors.username}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="chat_color">
            {({ field, form }: FieldProps<string, AuthSignUpCredentialsType>) => (
              <FormControl id="chat_color" isRequired isInvalid={!!form.errors.chat_color && form.touched.chat_color}>
                <FormLabel mt={4}>Chat Color</FormLabel>
                <InputGroup size="md">
                  <Input {...field} type="text" placeholder="#000000" onChange={(e) => { form.setFieldValue("chat_color", e.target.value); }} disabled />
                  <InputRightElement>
                    <ColorPicker setFormColor={(newColor) => form.setFieldValue("chat_color", newColor)} />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{form.errors.chat_color}</FormErrorMessage>
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
            <ChakraLink><Link to='../login'>Already have an account? Log in</Link></ChakraLink>
          </AuthActionContainer>
          <SignUpError error={signUpError} />
          <AuthenticationSuccess data={user} displayToast={displayToast} isSignUp />
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;