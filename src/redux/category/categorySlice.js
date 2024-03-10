// todosSlice.jscategory
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getCategory } from './categoryService';
import { baseURL } from '../baseUrl';




export const getCategories = createAsyncThunk('getCategorys', async () => {
    const response = await getCategory(`${baseURL}/category/`);
    return response.data;
});





const initialState = {
    categories: [],
    loading: "false",
    sucsess: "false",
    error: "false"

}


const CategorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.loading = true
                state.error = false
                state.sucsess = false


            }).addCase(getCategories.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.sucsess = true
                state.categories = action.payload
            }).addCase(getCategories.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.sucsess = false
            })

    },
});

export default CategorySlice.reducer;
