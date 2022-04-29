// React, Next
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import Head from "next/head";
import axios from "axios";

// Auth
import AuthGuard from "../../../src/auth/helpers/authGuard";

// Redux
import {
  loadUser,
  addFavorite,
  removeFavorite,
} from "../../../src/store/slices/userSlice";
import { useSelector, useDispatch } from "../../../src/store/configureStore";

// Styling
import AppLayout from "../../../src/components/appLayout";
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
import { ProductTable } from "../../../src/components/appComponents/productTable/productTable";

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
          <ProductTable result={result} />
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
