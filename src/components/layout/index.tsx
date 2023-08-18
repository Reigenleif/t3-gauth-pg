import { Flex } from "@chakra-ui/react";
import { Navbar } from "./Navbar";

interface LayoutProps {
    children: React.ReactNode
    type?: 'signin' | 'signup'
}

export default function Layout({children,type} : LayoutProps) {
    return <Flex flexDir="column" w="100vw" overflowX="hidden">
        <Navbar type={type}/>
        {children}
    </Flex>
}