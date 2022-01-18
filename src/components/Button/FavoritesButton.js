import React, {useState} from "react"
import { useAuth0 } from "@auth0/auth0-react";
import star from "../../assets/star.png"
import './favoritesbutton.css'

const FavoritesButton = ({fishData}) => {
    
    const { getAccessTokenSilently } = useAuth0()

    const data = {
        pic: fishData.pic1,
        name: fishData.name,
        link: window.location.pathname
    }

    

    const sendRequest = async () => {
        try {

            const token = await getAccessTokenSilently()

            fetch('http://localhost:3001/favorites', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            });

        } catch (error) {
            console.error()
        }
    }


    return <button title="Add To Favorites" className='favButton'onClick={sendRequest}>
                <img src={star} alt="Add Favorite"/>
            </button>
}

export default FavoritesButton;