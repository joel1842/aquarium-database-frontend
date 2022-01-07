import React, {useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './AddToTank.css'
import add from "../../assets/add.png"

const AddToTank = ({ fishData, tanks }) => {

    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()

    const [dropdown, setDropdown] = useState(false);

    const [chooseTank, setChooseTank] = useState();

    useEffect(() => {
        if (tanks) {
            setChooseTank(tanks[0].tankName)
            console.log("tanks defined ")
        }
    }, [tanks])

    const sendRequest = async () => {

        try {

            const token = await getAccessTokenSilently()

            const data = {
                user: user.email,
                tank: chooseTank,
                pic: fishData.pic1,
                name: fishData.name
            }
    
            fetch('http://localhost:3001/addfish', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.error()
        }
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