import { useSelector, useDispatch } from "react-redux";
import {clearError} from "../../store/slices/errorSlice.js";
import style from './ErrorPage.module.css'


export default function ErrorPage() {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.error);


    const handleReload = () => {
        dispatch(clearError());
        window.location.reload();
    };

    return (
        <div>
            {error && (
                <div className={style.container}>
                    <h1>Oops, something went wrong 🫢</h1>
                    <h4>{error.message}</h4>
                    <button onClick={handleReload}>reload page</button>
                </div>
            )}
        </div>
    );
}

