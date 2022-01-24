import React from 'react';
import DeleteTankButton from "../../Button/DeleteTankButton"
import aquarium from "../../../assets/aquarium.png"
import './TankCardMain.css'

export const TankCardMain = ({tank, deleteSwitch}) => {

    const ph = "7.0"
    const health = "Good 💪"
    const tempC = "27 C° "
    const tempF = "(80.6 f°)"

    return (
        
        <div className="tankHeadContainer">

            <div className="quickInfo">
                <img className="myTankTank" src={aquarium} alt="tank"/>
                <div className="tankNameContainer">
                    <h1 className="tankHeader">{tank.tankName}</h1>
                    <h2 className="tankSize">{tank.tankSize} {tank.unit} • {tank.tankType}</h2>
                </div>
                <DeleteTankButton tank={tank} deleteSwitch={deleteSwitch}/>
            </div>
            
            <div className="quickHealth">

                <div className="healthCard">
                    <h2>Health</h2>
                    <p>{health}</p>
                </div>
                <div className="phCard">
                    <h2>pH Level</h2>
                    <p>{ph}</p>
                </div>
                <div className="tempCard">
                    <h2>Temperature</h2>
                    <p><b>{tempC}</b>{tempF}</p>
                </div>
            </div>

        </div>
    )
}