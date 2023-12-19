import style from './StatisticsPage.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchStats} from "../../store/slices/statsSlice.js";
import TopCoin from "../../components/TopCoin/TopCoin";

export default function StatisticsPage() {
    const dispatch = useDispatch()
    const stats = useSelector(state => state.stats)
    console.log(stats)
    // useEffect(() => {
    //     dispatch(fetchStats())
    // }, []);
    return (
        <div className={style.wrapper}>
            <div className={style.info}>
                <h3>Total number of coins: <span>{stats.totalCoins}</span></h3>
                <h3>Total amount of markets used for price calculation: <span>{stats.totalMarkets}</span></h3>
                <h3>Market capitalization: <span>{stats.totalMarketCap}</span></h3>
                <h3>Total trade volume in 24h: <span>{stats.total24hVolume}</span></h3>
            </div>
                <h2>Three best performing coins in the last 24h</h2>

            <div className={style.best}>
                <TopCoin coin={stats.bestCoins[1]} position={2}/>
                <TopCoin coin={stats.bestCoins[0]} position={1}/>
                <TopCoin coin={stats.bestCoins[2]} position={3}/>
            </div>

            <h2 className={style.dark}>Three newest coins</h2>
            <div className={style.newest}>
                <TopCoin coin={stats.newestCoins[0]} position={0}/>
                <TopCoin coin={stats.newestCoins[1]} position={0}/>
                <TopCoin coin={stats.newestCoins[2]} position={0}/>
            </div>
        </div>
    )
}