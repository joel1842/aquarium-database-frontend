import React, { useState } from 'react';
import './Disclaimer.css'
import { StandardNavBar } from '../components/Bars/StandardNavBar';
import Footer from '../components/Bars/Footer';
import { useAuth0 } from '@auth0/auth0-react';

export const Disclaimer = () => {

    const { getAccessTokenSilently } = useAuth0()

    const [error, setError] = useState();
    const [link, setLink] = useState();

    const data = {
        error: error,
        link: link
    }

    const submitError = async () => {
        try {
            const token = await getAccessTokenSilently()
            console.log(error, link)

            fetch('http://localhost:3001/errorform', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
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
                    <p>All information presented on this website is dipicted as accurately as possible! Some information may be incorrect. If you see incorrect information, please contact us so we can fix it!</p>
                </div>
                <div className='disclaimerFormContainer'>
                    <form className='disclaimerForm'>
                        <div className='disclaimerFormHeader'>
                            <h1>Find innaccurate information?</h1>
                        </div>
                        <h2>Let us know!</h2>
                        <div className="disclaimerField">
                            <label>Issue(s)</label>
                            <input type="text" onChange={(event) => setError(event.target.value)}></input>
                        </div>
                        <div className="disclaimerField">
                            <label>Page Link</label>
                            <input type="text" onChange={(event) => setLink(event.target.value)}></input>
                        </div>
                        { error && link &&
                        <div>
                            <button onClick={submitError}>Submit error!</button>
                        </div>}
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}