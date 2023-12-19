import './App.css'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./routes/AppRouter.jsx";
import {Provider} from "react-redux";
import {store} from "./store/index.js";

function App() {
    console.log('0')
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </Provider>

    )
}

export default App


