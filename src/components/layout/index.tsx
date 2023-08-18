import { Flex } from "@chakra-ui/react";
import { Navbar } from "./Navbar";

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({children} : LayoutProps) {
    return <Flex flexDir="column" w="100vw" overflowX="hidden">
        <Navbar/>
        {children}
    </Flex>
}