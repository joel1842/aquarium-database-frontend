import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Checkmark } from "react-checkmark";
import "./deletetankfish.css"

export const DeleteTankFish = ({ fish, updateFish }) => {

    const { getAccessTokenSilently } = useAuth0()
    const id = fish.id;

    const [success, setSuccess] = useState(false)

    const removeRequest = async () => {

        try {
            const token = await getAccessTokenSilently()

            fetch('https://localhost:8000/deletetankfish/' + id, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": 'application/json; charset=UTF-8'
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
            <div className="removeSuccess">
                <Checkmark size="16px" />
            </div>
        )
    } else {
        return <button className="removeFish" onClick={removeRequest}>❌</button>
    }

}