import React from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import toast from "react-hot-toast";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Button,
  Link as MUILink,
  Checkbox,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useAuth } from "../../src/hooks/useAuth";
import GuestGuard from "../../src/auth/guestGuard";

const SignUp = () => {
  const auth = useAuth();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await auth.resetPassword(values.email);
        toast.success(
          "Please check your email for password reset instructions."
        );
        const returnUrl = router.query.returnUrl || "/";
        router.push(returnUrl).catch(console.error);
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
        toast.error("An error occurred while resetting your password.");
      }
    },
  });

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Password Recovery
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container sx={{ width: 350 }}>
            <Grid item xs={12}>
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
          </Grid>
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Send a recovery email
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NextLink href="/" passHref>
                <MUILink variant="body2">Sign in</MUILink>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

SignUp.getLayout = (page) => {
  return (
    <>
      <GuestGuard>{page}</GuestGuard>
    </>
  );
};

export default SignUp;
