import React from "react";

const TankCard = ({ tank }) => {
    return(
        <div>
            <h2>{tank.tankName}</h2>
            <h3>{tank.tankSize} {tank.unit}</h3>
        </div>
    )
}

export default TankCard;