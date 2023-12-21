import {createSlice} from "@reduxjs/toolkit";
import {setIsLoading, unsetIsLoading} from "./isLoadingSlice.js";
import {setError} from "./errorSlice.js";


export const fetchCoins = () => {
    const options = {
        headers: {
            'x-access-token': import.meta.env.VITE_COINRANKING_API_KEY,
        },
    };

    return function (dispatch) {
        dispatch(setIsLoading())
        fetch("https://api.coinranking.com/v2/coins", options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error[${response.status}]: ${response.message}`)
                }
                return response.json()
            })
            .then(json => {
                dispatch(getCoins(json.data.coins))
            })
            .catch(error => {
                console.error("Error fetching coins:", error)
                dispatch(setError(error))
            })
            .finally(() => dispatch(unsetIsLoading()))
    }
}

export const coinsSlice = createSlice({
    name: "coins",
    initialState:[],
    reducers: {
        getCoins: (state, action) => {
            return action.payload
        }
    }
})


export const {getCoins} = coinsSlice.actions
export default coinsSlice.reducer
