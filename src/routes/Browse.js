import React from 'react';
import { HomeNavBar } from '../components/HomeNavBar';

export const Browse = () => {
    // const auth = null //authorized route, no? Just putting this here in case we do auth
    return(
        <div>
            <div className="headContainer">
                <h1 className="header">Fish-O-Pedia 🐟</h1>
                <h3 className="tagLine">Browse Fish!</h3>
                <HomeNavBar />
            </div>
        </div>
    )
}
