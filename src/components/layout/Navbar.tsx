import { Button, Flex, Text } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

interface NavbarProps {
  type?: "signin" | "signup";
}

export const Navbar = ({ type }: NavbarProps) => {
  const router = useRouter();

  return (
    <Flex
      justifyContent="space-between"
      px="2em"
      py="0.5em"
      alignItems="center"
      mb="1em"
    >
      <Text onClick={() => router.push("/")}> Hello </Text>
      {(type === "signin" || type === "signup") && (
        <Button onClick={() => signIn()}> Sign In </Button>
      )}
    </Flex>
  );
};
