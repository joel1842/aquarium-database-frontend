import React, {useState} from "react"
import { useAuth0 } from "@auth0/auth0-react";
import star from "../../assets/star.png"
import './favoritesbutton.css'

const FavoritesButton = ({fishData}) => {
    
    const { user } = useAuth0()

    const data = {
        user: user.email,
        pic: fishData.pic1,
        name: fishData.name
    }

    const sendRequest = () => {

        fetch('http://localhost:3001/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
    }


    return <button className='favButton'onClick={sendRequest}>
                <img src={star} alt="Add Favorite"/>
            </button>
}

export default FavoritesButton;