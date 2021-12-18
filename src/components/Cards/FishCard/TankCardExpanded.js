import React, {useState, useEffect} from "react";
import "./TankCardExpanded.css";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../../../routes/Loading";
import { StandardNavBar } from "../../../components/Bars/StandardNavBar";
import DeleteTankButton from "../../Button/DeleteTankButton";

const TankCardExpanded = ({tank, deleteSwitch}) => {

    const [fishies, setFishies] = useState();

    useEffect(() => {

        const data = {
            tank: tank.tankName
        }

        fetch('http://localhost:3001/myfish', {
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
                setFishies(jsonResponse)
            } else {
                setFishies()
                console.log("No fishies!")
            }
        })

    }, [])

    return(
        <div>
            <StandardNavBar />

            <div className="tankHeadContainer">
                <h1 className="tankHeader">{tank.tankName}</h1>
                <h2 className="tankSize">{tank.tankSize} {tank.unit}</h2>
                <DeleteTankButton tank={tank} deleteSwitch={deleteSwitch}/>
            </div>

            <h2>My Fish</h2>

            {fishies && fishies.map((fish, index) => {
                return(
                    <div className="tankFish">
                        <img className="fishPic" src={fish.pic} alt={fish.name} />
                        <h3 className="tankFishName">{fish.name}</h3>
                    </div> 
                )
            })}
        </div>
    )
}

export default withAuthenticationRequired(TankCardExpanded, {
    onRedirecting: () => <Loading />,
  });