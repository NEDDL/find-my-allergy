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

  const formik = useFormik({
    initialValues: {
      newPassword: "1234567",
      repeatPassword: "",
      currentPassword: "",
      submit: null,
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(7, "Password must be at least 7 characters")
        .max(255)
        .required("Password is required"),
      repeatPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords should match")
        .min(7, "Password must be at least 7 characters")
        .max(255)
        .required("Password is required"),
      currentPassword: Yup.string()
        .min(7, "Password must be at least 7 characters")
        .max(255)
        .required("Old password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await auth.signIn(auth.user.email, values.currentPassword);
        await auth.updatePassword(values.newPassword);
        formik.resetForm();
        formik.setFieldValue("newPassword", "1234567");
        formik.setFieldValue("repeatPassword", "");
        formik.setFieldValue("currentPassword", "");
        setModify(false);
        toast.success("Your password is updated.");
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
    formik.setFieldValue("newPassword", "1234567");
    formik.setFieldValue("repeatPassword", "");
    formik.setFieldValue("currentPassword", "");
    setModify(false);
  };
  const handleModify = () => {
    formik.resetForm();
    formik.setFieldValue("newPassword", "");
    formik.setFieldValue("repeatPassword", "");
    formik.setFieldValue("currentPassword", "");
    setModify(true);
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
                Password
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                }}
              >
                You can modify your password in this section.
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Box component="form" noValidate onSubmit={formik.handleSubmit}>
                <Box sx={{ mb: 6 }}>
                  <TextField
                    error={Boolean(
                      formik.touched.newPassword && formik.errors.newPassword
                    )}
                    helperText={
                      formik.touched.newPassword && formik.errors.newPassword
                    }
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.newPassword}
                    name="newPassword"
                    id="newPassword"
                    autoComplete="new-password"
                    type="password"
                    label="New Password"
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: !modify,
                    }}
                  />
                  {modify && (
                    <>
                      <TextField
                        error={Boolean(
                          formik.touched.repeatPassword &&
                            formik.errors.repeatPassword
                        )}
                        helperText={
                          formik.touched.repeatPassword &&
                          formik.errors.repeatPassword
                        }
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.repeatPassword}
                        name="repeatPassword"
                        id="repeatPassword"
                        autoComplete="new-password"
                        type="password"
                        fullWidth
                        required
                        margin="normal"
                        variant="outlined"
                        label="Repeat your password"
                      />
                      <TextField
                        error={Boolean(
                          formik.touched.currentPassword &&
                            formik.errors.currentPassword
                        )}
                        helperText={
                          formik.touched.currentPassword &&
                          formik.errors.currentPassword
                        }
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.currentPassword}
                        required
                        fullWidth
                        margin="normal"
                        name="currentPassword"
                        label="Current Password"
                        type="password"
                        id="currentPassword"
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
                          onClick={() => handleModify()}
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
