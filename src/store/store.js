import { configureStore } from '@reduxjs/toolkit'

import showMenuSlice from './showMenuSlice'


const store = configureStore({
    reducer: {
        showMenu: showMenuSlice,
    }
}
  
)

export default store