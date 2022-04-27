import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "./useAuth";

export const withPublicGuard = (Component) => {
  return function Guard() {
    const auth = useAuth();
    const router = useRouter();

    if (auth.isAuthenticated) {
      if (router.isReady) {
        router.push("/app").catch(console.error);
      }
    }

    return <Component />;
  };
};

export const withAuthGuard = (Component) => {
  return function Guard() {
    const auth = useAuth();
    const router = useRouter();

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

    return <Component />;
  };
};
