import React, { useEffect, useState } from 'react';
import DeleteTankButton from "../../Button/DeleteTankButton"
import aquarium from "../../../assets/aquarium.png"
import './TankCardMain.css'

export const TankCardMain = ({tank, levels, deleteSwitch}) => {

    // health options 
    const good = 1
    const medium = 2
    const bad = 3

    const [score, setScore] = useState()

    const [celcius, setCelcius] = useState()
    const [fahrenheit, setFahrenheit] = useState()

    useEffect(() => {
        if (levels) {
            setCelcius(Number(levels[0].celcius).toFixed(1))
            setFahrenheit(Number(levels[0].fahrenheit).toFixed(1))
        }
    }, [levels])

    // ammonia 0ppm, more than 2 is dangerous
    const [ammoniaHealth, setAmmoniaHealth] = useState()
    // nitrite 0 - 0.2ppm
    const [nitriteHealth, setNitriteHealth] = useState()
    // nitrate 0 - 40ppm 
    const [nitrateHealth, setNitrateHealth] = useState()
    // pH level 6 - 8
    // const [phLevelHealth, setPhLevelHealth] = useState()
    // kh level 4 - 8 dKh, 70 - 140 ppm
    // const khLevel = 5
    // gh level 4 - 8 dGh, 70 -140 ppm
    // const ghLevel = 6

    const easy = "linear-gradient(165.41deg, rgba(255, 255, 255, 0.525) -19.95%, rgba(255, 255, 255, 0.075) 98.98%), #7BE22A"
    const easyShadow = "0px 2px 2px #65C21B"
    const med = "linear-gradient(166.25deg, rgba(255, 255, 255, 0.525) -38.77%, rgba(255, 255, 255, 0.075) 99.58%), #FFE156"
    const mediumShadow = "0px 2px 2px #D8C93B"
    const hard = "linear-gradient(165.88deg, rgba(255, 255, 255, 0.525) -47.86%, rgba(255, 255, 255, 0.075) 89.89%), #FF3434"
    const hardShadow = "0px 2px 2px #D34315"

    const [careColor, setCareColor] = useState()
    const [shadow, setShadow] = useState()

    useEffect(() => {
        if (levels) {
            getAmmonia()
            getNitrite()
            getNitrate()
        }
    }, [levels])

    useEffect(() => {
        if (ammoniaHealth && nitrateHealth && nitriteHealth) {
            getScore()
        }

    }, [ammoniaHealth, nitrateHealth, nitriteHealth])


    useEffect(() => {
        if (score) {
            getHealth()
        }  
    }, [score])

    const getAmmonia = () => {
        console.log(levels[0].ammonia)
        if (levels[0].ammonia <= 2) {
            setAmmoniaHealth(good)
        } else if (levels[0].ammonia <= 4) {
            setAmmoniaHealth(medium)
        } else { 
            setAmmoniaHealth(bad)
        }
    }

    const getNitrite = () => {
        console.log(levels[0].nitrites)
        if (levels[0].nitrites <= 0.2) {
            setNitriteHealth(good)
        } else if (levels[0].nitrites <= 0.4) {
            setNitriteHealth(medium)
        } else {
            setNitriteHealth(bad)
        }
    }

    const getNitrate = () => {
        console.log(levels[0].nitrates)
        if (levels[0].nitrates <= 40) {
            setNitrateHealth(good)
        } else if (levels[0].nitrates <= 60) {
            setNitrateHealth(medium)
        } else {
            setNitrateHealth(bad)
        }
    }

    const getScore = () => {
        setScore(ammoniaHealth + nitrateHealth + nitriteHealth)
    }

    const [health, setHealth] = useState()

    const getHealth = () => {
        console.log("Tank Score:", score)

        if (score === 3) {
            setHealth("Good 😀")
            setCareColor(easy)
            setShadow(easyShadow)
        } else if (score <= 5) {
            setHealth("Medium 😐")
            setCareColor(med)
            setShadow(mediumShadow)
        } else {
            setHealth("Bad 🤒")
            setCareColor(hard)
            setShadow(hardShadow)
        }
    }

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

                <div className="healthCard" style={{background: careColor, boxShadow: shadow}}>
                    <h2>Health</h2>
                    {health && <p>{health}</p>}
                </div>
                <div className="phCard">
                    <h2>pH Level</h2>
                    {!levels && <p>Make an entry!</p>}
                    {levels && <p>{levels[0].phLevel} pH</p>}
                    
                </div>
                <div className="tempCard">
                    <h2>Temperature</h2>
                    {levels && <p><b>{celcius} °C</b>({fahrenheit} °F) </p> }
                </div>
            </div>

        </div>
    )
}