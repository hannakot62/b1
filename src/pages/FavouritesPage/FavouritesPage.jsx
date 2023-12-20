import style from './FavouritesPage.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import CoinsTable from "../../components/CoinsTable/CoinsTable.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import {setIsLoading, unsetIsLoading} from "../../store/slices/isLoadingSlice.js";
import Loader from "../../components/Loader/Loader";

export default function FavouritesPage() {
    const dispatch = useDispatch()
    const [activeModal, setActiveModal] = useState(false);
    const [modalChildren, setModalChildren] = useState(<></>);
    const [coins, setCoins] = useState(null);

    const favs = useSelector(state => state.favs)
    const isLoading = useSelector(state => state.isLoading)
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

        dispatch(setIsLoading())
        mapCoins().then(() => dispatch(unsetIsLoading()))
    }, [favs]);

    return (

        <div className={style.wrapper}>
            {isLoading ? <Loader/> : <>
                <Modal active={activeModal} setActive={setActiveModal} children={modalChildren}/>
                {favs.length === 0 ? <h3>No favourites added yet 🤷‍♀️</h3> : <>
                    {coins &&
                        <CoinsTable coins={coins} setActiveModal={setActiveModal} setModalChildren={setModalChildren}
                                    fav={true}/>}</>}
            </>}
        </div>
    )
}