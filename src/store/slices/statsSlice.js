import {createSlice} from "@reduxjs/toolkit";


export const fetchStats = () => {
    const options = {
        headers: {
            'x-access-token': import.meta.env.VITE_COINRANKING_API_KEY,
        },
    };
    return function (dispatch) {
        fetch("https://api.coinranking.com/v2/stats",options)
            .then(response => response.json())
            .then(json => {
                dispatch(getStats(json.data))
                console.log(json.data)
            })
    }
}

export const statsSlice = createSlice({
    name: "stats",
    initialState: {},
    reducers: {
        getStats: (state, action) => {
            return action.payload
        }
    }
})


export const {getStats} = statsSlice.actions
export default statsSlice.reducer
