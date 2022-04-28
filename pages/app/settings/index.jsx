import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import AppLayout from "../../../src/components/appLayout";

import { loadUser } from "../../../src/store/slices/userSlice";
import { useSelector, useDispatch } from "../../../src/store/configureStore";

import { blueGrey, grey, red } from "@mui/material/colors";
import { Box, Container, Typography } from "@mui/material";
import UserDetails from "../../../src/components/appComponents/settings/userDetails";
import EmailAddress from "../../../src/components/appComponents/settings/emailAddress";
import Password from "../../../src/components/appComponents/settings/password";
import Head from "next/head";

import { useAuth } from "../../../src/hooks/useAuth";
import AuthGuard from "../../../src/auth/authGuard";

const Settings = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.entities.user);
  const auth = useAuth();

  useEffect(() => {
    dispatch(loadUser());
  });

  return (
    <>
      <Head>
        <title>Find my allergy | Settings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="md" sx={{ p: 5 }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: 8,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              pb: 6,
            }}
          >
            Settings
          </Typography>
        </Box>
        <UserDetails />
        <EmailAddress />
        <Password />
      </Container>
    </>
  );
};

Settings.getLayout = (page) => {
  return (
    <>
      <AuthGuard>
        <AppLayout>{page}</AppLayout>
      </AuthGuard>
    </>
  );
};

export default Settings;
