import { configureStore } from '@reduxjs/toolkit'

import productsReducer from "../redux/product/productSlice"
import categoryReducer from "../redux/category/categorySlice"


export const store = configureStore({
    reducer: {
        products: productsReducer,
        categories: categoryReducer,


    },
})