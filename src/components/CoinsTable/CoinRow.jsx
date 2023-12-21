import {Sparklines, SparklinesLine} from "react-sparklines/src/Sparklines.js";
import UnfilledHeartIcon from "../../svg/UnfilledHeartIcon.jsx";
import FilledHeartIcon from "../../svg/FilledHeartIcon.jsx";

export default function CoinRow ({ coin, favs, fav, setActiveModal, setModalChildren, style }) {
    return (
        <>
            <tr>
                <td>{coin.symbol}</td>
                <td className={style.center}><img src={coin.iconUrl} alt={coin.symbol}/></td>
                <td>{coin.name}</td>
                <td>{coin.price}</td>
                <td>{coin["24hVolume"]}</td>
                <td className={Number(coin.change) < 0 ? style.red : style.green}>{coin.change}</td>
                <td>{coin.marketCap}</td>

                <td className={style.heart}>
                    {favs.includes(coin.uuid) ? (
                        <FilledHeartIcon
                            setActiveModal={setActiveModal}
                            setModalChildren={setModalChildren}
                            symbol={coin.symbol}
                            iconUrl={coin.iconUrl}
                            uuid={coin.uuid}
                        />
                    ) : (
                        <UnfilledHeartIcon
                            setActiveModal={setActiveModal}
                            setModalChildren={setModalChildren}
                            symbol={coin.symbol}
                            iconUrl={coin.iconUrl}
                            uuid={coin.uuid}
                        />
                    )}
                </td>
            </tr>
            {fav && (
                <tr>
                    <td style={{height: "20px"}} colSpan={8}>
                        <Sparklines data={coin.sparkline.map(i => +i)}>
                            <SparklinesLine color={coin.color}/>
                        </Sparklines>
                    </td>
                </tr>
            )}
        </>
    );
}