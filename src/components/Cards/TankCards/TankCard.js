import React, { useState, useEffect } from "react";
import "./TankCard.css";
import aquarium from "../../../assets/aquarium.png"

const TankCard = ({ tank }) => {
    
    const [tankPic, setTankPic] = useState()

    useEffect(() => {
        if (tank.tankimg) {
            console.log(tank.tankimg)
            setTankPic('https://localhost:8000/img/' + tank.tankimg)
        }
    })

    return(
        <div className='tankCard'>
            {!tankPic && <img className='tank' src={aquarium} alt="tank"/>}
            {tankPic && <img className="tankPic" src={tankPic} alt="My Tank"/>}
            <h2 className='cardTankName'>{tank.tankName}</h2>
            <h3 className='cardTankSize'>{tank.tankSize} {tank.unit} • {tank.tankType}</h3>
        </div>
    )
}

export default TankCard;