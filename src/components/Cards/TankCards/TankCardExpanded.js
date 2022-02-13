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
        const response = await fetch('https://localhost:8000/getjournal', {
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

    return(
        <div>
            <StandardNavBar />

            <div className="tankCardContainer">

                <TankCardMain tank={tank} levels={levels} celcius={celcius} fahrenheit={fahrenheit} deleteSwitch={deleteSwitch}/>

                <MyFish tank={tank}/>

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