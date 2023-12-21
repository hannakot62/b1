import style from './CoinsTable.module.css'
import {useEffect, useState} from "react";
import {Slider, Box} from "@mui/material";
import {useSelector} from "react-redux";
import CoinRow from "./CoinRow.jsx";


export default function CoinsTable({coins, setActiveModal, setModalChildren, fav}) {
    const [price, setPrice] = useState(false);
    const [name, setName] = useState(false);
    const [volume, setVolume] = useState(false);
    const [change, setChange] = useState(false);
    const [marketCap, setMarketCap] = useState(false);
    const [coinsSorted, setCoinsSorted] = useState(coins);
    const [trs, setTrs] = useState(null);

    const marketCapValues = coins.map(c => +c.marketCap);
    const priceValues = coins.map(c => +c.price);
    const volumeValues = coins.map(c => +c['24hVolume']);

    const [marketCapValue, setMarketCapValue] = useState([Math.min(...marketCapValues), Math.max(...marketCapValues)]);
    const [priceValue, setPriceValue] = useState([Math.min(...priceValues), Math.max(...priceValues)]);
    const [volumeValue, setVolumeValue] = useState([Math.min(...volumeValues), Math.max(...volumeValues)]);

    const favs = useSelector(state => state.favs)

    useEffect(() => {
        setCoinsSorted(coins)
    }, [coins]);

    useEffect(() => {
        const updatedTrs = coinsSorted.map(coin => (
            <CoinRow
                key={coin.uuid}
                coin={coin}
                favs={favs}
                fav={fav}
                setActiveModal={setActiveModal}
                setModalChildren={setModalChildren}
                style={style}
            />
        ));

        setTrs(updatedTrs);
    }, [coins, favs, coinsSorted, name, change, price, marketCap, volume]);


    useEffect(() => {
        const filterCoins = (coins, volumeValue, marketCapValue, priceValue) => {
            return coins.filter(c =>
                (c['24hVolume'] >= volumeValue[0] && c['24hVolume'] <= volumeValue[1]) &&
                (c.marketCap >= marketCapValue[0] && c.marketCap <= marketCapValue[1]) &&
                (c.price >= priceValue[0] && c.price <= priceValue[1])
            );
        };

        const filteredCoins = filterCoins(coins, volumeValue, marketCapValue, priceValue)
        setCoinsSorted(filteredCoins)
    }, [marketCapValue, priceValue, volumeValue, coins]);


    const handleSort = (type) => {
        const sortFunction = (sortType, order, isString) => {
            const compareFn = isString
                ? (a, b) => order * a[sortType].localeCompare(b[sortType])
                : (a, b) => order * (a[sortType] - b[sortType]);

            setCoinsSorted((prevCoins) => [...prevCoins].sort(compareFn));
        };

        switch (type) {
            case "name":
                setName(!name);
                sortFunction('name', name ? 1 : -1, true);
                break;
            case "price":
                setPrice(!price);
                sortFunction('price', price ? 1 : -1, false);
                break;
            case "volume":
                setVolume(!volume);
                sortFunction('24hVolume', volume ? 1 : -1, false);
                break;
            case "change":
                setChange(!change);
                sortFunction('change', change ? 1 : -1, false);
                break;
            case "marketCap":
                setMarketCap(!marketCap);
                sortFunction('marketCap', marketCap ? 1 : -1, false);
                break;
            default:
                break;
        }
    };


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