import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import AppLayout from "../../../src/components/appLayout";
import axios from "axios";

import {
  loadUser,
  addFavorite,
  removeFavorite,
} from "../../../src/store/userSlice";
import { useSelector, useDispatch } from "../../../src/store/configureStore";

import { blueGrey, grey, red } from "@mui/material/colors";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Input,
  Stack,
  Typography,
  Link,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const Settings = () => {
  return (
    <>
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
      </Container>
    </>
  );
};

Settings.getLayout = (page) => {
  return (
    <>
      <AppLayout>{page}</AppLayout>;
    </>
  );
};

export default Settings;
