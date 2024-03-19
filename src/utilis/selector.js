
// Kategorilerle ilgili yükleme durumu seçicisi
export const selectCategoryLoading = state => state.categories.loading

// Ürünlerle ilgili yükleme durumu seçicisi
export const selectProductLoading = state => state.products.loading

// Kategorilerle ilgili hata durumu seçicisi
export const selectCategoryError = state => state.categories.error

// Ürünlerle ilgili hata durumu seçicisi
export const selectProductError = state => state.products.error

export const selectProducts = state => state.products.products.product



export const selectCategories = (state) => state.categories.categories


export const setCurrentCategory = (state) => state.categories.currentCategory
export const setCurrentSubCategory = (state) => state.categories.currentSubCategory
