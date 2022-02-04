import React from "react";
import './DeleteFavButton.css'
import { useAuth0 } from "@auth0/auth0-react";

const DeleteFavorite = ({ userData, deleteFish }) => {

    const { getAccessTokenSilently } = useAuth0()
    const id = userData.id;

    const deleteFishie = async () => {
        try{
            const token = await getAccessTokenSilently()
            const response = await fetch('https://localhost:8000/removefav/' + id, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json; charset=UTF-8'
                }
            });
            const responseData = await response.json();
            console.log(responseData)
            deleteFish()
        } catch (error) {
            console.error()
        }

    }

    return(
        <button className='deleteFav' onClick={deleteFishie}>Remove ❌</button>
    )
}

export default DeleteFavorite;