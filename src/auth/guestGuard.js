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
    if (auth.isAuthenticated) {
      console.log(auth.isAuthenticated);
      router.push("/app").catch(console.error);
    }
  }
  return <>{children}</>;
};

export default AuthGuard;
