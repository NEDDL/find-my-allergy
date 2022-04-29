// React, Next
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";

// Auth
import AuthGuard from "../../src/auth/helpers/authGuard";

// Redux
import {
  addLastSearched,
  addFavorite,
  removeFavorite,
  loadUser,
} from "../../src/store/slices/userSlice";
import { useSelector, useDispatch } from "../../src/store/configureStore";

// Styling
import toast from "react-hot-toast";
import AppLayout from "../../src/components/appLayout";
import { blueGrey, grey, green, orange, red } from "@mui/material/colors";
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
import QrCodeIcon from "@mui/icons-material/QrCode";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Form management
import { useFormik } from "formik";
import * as Yup from "yup";

// Components
import { Disclaimer } from "../../src/components/appComponents/disclaimer/disclaimer";
import { ProductPresenter } from "../../src/components/appComponents/productPresenter/productPresenter";

const Search = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.entities.user);
  const allergicList = userData.allergens;
  const lastSearched = userData.lastSearched;
  const [code, setCode] = useState("");
  const [fav, setFav] = useState(false);
  const [result, setResult] = useState({
    productId: "",
    productName: "",
    productExplanation: "",
    productCategory: "",
    allergens: [],
    productLoaded: false,
    ingredientsMissing: false,
  });

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: async (values, helpers) => {
      console.log("Submit activated");
      try {
        await apiCall(values.code);
      } catch (err) {
        console.error(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  console.log(result);

  useEffect(() => {
    dispatch(loadUser());
  });

  const handleChange = (e) => {
    formik.setFieldValue("code", e.target.value.replace(/\D/, ""));
  };

  const handleFavorite = () => {
    if (userData.favorites.includes(result.productId)) {
      dispatch(removeFavorite({ favorites: result.productId }));
      setFav(false);
    } else {
      dispatch(addFavorite({ favorites: result.productId }));
      setFav(true);
    }
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
      .then(async (response) => {
        if ((await response.data.count) === 0) {
          toast.error("We couldn't find the product. Please try again.");
        } else {
          const productDetails = response.data.products[0];
          const allergensRaw = await productDetails.allergens_hierarchy;

          const allergens = allergensRaw.map((element) => ({
            allergen: element.replace(/en:/, ""),
            userAllergic: allergicList.includes(element.replace(/en:/, "")),
          }));

          dispatch(addLastSearched({ lastSearched: searchQuery }));

          const productCategory = () => {
            try {
              return productDetails.category_properties["ciqual_food_name:en"];
            } catch (err) {
              return "";
            }
          };
          setResult({
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
          });
          setFav(userData.favorites.includes(productDetails.code));

          toast.success("Product information is loaded.");
        }
      })
      .catch((err) => {
        toast.error(
          "An error occurred during loading your product. Please see the console for further explanation"
        );
        console.log(err);
      });
  };

  return (
    <>
      <Head>
        <title>Find my allergy | Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="md" sx={{ p: 5 }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              mb: 6,
            }}
          >
            Find a product
          </Typography>
          <Box
            sx={{ display: "flex", width: "100%" }}
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <Grid
              container
              justifyContent="space-between"
              spacing={0}
              sx={{ mb: 4 }}
            >
              <Grid item xs={9}>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    borderBottomLeftRadius: 5,
                    borderTopLeftRadius: 5,
                    backgroundColor: "white",
                    p: 2,
                  }}
                >
                  {formik.isSubmitting ? (
                    <CircularProgress sx={{ p: 1 }} />
                  ) : (
                    <QrCodeIcon sx={{ mx: 1 }} />
                  )}
                  <Box
                    sx={{
                      flexGrow: 1,
                      ml: 3,
                    }}
                  >
                    <Input
                      onChange={handleChange}
                      onPaste={handleChange}
                      value={formik.values.code}
                      id="code"
                      name="code"
                      disableUnderline
                      fullWidth
                      placeholder="Please enter the product barcode number"
                      sx={{
                        px: 1,
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Button
                  startIcon={<ArrowForwardIcon />}
                  variant="contained"
                  type="submit"
                  key="submit"
                  disabled={formik.isSubmitting}
                  sx={{
                    width: "100%",
                    justifyContent: "flex-start",
                    height: 64,
                    px: 4,
                    borderRadius: 0,
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                  }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              backgroundColor: "white",
              borderRadius: 1,
            }}
          >
            {result.productLoaded ? (
              <ProductPresenter
                fav={fav}
                result={result}
                handleFavorite={handleFavorite}
              />
            ) : (
              <Disclaimer />
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Search;

Search.getLayout = (page) => {
  return (
    <>
      <AuthGuard>
        <AppLayout>{page}</AppLayout>
      </AuthGuard>
    </>
  );
};
