import style from './SearchPage.module.css'
import {useState} from "react";
import CoinSearchList from "../../components/CoinSearchList/CoinSearchList";
import Modal from "../../components/Modal/Modal.jsx";
import Guys from "../../components/Guys/Guys";
import ExchangeSearchList from "../../components/ExchangeSearchList/ExchangeSearchList";
import MarketSearchList from "../../components/MarketSearchList/MarketSearchList";
import {useDispatch, useSelector} from "react-redux";
import {setIsLoading, unsetIsLoading} from "../../store/slices/isLoadingSlice.js";
import Loader from "../../components/Loader/Loader";

export default function SearchPage() {
    const [value, setValue] = useState('');
    const [coins, setCoins] = useState([]);
    const [exchanges, setExchanges] = useState([]);
    const [markets, setMarkets] = useState([]);
    const [guys, setGuys] = useState(true);
    const [nothing, setNothing] = useState(false);
    const dispatch = useDispatch()
    const isLoading = useSelector(state=>state.isLoading)

    const [activeModal, setActiveModal] = useState(false);
    const [modalChildren, setModalChildren] = useState(<></>);
    const handleReset = () => {
        setValue('')
        setMarkets([])
        setExchanges([])
        setCoins([])
        setGuys(true)
        setNothing(false)
    }

    const handleSearch = () => {
        setGuys(false)
        setNothing(false)
        dispatch(setIsLoading())

        const options = {
            headers: {
                'x-access-token': import.meta.env.VITE_COINRANKING_API_KEY,
            },
        };

        fetch(`https://api.coinranking.com/v2/search-suggestions?query=${value}`, options)
            .then((response) => response.json())
            .then((result) => {
                setCoins(result.data.coins)
                setExchanges(result.data.exchanges)
                setMarkets(result.data.markets)

                if(result.data.coins.length===0&&result.data.exchanges.length===0&&result.data.markets.length===0) {
                    setGuys(true)
                    setNothing(true)
                }
                dispatch(unsetIsLoading())
            });

    }
    return (
        <div className={style.wrapper}>
            {isLoading?<Loader/>:<>
            <Modal active={activeModal} setActive={setActiveModal} children={modalChildren}/>
            <div className={style.search}>
                <label>Enter search query to find coins / exchanges / markets:<input value={value}
                                                                                     onChange={(e) => setValue(e.target.value)}/></label>
                <div className={style.buttons}>
                    <button className={style.searchBtn} onClick={() => handleSearch()}>search</button>
                    <button className={style.cleanBtn} onClick={() => handleReset()}>reset</button>
                </div>
            </div>
            {nothing&&<h1 className={style.nothing}>Nothing was found 😿</h1>}
            {guys && <Guys/>}

            {!!coins.length && <div className={style.coins}>
                <h1>Coins found:</h1>
                <CoinSearchList coins={coins} setActiveModal={setActiveModal} setModalChildren={setModalChildren}/>
            </div>}

            {!!exchanges.length && <div className={style.exchanges}>
                <h1>Exchanges found:</h1>
                <ExchangeSearchList exchanges={exchanges}/>
            </div>}

            {!!markets.length &&<div className={style.markets}>
                <h1>Markets found:</h1>
                <MarketSearchList markets={markets}/>
            </div>}
            </>}
        </div>
    )
}