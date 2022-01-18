import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const AddLevelsButton = ({fishLevels}) => {

    const { getAccessTokenSilently } = useAuth0()

    const submitLevels = async () => {
        if (fishLevels.ammonia && fishLevels.nitrate && fishLevels.nitrite && fishLevels.phLevel) {
            try {

                const token = await getAccessTokenSilently()
                fetch('http://localhost:3001/newentry', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(fishLevels)
                })
            } catch (error) {
                console.error()
            }
            
        }
    }

    return <button className="submitLevels" onClick={submitLevels}>Submit Entry</button>
}