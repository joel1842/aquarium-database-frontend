import { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import "./OnTimeCard.css";
import { useAuth0 } from '@auth0/auth0-react';
import { Checkmark } from 'react-checkmark';

export const OnTimeCard = () => {

    const [interval, setInterval] = useState()
    const [notification, setNotification] = useState('email')
    const [phone, setPhone] = useState()

    const { user, getAccessTokenSilently } = useAuth0()

    // useEffect(() => {
    // }, [notification, interval])

    const [submit, setSubmit] = useState(false)

    const submitInfo = async() => {
        try {
            console.log(notification)
            const token = await getAccessTokenSilently()

            const data = {
                interval: interval,
                type: notification,
                email: user.email,
                phone: phone
            }

            fetch('https://localhost:8000/ontime', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            }).then(res => {
                if (res.ok) {
                    setSubmit(true)
                }
            })
        } catch (err) {
            throw new Error(err)
        }
    }


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
                        <input type="radio" id="email" value="email" name="notification" onChange={(event)=> setNotification(event.target.value)}/>
                        <label for="email">Email</label>
                    </div>

                    <div className="textNotify">
                        <input type="radio" id="text" value="text" name="notification" onChange={(event)=> setNotification(event.target.value)}/>
                        <label for="text">Text</label>
                        {notification === "text" &&
                        <PhoneInput 
                            country={'ca'}
                            onlyCountries={["ca", "us"]}
                            value={phone}
                            onChange={phone => setPhone(phone)}
                        />
                        }
                    </div>
                </form>
                {!submit && 
                <div>
                    <button className="onTimeSubmit" onClick={submitInfo}>Submit!</button>
                </div>}
                {submit &&
                <div className='onTimeSuccess'>
                    <Checkmark size='30px'/>
                    <p>You will be notified!</p>
                </div>}
            </div>
         </div>
     )
}