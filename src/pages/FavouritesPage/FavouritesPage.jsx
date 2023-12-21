import style from './FavouritesPage.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import CoinsTable from "../../components/CoinsTable/CoinsTable.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import {setIsLoading, unsetIsLoading} from "../../store/slices/isLoadingSlice.js";
import Loader from "../../components/Loader/Loader";
import ErrorPage from "../ErrorPage/ErrorPage.jsx";
import {setError} from "../../store/slices/errorSlice.js";
import fetchOptions from "../../const/fetchOptions.js";


export default function FavouritesPage() {
    const dispatch = useDispatch()

    const [activeModal, setActiveModal] = useState(false);
    const [modalChildren, setModalChildren] = useState(<></>);
    const [coins, setCoins] = useState([]);

    const favs = useSelector(state => state.favs)
    const isLoading = useSelector(state => state.isLoading)
    const error = useSelector(state => state.error)

    useEffect(() => {
        const fetchData = async () => {
            dispatch(setIsLoading());

            try {
                const fetchedData = await Promise.all(
                    favs.map(async uuid => {
                        const response = await fetch(`https://api.coinranking.com/v2/coin/${uuid}`, fetchOptions);

                        if (!response.ok) {
                            throw new Error(`Error [${response.status}]: ${response.statusText}`);
                        }

                        const result = await response.json();
                        return result.data.coin;
                    })
                )
                setCoins(fetchedData)

            } catch (error) {
                console.error('Error fetching favourites:', error)
                dispatch(setError(error))
            } finally {
                dispatch(unsetIsLoading())
            }
        };

        fetchData();
    }, [favs, dispatch]);

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