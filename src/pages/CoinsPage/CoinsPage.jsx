import style from './CoinsPage.module.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchCoins} from "../../store/slices/coinsSlice.js";
import {useEffect, useState} from "react";
import CoinsTable from "../../components/CoinsTable/CoinsTable";
import Modal from "../../components/Modal/Modal.jsx";
import Loader from "../../components/Loader/Loader";


export default function CoinsPage() {
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.isLoading)
    useEffect(() => {
        dispatch(fetchCoins())
    }, []);
    const [activeModal, setActiveModal] = useState(false);
    const [modalChildren, setModalChildren] = useState(<></>);
    const coins = useSelector(state => state.coins)

    return (
        <div className={style.wrapper}>
            <Modal active={activeModal} setActive={setActiveModal} children={modalChildren}/>

            <div className={style.bg}></div>
            <div className={style.bg1}></div>
            <div className={style.bg2}></div>


            {isLoading ? <Loader/> : <div className={style.content}>
                <div className={style.header}>
                    <h1>Top 50 coins with highest market capitalization in last 24h</h1>
                    <h1>Top 50 coins with highest market capitalization in last 24h</h1>
                </div>
                {coins.length&& <CoinsTable coins={coins} setActiveModal={setActiveModal} setModalChildren={setModalChildren}
                            fav={false}/>}
            </div>}
        </div>
    )
}