import { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import "./OnTimeCard.css";
import { useAuth0 } from '@auth0/auth0-react';
import { Checkmark } from 'react-checkmark';
import construction from "../../../assets/underconstruction.png"

export const OnTimeCard = () => {

    const { user, getAccessTokenSilently } = useAuth0()

    const [interval, setInterval] = useState()
    const [notification, setNotification] = useState('email')
    const [phone, setPhone] = useState()
    const [submit, setSubmit] = useState(false)

    // sends on time info to backend
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

            fetch('https://fishtank-wiki.herokuapp.com/ontime', {
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

    const [date, setDate] = useState()

    // gets current date for date input
    useEffect(() => {
        const getDate = () => {
            const dateObj = new Date();
            let month = dateObj.getUTCMonth() + 1;
            let day = dateObj.getUTCDate();
            const year = dateObj.getUTCFullYear();

            if (month <= 9) {
                month = `0${month}`
            }

            if (day <= 9) {
                day = `0${day}`
            }
            
            const newdate = `${year}-${month}-${day}`
            setDate(newdate)
        }
        getDate()

    }, [date])

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

                    <h3>Choose a start date!</h3>
                    <div>
                    {date && 
                    <input className="startDate" type="date" id="start" name="trip-start"
                        defaultValue={date}
                        min="2022-01-01" max="2040-12-31" />}
                    </div>

                    <h3>How do you want to be notified?</h3>
                    <div className="emailNotify">
                        <input type="radio" id="email" value="email" name="notification" defaultChecked onChange={(event)=> setNotification(event.target.value)}/>
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
                    <button className="onTimeSubmit">
                        <img src={construction} alt="Under Construction!"/>
                        <p>Under Construction!</p>
                    </button>
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