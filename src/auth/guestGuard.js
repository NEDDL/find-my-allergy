import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SplashScreen from "../components/appComponents/splashScreen/splashScreen";
import { useAuth } from "../hooks/useAuth";

const GuestGuard = ({ children }) => {
  const auth = useAuth();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    Guard();
    //eslint-disable-next-line
  }, [router.isReady, auth]);

  function Guard(children) {
    if (auth.isAuthenticated) {
      router.push("/app").catch(console.error);
    } else {
      setChecked(true);
    }
  }
  return !auth.isAuthenticated ? <>{children}</> : <SplashScreen />;
};

export default GuestGuard;
