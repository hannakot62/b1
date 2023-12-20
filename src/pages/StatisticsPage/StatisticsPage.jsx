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

    useEffect(() => {
        const options = {
            headers: {
                'x-access-token': import.meta.env.VITE_COINRANKING_API_KEY,
            },
        };

        const fetchBest = async () => {
            dispatch(setIsLoading())
            const fetchedData = [];
            for (const coin of stats.bestCoins) {
                try {
                    const response = await fetch(`https://api.coinranking.com/v2/coin/${coin.uuid}`, options)
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const result = await response.json();
                    const coinData = await result.data.coin
                    fetchedData.push(coinData);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            setBest(fetchedData);
        };

        const fetchNewest = async () => {
            dispatch(setIsLoading())
            const fetchedData = [];
            for (const coin of stats.newestCoins) {
                try {
                    const response = await fetch(`https://api.coinranking.com/v2/coin/${coin.uuid}`, options)
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const result = await response.json();
                    const coinData = await result.data.coin
                    fetchedData.push(coinData);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            setNewest(fetchedData);
        };

        fetchBest().then(dispatch(unsetIsLoading()))
        fetchNewest().then(dispatch(unsetIsLoading()))

    }, [stats])

    return (isLoading ? <Loader/> :
            (<div className={style.wrapper}>
                {stats && <div className={style.info}>
                    <h3>Total number of coins: <span>{stats.totalCoins}</span></h3>
                    <h3>Total amount of markets used for price calculation: <span>{stats.totalMarkets}</span></h3>
                    <h3>Market capitalization: <span>{stats.totalMarketCap}</span></h3>
                    <h3>Total trade volume in 24h: <span>{stats.total24hVolume}</span></h3>
                </div>}

                {!!best.length && <h2>Three best performing coins in the last 24h</h2>}
                {!!best.length && <div className={style.best}>
                    <TopCoin coin={best[1]} position={2}/>
                    <TopCoin coin={best[0]} position={1}/>
                    <TopCoin coin={best[2]} position={3}/>
                </div>}

                {!!newest.length && <h2 className={style.dark}>Three newest coins</h2>}
                {!!newest.length && <div className={style.newest}>
                    <TopCoin coin={newest[0]} position={0}/>
                    <TopCoin coin={newest[1]} position={0}/>
                    <TopCoin coin={newest[2]} position={0}/>
                </div>}
            </div>)
    )
}