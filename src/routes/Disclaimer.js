import React, { useState } from 'react';
import './Disclaimer.css'
import { StandardNavBar } from '../components/Bars/StandardNavBar';
import Footer from '../components/Bars/Footer';
import { useAuth0 } from '@auth0/auth0-react';
import { Checkmark } from 'react-checkmark'

export const Disclaimer = () => {

    const { getAccessTokenSilently } = useAuth0()

    const [success, setSuccess] = useState(false)

    const [error, setError] = useState();
    const [link, setLink] = useState();

    const data = {
        error: error,
        link: link
    }

    const submitError = async () => {
        try {
            const token = await getAccessTokenSilently()

            fetch('https://localhost:8000/errorform', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            }).then((res) => {
                if (res.ok) {
                    setSuccess(true)
                    setTimeout(() => {
                        window.location.reload()
                    }, 3000)
                }
            })
        } catch (error) {
            console.error()
        }
    }

    return (
        <>
            <StandardNavBar />
            <div className="disclaimerCard">
                <div className='disclaimerHeader'>
                    <h1>Information Disclaimer</h1>
                </div>
                <div className='disclaimerText'>
                    <p>All information presented on this website is depicted as accurately as possible. The information shown on this website was not sourced by Fish-O-Pedia & all information presented is linked back to its owner.</p>
                    <p>Some information may be incorrect. If you see incorrect information, please enter the page link & describe the error in the form below.</p>
                </div>
                <div className='disclaimerFormContainer'>
                    <div className='disclaimerForm'>
                        <div className='disclaimerFormHeader'>
                            <h1>Find innaccurate information?</h1>
                        </div>
                        {/* <h2>Let us know!</h2> */}
                        <div className="disclaimerField">
                            <label>Issue(s)</label>
                            <input type="text" placeholder="ex. Rosy Tetra pH levels are incorrect..." onChange={(event) => setError(event.target.value)}></input>
                        </div>
                        <div className="disclaimerField">
                            <label>Page Link</label>
                            <input type="url" placeholder="ex. https://fishtank.wiki/browse/RosyTetra..." onChange={(event) => setLink(event.target.value)}></input>
                        </div>
                        { error && link && !success &&
                        <div>
                            <button className="submitError" onClick={submitError}>Submit error!</button>
                        </div>}
                        {success && 
                        <div className="errorSuccess">
                            <Checkmark size='30px'/>
                        </div>}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}