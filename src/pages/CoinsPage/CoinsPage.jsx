import style from './CoinsPage.module.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchCoins} from "../../store/slices/coinsSlice.js";
import {useEffect} from "react";
import CoinsTable from "../../components/CoinsTable/CoinsTable";


export default function CoinsPage() {
    const dispatch = useDispatch()
    const coins = useSelector(state=>state.coins)
    // useEffect(() => {
    //     console.log('2')
    //     dispatch(fetchCoins())
    // }, []);

    return (
        <div className={style.wrapper}>
            <div className={style.bg}></div>
            <div className={style.bg1}></div>
            <div className={style.bg2}></div>


            <div className={style.content}>
                <div className={style.header}>
                <h1>Top 50 coins with highest market capitalization in last 24h</h1>
                <h1>Top 50 coins with highest market capitalization in last 24h</h1>
                </div>
                //filters
                <CoinsTable coins={coins}/>
            </div>
        </div>
    )
}