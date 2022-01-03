import React from "react";
import './FishCard.css';
import { useAuth0 } from "@auth0/auth0-react";

const FishCard = ({ fishData }) => {

    const { isAuthenticated } = useAuth0()

    const easy = "#85D700"
    const medium = "#F3E242"
    const hard = "#FB4F19"

    let careColor;

    if (fishData.careLevel === "Difficult") {
        careColor = hard;
    } else if (fishData.careLevel === "Intermediate"){
        careColor = medium;
    } else {
        careColor = easy;
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
            <div className='fishCardInfo' style={{background: careColor}}>
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