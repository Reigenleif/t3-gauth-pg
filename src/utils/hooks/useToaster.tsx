import { useToast } from "@chakra-ui/react";

export const useToaster = () => {
    const toast = useToast();

    const toaster = (fn: () => Promise<any>) => {
        fn().then((res) => {
            toast({
                title: "Success",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }).catch((err) => {
            toast({
                title: "Error",
                description: err.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        });
    }

    return toaster;
}
