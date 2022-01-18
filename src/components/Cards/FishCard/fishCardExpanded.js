import { useEffect, useState } from 'react';
import './FishExpanded.css';
import FavoritesButton from '../../Button/FavoritesButton';
import AddToTank from '../../Button/AddToTank';
import Thermometer from '../../../assets/thermometer.png'
import star from "../../../assets/star.png"
import { useAuth0 } from '@auth0/auth0-react';

export const FishExpanded = ({ fishData, tanks }) => {

    const {isAuthenticated} = useAuth0();

    const easy = "radial-gradient(147.24% 111.72% at 50% 0%, rgba(255, 255, 255, 0.525) 0%, rgba(255, 255, 255, 0.075) 100%), #85D700"
    const easyShadow = "0px 2px 0px #79C400"
    const medium = "radial-gradient(147.24% 111.72% at 50% 0%, rgba(255, 255, 255, 0.525) 0%, rgba(255, 255, 255, 0.075) 100%), #F3E242"
    const mediumShadow = "0px 2px 0px #D8C93B"
    const hard = "radial-gradient(147.24% 111.72% at 50% 0%, rgba(255, 255, 255, 0.525) 0%, rgba(255, 255, 255, 0.075) 100%), #FB4F19"
    const hardShadow = "0px 2px 0px #D34315"

    let careColor;
    let shadow;

    if (fishData.careLevel === "Difficult") {
        careColor = hard;
        shadow = hardShadow;
    } else if (fishData.careLevel === "Intermediate"){
        careColor = medium;
        shadow = mediumShadow;
    } else {
        careColor = easy;
        shadow = easyShadow;
    }
    
    return(
        <div className='fishCard'>
            
            <div className='fishHeader'>
                <img className='fishImg'src={fishData.pic1} alt='Espes Rasbora'/>
                <div className='fishTitle'>
                    <div className="fishNames">
                        <h1 className='fishName'>{fishData.name}</h1>
                        <h3 className='subName'>{fishData.scientificName}</h3>
                    </div>
                    {isAuthenticated && 
                    <div className="buttonGroup">
                        <div className="fav">
                            <FavoritesButton fishData={fishData}/>
                        </div>
                        <div className="add">
                            <AddToTank fishData={fishData} tanks={tanks}/>
                        </div>
                    </div>}
                </div>
            </div>
            <div className='fastFacts'>
                <a href="/browse">
                    <button className="back" title="Go Back!">❌</button>
                </a>
                <div className='careLevel' style={{background: careColor, boxShadow: shadow}}>
                    <h2>Care level</h2>
                    <h1>{fishData.careLevel}</h1>
                </div>
                <div className='temperature'>
                    <img className="thermometer" src={Thermometer}/>
                    <h2 className="tempHead">Temperature</h2>
                    <h1 className="tempC"><b>{fishData.tempLowC}°C</b> - <b>{fishData.tempHighC}°C</b></h1>
                    <h2 className="tempF">({fishData.tempLowF}°f - {fishData.tempHighF}°f)</h2>
                </div>
                <div className='temperament'>
                    <h2>Temperament</h2>
                    <h1>{fishData.temperament}</h1>
                </div>
            </div>
            <div className='fishInfo'>
                <div>
                    <h3>Origin</h3>
                    <p>{fishData.origin}</p>
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
                    <h3>Tank Size</h3>
                    <p><b>{fishData.tankSizeL} L </b> ({fishData.tankSizeG} G)</p>
                </div>
                <div>
                    <h3>Lifespan</h3>
                    <p>{fishData.lifespan} years</p>
                </div>
                <div>
                    <h3>Plants?</h3>
                    <p>{fishData.plants}</p>
                </div>
            </div>    
        </div>
    )
}