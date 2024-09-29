import { createSlice } from "@reduxjs/toolkit";


const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchFocus: false,
    },
    reducers: {
        setSearchFocus: (state, action) => {
            state.searchFocus = action.payload
        },
       
    }
})

export default searchSlice.reducer;

export const {setSearchFocus} = searchSlice.actions;