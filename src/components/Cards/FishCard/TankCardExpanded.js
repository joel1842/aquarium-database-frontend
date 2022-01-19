import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "./TankCardExpanded.css";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../../../routes/Loading";
import { StandardNavBar } from "../../../components/Bars/StandardNavBar";
import DeleteTankButton from "../../Button/DeleteTankButton";
import aquarium from "../../../assets/aquarium.png"
import { DeleteTankFish } from "../../Button/DeleteTankFish";
import journal from "../../../assets/journal.png"
import add from "../../../assets/add.png"
import { AddLevelsButton } from "../../Button/AddLevelsButton";

const TankCardExpanded = ({tank, deleteSwitch}) => {

    const [fishies, setFishies] = useState();
    const {getAccessTokenSilently} = useAuth0()

    const ph = "7.0"
    const health = "Good 💪"
    const tempC = "27 C° "
    const tempF = "(80.6 f°)"

    const [ammonia, setAmmonia] = useState();
    const [nitrite, setNitrite] = useState();
    const [nitrate, setNitrate] = useState();
    const [phLevel, setPhLevel] = useState();
    const [alkalinity, setAlkalinity] = useState();
    const [dhLevel, setDhLevel] = useState();
    const [newEntry, setNewEntry] = useState(false)
    const [deleteFish, setDeleteFish] = useState(false)

    const fishLevels = {
        ammonia: ammonia,
        nitrite: nitrite,
        nitrate: nitrate,
        phLevel: phLevel,
        alkalinity: alkalinity,
        dhLevel: dhLevel
    }

    const updateFish = () => {
        setDeleteFish(true)
    }

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

    const [levels, setLevels] = useState();

    const getLevels = async () => {
        const token = await getAccessTokenSilently()
        const response = await fetch('http://localhost:3001/getjournal', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
        const responseData = await response.json()
        setLevels(responseData)
    }

    useEffect(() => {
        catchMyFish()
        getLevels()
        setDeleteFish(false)
    }, [deleteFish])

    return(
        <div>
            <StandardNavBar />

            <div className="tankCardContainer">

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

                <div className="myFishCard">
                    <div className="myFishHeader">
                        <h2>My Fish</h2>
                    </div>

                    {fishies && fishies.map((fish, index) => {
                        return(
                            <div className="tankFish">
                                <img className="fishPic" src={fish.pic} alt={fish.name} />
                                <h3 className="tankFishName">{fish.name}</h3>
                                <h4 className="quantity">x {fish.quantity}</h4>
                                <DeleteTankFish className="deletefish" fish={fish} />
                            </div> 
                        )
                    })}
                </div>

                <div className="tankLevelContainer">
                        <div className="tankLevelHeader">
                            <img src={journal} alt="Tank Journal"/>
                            <h1>Tank Journal</h1>
                            {/* <h2>• tested 2 weeks ago</h2> */}
                        </div>

                        {levels && !newEntry &&
                        <div className="tankLevels">
                            <div>
                                <h3>Ammonia</h3>
                                <p>{levels[0].ammonia} ppm</p>
                            </div>
                            <div>
                                <h3>Nitrites</h3>
                                <p>{levels[0].nitrites} ppm</p>
                            </div>
                            <div>
                                <h3>Nitrates</h3>
                                <p>{levels[0].nitrates} ppm</p>
                            </div>
                            <div>
                                <h3>pH Level</h3>
                                <p>{levels[0].phLevel} pH</p>
                            </div>
                            <div>
                                <h3>Alkalinity</h3>
                                <p>{levels[0].alkalinity} ppm</p>
                            </div>
                            <div>
                                <h3>dH Level</h3>
                                <p>{levels[0].dhLevel} ppm</p>
                            </div>
                        </div>}

                        {!newEntry &&
                        <div>
                            <button className="newEntryButton" onClick={() => setNewEntry(true)}>
                                <h2>New Entry</h2>
                                <img src={add} alt="New Entry!" />
                            </button>
                        </div>}
                        {newEntry &&
                        <div>
                            <div className="newEntryHead">
                                <h2>New Entry</h2>
                            </div>
                            <div className="newEntryContainer">
                                <div>
                                    <label className="tankLevelLabel" for="ammonia">Ammonia</label>
                                    <input 
                                    id="ammonia"
                                    className="TankLevelInput" 
                                    type="number"
                                    placeholder="Ammonia..." 
                                    onChange={(event) => {
                                    setAmmonia(event.target.value)}}
                                    />
                                </div>
                                <div>
                                    <label className="tankLevelLabel" for="nitrites">Nitrites</label>
                                    <input 
                                    id="nitrites"
                                    className="TankLevelInput" 
                                    type="number"
                                    placeholder="Nitrites..." 
                                    onChange={(event) => {
                                    setNitrite(event.target.value)}}
                                    />
                                </div>
                                <div>
                                    <label className="tankLevelLabel" for="nitrates">Nitrates</label>
                                    <input 
                                    id="nitrates"
                                    className="TankLevelInput" 
                                    type="number"
                                    placeholder="Nitrates..." 
                                    onChange={(event) => {
                                    setNitrate(event.target.value)}}
                                    />
                                </div>
                                
                                <div>
                                    <label className="tankLevelLabel" for="ph">pH Level</label>
                                    <input 
                                    id="ph"
                                    className="TankLevelInput" 
                                    type="number"
                                    placeholder="pH Level..." 
                                    onChange={(event) => {
                                    setPhLevel(event.target.value)}}
                                    />
                                </div>
                                <div>
                                    <label className="tankLevelLabel" for="alkalinity">Alkalinity</label>
                                    <input 
                                    id="alkalinity"
                                    className="TankLevelInput" 
                                    type="number"
                                    placeholder="Alkalinity..." 
                                    onChange={(event) => {
                                    setAlkalinity(event.target.value)}}
                                    />
                                </div>
                                <div>
                                    <label className="tankLevelLabel" for="dh">dH Level</label>
                                    <input 
                                    id="dh"
                                    className="TankLevelInput" 
                                    type="number"
                                    placeholder="dH Level..." 
                                    onChange={(event) => {
                                    setDhLevel(event.target.value)}}
                                    />
                                </div>
                                <AddLevelsButton fishLevels={fishLevels}/>
                            </div>
                        </div>}
                        
                    </div>

            </div>
        </div>
    )
}

export default withAuthenticationRequired(TankCardExpanded, {
    onRedirecting: () => <Loading />,
  });