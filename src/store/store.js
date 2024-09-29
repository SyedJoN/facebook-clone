import { configureStore } from '@reduxjs/toolkit'

import showMenuSlice from './showMenuSlice'
import searchSlice from './searchSlice'


const store = configureStore({
    reducer: {
        showMenu: showMenuSlice,
        search: searchSlice
    }
}
  
)

export default store