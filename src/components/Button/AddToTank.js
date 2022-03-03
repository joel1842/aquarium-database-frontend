import React, {useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './AddToTank.css'
import add from "../../assets/add.png"
import { Checkmark } from "react-checkmark";

const AddToTank = ({ fishData, tanks }) => {

    const { getAccessTokenSilently } = useAuth0()

    const [dropdown, setDropdown] = useState(false);
    const [success, setSuccess] = useState(false);

    const [chooseTank, setChooseTank] = useState();
    const [quantity, setQuantity] = useState(1);

    // add to tank dropdown toggle
    const dropdownSwitch = () => {
        if (dropdown) {
            setDropdown(false)
        } else {
            setDropdown(true)
        }
    }

    // sets tank select dropdown to first tank in array
    useEffect(() => {
        if (tanks) {
            setChooseTank(tanks[0].id)
            console.log("tanks defined ")
        }
    }, [tanks])

    // sends fish & tank data to backend
    const sendRequest = async () => {

        try {
            const token = await getAccessTokenSilently()

            const data = {
                tank: chooseTank,
                fish: fishData.id,
                quantity: quantity
            }
    
            fetch('https://fishtank-wiki.herokuapp.com/myfish/addfish', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            }).then(res => {

                if(res.ok) {
                    setSuccess(true)
                    setDropdown(false)
                    setTimeout(() => {
                        setSuccess(false)
                    }, 3000)
                }

            })
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="addContainer">
            
            {success && <Checkmark size="40px" />}
            {!success && <button title="Add To Tank" className="plusButton" onClick={dropdownSwitch}>
                <img src={add} alt="Add To Tank"/>
            </button>}
            {dropdown && 
            <div className="dropdown">
                <select className="chooseTank" onChange={(event) => setChooseTank(event.target.value)}>
                    {tanks.map((tank, index) => (
                        <option value={tank.id} key={index}>{tank.tankName}</option>
                    ))}
                </select>
                <div>
                    <p className="qtyView">Qty: {quantity}</p>
                    <button className="qty" onClick={() => setQuantity(quantity + 1)}>+</button>
                    <button className="qty" onClick={() => setQuantity(quantity - 1)}>-</button>
                </div>

                {chooseTank && <button className="addToTank"onClick={sendRequest}>Add to tank!</button>}

            </div>}
        </div>
    )
}

export default AddToTank;