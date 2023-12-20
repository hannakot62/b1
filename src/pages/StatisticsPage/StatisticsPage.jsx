import style from './StatisticsPage.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchStats} from "../../store/slices/statsSlice.js";
import TopCoin from "../../components/TopCoin/TopCoin";
import Loader from "../../components/Loader/Loader";
import {setIsLoading, unsetIsLoading} from "../../store/slices/isLoadingSlice.js";

export default function StatisticsPage() {
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.isLoading)
    const [best, setBest] = useState([]);
    const [newest, setNewest] = useState([]);

    const stats = useSelector(state => state.stats)
    useEffect(() => {
        dispatch(fetchStats())
    }, []);

    useEffect(()=>{
        const options = {
            headers: {
                'x-access-token': import.meta.env.VITE_COINRANKING_API_KEY,
            },
        };

        async function fetchCoin(uuid) {
            const response = await fetch(`https://api.coinranking.com/v2/coin/${uuid}`, options)
            const json = await response.json()
            return await json.data.coin
        }
        async function fetchBest(){
            dispatch(setIsLoading())
            await Promise.all(stats.bestCoins.map(async coin => await fetchCoin(coin.uuid))).then(r => setBest(r))
        }
        async function fetchNewest(){
            dispatch(setIsLoading())
            await Promise.all(stats.newestCoins.map(async coin => await fetchCoin(coin.uuid))).then(r => setNewest(r))
        }
        fetchBest().then(()=>dispatch(unsetIsLoading()))
        fetchNewest().then(()=>dispatch(unsetIsLoading()))

    },[stats])

    return (isLoading ? <Loader/> :
            (<div className={style.wrapper}>
                {stats && <div className={style.info}>
                    <h3>Total number of coins: <span>{stats.totalCoins}</span></h3>
                    <h3>Total amount of markets used for price calculation: <span>{stats.totalMarkets}</span></h3>
                    <h3>Market capitalization: <span>{stats.totalMarketCap}</span></h3>
                    <h3>Total trade volume in 24h: <span>{stats.total24hVolume}</span></h3>
                </div>}
                <h2>Three best performing coins in the last 24h</h2>

                {stats && <div className={style.best}>
                    <TopCoin coin={best[1]} position={2}/>
                    <TopCoin coin={best[0]} position={1}/>
                    <TopCoin coin={best[2]} position={3}/>
                </div>}

                <h2 className={style.dark}>Three newest coins</h2>
                {stats && <div className={style.newest}>
                    <TopCoin coin={newest[0]} position={0}/>
                    <TopCoin coin={newest[1]} position={0}/>
                    <TopCoin coin={newest[2]} position={0}/>
                </div>}
            </div>)
    )
}