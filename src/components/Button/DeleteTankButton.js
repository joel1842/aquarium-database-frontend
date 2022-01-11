import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./DeleteTankButton.css"

const DeleteTankButton = ({ tank, deleteSwitch }) => {

    const { getAccessTokenSilently } = useAuth0()
    const id = tank.id;

    const deleteTank = async () => {
        try {

            const token = await getAccessTokenSilently()

            fetch('http://localhost:3001/deletetank/' + id, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })

            deleteSwitch()
            window.history.back()
        } catch (error) {
            console.error()
        }
    }

    return <button className="deleteTank" onClick={deleteTank}>Remove ❌</button>
}

export default DeleteTankButton;