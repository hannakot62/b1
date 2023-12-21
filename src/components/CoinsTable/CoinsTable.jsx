import style from './CoinsTable.module.css'
import UnfilledHeartIcon from "../../svg/UnfilledHeartIcon";
import {useEffect, useState} from "react";
import {Slider, Box} from "@mui/material";
import {useSelector} from "react-redux";
import FilledHeartIcon from "../../svg/FilledHeartIcon";
import {Sparklines, SparklinesLine} from "react-sparklines";


export default function CoinsTable({coins, setActiveModal, setModalChildren, fav}) {
    const [price, setPrice] = useState(false);
    const [name, setName] = useState(false);
    const [volume, setVolume] = useState(false);
    const [change, setChange] = useState(false);
    const [marketCap, setMarketCap] = useState(false);
    const [coinsSorted, setCoinsSorted] = useState(coins);
    const [trs, setTrs] = useState(null);

    const favs = useSelector(state => state.favs)

    const [marketCapValue, setMarketCapValue] = useState([Math.min(...coins.map(c => +c.marketCap)), Math.max(...coins.map(c => c.marketCap))]);
    const [priceValue, setPriceValue] = useState([Math.min(...coins.map(c => +c.price)), Math.max(...coins.map(c => c.price))]);
    const [volumeValue, setVolumeValue] = useState([Math.min(...coins.map(c => +c['24hVolume'])), Math.max(...coins.map(c => +c['24hVolume']))])

    useEffect(() => {
        setCoinsSorted(coins)
    }, [coins]);

    useEffect(() => {
        setTrs(coinsSorted.map(coin => <>
            <tr>
                <td>{coin.symbol}</td>
                <td className={style.center}><img src={coin.iconUrl} alt={coin.symbol}/></td>
                <td>{coin.name}</td>
                <td>{coin.price}</td>
                <td>{coin["24hVolume"]}</td>
                <td className={Number(coin.change) < 0 ? style.red : style.green}>{coin.change}</td>
                <td>{coin.marketCap}</td>

                <td className={style.heart}>{favs.includes(coin.uuid) ?
                    <FilledHeartIcon setActiveModal={setActiveModal} setModalChildren={setModalChildren}
                                     symbol={coin.symbol} iconUrl={coin.iconUrl} uuid={coin.uuid}/> :
                    <UnfilledHeartIcon setActiveModal={setActiveModal} setModalChildren={setModalChildren}
                                       symbol={coin.symbol} iconUrl={coin.iconUrl} uuid={coin.uuid}/>}</td>

            </tr>
            {fav && <tr>
                <td style={{height: "20px"}} colSpan={8}><Sparklines data={coin.sparkline.map(i => +i)}>
                    <SparklinesLine color={coin.color}/>
                </Sparklines></td>
            </tr>}</>))
    }, [coins, favs, coinsSorted, name, change, price, marketCap, volume]);


    useEffect(() => {
        setCoinsSorted(coins.filter(c => (c['24hVolume'] >= volumeValue[0] && c['24hVolume'] <= volumeValue[1])
            && (c.marketCap >= marketCapValue[0] && c.marketCap <= marketCapValue[1]) && (c.price >= priceValue[0] && c.price <= priceValue[1])))
    }, [marketCapValue, priceValue, volumeValue, coins]);


    const handleSort = (type) => {
        switch (type) {
            case "name": {
                setName(!name)
                name ? setCoinsSorted(coinsSorted.slice().sort((a, b) => a.name.localeCompare(b.name))) :
                    setCoinsSorted(coinsSorted.slice().sort((a, b) => b.name.localeCompare(a.name)))
                break;
            }
            case "price": {
                setPrice(!price)
                price ? setCoinsSorted(coinsSorted.slice().sort((a, b) => a.price - b.price)) :
                    setCoinsSorted(coinsSorted.slice().sort((a, b) => b.price - a.price))
                break;
            }
            case "volume": {
                setVolume(!volume)
                volume ? setCoinsSorted(coinsSorted.slice().sort((a, b) => a['24hVolume'] - b['24hVolume'])) :
                    setCoinsSorted(coinsSorted.slice().sort((a, b) => b['24hVolume'] - a['24hVolume']))
                break;
            }
            case "change": {
                setChange(!change)
                change ? setCoinsSorted(coinsSorted.slice().sort((a, b) => a.change - b.change)) :
                    setCoinsSorted(coinsSorted.slice().sort((a, b) => b.change - a.change))
                break;
            }
            case "marketCap": {
                setMarketCap(!marketCap)
                marketCap ? setCoinsSorted(coinsSorted.slice().sort((a, b) => a.marketCap - b.marketCap)) :
                    setCoinsSorted(coinsSorted.slice().sort((a, b) => b.marketCap - a.marketCap))
                break;
            }
        }
    }


    const handleMarketCapChange = (event, newValue) => {
        setMarketCapValue(newValue);
    };
    const handlePriceChange = (event, newValue) => {
        setPriceValue(newValue);
    };
    const handleVolumeChange = (event, newValue) => {
        setVolumeValue(newValue);
    };


    return (
        <div className={style.container}>

            <div className={style.filters}>

                <label>market capitalization</label>
                <Box sx={{width: 300}}>
                    <Slider
                        value={marketCapValue}
                        onChange={handleMarketCapChange}
                        valueLabelDisplay="auto"
                        className={style.range}
                        min={Math.min(...coins.map(c => +c.marketCap))}
                        max={Math.max(...coins.map(c => +c.marketCap))}
                    />
                </Box>


                <label>price</label>
                <Box sx={{width: 300}}>
                    <Slider
                        value={priceValue}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        className={style.range}
                        min={Math.min(...coins.map(c => +c.price))}
                        max={Math.max(...coins.map(c => +c.price))}
                    />
                </Box>


                <label>24h volume</label>
                <Box sx={{width: 300}}>
                    <Slider
                        value={volumeValue}
                        onChange={handleVolumeChange}
                        valueLabelDisplay="auto"
                        className={style.range}
                        min={Math.min(...coins.map(c => +c['24hVolume']))}
                        max={Math.max(...coins.map(c => +c['24hVolume']))}
                    />
                </Box>
            </div>

            <h6>search results: {coinsSorted.length}</h6>

            <table className={style.table}>
                <thead>
                <tr>
                    <th>symbol</th>
                    <th>icon</th>
                    <th className={style.hover} onClick={() => handleSort("name")}>name {name ? "▼" : "▲"}</th>
                    <th className={style.hover} onClick={() => handleSort("price")}>price {price ? "▼" : "▲"}</th>
                    <th className={style.hover} onClick={() => handleSort("volume")}>24h
                        volume {volume ? "▼" : "▲"}</th>
                    <th className={style.hover} onClick={() => handleSort("change")}>change {change ? "▼" : "▲"}</th>
                    <th className={style.hover} onClick={() => handleSort("marketCap")}>market
                        capitalization {marketCap ? "▼" : "▲"}</th>
                    <th>add to favourites</th>
                </tr>
                </thead>

                <tbody>
                {trs}
                </tbody>

            </table>
            {(!trs || !trs.length) && <p>no matches 😲</p>}
        </div>
    )
}