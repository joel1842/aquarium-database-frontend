import React, { useState } from 'react';
import DeleteTankButton from "../../Button/DeleteTankButton"
import aquarium from "../../../assets/aquarium.png"
import './TankCardMain.css'

export const TankCardMain = ({tank, deleteSwitch}) => {

    // health options 
    const good = 'good'
    const medium = 'medium'
    const bad = 'bad'


    // ammonia 0ppm, more than 2 is dangerous
    const ammonia = 3
    const [ammoniaHealth, setAmmoniaHealth] = useState()
    // nitrite 0 - 0.2ppm
    const nitrite = 0.1
    const [nitriteHealth, setNitriteHealth] = useState()
    // nitrate 0 - 40ppm 
    const nitrate = 20
    const [nitrateHealth, setNitrateHealth] = useState()
    // pH level 6 - 8
    const phLevel = 7
    const [phLevelHealth, setPhLevelHealth] = useState()
    // kh level 4 - 8 dKh, 70 - 140 ppm
    // const khLevel = 5
    // gh level 4 - 8 dGh, 70 -140 ppm
    // const ghLevel = 6

    const getAmmonia = () => {
        if (ammonia <= 2) {
            setAmmoniaHealth(good)
            console.log('good')
        } else if (ammonia <= 4) {
            setAmmoniaHealth(medium)
            console.log('medium')
        } else { 
            setAmmoniaHealth(bad)
            console.log('bad')
        }
    }

    const getNitrite = () => {
        if (nitrite <= 0.2) {
            setNitriteHealth(good)
        } else if (nitrite <= 0.4) {
            setNitriteHealth(medium)
        } else {
            setNitriteHealth(bad)
        }
    }

    const getNitrate = () => {
        // if (nitrate === 0) {
        //     setNitrateHealth(good)
        // } else if () {

        // }
    }

    const getHealth = () => {

    }

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
                <button onClick={getAmmonia}>Get Ammonia</button>
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