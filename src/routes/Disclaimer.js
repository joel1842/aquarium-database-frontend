import React from 'react';
import './Disclaimer.css'
import { StandardNavBar } from '../components/Bars/StandardNavBar';
import Footer from '../components/Bars/Footer';

export const Disclaimer = () => {


    return (
        <>
            <StandardNavBar />
            <div className='disclaimerHeader'>
                <h1>Information Disclaimer</h1>
            </div>
            <div className='disclaimerText'>
                <p>All information presented on this website is dipicted as accurately as possible! Some information may be incorrect. If you see incorrect information, please contact us so we can fix it!</p>
            </div>
            <div className='errorForm'>
                <form>
                    <label>Issue(s)</label>
                    <input type="text"></input>
                    <label>Page Link</label>
                    <input type="text"></input>
                </form>
            </div>
            <Footer />
        </>
    )
}