import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "products",
  initialState: {
    products: [
      {
        productId: "",
        productName: "",
        productExplanation: "",
        productCategory: "",
        allergens: [],
        ingredientsMissing: false,
      },
    ],
  },
  reducers: {
    addProduct: (products, action) => {
      products.push({
        productId: action.payload.productId,
        productName: action.payload.productName,
        productExplanation: action.payload.productExplanation,
        productCategory: action.payload.productCategory,
        allergens: action.payload.allergens,
        ingredientsMissing: action.payload.ingredientsMissing,
      });
    },
  },
});

export const { productLoaded } = slice.actions;
export default slice.reducer;
