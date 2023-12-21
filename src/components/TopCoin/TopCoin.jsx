import style from './TopCoin.module.css'
import GoldMedalIcon from "../../svg/GoldMedalIcon";
import SilverMedalIcon from "../../svg/SilverMedalIcon";
import BronzeMedalIcon from "../../svg/BronzeMedalIcon";
import {useEffect, useState} from "react";
import { Sparklines, SparklinesLine } from 'react-sparklines';


export default function TopCoin({coin, position}) {
    const [place, setPlace] = useState(null);

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
            default: {
                break;
            }
        }
    }, [position])


    return (
        <div>
            {coin &&
                <div className={style.card}>

                    <div className={style.front}>
                        <div className={style.head}>
                            {place && <div className={style.svg}>
                                {place}
                            </div>}
                            <h4>{coin.symbol}</h4></div>
                        <img src={coin.iconUrl} alt={coin.symbol}/>
                        <h3>{coin.name}</h3>
                    </div>

                    <div className={style.back}>
                        <div className={style.info}>
                            {coin.supply.total && <h6>Number of existing coins: <span>{coin.supply.total}</span></h6>}
                            {coin.price && <h6>Price: <span>{coin.price}</span></h6>}
                            {coin.marketCap && <h6>Market capitalization: <span>{coin.marketCap}</span></h6>}
                            {coin.websiteUrl && <h6>Website: <span><a href={coin.websiteUrl}
                                                                      target={'_blank'}>{coin.websiteUrl}</a></span>
                            </h6>}
                            <Sparklines data={coin.sparkline.map(i => +i)}>
                                <SparklinesLine color="orange"/>
                            </Sparklines>
                        </div>
                    </div>


                </div>
            }
        </div>
    )
}