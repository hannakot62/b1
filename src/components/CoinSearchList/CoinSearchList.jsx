import CoinSearch from "../CoinSearch/CoinSearch";
import style from './CoinSearchList.module.css'

export default function CoinSearchList({coins,setActiveModal, setModalChildren}){
    const coinsRender = coins.map(c=><CoinSearch coin={c} setModalChildren={setModalChildren} setActiveModal={setActiveModal} key={c.uuid}/>)
    return(
        <ul className={style.list}>
            {coinsRender}
        </ul>
    )
}