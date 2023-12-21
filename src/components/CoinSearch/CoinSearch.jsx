import style from './CoinSearch.module.css'
import FilledHeartIcon from "../../svg/FilledHeartIcon.jsx";
import UnfilledHeartIcon from "../../svg/UnfilledHeartIcon.jsx";
import {useSelector} from "react-redux";

export default function CoinSearch({coin, setActiveModal, setModalChildren}) {
    const favs = useSelector(state => state.favs)

    return (
        <li style={{textDecoration:"none"}}>
        <div className={style.container}>

            <div className={style.imgContainer}><img src={coin.iconUrl} alt={coin.name}/></div>

            <div>
                <h3>{coin.symbol} {favs.includes(coin.uuid) ?
                    <FilledHeartIcon setActiveModal={setActiveModal} setModalChildren={setModalChildren}
                                     symbol={coin.symbol} iconUrl={coin.iconUrl} uuid={coin.uuid}/> :
                    <UnfilledHeartIcon setActiveModal={setActiveModal} setModalChildren={setModalChildren}
                                       symbol={coin.symbol} iconUrl={coin.iconUrl} uuid={coin.uuid}/>}</h3>

                <h1>{coin.name}</h1>
                {coin.price && <h4>Price: {coin.price}</h4>}
            </div>

        </div>
        </li>
    )
}