import { api } from "~/utils/api";
import { useState } from "react";
import { Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import { useToaster } from "~/utils/hooks/useToaster";
import { PasswordInput } from "~/utils/elements/PasswordInput";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface SignUpProps {
  csrfToken: string;
}

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
});

schema.refine((data) => data.password === data.confirmPassword, {
  message: "Password and Confirm Password must be the same",
});

type FieldType = z.infer<typeof schema>;

export const SignUp = ({ csrfToken }: SignUpProps) => {
  const toast = useToast();
  const toaster = useToaster();

  const { register, formState, getValues, setValue, handleSubmit } =
    useForm<FieldType>({
      resolver: zodResolver(schema),
    });

  const createUserMutation = api.user.createUser.useMutation();

  const credentialSignUp = (email: string, password: string) => {
    // TODO: Kasih CSRF Validation & reCAPTCHA
    toaster(createUserMutation.mutateAsync({ email, password }));
  };

  const credentialButtonClickHandler = handleSubmit(async (data: FieldType) => {
    credentialSignUp(data.email, data.password);
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
        <Text textAlign="center">Sign Up</Text>
        <Input {...register("email")} mt="1em" w="100%" placeholder="Email" />
        <PasswordInput
          {...register("password")}
          mt="1em"
          w="100%"
          placeholder="Password"
        />
        <PasswordInput
          {...register("confirmPassword")}
          mt="1em"
          w="100%"
          placeholder="Confirm Password"
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
  );
};
