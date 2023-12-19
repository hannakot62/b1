import { configureStore } from '@reduxjs/toolkit'
import coinsReducer from "./slices/coinsSlice.js"


export const store = configureStore({
    reducer: {
        coins: coinsReducer,
    },
})



