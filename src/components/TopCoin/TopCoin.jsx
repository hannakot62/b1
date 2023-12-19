import style from './TopCoin.module.css'
import GoldMedalIcon from "../../svg/GoldMedalIcon";
import SilverMedalIcon from "../../svg/SilverMedalIcon";
import BronzeMedalIcon from "../../svg/BronzeMedalIcon";
import {useEffect, useState} from "react";
import { Sparklines, SparklinesLine } from 'react-sparklines';

export default function TopCoin({coin, position}) {
    const [place, setPlace] = useState(null);
    const [exactCoin, setExactCoin] = useState(null);
    const options = {
        headers: {
            'x-access-token': import.meta.env.VITE_COINRANKING_API_KEY,
        },
    };
    console.log(coin)
    useEffect(() => {

        switch (position) {
            case 1: {
                setPlace(<GoldMedalIcon/>)
                break;
            }
            case 2: {
                setPlace(<SilverMedalIcon/>)
                break;
            }
            case 3: {
                setPlace(<BronzeMedalIcon/>)
                break;
            }
        }

        async function fetchCoin() {
            const response = await fetch(`https://api.coinranking.com/v2/coin/${coin.uuid}`, options)
            const json = await response.json()
            setExactCoin(json.data.coin)
        }

        fetchCoin()
        console.log(exactCoin)
    }, [])
    return (
        <div>
            {exactCoin &&
                <div className={style.card}>
                    <div className={style.front}>
                        <div className={style.head}>
                            {place && <div className={style.svg}>
                                {place}
                            </div>}
                            <h4>{exactCoin.symbol}</h4></div>
                        <img src={exactCoin.iconUrl} alt={exactCoin.symbol}/>
                        <h3>{exactCoin.name}</h3>
                    </div>
                    <div className={style.back}>
                        <div className={style.info}>
                            <h6>Number of existing coins: <span>{exactCoin.supply.total}</span></h6>
                            <h6>Price: <span>{exactCoin.price}</span></h6>
                            <h6>Market capitalization: <span>{exactCoin.marketCap}</span></h6>
                            <h6>Website: <span><a href={exactCoin.websiteUrl} target={'_blank'}>{exactCoin.websiteUrl}</a></span></h6>
                            <Sparklines data={exactCoin.sparkline.map(i => +i)}>
                                <SparklinesLine color="orange" />
                            </Sparklines>
                        </div>
                    </div>
                </div>}
        </div>
    )
}