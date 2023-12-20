import style from './SearchPage.module.css'

export default function SearchPage(){
    return (
        <div>
            <div><label>Enter search query to find coins/exchanges/markets:<input/></label>
            <div>
                <button>search</button>
                <button>reset</button>
            </div></div>
        </div>
    )
}