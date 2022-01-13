import React, { useState, useEffect } from "react";
import './tanksize.css';
import aquarium from "../../assets/aquarium.png"
import rectanglePic from "../../assets/rectangle.png"
import cubePic from "../../assets/cube.png"
import bowfrontPic from "../../assets/bowfront.png"
import cylinderPic from "../../assets/cylinder.png"

const TankSizeCalculator = () => {

    const [tankPic, setTankPic] = useState(rectanglePic);

    const [length, setLength] = useState();
    const [width, setWidth] = useState();
    const [fullWidth, setFullWidth] = useState();
    const [depth, setDepth] = useState();
    const [tankVolume, setTankVolume] = useState();

    const [unitBool, setUnitBool] = useState(true);
    const [unit, setUnit] = useState('Cm');
    const [unitString, setUnitString] = useState('Gallons');
    const [outputString, setOutputString] = useState('Liters');
    
    const [rectangular, setRectangular] = useState(true);
    const [cube, setCube] = useState(false);
    const [bowFront, setBowFront] = useState(false);
    const [cylinder, setCylinder] = useState(false);

    const [tankType, setTankType] = useState("Rectangular")

    const tankBoolSwitch = () => {

        console.log(tankType)
        if (tankType === "Rectangular") {
            setTankPic(rectanglePic)
            setRectangular(true);
            setCube(false);
            setBowFront(false);
            setCylinder(false);
        } else if (tankType === "Cube") {
            setTankPic(cubePic)
            setRectangular(false);
            setCube(true);
            setBowFront(false);
            setCylinder(false);
        } else if (tankType === "Bow Front") {
            setTankPic(bowfrontPic)
            setRectangular(false);
            setCube(false);
            setBowFront(true);
            setCylinder(false);
        } else if (tankType === "Cylinder") {
            setTankPic(cylinderPic)
            setRectangular(false);
            setCube(false);
            setBowFront(false);
            setCylinder(true);
        }
    }

    const tankSwitch = (event) => {
        setTankType(event.target.value);
    }

    useEffect(() => {
        tankBoolSwitch();
    }, [tankType])

    const getVolume = () => {

        let volume;

        const getRectangularVolume = () => {
            volume = length * width * depth;
        }

        const getCubeVolume = () => {
            volume = length * length * length;
        }

        const getBowFrontVolume = () => {
            let squareArea = length * width;
            let elipticalArea = Math.PI * (length / 2) * (fullWidth - width) / 2;
            volume = (squareArea + elipticalArea) * depth;
        }

        const getCylinderVolume = () => {
            let radius = width / 2;
            volume = Math.PI * (radius * radius) * depth;
        }

        if (cylinder) {
            getCylinderVolume()
        } else if (cube) {
            getCubeVolume()
        } else if (bowFront) {
            getBowFrontVolume()
        } else {
            getRectangularVolume()
        }

        if (unitBool === true) {
            // inch
            setTankVolume(volume / 1000);
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

                <div className="selectContainer">
                    <label className="selectHeader">Choose tank shape:</label>
                    <select className="tankShapes" name="tankShapes" onChange={tankSwitch}>
                        <option value="Rectangular">Rectangular</option>
                        <option value="Cube">Cube</option>
                        <option value="Bow Front">Bow Front</option>
                        <option value="Cylinder">Cylinder</option>
                    </select>
                    <img className="tankPic" src={tankPic} alt="tank shape"/>
                </div>

                <div className="sizeInputs">
                    {cylinder ? null : 
                    <div>
                        <input className="length" type="number" placeholder="Length" onChange={(event) => {
                            setLength(event.target.value);
                        }}></input>
                        <h2 className='unit'>{unit}</h2>
                    </div>}
                    {cube ? null :
                    <div>
                        <input className="height" type="number" placeholder="Width" onChange={(event) => {
                            setWidth(event.target.value);
                        }}></input>
                        <h2 className='unit'>{unit}</h2>
                    </div>}
                    {cube ? null : 
                    <div>
                        <input className="depth" type="number" placeholder="Depth" onChange={(event) => {
                            setDepth(event.target.value);
                        }}></input>
                        <h2 className='unit'>{unit}</h2>
                    </div>}
                    {(rectangular || cube || cylinder) ? null : 
                    <div>
                        <input className="fullWidth" type="number" placeholder="Full Width" onChange={(event) => {
                            setFullWidth(event.target.value);
                        }}></input>
                        <h2 className='unit'>{unit}</h2>
                    </div>}
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