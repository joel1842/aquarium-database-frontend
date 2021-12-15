import React from "react";
import './DeleteFavButton.css'

const DeleteFavorite = ({ userData, deleteFish }) => {

    const id = userData.id;

    const deleteFishie = () => {
        fetch('http://localhost:3001/removefav/' + id, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(response => 
            response.json()
        ).then(data => {
            console.log('Success:', data);
        }).catch((error) => {
            console.log('Error:', error)
        })

        deleteFish()
    }

    return(
        <button className='deleteFav' onClick={deleteFishie}>Remove ❌</button>
    )
}

export default DeleteFavorite;