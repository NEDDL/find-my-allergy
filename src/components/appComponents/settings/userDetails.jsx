import React, { useState, useEffect } from "react";

import { blueGrey, grey, red } from "@mui/material/colors";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

import { updateUserDetails } from "../../../store/slices/userSlice";
import { useSelector, useDispatch } from "../../../store/configureStore";

import { useFormik } from "formik";
import * as Yup from "yup";

const UserDetails = () => {
  const userData = useSelector((state) => state.entities.user);

  useEffect(() => {
    formik.setFieldValue("firstName", userData.user.name);
    formik.setFieldValue("lastName", userData.user.lastName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.user]);

  const dispatch = useDispatch();
  const [modify, setModify] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: userData.user.name,
      lastName: userData.user.lastName,
      submit: null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().max(20).required("First name is required"),
      lastName: Yup.string().max(20).required("Last name is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const payload = {
          user: {
            name: values.firstName,
            lastName: values.lastName,
          },
        };
        await dispatch(updateUserDetails(payload));
        setModify(false);
      } catch (err) {
        console.error(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
        toast.error("An error occurred while registering you.");
      }
    },
  });

  const handleDiscard = () => {
    formik.setFieldValue("firstName", userData.user.name);
    formik.setFieldValue("lastName", userData.user.lastName);
    setModify(false);
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "white",
          borderRadius: 1,
          mb: 3,
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
                User details
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                }}
              >
                You can modify your name and last name in this section.
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Box component="form" noValidate onSubmit={formik.handleSubmit}>
                <Box sx={{ mb: 6 }}>
                  <TextField
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    id="firstName"
                    name="firstName"
                    label="First name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: !modify,
                    }}
                  />
                  <TextField
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    InputProps={{
                      readOnly: !modify,
                    }}
                  />
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
                          disabled={formik.isSubmitting}
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
                          type="button"
                          key="button"
                          onClick={() => setModify(true)}
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

export default UserDetails;
