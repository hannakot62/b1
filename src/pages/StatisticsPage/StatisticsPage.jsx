import style from './StatisticsPage.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchStats} from "../../store/slices/statsSlice.js";
import TopCoin from "../../components/TopCoin/TopCoin";
import Loader from "../../components/Loader/Loader";
import {setIsLoading, unsetIsLoading} from "../../store/slices/isLoadingSlice.js";
import {setError} from "../../store/slices/errorSlice.js";
import ErrorPage from "../ErrorPage/ErrorPage.jsx";
import fetchOptions from "../../const/fetchOptions.js";



export default function StatisticsPage() {
    const dispatch = useDispatch()
    const [best, setBest] = useState([]);
    const [newest, setNewest] = useState([]);

    const stats = useSelector(state => state.stats)
    const isLoading = useSelector(state => state.isLoading)
    const error = useSelector(state => state.error)

    useEffect(() => {
        dispatch(fetchStats())
    }, []);

    useEffect(() => {
        const fetchData = async (coinsArray, type) => {
            dispatch(setIsLoading());
            const fetchedData = [];

            for (const coin of coinsArray) {
                try {
                    const response = await fetch(`https://api.coinranking.com/v2/coin/${coin.uuid}`, fetchOptions);

                    if (!response.ok) {
                        throw new Error(`Error [${response.status}]: ${response.statusText}`);
                    }

                    const result = await response.json();
                    const coinData = await result.data.coin;
                    fetchedData.push(coinData);
                } catch (error) {
                    console.error(`Error fetching ${type}:`, error);
                    dispatch(setError(error));
                }
            }
            type === 'best' ? setBest(fetchedData) : setNewest(fetchedData);
            dispatch(unsetIsLoading());
        }

        fetchData(stats.bestCoins, 'best');
        fetchData(stats.newestCoins, 'newest');
    }, [stats, dispatch]);

    return (
        <> {error ? <ErrorPage/> :
            <div className={style.wrapper}>

                {isLoading ? <Loader/> : <>

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

                </>}
            </div>
        }
        </>
    )
}