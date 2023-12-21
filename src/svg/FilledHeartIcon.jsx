import {useDispatch} from "react-redux";
import modalStyle from '../components/Modal/Modal.module.css'
import {removeFav} from "../store/slices/favsSlice.js";


export default function FilledHeartIcon({setActiveModal,setModalChildren, symbol, iconUrl, uuid}) {
    const dispatch = useDispatch()

    const handleClick = () => {
        const handleRemove = () => {
            dispatch(removeFav(uuid))
            setActiveModal(false)
        }

        setModalChildren(<>
            <h3>Are you sure you want to remove {symbol} from favourites?</h3>
            <img src={iconUrl} alt={symbol}/>
            <div className={modalStyle.buttons}>
                <button className={modalStyle.remove} onClick={() => handleRemove()}>remove</button>
                <button className={modalStyle.cancel} onClick={() => setActiveModal(false)}>cancel</button>
            </div>
        </>)

        setActiveModal(true)
    }


    return (
        <div title={'remove from favourites'} style={{width: "20px", height: "20px", cursor: "pointer"}}
             onClick={() => handleClick()}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M5.36129 3.46995C6.03579 3.16081 6.76287 3 7.50002 3C8.23718 3 8.96425 3.16081 9.63875 3.46995C10.3129 3.77893 10.9185 4.22861 11.4239 4.78788C11.7322 5.12902 12.2678 5.12902 12.5761 4.78788C13.5979 3.65726 15.0068 3.00001 16.5 3.00001C17.9932 3.00001 19.4021 3.65726 20.4239 4.78788C21.4427 5.91515 22 7.42425 22 8.9792C22 10.5342 21.4427 12.0433 20.4239 13.1705L14.2257 20.0287C13.0346 21.3467 10.9654 21.3467 9.77429 20.0287L3.57613 13.1705C3.07086 12.6115 2.67474 11.9531 2.40602 11.2353C2.13731 10.5175 2 9.75113 2 8.9792C2 8.20728 2.13731 7.44094 2.40602 6.72315C2.67474 6.00531 3.07086 5.34694 3.57613 4.78788C4.08157 4.22861 4.68716 3.77893 5.36129 3.46995Z"
                          fill="#ffffff"></path>
                </g>
            </svg>
        </div>
    )
}