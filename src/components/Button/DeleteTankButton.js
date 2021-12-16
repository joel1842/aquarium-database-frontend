import React from "react";
import DeleteFavorite from "./DeleteFavButton";

const DeleteTankButton = ({ tank, deleteSwitch }) => {

    const id = tank.id;

    const deleteTank = () => {
        fetch('http://localhost:3001/deletetank/' + id, {
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

        deleteSwitch()
    }

    return <button onClick={deleteTank}>Remove ❌</button>
}

export default DeleteTankButton;