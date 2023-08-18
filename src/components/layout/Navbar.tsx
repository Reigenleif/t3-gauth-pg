import { Button, Flex, Text } from "@chakra-ui/react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"

export const Navbar = () => {
    const router = useRouter()

    return <Flex justifyContent="space-between" px="2em" py="0.5em" alignItems="center" mb="1em">
        <Text> Hello </Text>
        <Button onClick={() => signIn()}> Sign In </Button>
    </Flex>
}