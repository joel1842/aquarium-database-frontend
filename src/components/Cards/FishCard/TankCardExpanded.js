import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "./TankCardExpanded.css";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../../../routes/Loading";
import { StandardNavBar } from "../../../components/Bars/StandardNavBar";
import DeleteTankButton from "../../Button/DeleteTankButton";
import aquarium from "../../../assets/aquarium.png"

const TankCardExpanded = ({tank, deleteSwitch}) => {

    const [fishies, setFishies] = useState();
    const {getAccessTokenSilently} = useAuth0()

    const catchMyFish = async () => {
        try {
            
            const token = await getAccessTokenSilently()
            const data = {
                tank: tank.tankName
            }

            const response = await fetch('http://localhost:3001/myfish', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            })
            const responseData = await response.json()
 
            if (responseData.length >= 1) {
                setFishies(responseData)
                console.log("Caught your fishies!")
            } else {
                console.log("No fishies!")
            }
            
        } catch (error) {
            console.error()
        }
    }

    useEffect(() => {
        catchMyFish()
    }, [])

    const ph = "7.0"
    const health = "Good 💪"
    const tempC = "27 C° "
    const tempF = "(80.6 f°)"

    return(
        <div>
            <StandardNavBar />

            <div className="tankCardContainer">

                <div className="tankHeadContainer">

                    <div className="quickInfo">
                        <img className="myTankTank" src={aquarium} alt="tank"/>
                        <h1 className="tankHeader">{tank.tankName}</h1>
                        <h2 className="tankSize">{tank.tankSize} {tank.unit}</h2>
                        <DeleteTankButton tank={tank} deleteSwitch={deleteSwitch}/>
                    </div>
                    
                    <div className="quickHealth">
                        <div className="tempCard">
                            <h2>Temperature</h2>
                            <p><b>{tempC}</b>{tempF}</p>
                        </div>
                        <div className="healthCard">
                            <h2>Health</h2>
                            <p>{health}</p>
                        </div>
                        <div className="phCard">
                            <h2>pH Level</h2>
                            <p>{ph}</p>
                        </div>
                    </div>
                </div>




                <div className="myFishCard">
                    <h2>My Fish</h2>

                    {fishies && fishies.map((fish, index) => {
                        return(
                            <Link to={fish.link} key={index}>
                                <div className="tankFish">
                                    <img className="fishPic" src={fish.pic} alt={fish.name} />
                                    <h3 className="tankFishName">{fish.name}</h3>
                                </div> 
                            </Link>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}

export default withAuthenticationRequired(TankCardExpanded, {
    onRedirecting: () => <Loading />,
  });