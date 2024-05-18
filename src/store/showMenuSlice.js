import { createSlice } from "@reduxjs/toolkit";


const showMenuSlice = createSlice({
    name: 'showMenu',
    initialState: {
        showMenu: false,
        writePost: false,
        postContent: ""
    },
    reducers: {
        setShowMenu: (state, action) => {
            state.showMenu = action.payload
        },
        setShowPost: (state, action) => {
            state.writePost = action.payload
        }, 
        setContent: (state, action) => {
            state.postContent = action.payload
        }
    }
})

export default showMenuSlice.reducer;

export const {setShowMenu, setShowPost, setContent} = showMenuSlice.actions;