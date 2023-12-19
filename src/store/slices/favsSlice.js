import {createSlice} from "@reduxjs/toolkit";

export const favsSlice = createSlice({
    name: "favs",
    initialState: getFavsFromLS() ? getFavsFromLS() : [],
    reducers: {
        setFavs: (state, action) => {
            state = action.payload
            setFavsToLS(state)
        },
        removeFavs: (state) => {
            state = []
            deleteFavsFromLS()
        },
        addFav: (state, action) => {
            state.push(action.payload)
            setFavsToLS(state)
        },
        removeFav: (state, action) => {
            state = state.filter(uuid => uuid !== action.payload)
            setFavsToLS(state)
        }
    }
})


export const {setFavs, addFav, removeFav, removeFavs} = favsSlice.actions
export default favsSlice.reducer


export function setFavsToLS(favs) {
    localStorage.setItem('favs', JSON.stringify(favs))
}
export function getFavsFromLS() {
    if (localStorage.getItem('favs')) {
        return JSON.parse(localStorage.getItem('favs'))
    }
}
export function deleteFavsFromLS() {
    localStorage.removeItem('favs')
}