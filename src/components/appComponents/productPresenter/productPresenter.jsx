// React, Next
import React from "react";

// Styling
import { blueGrey, grey, green, orange, red } from "@mui/material/colors";
import { Box, Chip, Stack, Typography } from "@mui/material";
// Icons
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoIcon from "@mui/icons-material/Info";

export const ProductPresenter = ({ result, fav, handleFavorite }) => {
  return (
    <>
      <Box
        sx={{
          borderBottom: 1,
          borderBottomColor: "grey.300",
          px: 5,
          py: 4,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        }}
      >
        <Box justifyContent="space-between" sx={{ display: "flex", mb: 1 }}>
          <Typography variant="h4">{result.productName}</Typography>
          {fav ? (
            <FavoriteIcon
              onClick={handleFavorite}
              sx={{
                fontSize: 30,
                ml: 2,
                mt: 0.5,
                color: red[600],
                transition: "all 100ms ease-in-out",
                "&:hover": {
                  color: grey[600],
                },
              }}
            />
          ) : (
            <FavoriteBorderIcon
              onClick={handleFavorite}
              sx={{
                fontSize: 30,
                ml: 2,
                mt: 0.5,
                color: grey[400],
                transition: "all 100ms ease-in-out",
                "&:hover": {
                  color: red[600],
                },
              }}
            />
          )}
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h6">{result.productExplanation}</Typography>
          <Typography variant="h6">
            {result.productExplanation ? ", " : null}
            {result.productCategory}
          </Typography>
        </Box>
      </Box>
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
          }}
        >
          Allergens
        </Typography>

        {result.allergens.some((e) => e.userAllergic == true) ||
        result.allergens.length == 0 ? (
          result.allergens.length != 0 && (
            <>
              <Box
                sx={{
                  backgroundColor: "error.light",
                  display: "flex",
                  p: 2,
                  mb: 4,
                  borderRadius: 1,
                }}
              >
                <InfoIcon sx={{ ml: 2, mr: 1.5, color: red[900] }} />
                <Typography
                  variant="body1"
                  sx={{
                    color: "error.main",
                    fontWeight: "fontWeightRegular",
                  }}
                >
                  We found allergens that matches with your preferences. We
                  marked them red below.
                </Typography>
              </Box>
            </>
          )
        ) : (
          <>
            <Box
              sx={{
                backgroundColor: "success.light",
                display: "flex",
                p: 2,
                mb: 4,
                borderRadius: 1,
              }}
            >
              <InfoIcon sx={{ ml: 2, mr: 1.5, color: "success.main" }} />
              <Typography
                variant="body1"
                sx={{
                  color: "success.main",
                  fontWeight: "fontWeightRegular",
                }}
              >
                We couldn&apos;t find any allergens that matches with your
                preferences but we listed possible allergens of this product
                below.
              </Typography>
            </Box>
          </>
        )}
        {result.ingredientsMissing ? (
          <>
            <Box
              sx={{
                backgroundColor: "warning.light",
                display: "flex",
                p: 2,
                mb: 4,
                borderRadius: 1,
              }}
            >
              <InfoIcon sx={{ ml: 2, mr: 1.5, color: orange[900] }} />
              <Typography
                variant="body1"
                sx={{
                  color: "warning.main",
                  fontWeight: "fontWeightRegular",
                }}
              >
                The ingredients of this product are missing. So we couldn&apos;t
                list any allergens
              </Typography>
            </Box>
          </>
        ) : result.allergens.length == 0 ? (
          <>
            <Box
              sx={{
                backgroundColor: "success.light",
                display: "flex",
                p: 2,
                mb: 4,
                borderRadius: 1,
              }}
            >
              <InfoIcon sx={{ ml: 2, mr: 1.5, color: "success.main" }} />
              <Typography
                variant="body1"
                sx={{
                  color: "success.main",
                  fontWeight: "fontWeightRegular",
                }}
              >
                We couldn&apos;t find any allergens for this product.
              </Typography>
            </Box>
          </>
        ) : null}

        <Stack direction="row" spacing={1}>
          {result.allergens &&
            result.allergens.map((el, index) => (
              <Chip
                key={index}
                label={el.allergen}
                sx={{
                  textTransform: "capitalize",
                  backgroundColor: `${
                    el.userAllergic ? "error.light" : "success.light"
                  }`,
                }}
              />
            ))}
        </Stack>
      </Box>
    </>
  );
};
