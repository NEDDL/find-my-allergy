import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const AuthGuard = ({ children }) => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    Guard();
  }, [router.isReady]);

  function Guard(children) {
    if (!auth.isAuthenticated) {
      if (router.isReady) {
        router
          .push({
            pathname: "/",
            query: { returnUrl: router.asPath },
          })
          .catch(console.error);
      }
    }
  }
  return <>{children}</>;
};

export default AuthGuard;
