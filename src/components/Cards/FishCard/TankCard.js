import React from "react";
import DeleteTankButton from "../../Button/DeleteTankButton";
import "./TankCard.css";

const TankCard = ({ tank, deleteSwitch }) => {
    
    return(
        <div className='tankCard'>
            <h2 className='tankName'>{tank.tankName}</h2>
            <h3 className='tankSize'>{tank.tankSize} {tank.unit}</h3>
            <DeleteTankButton tank={tank} deleteSwitch={deleteSwitch}/>
        </div>
    )
}

export default TankCard;