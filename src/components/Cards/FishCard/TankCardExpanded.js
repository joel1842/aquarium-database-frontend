import React, {useState, useEffect} from "react";
import "./TankCardExpanded.css";

const TankCardExpanded = ({tank}) => {

    const [fishies, setFishies] = useState();

    useEffect(() => {

        const data = {
            tank: tank.tankName
        }

        fetch('http://localhost:3001/myfish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
        }).then(jsonResponse => {
            if(jsonResponse.length >= 1) {
                setFishies(jsonResponse)
            } else {
                setFishies()
                console.log("No fishies!")
            }
        })

    }, [])

    return(
        <div>
            <h1>{tank.tankName}</h1>
            <h3>{tank.tankSize} {tank.unit}</h3>

            {fishies && fishies.map((fish, index) => {
                return(
                    <div>
                        <img className="fishPic" src={fish.pic}/>
                        <h3>{fish.name}</h3>
                    </div> 
                )
            })}
        </div>
    )
}

export default TankCardExpanded