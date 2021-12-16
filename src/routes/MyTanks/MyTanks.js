import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading";
import CreateTank from "./CreateTank";
import TankCard from "../../components/Cards/FishCard/TankCard";
import { StandardNavBar } from "../../components/Bars/StandardNavBar";

const MyTanks = ({ getSearchTerm }) => {

    const { user } = useAuth0();
    const [tanks, setTanks] = useState();
    const [create, setCreate] = useState(false);
    const [deleteTank, setDeleteTank] = useState(false);

    const createSwitch = () => {
        setCreate(false)
    }

    const deleteSwitch = () => {
        setDeleteTank(true);
    }

    useEffect(() => {

        const data = {
            user: user.email
        }

            console.log(data)
            console.log(deleteTank)

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
                    setTanks()
                    console.log("No tanks!")
                }
            })

    }, [create, deleteTank])

    return (
        <div>
            <StandardNavBar getSearchTerm={getSearchTerm}/>

            <div>
                <h1>My Fish Tanks</h1>
                {!create && <button onClick={() => setCreate(true)}>New Tank</button>}
            </div>
            
            {!create && tanks && tanks.map((tank, index) => (
            <TankCard tank={tank} deleteSwitch={deleteSwitch} key={index}/>))}
            
            {!tanks && <h3>You don't have a tank yet!</h3>}
            {create && <CreateTank createSwitch={createSwitch}/>}
        </div>
    )
}
    
export default withAuthenticationRequired(MyTanks, {
    onRedirecting: () => <Loading />,
  });