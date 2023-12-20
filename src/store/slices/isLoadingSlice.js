import { createSlice } from '@reduxjs/toolkit'


const isLoadingSlice = createSlice({
    name: 'isLoading',
    initialState: false,
    reducers: {
        setIsLoading(state) {
            return true
        },
        unsetIsLoading(state) {
            return false
        },
    }
})

export const { setIsLoading, unsetIsLoading } = isLoadingSlice.actions
export default isLoadingSlice.reducer

