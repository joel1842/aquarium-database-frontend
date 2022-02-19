import React, { useState } from "react";
import './DeleteFavButton.css'
import { useAuth0 } from "@auth0/auth0-react";
import { Checkmark } from "react-checkmark";

const DeleteFavorite = ({ userData, deleteFish }) => {

    const { getAccessTokenSilently } = useAuth0()
    const id = userData.id;

    const [success, setSuccess] = useState(false)

    const deleteFishie = async () => {
        try{
            const token = await getAccessTokenSilently()
            fetch('https://fishtank-wiki.herokuapp.com/removefav/' + id, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }).then(res => {
                if (res.ok) {
                    setSuccess(true)
                    setTimeout(() => {
                        setSuccess(false)
                        window.location.reload()
                    }, 3000)
                }
            })
  
        } catch (error) {
            console.error()
        }

    }

    if (success) {
        return (
            <div className="successFav">
                <Checkmark size="28px"/>
            </div>
        )
    } else {
        return(
            <button className='deleteFav' onClick={deleteFishie}>Remove ❌</button>
        )
    }

}

export default DeleteFavorite;