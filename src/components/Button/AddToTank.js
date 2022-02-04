import React, {useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './AddToTank.css'
import add from "../../assets/add.png"

const AddToTank = ({ fishData, tanks }) => {

    const { user, getAccessTokenSilently } = useAuth0()

    const [dropdown, setDropdown] = useState(false);

    const [chooseTank, setChooseTank] = useState();
    const [quantity, setQuantity] = useState(1);

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
                tank: chooseTank,
                pic: fishData.pic1,
                name: fishData.name,
                link: window.location.pathname,
                quantity: quantity
            }
    
            fetch('https://localhost:8000/addfish', {
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
            <button title="Add To Tank" className="plusButton" onClick={() => setDropdown(true)}>
                <img src={add} alt="Add To Tank"/>
            </button>
            {dropdown && 
            <div>
                <select onChange={(event) => setChooseTank(event.target.value)}>
                    {tanks.map((tank, index) => (
                        <option value={tank.tankName} key={index}>{tank.tankName}</option>
                    ))}
                </select>
                <p>Quantity: {quantity}</p>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
                <button onClick={() => setQuantity(quantity - 1)}>-</button>


                {chooseTank && <button onClick={sendRequest}>Add to tank!</button>}
            </div>}
        </div>
    )
}

export default AddToTank;