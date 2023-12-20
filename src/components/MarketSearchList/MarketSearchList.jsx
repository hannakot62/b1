import MarketSearch from "../MarketSearch/MarketSearch";
import style from '../CoinSearchList/CoinSearchList.module.css'

export default function MarketSearchList({markets}) {
    const marketsRender = markets.map(m => <MarketSearch market={m} key={m.uuid}/>)
    return (
        <ul className={style.list}>
            {marketsRender}
        </ul>
    )
}