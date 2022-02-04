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

    useEffect(() => {
        getLevels()
    }, [])

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

                <TankCardMain tank={tank} levels={levels} deleteSwitch={deleteSwitch}/>

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