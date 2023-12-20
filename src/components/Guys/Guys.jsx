import style from './Guys.module.css'
import Lottie from "lottie-react";
import React from "react";
import animationData from './guys.json'

export default function Guys() {
    return (<div className={style.container}>
        <Lottie animationData={animationData} loop={true} autoplay={true}/>
    </div>)
}