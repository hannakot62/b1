import style from './MarketSearch.module.css'


export default function MarketSearch({market}) {
    return (
        <li style={{textDecoration: "none"}}>
            <div className={style.container}>
                <div className={style.imgContainer}><img src={market.exchangeIconUrl} alt={market.name}/></div>
                <div className={style.info}>
                    <h3>{market.exchangeName} </h3>
                    <h4>{market.baseSymbol} 🔄 {market.quoteSymbol}</h4>
                </div>
            </div>
        </li>
    )
}