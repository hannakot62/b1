import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
    name: "error",
    initialState: null,
    reducers: {
        setError: (state, action) => {
            console.log(action.payload)
            return action.payload
        },
        clearError: () => null,
    },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;