import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AppLayout from "../../src/components/appLayout";
import axios from "axios";
import toast from "react-hot-toast";

// Redux
import {
  addLastSearched,
  addFavorite,
  removeFavorite,
  loadUser,
} from "../../src/store/userSlice";
import { useSelector, useDispatch } from "../../src/store/configureStore";

// Styling
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
import InfoIcon from "@mui/icons-material/Info";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Search = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.entities.user);
  const allergicList = userData.allergens;
  const lastSearched = userData.lastSearched;
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [fav, setFav] = useState(false);
  const [code, setCode] = useState("");
  const [result, setResult] = useState({
    productId: "",
    productName: "",
    productExplanation: "",
    productCategory: "",
    allergens: [],
    productLoaded: false,
    ingredientsMissing: false,
  });

  useEffect(() => {
    if (router.isReady && router.query.code) {
      apiCall(router.query.code);
      setCode(router.query.code);
    }
  }, [router.isReady]);

  useEffect(() => {
    dispatch(loadUser());
  });

  const handleChange = (e) => {
    setCode(e.target.value.replace(/\D/, ""));
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
          setResult({ productLoaded: false });
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
          router.push({ pathname: "app", query: { code: searchQuery } });

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

  const handleSearch = async () => {
    if (result.productId === code) {
      toast(
        "You are trying to search for the same product. Please change the code to be able to start a new search."
      );
    } else {
      setLoading(true);
      setDisabled(true);
      await apiCall(code);
      setLoading(false);
      setDisabled(false);
    }
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
            Find a product
          </Typography>
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
                {loading ? (
                  <CircularProgress sx={{ p: 1, color: blueGrey[800] }} />
                ) : (
                  <QrCodeIcon sx={{ mx: 1, color: blueGrey[800] }} />
                )}
                <Box
                  sx={{
                    flexGrow: 1,
                    ml: 3,
                  }}
                >
                  <Input
                    disableUnderline
                    fullWidth
                    onChange={handleChange}
                    onPaste={handleChange}
                    value={code}
                    placeholder="Please enter the product barcode number"
                    sx={{
                      backgroundColor: "white",
                      color: grey[800],
                      px: 1,
                    }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Button
                startIcon={<ArrowForwardIcon />}
                disableRipple
                disabled={disabled}
                onClick={handleSearch}
                sx={{
                  width: "100%",
                  cursor: "pointer",
                  color: blueGrey[50],
                  fontWeight: 400,
                  fontSize: "1em",
                  lineHeight: 2.5,
                  textAlign: "left",
                  justifyContent: "flex-start",
                  textTransform: "none",
                  py: 0.5,
                  px: 3,
                  height: 64,
                  borderRadius: 0,
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                  userSelect: "none",
                  backgroundColor: blueGrey[800],
                  "&:hover": {
                    backgroundColor: blueGrey[900],
                  },
                }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
          <Box
            sx={{
              flexGrow: 1,
              backgroundColor: "white",
              borderRadius: 1,
            }}
          >
            {result.productLoaded ? (
              <>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderBottomColor: blueGrey[100],
                    px: 5,
                    py: 4,
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                  }}
                >
                  <Box justifyContent="space-between" sx={{ display: "flex" }}>
                    <Typography
                      variant="h4"
                      sx={{
                        color: grey[900],
                        fontWeight: 700,
                        textTransform: "lowercase",
                        "&:first-letter": { textTransform: "uppercase" },
                      }}
                    >
                      {result.productName}
                    </Typography>
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
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: blueGrey[400],
                        fontWeight: 300,
                        textTransform: "lowercase",
                        "&:first-letter": { textTransform: "uppercase" },
                      }}
                    >
                      {result.productExplanation}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: blueGrey[400],
                        fontWeight: 300,
                        textTransform: "lowercase",
                        "&:first-letter": { textTransform: "uppercase" },
                      }}
                    >
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
                      color: grey[900],
                      fontWeight: 400,
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
                            backgroundColor: red[50],
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
                              color: red[900],
                              fontWeight: 400,
                            }}
                          >
                            We found allergens that matches with your
                            preferences. We marked them red below.
                          </Typography>
                        </Box>
                      </>
                    )
                  ) : (
                    <>
                      <Box
                        sx={{
                          backgroundColor: green[50],
                          display: "flex",
                          p: 2,
                          mb: 4,
                          borderRadius: 1,
                        }}
                      >
                        <InfoIcon sx={{ ml: 2, mr: 1.5, color: green[900] }} />
                        <Typography
                          variant="body1"
                          sx={{
                            color: green[900],
                            fontWeight: 400,
                          }}
                        >
                          We couldn&apos;t find any allergens that matches with
                          your preferences but we listed possible allergens of
                          this product below.
                        </Typography>
                      </Box>
                    </>
                  )}
                  {result.ingredientsMissing ? (
                    <>
                      <Box
                        sx={{
                          backgroundColor: orange[50],
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
                            color: orange[900],
                            fontWeight: 400,
                          }}
                        >
                          The ingredients of this product are missing. So we
                          couldn&apos;t list any allergens
                        </Typography>
                      </Box>
                    </>
                  ) : result.allergens.length == 0 ? (
                    <>
                      <Box
                        sx={{
                          backgroundColor: green[50],
                          display: "flex",
                          p: 2,
                          mb: 4,
                          borderRadius: 1,
                        }}
                      >
                        <InfoIcon sx={{ ml: 2, mr: 1.5, color: green[900] }} />
                        <Typography
                          variant="body1"
                          sx={{
                            color: green[900],
                            fontWeight: 400,
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
                              el.userAllergic ? red[50] : blueGrey[50]
                            }`,
                          }}
                        />
                      ))}
                  </Stack>
                </Box>
              </>
            ) : (
              <Box sx={{ display: "flex", px: 2, py: 4 }}>
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
                    This application uses{" "}
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://world.openfoodfacts.org/"
                      sx={{ color: blueGrey[800] }}
                    >
                      Open Food Facts API
                    </Link>{" "}
                    to find the allergens of a product from its barcode number.
                    This open database includes over 1,000,000 products from 141
                    countries.
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 1,
                      color: grey[800],
                      fontWeight: 300,
                    }}
                  >
                    In addition to the allergens of products, it is also
                    possible to find information regarding their ingredients,
                    vegan / vegetarian / palm oil status, halal / kosher
                    certificates.
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 4,
                      color: grey[800],
                      fontWeight: 300,
                    }}
                  >
                    As this application created for the purpose of a portfolio,
                    the intention of this application is demonstration of
                    software technologies that are used to build this
                    application.
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
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};

Search.getLayout = (page) => {
  return (
    <>
      <AppLayout>{page}</AppLayout>;
    </>
  );
};

export default Search;
