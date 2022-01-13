import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const CreateTank = ({ createSwitch }) => {

    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    const [start, setStart] = useState(true);
    const [create, setCreate] = useState(false);
    const [info, setInfo] = useState(false);
    const [type, setType] = useState(false);
    const [tankName, setTankName] = useState();
    const [tankSize, setTankSize] = useState();
    const [tankType, setTankType] = useState();
    const [unit, setUnit] = useState('Liters');
    const [unitLabel, setUnitLabel] = useState('Gallons')

    const createTank = () => {
        setCreate(true)
        setStart(false)
    }

    const getInfo = () => {
        setType(false)
        setInfo(true)
        
    }

    const getType = () => {
        setCreate(false)
        setType(true)
    }

    const unitSwitch = () => {
        if (unit === "Liters") {
            setUnit("Gallons")
            setUnitLabel("Liters")
        } else {
            setUnit("Liters")
            setUnitLabel("Gallons")
        }
    }
    
    const sendRequest = async () => {

        const token = await getAccessTokenSilently()

        const data = {
            tankName: tankName,
            tankSize: tankSize,
            tankType: tankType,
            unit: unit
        }

        fetch('http://localhost:3001/createtank', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }) 
        
        createSwitch()
    }

    return(
        <div>
            {start &&
            <div>
                <h4>Would you like to create a fishtank?</h4>
                <button onClick={createTank}>Create a tank!</button>
            </div>}
            {create && 
            <div>
                <h4>What do you want to name your tank?</h4>
                <input 
                className="TankNameInput" 
                type="text"
                placeholder="Tank name..." 
                onChange={(event) => {
                    setTankName(event.target.value)}}
                />
                <h1>{tankName}</h1>
                {tankName && <button onClick={getType}>Submit!</button>}
            </div>}
            {type &&
            <div>
                <h4>What kind of tank do you have?</h4>
                <label for="tropical">Tropical</label>
                <input
                id="tropical"
                className="typeInput"
                type="radio"
                name="tankType"
                value="Tropical"
                onChange={(event) => {
                    setTankType(event.target.value)
                }}
                />
                <label for="coldwater">Coldwater</label>
                <input
                id="coldwater"
                className="typeInput"
                type="radio"
                name="tankType"
                value="Coldwater"
                onChange={(event) => {
                    setTankType(event.target.value)
                }}
                />
                <h2>{tankType}</h2>
                <button onClick={getInfo}>Submit!</button>
            </div>
            }
            {info && <div>
                <h4>How big is your tank?</h4>
                <input type="number" onChange={(event) => {
                    setTankSize(event.target.value)
                }}/>
                {tankSize &&
                <div>
                    <h1>{tankSize} {unit}</h1>
                    <button onClick={unitSwitch}>Use {unitLabel}</button>
                    <button onClick={sendRequest}>Submit!</button>
                </div>}
            </div>}
        </div>
    )
}

export default CreateTank;