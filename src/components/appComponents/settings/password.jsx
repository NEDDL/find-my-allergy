import React, { useState } from "react";

import { blueGrey, grey, red } from "@mui/material/colors";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

const Password = () => {
  const [modify, setModify] = useState(true);
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "white",
          borderRadius: 1,
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
              <Box sx={{ mb: 6 }}>
                <TextField
                  fullWidth
                  required
                  margin="normal"
                  variant="outlined"
                  label="Password"
                  InputProps={{
                    readOnly: !modify,
                  }}
                />
                {modify && (
                  <TextField
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                    label="Repeat your password"
                  />
                )}
              </Box>
              {modify ? (
                <>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Button
                        onClick={() => setModify(false)}
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
                        onClick={() => setModify(false)}
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
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Password;