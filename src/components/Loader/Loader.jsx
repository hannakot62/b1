import React from "react"
import animationData from './coins.json'
import Lottie from 'lottie-react'
import style from './Loader.module.css'


export default function Loader() {
    return (
        <div className={style.container}>
            <Lottie animationData={animationData} loop={true} autoplay={true}/>
        </div>
    )
}