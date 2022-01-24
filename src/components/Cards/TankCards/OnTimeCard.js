import { useState, useEffect } from 'react';
import "./OnTimeCard.css";

export const OnTimeCard = () => {

    const [interval, setInterval] = useState()
    const [notification, setNotification] = useState()

    useEffect(() => {
        console.log(interval, notification)
    }, [notification, interval])


     return (
         <div className="onTimeContainer">
            <div className="onTimeHeader">
                <h1>On Time!</h1>
                <h3>Never miss another water change!</h3>
            </div>
            <div className="onTimeFormContainer">
                <form className="onTimeForm">
                    <h3>How often do you change your water?</h3>
                    <label className="everyLabel" for="interval">Every</label>
                    <select className="intervalInput" id="interval" name="interval" onChange={(event)=> setInterval(event.target.value)}>
                        <option value="week">Week</option>
                        <option value="2 weeks">2 Weeks</option>
                        <option value="4 weeks">4 weeks</option>
                    </select>

                    <h3>How do you want to be notified?</h3>
                    <div className="emailNotify">
                        <label for="email">Email</label>
                        <input type="radio" id="email" name="notification" onChange={(event)=> setNotification(event.target.value)}/>
                    </div>
                    <div className="textNotify">
                        <label for="text">Text</label>
                        <input type="radio" id="text" name="notification" onChange={(event)=> setNotification(event.target.value)}/>
                    </div>
                </form>
                <div>
                    <button className="onTimeSubmit">Submit!</button>
                </div>
            </div>
         </div>
     )
}