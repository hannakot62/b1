import {createSlice} from "@reduxjs/toolkit";
import {setIsLoading, unsetIsLoading} from "./isLoadingSlice.js";
import {setError} from "./errorSlice.js";
import fetchOptions from "../../const/fetchOptions.js";

export const fetchStats = () => {
    return function (dispatch) {
        dispatch(setIsLoading())
        fetch("https://api.coinranking.com/v2/stats", fetchOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error[${response.status}]: ${response.message}`)
                }
                return response.json()
            })
            .then(json => {
                dispatch(getStats(json.data))
            })
            .catch(error => {
                console.error("Error fetching stats:", error)
                dispatch(setError(error))
            })
            .finally(() => dispatch(unsetIsLoading()))
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
