import { api } from "~/utils/api";
import { FormEvent, FormEventHandler, useState } from "react";
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  Input,
  Text,
} from "@chakra-ui/react";
import { useToaster } from "~/utils/hooks/useToaster";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { PasswordInput } from "~/utils/elements/PasswordInput";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";

interface SignInProps {
  csrfToken: string;
}

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FieldType = z.infer<typeof schema>;

export const SignIn = ({ csrfToken }: SignInProps) => {
  const toaster = useToaster();
  const router = useRouter();

  const { data: session } = useSession();

  const { register, formState, getValues, setValue, handleSubmit } =
    useForm<FieldType>({
      resolver: zodResolver(schema),
    });

  const credentialSignIn = (email: string, password: string) => {
    toaster(
      signIn("credentials", { email, password, redirect: true, csrfToken })
    );
  };

  const googleSignIn = () => {
    toaster(signIn("google", { redirect: true, csrfToken }));
  };

  const credentialSignInHandler = handleSubmit(async (data: FieldType) => {
    credentialSignIn(data.email, data.password);
  });

  return (
    <Flex justifyContent="center">
      <Flex
        flexDirection="column"
        border="1px solid black"
        borderRadius="10px"
        p="1em"
        w="min(30em,95%)"
      >
        <Text textAlign="center">Sign In</Text>
        <form onSubmit={credentialSignInHandler}>
          <FormControl>
            <Input
              {...register("email")}
              mt="1em"
              w="100%"
              placeholder="Email"
              id="EmailInput"
            />

            <PasswordInput
              {...register("password")}
              mt="1em"
              w="100%"
              type="password"
              placeholder="Password"
            />

            <Flex w="100%" flexDir="column" mt="1em">
              <Button type="submit" w="50%" m="auto">
                Sign In with Email
              </Button>
              <Button m="auto" mt="1em" w="50%" onClick={googleSignIn}>
                <Button
                  m="auto"
                  mt="1em"
                  onClick={googleSignIn}
                  w="60%"
                  as={Flex}
                  gap="1em"
                  cursor="pointer"
                >
                  <FcGoogle size="1.5em" /> Masuk dengan Google
                </Button>
                Sign In with Google
              </Button>
            </Flex>

            <Flex pos="relative" p="10" alignItems="center">
              <Divider color="black" />
              <AbsoluteCenter
                bg="white"
                fontSize="xl"
                w="2em"
                textAlign="center"
              >
                or
              </AbsoluteCenter>
            </Flex>
            <Flex w="100%">
              <Button onClick={() => router.push("/signup")} w="50%" m="auto">
                Sign Up
              </Button>
            </Flex>
          </FormControl>
        </form>
        {session ? (
          <Text>Logged in as {session.user.email}</Text>
        ) : (
          <Text>Not logged in</Text>
        )}
      </Flex>
    </Flex>
  );
};
