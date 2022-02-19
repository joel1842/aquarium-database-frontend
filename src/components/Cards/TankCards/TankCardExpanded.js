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
        getLevels()
    }, [getAccessTokenSilently, tank.tankName])

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

    useEffect(() => {
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
        catchMyFish()
    }, [getAccessTokenSilently, tank.tankName])


    const [fishies, setFishies] = useState()
    const [stock, setStock] = useState()

    useEffect(() => {
        if (fishies && tank) {
            const getStock = () => {
                let size = []
                fishies.forEach((fish) => {
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
            getStock()
        }
    }, [fishies, tank])

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