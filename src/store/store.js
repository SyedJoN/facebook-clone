import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import searchSlice from './searchSlice'
import productSlice from './productSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        search: searchSlice,
        product: productSlice
    }
}
  
)

export default store