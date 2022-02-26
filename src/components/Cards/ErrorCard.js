import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import "./ErrorCard.css"

export const ErrorCard = () => {

    const { getAccessTokenSilently } = useAuth0()

    const [error, setError] = useState();
    const [link, setLink] = useState();

    // error data
    const data = {
        error: error,
        link: link
    }

    // sends error data to backend
    const submitError = async () => {
        try {
            const token = await getAccessTokenSilently()

            fetch('https://fishtank-wiki.herokuapp.com/errorform', {
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
        <div className="errorFormContainer">
            <form className="errorForm">
                <p>What is the error?</p>
                <input onChange={(event) => setError(event.target.value)} type="text" placeholder="Ex. pH Levels are incorrect..."></input>
                <p>Page Link</p>
                <input onChange={(event) => setLink(event.target.value)} type="text" placeholder="Link..."></input>
                <button onClick={submitError}>Submit</button>
            </form>
        </div>
    ) 
}