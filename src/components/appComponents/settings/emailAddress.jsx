// React, Next
import React, { useState, useEffect } from "react";

// Auth
import { useAuth } from "../../../hooks/useAuth";

// Redux
import { updateUserDetails } from "../../../store/slices/userSlice";
import { useSelector, useDispatch } from "../../../store/configureStore";

// Styling
import toast from "react-hot-toast";
import { blueGrey, grey, red } from "@mui/material/colors";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

// Form management
import { useFormik } from "formik";
import * as Yup from "yup";

const EmailAddress = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const [modify, setModify] = useState(false);

  useEffect(() => {
    formik.setFieldValue("email", auth.user.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  // function equalTo(ref, msg) {
  //   return this.test({
  //     name: "equalTo",
  //     exclusive: false,
  //     message: msg || "Both values should match.",
  //     params: {
  //       reference: ref.path,
  //     },
  //     test: function (value) {
  //       return value === this.resolve(ref);
  //     },
  //   });
  // }

  // Yup.addMethod(Yup.string, "equalTo", equalTo);

  const formik = useFormik({
    initialValues: {
      email: auth.user.email,
      repeatEmail: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      repeatEmail: Yup.string()
        .oneOf([Yup.ref("email"), null], "Emails should match")
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().min(7).max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await auth.signIn(auth.user.email, values.password);
        await auth.updateEmail(values.email);
        formik.resetForm();
        formik.setFieldValue("repeatEmail", "");
        formik.setFieldValue("password", "");
        setModify(false);
        toast.success("Your email is updated.");
      } catch (err) {
        console.error(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
        toast.error("An error occurred while updating your email.");
      }
    },
  });

  const handleDiscard = () => {
    formik.resetForm();
    formik.setFieldValue("email", auth.user.email);
    formik.setFieldValue("repeatEmail", "");
    setModify(false);
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "white",
          borderRadius: 1,
          mb: 4,
        }}
      >
        <Box
          sx={{
            px: 5,
            pt: 4,
            pb: 6,

            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <Typography
                variant="h5"
                sx={{
                  color: grey[900],
                  fontWeight: 400,
                }}
              >
                Email address
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                }}
              >
                You can modify your email address in this section.
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Box component="form" noValidate onSubmit={formik.handleSubmit}>
                <Box sx={{ mb: 6 }}>
                  <TextField
                    error={Boolean(formik.touched.email && formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    key="email"
                    id="email"
                    name="email"
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                    label="Email address"
                    InputProps={{
                      readOnly: !modify,
                    }}
                  />
                  {modify && (
                    <>
                      <TextField
                        error={Boolean(
                          formik.touched.repeatEmail &&
                            formik.errors.repeatEmail
                        )}
                        helperText={
                          formik.touched.repeatEmail &&
                          formik.errors.repeatEmail
                        }
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.repeatEmail}
                        onPaste={(e) => {
                          e.preventDefault();
                          return false;
                        }}
                        key="repeatEmail"
                        id="repeatEmail"
                        name="repeatEmail"
                        fullWidth
                        required
                        margin="normal"
                        variant="outlined"
                        label="Repeat your email address"
                      />
                      <TextField
                        error={Boolean(
                          formik.touched.password && formik.errors.password
                        )}
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        required
                        fullWidth
                        margin="normal"
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        sx={{ mt: 5 }}
                      />
                    </>
                  )}
                </Box>
                {modify ? (
                  <>
                    <Grid container justifyContent="space-between">
                      <Grid item>
                        <Button
                          onClick={() => handleDiscard()}
                          type="reset"
                          key="reset"
                          variant="text"
                          color="error"
                          sx={{
                            ml: "auto",
                            mr: 0,
                          }}
                        >
                          Discard changes
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          type="submit"
                          key="submit"
                          variant="contained"
                          color="primary"
                          sx={{
                            ml: "auto",
                            mr: 0,
                          }}
                        >
                          Save changes
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid container justifyContent="space-between">
                      <Grid item />
                      <Grid item>
                        <Button
                          onClick={() => setModify(true)}
                          type="button"
                          key="button"
                          variant="contained"
                          color="primary"
                          sx={{
                            ml: "auto",
                            mr: 0,
                          }}
                        >
                          Modify details
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default EmailAddress;
