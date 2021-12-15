import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import CreateTank from "./CreateTank";
import TankCard from "../../components/Cards/FishCard/TankCard";
import { StandardNavBar } from "../../components/Bars/StandardNavBar";

const MyTanks = ({ getSearchTerm }) => {

    const { user, isAuthenticated } = useAuth0();
    const [tanks, setTanks] = useState();
    const [create, setCreate] = useState(false);

    const createSwitch = () => {
        setCreate(false)
    }

    useEffect(() => {

        if (isAuthenticated) {
            const data = {
                user: user.email
            }

            console.log(data)

            fetch('http://localhost:3001/mytanks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            }).then((res) => {
                if (res.ok) {
                    return res.json();
                }
            }).then(jsonResponse => {
                if(jsonResponse.length >= 1) {
                    setTanks(jsonResponse)
                } else {
                    console.log("No tanks!")
                }
            })
        }

    }, [isAuthenticated, create])

    if(isAuthenticated) {
        return (
            <div>
                <StandardNavBar getSearchTerm={getSearchTerm}/>

                <div>
                    <h1>My Fish Tanks</h1>
                    {!create && <button onClick={() => setCreate(true)}>New Tank</button>}
                </div>
                
                {!create && tanks && tanks.map((tank, index) => (
                <TankCard tank={tank} key={index}/>))}
               
                {!tanks && <h3>You don't have a tank yet!</h3>}
                {create && <CreateTank createSwitch={createSwitch}/>}
            </div>
        )
    } else {
        return (
            <div>
                <h1>My Fish Tanks</h1>
                <h2>Catching your tanks!</h2>
            </div>
        )
    }
}
    

export default MyTanks;