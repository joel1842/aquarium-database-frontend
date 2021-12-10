import React from "react";

const DeleteFavorite = ({ userData }) => {

    const id = userData.id;

    const deleteFish = () => {
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
    }

    return(
        <button onClick={deleteFish}>❌</button>
    )
}

export default DeleteFavorite;