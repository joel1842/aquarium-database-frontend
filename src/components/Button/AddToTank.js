import React, {useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './AddToTank.css'
import add from "../../assets/add.png"

const AddToTank = ({ fishData }) => {

    const { user } = useAuth0()

    const [tanks, setTanks] = useState();

    useEffect(() => {

        const data = {
            user: user.email
        }

        fetch('http://localhost:3001/mytanks', {
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
                setTanks(jsonResponse)
            } else {
                setTanks()
                console.log("No tanks!")
            }
        })

    }, [])

    const [dropdown, setDropdown] = useState(false);

    const [chooseTank, setChooseTank] = useState();

    useEffect(() => {
        if (tanks) {
            setChooseTank(tanks[0].tankName)
        }
    }, [tanks])

    const sendRequest = () => {

        const data = {
            user: user.email,
            tank: chooseTank,
            pic: fishData.pic1,
            name: fishData.name
        }

        fetch('http://localhost:3001/addfish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
    }

    return (
        <div>
            <button className="plusButton" onClick={() => setDropdown(true)}>
                <img src={add} alt="Add To Tank"/>
            </button>
            {dropdown && 
            <div>
                <select onChange={(event) => setChooseTank(event.target.value)}>
                    {tanks.map((tank, index) => (
                        <option value={tank.tankName} key={index}>{tank.tankName}</option>
                    ))}
                </select>
                {chooseTank && <button onClick={sendRequest}>Add to tank!</button>}
            </div>}
        </div>
    )
}

export default AddToTank;