import style from './Layout.module.css'
import {Link, Outlet} from "react-router-dom";

export default function Layout() {
    return (
        <div className={style.container}>
            <header>
                <nav>
                    <ul>
                        <li><Link to={'coins'}>Coins</Link></li>
                        <li><Link to={'favourites'}>Favourites</Link></li>
                        <li><Link to={'stats'}>Statistics</Link></li>
                        <li><Link to={'search'}>Search</Link></li>
                    </ul>
                </nav>
            </header>
            <Outlet/>
            <footer>made with excitement by @hannakot62</footer>
        </div>
    )
}