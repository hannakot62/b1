import style from './FavouritesPage.module.css'
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import CoinsTable from "../../components/CoinsTable/CoinsTable.jsx";
import Modal from "../../components/Modal/Modal.jsx";

export default function FavouritesPage() {
    const [activeModal, setActiveModal] = useState(false);
    const [modalChildren, setModalChildren] = useState(<></>);
    const [coins, setCoins] = useState(null);

    const favs = useSelector(state => state.favs)

    const options = {
        headers: {
            'x-access-token': import.meta.env.VITE_COINRANKING_API_KEY,
        },
    };

    useEffect(() => {
        async function fetchCoin(uuid) {
            const response = await fetch(`https://api.coinranking.com/v2/coin/${uuid}`, options)
            const json = await response.json()
            return await json.data.coin
        }

        async function mapCoins() {
            await Promise.all(favs.map(async uuid => await fetchCoin(uuid))).then(r => setCoins(r))
        }

        mapCoins()
    }, [favs]);

    return (
        <div className={style.wrapper}>

            <Modal active={activeModal} setActive={setActiveModal} children={modalChildren}/>
            {favs.length === 0 ? <h3>No favourites added yet 🤷‍♀️</h3> : <>
                {coins && <CoinsTable coins={coins} setActiveModal={setActiveModal} setModalChildren={setModalChildren}
                                      fav={true}/>}</>}

        </div>
    )
}