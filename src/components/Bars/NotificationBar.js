import React, {useState} from 'react';
import './NotificationMenu.css'

export const NotificationBar = () => {

    const [active, setActive] = useState(false)

    const notificationSwitch = () => {
        if (active) {
            setActive(false) 
        } else {
            setActive(true)
        }
    }

    return (
        <>
        <button onClick={notificationSwitch}>Notification</button>
        <div className={active ? 'notificationContainer active' : 'notificationContainer'}>
            <p className='notificationIcon'>✅</p>
            <p className='notification'>Successfully Added to Joel's Tank!</p>
        </div>
        </>
    )
}
