import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { DeleteTankFish } from "../../Button/DeleteTankFish"
import { EditQuantity } from '../../Button/EditQuantity';
import warning from "../../../assets/warning.png"
import "./MyFish.css"

export const MyFish = ({fishies, tank, celcius, stock, levels}) => {

    const [editFish, setEditFish] = useState(false)
    const editSwitch = () => {
        setEditFish(true)
    }

    const good = "linear-gradient(165.41deg, rgba(255, 255, 255, 0.525) -19.95%, rgba(255, 255, 255, 0.075) 98.98%), #7BE22A"
    const bad = "linear-gradient(165.88deg, rgba(255, 255, 255, 0.525) -47.86%, rgba(255, 255, 255, 0.075) 89.89%), #FF3434"
    const [stockColor, setStockColor] = useState()

    useEffect(() => {
        if (stock) {
            if (stock === "Overstocked!") {
                setStockColor(bad)
            } else {
                setStockColor(good)
            }
        }
    }, [stock])

    return (
        <div className="myFishCard">
            <div className="myFishHeader">
                <h2>My Fish</h2>
            </div>

            <div className="stock" style={{background: stockColor}}>
                <h3>{stock}</h3>
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
                let phlow = false;
                let phhigh = false;
                let templow = false;
                let temphigh = false;
                let notice = false;

                if (levels) {
                    if (levels[0].phLevel < fish.phlow) {
                        phlow = true
                        notice = true
                    } else if (levels[0].phLevel > fish.phhigh) {
                        phhigh = true
                        notice = true
                    }
            
                    if (celcius < fish.templow) {
                        templow = true
                        notice = true
                    } else if (celcius > fish.temphigh) {
                        templow = true
                        notice = true
                    }
                }

                return(
                    <div className={editFish ? "tankFish active" : "tankFish" && notice ? "tankFish alert" : "tankFish"} key={index}>
                        <img className="fishPic" src={fish.pic} alt={fish.name} />
                        <h3 className="tankFishName">{fish.name}</h3>
                        {!editFish && <h4 className="quantity">x {fish.quantity}</h4>}
                        <EditQuantity fish={fish} editFish={editFish} editSwitch={editSwitch}/>
                        <DeleteTankFish fish={fish} />
                        {phlow && !temphigh && !templow &&
                        <div className={editFish ? "none" : "notice phlow"}>
                            <img className="warning" src={warning} alt="Warning!"/>
                            <p>Tank pH too low!</p>
                        </div>}
                        {phhigh && !temphigh && !templow &&
                        <div className={editFish ? "none" : "notice phhigh"}>
                            <img className="warning" src={warning} alt="Warning!"/>
                            <p>Tank pH too high!</p>
                        </div>}
                        {templow && !phhigh && !phlow &&
                        <div className={editFish ? "none" : "notice templow"}>
                            <img className="warning" src={warning} alt="Warning!"/>
                            <p>Tank temperature too low!</p>
                        </div>}
                        {temphigh && !phhigh && !phlow &&
                        <div className={editFish ? "none" : "notice"}> 
                            <img className="warning" src={warning} alt="Warning!"/>
                            <p>Tank temperature too high!</p>
                        </div>}
                        {temphigh && phhigh && 
                        <div className={editFish ? "none" : "notice long"}> 
                            <img className="warning" src={warning} alt="Warning!"/>
                            <p>Tank temp & ph too high!</p>
                        </div>}
                        {temphigh && phlow && 
                        <div className={editFish ? "none" : "notice long"}> 
                            <img className="warning" src={warning} alt="Warning!"/>
                            <p>Temp too high & ph too low!</p>
                        </div>}
                        {templow && phlow &&
                        <div className={editFish ? "none" : "notice long"}> 
                            <img className="warning" src={warning} alt="Warning!"/>
                            <p>Tank temp & ph too low!</p>
                        </div>}
                        {templow && phhigh &&
                        <div className={editFish ? "none" : "notice long"}> 
                            <img className="warning" src={warning} alt="Warning!"/>
                            <p>Temp too low & ph too high!</p>
                        </div>}
                    </div> 
                )
            })}
        </div>
    )
}