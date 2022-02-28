import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Checkmark } from "react-checkmark";
import "./DeleteTankButton.css"

const DeleteTankButton = ({ tank }) => {

    const { getAccessTokenSilently } = useAuth0()
    const id = tank.id;

    const [deleted, setDeleted] = useState(false)

    // delete user tank
    const deleteTank = async () => {
        try {

            const token = await getAccessTokenSilently()

            fetch('https://fishtank-wiki.herokuapp.com/deletetank/' + id, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }).then(res => {
                if (res.ok) {
                    setDeleted(true)
                    setTimeout(() => {
                        window.history.back()
                    }, 3000)
                    setTimeout(() => {
                        window.location.reload()
                    }, 3050)
                }
            })

        } catch (error) {
            console.error()
        }
    }
    if (!deleted) {
        return <button className="deleteTank" onClick={deleteTank}>Remove ❌</button>
    } else {
        return(
            <div className="tankDeleted">
                <Checkmark size='30px'/>
                <p>Tank Removed!</p>
            </div>
        )
    }

}

export default DeleteTankButton;