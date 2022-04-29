// React, Next
import React from "react";

// Styling
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
} from "@mui/material";
// Icons
import InfoIcon from "@mui/icons-material/Info";

export const Disclaimer = () => {
  return (
    <Box sx={{ display: "flex", px: 2, py: 4 }}>
      <InfoIcon sx={{ mr: 2, color: "text.primary" }} />
      <Box>
        <Typography
          variant="body2"
          sx={{
            mb: 1,
          }}
        >
          This application uses{" "}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://world.openfoodfacts.org/"
          >
            Open Food Facts API
          </Link>{" "}
          to find the allergens of a product from its barcode number. This open
          database includes over 1,000,000 products from 141 countries.
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mb: 1,
          }}
        >
          In addition to the allergens of products, it is also possible to find
          information regarding their ingredients, vegan / vegetarian / palm oil
          status, halal / kosher certificates.
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mb: 4,
          }}
        >
          As this application created for the purpose of a portfolio, the
          intention of this application is demonstration of software
          technologies that are used to build this application.
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1,
          }}
        >
          All content on this app is created and published online for
          informational purposes only. It is not intended to be a substitute for
          professional medical advice and should not be relied on as health or
          personal advice.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Always seek the guidance of your doctor or other qualified health
          professional with any questions you may have regarding your health or
          a medical condition. Never disregard the advice of a medical
          professional, or delay in seeking it because of something you have
          read on this Website.
        </Typography>
      </Box>
    </Box>
  );
};
