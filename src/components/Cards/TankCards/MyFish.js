import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { DeleteTankFish } from "../../Button/DeleteTankFish"
import "./MyFish.css"

export const MyFish = ({tank}) => {

    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        catchMyFish()
    }, [])

    const [fishies, setFishies] = useState()

    const catchMyFish = async () => {
        try {
            
            const token = await getAccessTokenSilently()
            const data = {
                tank: tank.tankName
            }

            const response = await fetch('http://localhost:3001/myfish', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            })
            const responseData = await response.json()
 
            if (responseData.length >= 1) {
                setFishies(responseData)
                console.log("Caught your fishies!")
            } else {
                console.log("No fishies!")
            }
            
        } catch (error) {
            console.error()
        }
    }

    return (
        <div className="myFishCard">
            <div className="myFishHeader">
                <h2>My Fish</h2>
            </div>

            {!fishies && 
            <div>
                <h2 className="noFish">No Fish Yet...</h2>
                <Link to="/browse">
                    <button className="addFishButton">Add Fish!</button>
                </Link>
            </div>
            }

            {fishies && fishies.map((fish, index) => {
                return(
                    <div className="tankFish">
                        <img className="fishPic" src={fish.pic} alt={fish.name} />
                        <h3 className="tankFishName">{fish.name}</h3>
                        <h4 className="quantity">x {fish.quantity}</h4>
                        <DeleteTankFish className="deletefish" fish={fish} />
                    </div> 
                )
            })}
        </div>
    )
}