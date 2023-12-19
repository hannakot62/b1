import style from './CoinsTable.module.css'
import UnfilledHeartIcon from "../../svg/UnfilledHeartIcon";
import FilledHeartIcon from "../../svg/FilledHeartIcon";

export default function CoinsTable({coins}) {
    const trs = coins.map(coin => <tr>
        <td>{coin.symbol}</td>
        <td className={style.center}>k</td>
        <td>{coin.name}</td>
        <td>{coin.price}</td>
        <td>{coin["24hVolume"]}</td>
        <td className={Number(coin.change) < 0 ? style.red : style.green}>{coin.change}</td>
        <td>{coin.marketCap}</td>
        <td ><UnfilledHeartIcon/></td>
    </tr>)
    return (
        <table className={style.table}>
            <thead>
            <tr>
                <th>symbol</th>
                <th>icon</th>
                <th>name</th>
                <th>price</th>
                <th>24h volume</th>
                <th>change</th>
                <th>market capitalization</th>
                <th>add to favourites</th>
            </tr>
            </thead>
            <tbody>
            {trs}
            </tbody>
        </table>
    )
}