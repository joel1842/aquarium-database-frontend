import React from "react";
import './FishCard.css';
import { useAuth0 } from "@auth0/auth0-react";

const FishCard = ({ fishData }) => {

    const { isAuthenticated } = useAuth0()

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

    return (
        <div className='fishCardBrowse'>
            <div>
                <img className='fishCardPic' src={fishData.pic1} alt={fishData.name}/>
            </div>
            <div className='fishCardNames'>
                <h1 className='name'>{fishData.name}</h1>
                <h2 className='sciName'>{fishData.scientificName}</h2>

            </div>
            <div className='fishCardInfo' style={{background: careColor, boxShadow: shadow}}>
                <div className='sizeContainer'>
                    <h3 className='sizeHeader'>Size</h3>
                    <h3 className='fishSize'>{fishData.sizeCM} cm</h3>
                </div>
                <div className='careContainer'>
                    <h3 className='careHeader'>Care Level</h3>
                    <h3 className='fishCare'>{fishData.careLevel}</h3>
                </div>
            </div>
        </div>
    )
}

export default FishCard;