import style from './ExchangeSearch.module.css'

export default function ExchangeSearch({exchange}) {
    return (
        <li style={{textDecoration: "none"}}>
            <div className={style.container}>
                <img src={exchange.iconUrl} alt={exchange.name}/>
                <h3>{exchange.name}</h3>
            </div>
        </li>
    )
}