import React, {useState} from "react"
import { useAuth0 } from "@auth0/auth0-react";
import star from "../../assets/star.png"
import './favoritesbutton.css'
import { Checkmark } from "react-checkmark";

const FavoritesButton = ({fishData}) => {
    
    const { getAccessTokenSilently } = useAuth0()

    // fish data
    const data = {
        fish: fishData.id,
        link: window.location.pathname
    }

    const [success, setSuccess] = useState(false)

    // add fish to favorites list
    const sendRequest = async () => {
        try {

            const token = await getAccessTokenSilently()

            fetch('https://fishtank-wiki.herokuapp.com/favorites/addfav/', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            }).then(() => {
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false)
                }, 3000)
            })

        } catch (error) {
            console.error()
        }
    }
    
    if (success) {
        return <Checkmark size="40px"/>
    } else {
        return (
        <button title="Add To Favorites" className='favButton'onClick={sendRequest}>
            <img src={star} alt="Add Favorite"/>
        </button>)
    }


}

export default FavoritesButton;