import React from "react";
import DeleteTankButton from "../../Button/DeleteTankButton";

const TankCard = ({ tank, deleteSwitch }) => {
    
    return(
        <div>
            <h2>{tank.tankName}</h2>
            <h3>{tank.tankSize} {tank.unit}</h3>
            <DeleteTankButton tank={tank} deleteSwitch={deleteSwitch}/>
        </div>
    )
}

export default TankCard;