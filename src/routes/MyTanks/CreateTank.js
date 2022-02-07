import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./createtank.css"

const CreateTank = ({ create, createSwitch }) => {

    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    const [name, setName] = useState(true)
    const [info, setInfo] = useState(false);
    const [type, setType] = useState(false);
    const [tankName, setTankName] = useState();
    const [tankSize, setTankSize] = useState();
    const [tankType, setTankType] = useState('Tropical');
    const [unit, setUnit] = useState('Liters');
    const [unitLabel, setUnitLabel] = useState('Gallons');

    const getInfo = () => {
        setType(false)
        setInfo(true)
    }

    const getType = () => {
        setType(true)
        setName(false)
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

        fetch('https://localhost:8000/createtank', {
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
            <h1 className="createHeader">Create a tank!</h1>

            <div className="createBody">
                {name &&
                <div>
                    <h4>What do you want to name your tank?</h4>
                    <input 
                    className="TankNameInput" 
                    type="text"
                    placeholder="Tank name..." 
                    onChange={(event) => {
                        setTankName(event.target.value)}}
                    />
                    {tankName && <button className="createSubmit" onClick={getType}>Submit!</button>}
                </div>}
                {type &&
                <div className="tankType">
    
                        <h4>What kind of tank do you have?</h4>
                            <div>
                                <input
                                defaultChecked
                                id="tropical"
                                className="typeInput"
                                type="radio"
                                name="tankType"
                                value="Tropical"
                                onChange={(event) => {
                                    setTankType(event.target.value)
                                }}
                                />
                                <label for="tropical">Tropical</label>
                            </div>
                            <div>
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
                                <label for="coldwater">Coldwater</label>
                            </div>
         
                    <button className="typeSubmit" onClick={getInfo}>Submit!</button>
                </div>
                }
                {info && 
                <div>
                    <h4>How big is your tank?</h4>
                    <input className="sizeInput" type="number" onChange={(event) => {
                        setTankSize(event.target.value)
                    }}/>

                        <h1>{tankSize} {unit}</h1>
                        <button className="unitSwitch" onClick={unitSwitch}>Use {unitLabel}</button>
                        <button className="tankSubmit" onClick={sendRequest}>Submit!</button>
                </div>}
            </div>
        </div>
    )
}

export default CreateTank;