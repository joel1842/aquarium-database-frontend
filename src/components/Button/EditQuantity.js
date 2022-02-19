import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Checkmark } from 'react-checkmark';
import './editquantity.css'

export const EditQuantity = ({ fish, editFish, editSwitch }) => {

    const { getAccessTokenSilently } = useAuth0()
    const [success, setSuccess] = useState(false);
    const id = fish.id

    const [fishQuantity, setFishQuantity] = useState(Number(fish.quantity))

    const resubmitQuanity = async() => {

        const token = await getAccessTokenSilently()

        console.log(fishQuantity)
        const data = {
            fishQuantity: fishQuantity
        }

        fetch('https://fishtank-wiki.herokuapp.com/editfish/' + id, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data) 
        }).then(res => {
            if (res.ok) {
                setSuccess(true)
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }
        })
    }

    return (
        <div className="editQuantity">
            {!editFish && !success &&
            <div>
                <button className='editSwitch' onClick={editSwitch}>Edit...</button>
            </div>
            }

            {editFish && !success && 
            <div className='edit'>
                    <h4>x {fishQuantity}</h4>
                    <div className='editButtons'>
                        <button className="editButton plus" onClick={() => setFishQuantity(fishQuantity + 1) }>+</button>
                        <button className="editButton minus" onClick={() => setFishQuantity(fishQuantity - 1)}>-</button>
                        <button className="submitButton" onClick={resubmitQuanity}>Submit</button>
                    </div>
            </div>
            }

            {success &&
            <div className='editSuccess'>
                <Checkmark size='20px'/>
            </div>}
        </div>
    )
}