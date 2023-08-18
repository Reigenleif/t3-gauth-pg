import { useRouter } from "next/router";
import { ProtectedLayoutProps } from "./base-components/BaseLayout";
import { useEffect, useState } from "react";

export const AuthorizedRoleLayout = ({
    children,
    type,
    session,
  }: ProtectedLayoutProps) => {
    const router = useRouter();
  
    const [authorized, setAuthorized] = useState<boolean>(false);
  
    useEffect(() => {
      authCheck();
  
      // on route change start - hide page content by setting authorized to false
      const hideContent = () => setAuthorized(false);
      router.events.on("routeChangeStart", hideContent);
  
      // on route change complete - run auth check
      router.events.on("routeChangeComplete", authCheck);
  
      // unsubscribe from events in useEffect return function
      return () => {
        router.events.off("routeChangeStart", hideContent);
        router.events.off("routeChangeComplete", authCheck);
      };
    }, []);
  
    const authCheck = () => {
      if (!session) {
        void router.push("/");
      }
    };
  
    return authorized && <>{children}</>;
  };