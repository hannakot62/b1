import { configureStore } from '@reduxjs/toolkit'
import coinsReducer from "./slices/coinsSlice.js"
import statsReducer from './slices/statsSlice.js'
import favsReducer from'./slices/favsSlice.js'


export const store = configureStore({
    reducer: {
        coins: coinsReducer,
        stats: statsReducer,
        favs: favsReducer,
    },
})



