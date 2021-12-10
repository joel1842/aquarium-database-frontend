import React, { useState } from "react";
import './tanksize.css';

const TankSizeCalculator = () => {

    const [length, setLength] = useState();
    const [width, setWidth] = useState();
    const [depth, setDepth] = useState();
    const [tankVolume, setTankVolume] = useState();

    const [unitBool, setUnitBool] = useState(true);
    const [unit, setUnit] = useState('Cm');
    const [unitString, setUnitString] = useState('Gallons');
    const [outputString, setOutputString] = useState('Liters');

    const getVolume = () => {

        const volume = length * width * depth
        
        if (unitBool === true) {
            // inch
            setTankVolume(volume / 1000);
            ;
        } else {
            // cm
            setTankVolume(volume / 231);
        }
    }

    const unitSwitch = () => {
        if (unitBool === true) {
            setTankVolume()
            setUnitBool(false);
            setUnit('Inches');
            setUnitString('Liters');
            setOutputString('Gallons'); 
        } else {
            setTankVolume()
            setUnitBool(true);
            setUnit('Cm')
            setUnitString('Gallons');
            setOutputString('Liters');
        }
    }

    return (
        <div>
            <div>
                <h1 className="tankSizeHeader">Tank Size Calculator</h1>
            </div>

            <div className="inputContainer">
                <div className='subHeaderContainer'>
                    <h2 className='subHeader'>Calculate Tank Size in {outputString}</h2>
                    <button onClick={unitSwitch}>Use {unitString}</button>
                </div>
                <div>
                    <input className="length" type="number" placeholder="Length" onChange={(event) => {
                        setLength(event.target.value);
                    }}></input>
                    <h2 className='unit'>{unit}</h2>
                </div>
                <div>
                    <input className="height" type="number" placeholder="Width" onChange={(event) => {
                        setWidth(event.target.value);
                    }}></input>
                    <h2 className='unit'>{unit}</h2>
                </div>
                <div>
                    <input className="depth" type="number" placeholder="Depth" onChange={(event) => {
                        setDepth(event.target.value);
                    }}></input>
                    <h2 className='unit'>{unit}</h2>
                </div>
                <div className="outputContainer">
                    <button onClick={getVolume}>Calculate Volume!</button>
                    {tankVolume && 
                    <div className='result'>
                         <h1><b>{tankVolume.toFixed(2)}</b> {outputString}</h1>
                    </div>}
                </div>
            </div>

        </div>
    )
}

export default TankSizeCalculator;