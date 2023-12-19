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
    initialState: {
        "referenceCurrencyRate": 1,
        "totalCoins": 32827,
        "totalMarkets": 38724,
        "totalExchanges": 169,
        "totalMarketCap": "1652143664746",
        "total24hVolume": "75856580553",
        "btcDominance": 50.80910834513021,
        "bestCoins": [
            {
                "uuid": "IBeYJgW0C",
                "symbol": "AUCTION",
                "name": "Bounce",
                "iconUrl": "https://cdn.coinranking.com/wNMEP2aVN/1_KtgpRIJzuwfHe0Rl0avP_g.png",
                "coinrankingUrl": "https://coinranking.com/coin/IBeYJgW0C+bounce-auction"
            },
            {
                "uuid": "8nxCqs-uj",
                "symbol": "SEI",
                "name": "SEI",
                "iconUrl": "https://cdn.coinranking.com/UW05A1Y2I/DvhxRewX_400x400.PNG",
                "coinrankingUrl": "https://coinranking.com/coin/8nxCqs-uj+sei-sei"
            },
            {
                "uuid": "xJ3WcS1LO",
                "symbol": "ASTR",
                "name": "Astar",
                "iconUrl": "https://cdn.coinranking.com/OSSd1lXDu/12885.png",
                "coinrankingUrl": "https://coinranking.com/coin/xJ3WcS1LO+astar-astr"
            }
        ],
        "newestCoins": [
            {
                "uuid": "J2RG9o6yz",
                "symbol": "MCCHEESE",
                "name": "Mayor McCheese Token",
                "iconUrl": "https://cdn.coinranking.com/bXf9JRRkU/MYR.PNG",
                "coinrankingUrl": "https://coinranking.com/coin/J2RG9o6yz+mayormccheesetoken-mccheese"
            },
            {
                "uuid": "zOq5gMBpA",
                "symbol": "CAP",
                "name": "CAPVERSE",
                "iconUrl": "https://cdn.coinranking.com/A6CvZhhpt/CAPVERSE.PNG",
                "coinrankingUrl": "https://coinranking.com/coin/zOq5gMBpA+capverse-cap"
            },
            {
                "uuid": "AbV4ZyQLQ",
                "symbol": "DAN",
                "name": "Dastra",
                "iconUrl": "https://cdn.coinranking.com/pU7rfiofr/DAN.PNG",
                "coinrankingUrl": "https://coinranking.com/coin/AbV4ZyQLQ+dastra-dan"
            }
        ]
    },
    reducers: {
        getStats: (state, action) => {
            return action.payload
        }
    }
})


export const {getStats} = statsSlice.actions
export default statsSlice.reducer
