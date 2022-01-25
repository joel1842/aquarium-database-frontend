import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { AddLevelsButton } from "../../Button/AddLevelsButton"
import journal from "../../../assets/journal.png"
import add from "../../../assets/add.png"
import "./TankJournal.css"

export const TankJournal = ({tank}) => {

    const {getAccessTokenSilently} = useAuth0();

    const [levels, setLevels] = useState();
    const [ammonia, setAmmonia] = useState();
    const [nitrite, setNitrite] = useState();
    const [nitrate, setNitrate] = useState();
    const [phLevel, setPhLevel] = useState();
    const [alkalinity, setAlkalinity] = useState();
    const [dhLevel, setDhLevel] = useState();
    const [newEntry, setNewEntry] = useState(false);

    const fishLevels = {
        ammonia: ammonia,
        nitrite: nitrite,
        nitrate: nitrate,
        phLevel: phLevel,
        alkalinity: alkalinity,
        dhLevel: dhLevel,
        tankName: tank.tankName
    }

    useEffect(() => {
        getLevels()
    }, [])

    const getLevels = async () => {
        const token = await getAccessTokenSilently()
        const fishtankName = {
            tank: tank.tankName
        }
        const response = await fetch('http://localhost:3001/getjournal', {
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

    return (
        <div className="tankLevelContainer">
            <div className="tankLevelHeader">
                <img src={journal} alt="Tank Journal"/>
                <h1>Tank Journal</h1>
                {/* <h2>• tested 2 weeks ago</h2> */}
            </div>

            {!levels && 
            <div>
                <h2 className="noEntries">No Entries Yet!</h2>
            </div>
            }

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
    )
}