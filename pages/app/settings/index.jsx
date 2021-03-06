// React, Next
import React, { useEffect } from "react";
import Head from "next/head";

// Auth
import AuthGuard from "../../../src/auth/helpers/authGuard";

// Redux
import { loadUser } from "../../../src/store/slices/userSlice";
import { useDispatch } from "../../../src/store/configureStore";

// Styling
import AppLayout from "../../../src/components/appLayout";

import { Box, Container, Typography } from "@mui/material";

// Components
import UserDetails from "../../../src/components/appComponents/settings/userDetails";
import EmailAddress from "../../../src/components/appComponents/settings/emailAddress";
import Password from "../../../src/components/appComponents/settings/password";

const Settings = () => {
  const dispatch = useDispatch();

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
