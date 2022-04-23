import React, { useState } from "react";
import AppLayout from "../../../src/components/appLayout";

// Redux
import { addAllergens } from "../../../src/store/userSlice";
import { useSelector, useDispatch } from "../../../src/store/configureStore";

// Styling
import { useTheme } from "@mui/material/styles";
import { blueGrey, grey, green, red } from "@mui/material/colors";
import {
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
// Icons
import InfoIcon from "@mui/icons-material/Info";

const Diet = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.entities.user);
  const [selectedAllergen, setSelectedAllergen] = useState(
    userData.allergens || []
  );

  const test = {
    data: {
      name: "",
      lastName: "",
    },
    allergens: [],
    favorites: [],
  };

  const Categories = [
    "milk",
    "gluten",
    "soybeans",
    "eggs",
    "nuts",
    "fish",
    "celery",
    "mustard",
    "peanuts",
    "sulphur dioxide and sulphites",
    "sesame seeds",
    "crustaceans",
    "molluscs",
    "lupin",
  ];

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getStyles(name, selectedAllergen, theme) {
    return {
      fontWeight:
        selectedAllergen.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedAllergen(typeof value === "string" ? value.split(",") : value);
  };

  const handleSave = () => {
    dispatch(addAllergens({ allergens: selectedAllergen }));
  };

  const handleDiscard = () => {
    setSelectedAllergen(userData.allergens);
  };

  return (
    <>
      <Container maxWidth="md" sx={{ p: 5 }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 6,
              color: grey[800],
              fontWeight: 400,
            }}
          >
            My diet
          </Typography>

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
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  pb: 2,
                  borderBottom: 1,
                  borderBottomColor: blueGrey[50],
                  color: grey[900],
                  fontWeight: 400,
                }}
              >
                Adjust my allergens
              </Typography>
              <FormControl sx={{ width: "100%", mb: 6 }}>
                <InputLabel id="multiple-chip-label">
                  Select your allergens
                </InputLabel>
                <Select
                  labelId="multiple-chip-label"
                  id="multiple-chip"
                  multiple
                  value={selectedAllergen}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Select your allergens"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value, index) => (
                        <Chip key={index} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {Categories.map((allergen) => (
                    <MenuItem
                      key={allergen}
                      value={allergen}
                      style={getStyles(allergen, selectedAllergen, theme)}
                    >
                      {allergen}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box sx={{ display: "flex", mb: 10 }}>
                <InfoIcon sx={{ mr: 2, color: grey[800] }} />
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 1,
                      color: grey[800],
                      fontWeight: 300,
                    }}
                  >
                    The allergen list provided above is generated automatically
                    by using{" "}
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://world.openfoodfacts.org/"
                      sx={{ color: blueGrey[800] }}
                    >
                      Open Food Facts API
                    </Link>
                    .
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 4,
                      color: grey[800],
                      fontWeight: 300,
                    }}
                  >
                    The allergen categories that have less than 100 products in
                    Open Food Facts API are excluded to limit the exhaustive
                    list of allergens.
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 1,
                      color: grey[600],
                      fontWeight: 300,
                    }}
                  >
                    All content on this app is created and published online for
                    informational purposes only. It is not intended to be a
                    substitute for professional medical advice and should not be
                    relied on as health or personal advice.
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: grey[600],
                      fontWeight: 300,
                    }}
                  >
                    Always seek the guidance of your doctor or other qualified
                    health professional with any questions you may have
                    regarding your health or a medical condition. Never
                    disregard the advice of a medical professional, or delay in
                    seeking it because of something you have read on this
                    Website.
                  </Typography>
                </Box>
              </Box>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Button
                    variant="text"
                    disableElevation
                    onClick={handleDiscard}
                    sx={{
                      ml: "auto",
                      mr: 0,
                      color: red[800],
                      "&:hover": { backgroundColor: red[50] },
                    }}
                  >
                    Discard changes
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={handleSave}
                    sx={{
                      backgroundColor: blueGrey[800],
                      ml: "auto",
                      mr: 0,
                      "&:hover": { backgroundColor: blueGrey[700] },
                    }}
                  >
                    Save changes
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

Diet.getLayout = (page) => {
  return (
    <>
      <AppLayout>{page}</AppLayout>;
    </>
  );
};

export default Diet;

// This could be used to get the allergens directly from Open Food Facts.
// On the other hand, loading it each time takes significant time and creates delay.
// Could be a solution to check if anything new from time to time.
//
//
// if (filteredAllergenList.length === 0) {
//   console.log("Get operation started");
//   axios
//     .get("https://world.openfoodfacts.org/allergens.json")
//     .then(function (response) {
//       console.log("Got response");
//       const allergens = response.data.tags;
//       const filteredAllergens = allergens.filter(
//         (allergen) =>
//           allergen.id.includes("en:") &&
//           allergen.products >= 100 &&
//           allergen.name !== "None"
//       );
//       const allergenList = filteredAllergens.map((x) => x.name);
//       setFilteredAllergenList(allergenList);
//       console.log(filteredAllergenList);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }
