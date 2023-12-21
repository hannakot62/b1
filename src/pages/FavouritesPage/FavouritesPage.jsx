import style from './FavouritesPage.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import CoinsTable from "../../components/CoinsTable/CoinsTable.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import {setIsLoading, unsetIsLoading} from "../../store/slices/isLoadingSlice.js";
import Loader from "../../components/Loader/Loader";
import ErrorPage from "../ErrorPage/ErrorPage.jsx";
import {setError} from "../../store/slices/errorSlice.js";


export default function FavouritesPage() {
    const dispatch = useDispatch()

    const [activeModal, setActiveModal] = useState(false);
    const [modalChildren, setModalChildren] = useState(<></>);
    const [coins, setCoins] = useState([]);

    const favs = useSelector(state => state.favs)
    const isLoading = useSelector(state => state.isLoading)
    const error = useSelector(state => state.error)

    const options = {
        headers: {
            'x-access-token': import.meta.env.VITE_COINRANKING_API_KEY,
        },
    };

    useEffect(() => {
        const fetchData = async () => {
            dispatch(setIsLoading())
            const fetchedData = [];

            for (const uuid of favs) {
                try {
                    const response = await fetch(`https://api.coinranking.com/v2/coin/${uuid}`, options)

                    if (!response.ok) {
                        throw new Error(`Error[${response.status}]: ${response.message}`)
                    }

                    const result = await response.json();
                    const coinData = await result.data.coin
                    fetchedData.push(coinData);

                } catch (error) {
                    console.error('Error fetching favourites:', error);
                    dispatch(setError(error))
                }
            }
            setCoins(fetchedData);
        };

        fetchData().then(dispatch(unsetIsLoading()))
    }, [favs]);


    return (
        <> {error ? <ErrorPage/> :

            <div className={style.wrapper}>
                {isLoading ? <Loader/> : <>
                    <Modal active={activeModal} setActive={setActiveModal} children={modalChildren}/>

                    {favs.length === 0 ? <h3>No favourites added yet 🤷‍♀️</h3>
                        : <> {!!coins.length &&
                            <CoinsTable coins={coins} setActiveModal={setActiveModal}
                                        setModalChildren={setModalChildren}
                                        fav={true}/>}
                        </>}
                </>}
            </div>

        }
        </>
    )
}