// React, next
import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

// Auth
import { createUser as newUser } from "../../src/database/services/userService";
import { useAuth } from "../../src/hooks/useAuth";
import GuestGuard from "../../src/auth/helpers/guestGuard";

// Styling
import toast from "react-hot-toast";
import { red } from "@mui/material/colors";
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
// Icons
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

// Form management
import { useFormik } from "formik";
import * as Yup from "yup";

const Register = () => {
  const auth = useAuth();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      policy: false,
      submit: null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().max(20).required("First name is required"),
      lastName: Yup.string().max(20).required("Last name is required"),
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().min(7).max(255).required("Password is required"),
      policy: Yup.boolean().oneOf([true], "This field must be checked"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const cred = await auth.createUser(values.email, values.password);
        const userUid = cred.user.uid;

        const payload = {
          user: {
            name: values.firstName,
            lastName: values.lastName,
          },
        };
        await newUser(userUid, payload);

        const returnUrl = router.query.returnUrl || "/app";
        router.push(returnUrl).catch(console.error);
      } catch (err) {
        console.error(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
        toast.error("An error occurred while registering you.");
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
      <CssBaseline />
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
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={Boolean(
                  formik.touched.firstName && formik.errors.firstName
                )}
                helperText={formik.touched.firstName && formik.errors.firstName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.firstName}
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={Boolean(
                  formik.touched.lastName && formik.errors.lastName
                )}
                helperText={formik.touched.lastName && formik.errors.lastName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.lastName}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
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
            <Grid item xs={12}>
              <TextField
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                helperText={formik.touched.password && formik.errors.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                sx={{ alignItems: "flex-start" }}
                required
                control={
                  <Checkbox
                    sx={{
                      marginTop: -1,
                      color: `${
                        formik.touched.policy && formik.errors.policy
                          ? red[700]
                          : null
                      }`,
                    }}
                    value={formik.values.policy}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    id="policy"
                    name="policy"
                    color="primary"
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{
                      color: `${
                        formik.touched.policy && formik.errors.policy
                          ? red[700]
                          : null
                      }`,
                    }}
                  >
                    {
                      "I accept the imaginary terms and conditions. I also accept this application provides no medical advice."
                    }
                  </Typography>
                }
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
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NextLink href="/" passHref>
                <MUILink variant="body2">
                  Already have an account? Sign in
                </MUILink>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

Register.getLayout = (page) => {
  return (
    <>
      <GuestGuard>{page}</GuestGuard>
    </>
  );
};

export default Register;
