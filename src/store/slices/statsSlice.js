import {createSlice} from "@reduxjs/toolkit";
import {setIsLoading, unsetIsLoading} from "./isLoadingSlice.js";


export const fetchStats = () => {
    const options = {
        headers: {
            'x-access-token': import.meta.env.VITE_COINRANKING_API_KEY,
        },
    };
    return function (dispatch) {
        dispatch(setIsLoading())
        fetch("https://api.coinranking.com/v2/stats", options)
            .then(response => response.json())
            .then(json => {
                dispatch(getStats(json.data))
            }).then(() => dispatch(unsetIsLoading()))
    }
}

export const statsSlice = createSlice({
    name: "stats",
    initialState: null,
    reducers: {
        getStats: (state, action) => {
            return action.payload
        }
    }
})


export const {getStats} = statsSlice.actions
export default statsSlice.reducer
