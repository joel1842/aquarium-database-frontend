import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const DeleteTankFish = ({ fish, updateFish }) => {

    const { getAccessTokenSilently } = useAuth0()
    const id = fish.id;

    const removeRequest = async () => {

        try {
            const token = await getAccessTokenSilently()

            const response = fetch('http://localhost:3001/deletetankfish/' + id, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": 'application/json; charset=UTF-8'
                }
            })

        } catch (error) {
            console.error()
        }
    }
 
    // removeRequest().then(() => {
    //     updateFish()
    // })


    return <button className="removeFish" onClick={removeRequest}>❌</button>
}