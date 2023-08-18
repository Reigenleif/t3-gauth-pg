import { api } from "~/utils/api";
import { useState } from "react";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useToaster } from "~/utils/hooks/useToaster";
import Layout from "./layout";

export const SignUp = () => {
  const toaster = useToaster();

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
  };

  const createUserMutation = api.user.createUser.useMutation();

  const credentialSignUp = (email: string, password: string) => {
    toaster(() => createUserMutation.mutateAsync({ email, password }));
  };

  const credentialButtonClickHandler = () => {
    credentialSignUp(emailInput, passwordInput);
  };

  return (
    <Layout>
      <Flex justifyContent="center">
        <Flex
          flexDirection="column"
          border="1px solid black"
          borderRadius="10px"
          p="1em"
          w="min(30em,95%)"
        >
          <Text textAlign="center">Sign Up</Text>
          <Input
            mt="1em"
            w="100%"
            value={emailInput}
            onChange={emailChangeHandler}
          />
          <Input
            mt="1em"
            w="100%"
            value={passwordInput}
            onChange={passwordChangeHandler}
          />
          <Button
            onClick={credentialButtonClickHandler}
            w="50%"
            m="auto"
            mt="1em"
          >
            Sign Up
          </Button>
        </Flex>
      </Flex>
    </Layout>
  );
};
