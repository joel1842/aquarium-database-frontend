import React from "react";
import "./TankCard.css";
import aquarium from "../../../assets/aquarium.png"

const TankCard = ({ tank }) => {
    
    return(
        <div className='tankCard'>
            <img className='tank' src={aquarium} alt="tank"/>
            <h2 className='cardTankName'>{tank.tankName}</h2>
            <h3 className='cardTankSize'>{tank.tankSize} {tank.unit} • {tank.tankType}</h3>
        </div>
    )
}

export default TankCard;