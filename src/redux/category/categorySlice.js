// todosSlice.jscategory
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getCategory } from './categoryService';
import { baseURL } from '../baseUrl';




export const getCategories = createAsyncThunk('getCategorys', async () => {
    const response = await getCategory(`${baseURL}/category/`);
    localStorage.setItem("Categories", JSON.stringify(response.data))
    return response.data;
});





const initialState = {
    categories: [],
    currentCategory: "Yemek",
    currentSubCategory: "Kahvaltı",
    loading: "false",
    sucsess: "false",
    error: "false"

}


const CategorySlice = createSlice({
    name: 'category',
    initialState,

    reducers: {
        setCategory: (state, action) => {
            return { ...state, currentCategory: action.payload };
        },
        setSubCategory: (state, action) => {
            return { ...state, currentSubCategory: action.payload };
        }
    },
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


export const { setCategory, setSubCategory } = CategorySlice.actions;
export default CategorySlice.reducer;
