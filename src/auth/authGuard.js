import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const AuthGuard = ({ children }) => {
  const auth = useAuth();
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  console.log(auth);
  useEffect(() => {
    Guard();
  }, []);

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
    } else {
      setChecked(true);
    }
  }
  return <>{children}</>;
};

export default AuthGuard;
