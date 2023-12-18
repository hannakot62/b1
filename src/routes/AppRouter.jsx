import {Route, Routes} from "react-router-dom";
import Layout from "../components/Layout/Layout";
import CoinsPage from "../pages/CoinsPage/CoinsPage.jsx";
import FavouritesPage from "../pages/FavouritesPage/FavouritesPage";
import StatisticsPage from "../pages/StatisticsPage/StatisticsPage";
import SearchPage from "../pages/SearchPage/SearchPage";

export default function AppRouter() {
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path={'/*'} element={<CoinsPage/>}/>
                <Route path={'coins'} element={<CoinsPage/>}/>
                <Route path={'favourites'} element={<FavouritesPage/>}/>
                <Route path={'stats'} element={<StatisticsPage/>}/>
                <Route path={'search'} element={<SearchPage/>}/>
            </Route>
        </Routes>
    )
}