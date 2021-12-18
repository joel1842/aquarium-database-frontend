import React from "react";
import "./TankCard.css";

const TankCard = ({ tank }) => {
    
    return(
        <div className='tankCard'>
            <h2 className='cardTankName'>{tank.tankName}</h2>
            <h3 className='cardTankSize'>{tank.tankSize} {tank.unit}</h3>
        </div>
    )
}

export default TankCard;