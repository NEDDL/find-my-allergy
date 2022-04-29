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
} from "../../../src/store/slices/userSlice";
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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Head from "next/head";

import AuthGuard from "../../../src/auth/authGuard";

const Favorites = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.entities.user);
  const allergicList = userData.allergens;
  const [fav, setFav] = useState(false);
  const [result, setResult] = useState([]);
  const products = useRef([]);

  useEffect(() => {
    if (result.length < userData.favorites.length) {
      loadFavorites();
    }
  });
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const loadFavorites = async () => {
    userData.favorites.map(async (el) => {
      await apiCall(el);
      const updateObj = [...products.current];
      setResult(updateObj);
    });
  };

  const handleRemove = async (id) => {
    if (userData.favorites.includes(id)) {
      await dispatch(removeFavorite({ favorites: id }));
      const removedResult = result.filter(
        (_result) => _result.productId !== id
      );
      setResult(removedResult);
    }
  };

  const handleAdd = (id) => {
    dispatch(addFavorite({ favorites: id }));
  };

  const apiCall = async (searchQuery) => {
    const parameters = {
      code: searchQuery,
      fields:
        "code,product_name,generic_name,category_properties,allergens_hierarchy,ingredients_text",
    };
    await axios
      .get("https://world.openfoodfacts.org/api/v2/search", {
        params: parameters,
      })
      .then((response) => {
        const productDetails = response.data.products[0];
        const allergensRaw = productDetails.allergens_hierarchy;
        const allergens = allergensRaw.map((element) => ({
          allergen: element.replace(/en:/, ""),
          userAllergic: allergicList.includes(element.replace(/en:/, "")),
        }));

        const productCategory = () => {
          try {
            return productDetails.category_properties["ciqual_food_name:en"];
          } catch (err) {
            return "";
          }
        };

        const mappedResult = {
          productId: productDetails.code,
          productName: productDetails.product_name,
          productExplanation: productDetails.generic_name,
          productCategory: productCategory(),
          allergens: allergens,
          productLoaded: true,
          ingredientsMissing:
            productDetails.ingredients_text &&
            productDetails.ingredients_text.length > 0
              ? false
              : true,
          fav: userData.favorites.includes(productDetails.code),
        };

        if (
          products.current.findIndex(
            (product) => product.productId === mappedResult.productId
          ) === -1
        ) {
          products.current.push(mappedResult);
        }
        // setResult([...result, mappedResult]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Head>
        <title>Find my allergy | Favorites</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
            Favorites
          </Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: "white",
            borderRadius: 1,
          }}
        >
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
                            : !favorite.productCategory &&
                              "category not defined"}
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
                  Please add some items in your list to be able to view them
                  later.
                </Typography>
              </Box>
            )}
          </TableContainer>
        </Box>
      </Container>
    </>
  );
};

Favorites.getLayout = (page) => {
  return (
    <>
      <AuthGuard>
        <AppLayout>{page}</AppLayout>
      </AuthGuard>
    </>
  );
};

export default Favorites;
