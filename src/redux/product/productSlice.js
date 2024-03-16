// todosSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import product from './todosService'; // Servis fonksiyonlarını içe aktar
import { getProduct } from './productService';
import { baseURL } from '../baseUrl';



export const getProducts = createAsyncThunk('getProducts', async () => {
    const response = await getProduct(`${baseURL}/product/get-all-products`);
    return response.data;
});



const initialState = {
    products: [],
    detailProduct: "",
    loading: "false",
    sucsess: "false",
    error: "false"

}


const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setDetailProduct: (state, action) => {
            return { ...state, detailProduct: action.payload };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.sucsess = false

            }).addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.sucsess = true
                state.products = action.payload
            }).addCase(getProducts.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.sucsess = false

            })
    },
});


export const { setDetailProduct } = productSlice.actions;
export default productSlice.reducer;
