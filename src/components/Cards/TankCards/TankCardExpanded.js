import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./TankCardExpanded.css";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../../../routes/Loading";
import { StandardNavBar } from "../../../components/Bars/StandardNavBar";
import { OnTimeCard } from "./OnTimeCard"
import { TankCardMain } from "./TankCardMain"
import { MyFish } from "./MyFish"
import { TankJournal } from "./TankJournal"
import Footer from "../../Bars/Footer"

const TankCardExpanded = ({tank, deleteSwitch}) => {

    const { getAccessTokenSilently } = useAuth0();
    
    const [levels, setLevels] = useState();
    const [celcius, setCelcius] = useState();
    const [fahrenheit, setFahrenheit] = useState();

    useEffect(() => {
        getLevels()
    }, [])

    useEffect(() => {
        if (levels) {
            if(levels.tempscale === 'f') {
                let f = levels[0].temp
                setCelcius(Number((f - 32) * 5/9).toFixed(1))
                setFahrenheit(Number(f).toFixed(1))
            } else {
                let c = levels[0].temp
                setFahrenheit(Number((c * 9/5) + 32).toFixed(1))
                setCelcius(Number(c).toFixed(1))
            }
        }
    }, [levels])

    const getLevels = async () => {
        const token = await getAccessTokenSilently()
        const fishtankName = {
            tank: tank.tankName
        }
        const response = await fetch('https://fishtank-wiki.herokuapp.com/getjournal', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(fishtankName)
        })
        const responseData = await response.json()
        if (responseData.length >= 1) {
            setLevels(responseData)
        } 
    }

    useEffect(() => {
        catchMyFish()
    }, [])


    const [fishies, setFishies] = useState()

    useEffect(() => {
        if (fishies && tank) {
            getStock()
        }
    }, [fishies, tank])

    const catchMyFish = async () => {
        try {
            
            const token = await getAccessTokenSilently()
            const data = {
                tank: tank.tankName
            }

            const response = await fetch('https://fishtank-wiki.herokuapp.com/myfish', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            })
            const responseData = await response.json()
            console.log(responseData)
 
            if (responseData.length >= 1) {
                setFishies(responseData)
                console.log(responseData)
                console.log("Caught your fishies!")
            } else {
                console.log("No fishies!")
            }
            
        } catch (error) {
            console.error()
        }
    }

    const [stock, setStock] = useState()

    const getStock = () => {
        let size = []
        fishies.map((fish) => {
            size.push(fish.size * fish.quantity)
        })
        let add = size.reduce((a, b) => a + b, 0)

        let tankspace;
        if (tank.unit === "Gallons") {
            tankspace = tank.tankSize
        } else {
            tankspace = tank.tankSize / 3.785
        }

        let stock = add / 2.54

        if (tankspace < stock) {
            setStock('Overstocked!')
        } else if (tankspace > stock) {
            setStock('Well Stocked!')
        }
    }

    useEffect(() => {
        if (levels && fishies && celcius) {
            fishHealth()
        }
    }, [levels, fishies, celcius])

    const [showPhLow, setPhLow] = useState(false)
    const [phLowDesc, setPhLowDesc] = useState()
    const [showPhHigh, setPhHigh] = useState(false)
    const [phHighDesc, setPhHighDesc] = useState()
    const [showTempLow, setTempLow] = useState(false)
    const [tempLowDesc, setTempLowDesc] = useState()
    const [showTempHigh, setTempHigh] = useState(false)
    const [tempHighDesc, setTempHighDesc] = useState()

    const fishHealth = () => {
        let fishPhLow = []
        let phLow = 0;
        let fishPhHigh = []
        let phHigh = 0;
        let fishTempLow = []
        let tempLow = 0;
        let fishTempHigh = []
        let tempHigh = 0;

        fishies.map((fish) => {
            if (levels[0].phLevel >= fish.phlow && levels[0].phLevel <= fish.phhigh) {

            } else if (levels[0].phLevel < fish.phlow) {
                phLow++
                fishPhLow.push(fish.name)
            } else if (levels[0].phLevel > fish.phhigh) {
                phHigh++
                fishPhHigh.push(fish.name)
            }
    
            if (celcius >= fish.templow && celcius <= fish.temphigh) {

            } else if (celcius < fish.templow) {
                tempLow++
                fishTempLow.push(fish.name)
            } else if (celcius > fish.temphigh) {
                tempHigh++
                fishTempHigh.push(fish.name)
            }
        })

        if (fishPhLow.length === 1) {
            setPhLowDesc("pH too low for", fishPhLow[0])
        } else if (fishPhLow.length === 2) {
            setPhLowDesc("pH too low for", fishPhLow[0], "&", fishPhLow[1])
        } else if (fishPhLow.length >= 3) {
            setPhLowDesc("pH too low for", fishPhLow[0], ",", fishPhLow[1], "& more...")
        }

        if (fishPhHigh.length === 1) {
            setPhHighDesc("pH too high for", fishPhHigh[0])
        } else if (fishPhHigh.length === 2) {
            setPhHighDesc("pH too high for", fishPhHigh[0], "&", fishPhHigh[1])
        } else if (fishPhHigh.length >= 3) {
            setPhHighDesc("pH too high for", fishPhHigh[0], ",", fishPhHigh[1], "& more...")
        }

        if (fishTempLow.length === 1) {
            setTempLowDesc("Temp too low for", fishTempLow[0])
        } else if (fishTempLow.length === 2) {
            setTempLowDesc("Temp too low for", fishTempLow[0], "&", fishTempLow[1])
        } else if (fishTempLow.length >= 3) {
            setTempLowDesc("Temp too low for" + fishTempLow[0] + "," + fishTempLow[1] + "& more...")
        }

        if (fishTempHigh.length === 1) {
            setTempHighDesc("Temp too high for", fishTempHigh[0])
        } else if (fishTempHigh.length === 2) {
            setTempHighDesc("Temp too high for", fishTempHigh[0], "&", fishTempHigh[1])
        } else if (fishTempHigh.length >= 3) {
            setTempHighDesc("Temp too high for", fishTempHigh[0],",", fishTempHigh[1], "& more...")
        }

        if (tempLow >= 1) {
            setTempLow(true)
        }

        if (tempHigh >= 1) {
            setTempHigh(true)
        }

        if (phLow >= 1) {
            setPhLow(true)
        } 

        if (phLow >= 1) {
            setPhHigh(true)
        }
    }

    return(
        <div>
            <StandardNavBar />

            <div className="tankCardContainer">

                <TankCardMain tank={tank} levels={levels} celcius={celcius} fahrenheit={fahrenheit} deleteSwitch={deleteSwitch}/>

                <MyFish fishies={fishies} levels={levels} celcius={celcius} stock={stock} tank={tank}/>

                <TankJournal tank={tank} levels={levels}/>

                <OnTimeCard />

            </div>

            <Footer />
        </div>
    )
}

export default withAuthenticationRequired(TankCardExpanded, {
    onRedirecting: () => <Loading />,
  });