import React from "react";
import './FishCard.css';
import { useAuth0 } from "@auth0/auth0-react";

const FishCard = ({ fishData }) => {

    const { isAuthenticated } = useAuth0()

    const easy = "linear-gradient(165.41deg, rgba(255, 255, 255, 0.525) -19.95%, rgba(255, 255, 255, 0.075) 98.98%), #7BE22A"
    const easyShadow = "0px 2px 2px #65C21B"
    const medium = "linear-gradient(166.25deg, rgba(255, 255, 255, 0.525) -38.77%, rgba(255, 255, 255, 0.075) 99.58%), #FFE156"
    const mediumShadow = "0px 2px 2px #D8C93B"
    const hard = "linear-gradient(165.88deg, rgba(255, 255, 255, 0.525) -47.86%, rgba(255, 255, 255, 0.075) 89.89%), #FF3434"
    const hardShadow = "0px 2px 2px #D34315"

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