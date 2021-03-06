import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Checkmark } from "react-checkmark";

export const AddLevelsButton = ({fishLevels, success, added}) => {

    const { getAccessTokenSilently } = useAuth0()

    // sends levels from new entry form to backend
    const submitLevels = async () => {
        if (fishLevels.tank && fishLevels.ammonia && fishLevels.nitrate && fishLevels.nitrite && fishLevels.phLevel) {
            try {
                const token = await getAccessTokenSilently()
                
                fetch('https://fishtank-wiki.herokuapp.com/newentry', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(fishLevels)
                }).then(res => {
                    if (res.ok) {
                        added()
                        setTimeout(() => {window.location.reload()}, 3000)
                    }
                })
                
            } catch (error) {
                console.error()
            }
            
        }
    }

    if (success) {
        return (
            <div className="success">
                <Checkmark size='30px'/>
                <p>Entry Added!</p>
            </div>
        )
    } else {
        return <button className="submitLevels" onClick={submitLevels}>Submit Entry</button>
    }
    
}