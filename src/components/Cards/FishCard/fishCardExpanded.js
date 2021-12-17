import { useEffect, useState } from 'react';
import FishCard from './FishCard';
import './FishExpanded.css';

export const FishExpanded = ({fishData}) => {

    return(
        <div className='fishCard'>
            <div className='fishHeader'>
                <img className='fishImg'src={fishData.pic1} alt='Espes Rasbora'/>
                <h1 className='fishName'>{fishData.name}</h1>
                <h3 className='subName'>{fishData.scientificName}</h3>
            </div>
            <div className='fastFacts'>
                <div className='temperament'>
                    <h2>{fishData.temperament}</h2>
                    <h1></h1>
                </div>
                <div className='parameters'>
                    <h2>Water Parameters</h2>
                    <p>Temperature: <b>{fishData.tempLowC}°C</b> - <b>{fishData.tempHighC}°C</b></p>
                    <p>pH Level: <b>{fishData.phLevelLow}</b> - <b>{fishData.phLevelHigh}</b></p>
                    <p>dH Level: <b>{fishData.dhLevelLow}°</b> - <b>{fishData.dhLevelHigh}°</b></p>
                </div>
                <div className='careLevel'>
                    <h2>Care level</h2>
                    <h1>{fishData.careLevel}</h1>
                </div>
            </div>
            <div className='fishInfo'>
                <div className='infoHeader'>
                    <h2>Fish Information</h2>
                </div>
                <div>
                    <h3>Size</h3>
                    <p><b>{fishData.sizeCM} cm</b> ({fishData.sizeIN} in)</p>
                </div>
                <div>
                    <h3>Diet Type</h3>
                    <p>{fishData.dietType}</p>
                </div>
                <div>
                    <h3>Origin</h3>
                    <p>{fishData.origin}</p>
                </div>
                <div>
                    <h3>Minimum Tank Size</h3>
                    <p><b>{fishData.tankSizeL} L</b> ({fishData.tankSizeG} G)</p>
                </div>
                <div>
                    <h3>Plants?</h3>
                    <p>{fishData.plants}</p>
                </div>
                <div>
                    <h3>Lifespan</h3>
                    <p>{fishData.lifespan} years</p>
                </div>
            </div>    
        </div>
    )
}