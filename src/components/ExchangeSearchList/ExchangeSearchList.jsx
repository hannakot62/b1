import ExchangeSearch from "../ExchangeSearch/ExchangeSearch";
import style from '../CoinSearchList/CoinSearchList.module.css'

export default function ExchangeSearchList({exchanges}) {
    const exchangesRender = exchanges.map(e => <ExchangeSearch exchange={e} key={e.uuid}/>)
    return (
        <ul className={style.list}>
            {exchangesRender}
        </ul>
    )
}