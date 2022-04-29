// React, Next
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Auth
import { useAuth } from "../../hooks/useAuth";
import SplashScreen from "../../components/appComponents/splashScreen/splashScreen";

const AuthGuard = ({ children }) => {
  const auth = useAuth();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    Guard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, auth]);

  function Guard(children) {
    if (!auth.isAuthenticated) {
      router
        .push({
          pathname: "/",
          query: { returnUrl: router.asPath },
        })
        .catch(console.error);
    } else {
      setChecked(true);
    }
  }
  return auth.isAuthenticated ? <>{children}</> : <SplashScreen />;
};

export default AuthGuard;
