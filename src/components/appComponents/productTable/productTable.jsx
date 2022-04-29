// React, Next
import React from "react";

// Styling
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
// Icons
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const ProductTable = ({ result }) => {
  return (
    <TableContainer sx={{ pt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="tableHeader">Barcode</Typography>
            </TableCell>
            <TableCell width="40%">
              <Typography variant="tableHeader">Product</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="tableHeader">Allergens</Typography>
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {result.map((favorite) => {
            return (
              <TableRow
                hover
                key={favorite.productId}
                sx={{
                  "&.MuiTableRow-root:hover": {
                    backgroundColor: "#FBFBFB",
                  },
                }}
              >
                <TableCell>
                  <Typography variant="subtitle1">
                    {favorite.productId}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">
                    {favorite.productName}
                  </Typography>
                  <Typography variant="subtitle2">
                    {favorite.productExplanation
                      ? favorite.productExplanation
                      : !favorite.productCategory && "category not defined"}
                    {favorite.productExplanation && ", "}
                    {favorite.productCategory}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    {favorite.allergens.map((allergen, index) => {
                      return (
                        <Chip
                          key={index}
                          label={allergen.allergen}
                          size="small"
                          sx={{
                            backgroundColor: `${
                              allergen.userAllergic
                                ? "error.light"
                                : blueGrey[50]
                            }`,
                          }}
                        />
                      );
                    })}
                  </Stack>
                </TableCell>
                <TableCell align="right">
                  {favorite.fav ? (
                    <FavoriteIcon
                      onClick={() => handleRemove(favorite.productId)}
                      sx={{
                        fontSize: 25,
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
                      onClick={() => handleAdd(favorite.productId)}
                      sx={{
                        fontSize: 25,
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
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {result.length == 0 && (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            px: 2,
            py: 4,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ alignText: "center", mx: "auto" }}
          >
            Please add some items in your list to be able to view them later.
          </Typography>
        </Box>
      )}
    </TableContainer>
  );
};
