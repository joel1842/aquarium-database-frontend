import React from 'react';
import { StandardNavBar } from '../components/Bars/StandardNavBar';
import Footer from '../components/Bars/Footer';
import './Care.css'

export const Care = () => {



    return (
        <div>
            <StandardNavBar />

            <div className="careHead">
                <h1>Care Information</h1>
            </div>
            <div className="careLinks">
                <ul className="mainCare list">
                    <li>Picking a tank</li>
                    <li>Setup an aquarium</li>
                    <li>Stocking your aquarium</li>
                    <li>Water changes</li>
                </ul>

                <ul className="otherCare list">
                    <li>The nitrogen cycle</li>
                    <li>Proper diet</li>
                    <li>Fish disease</li>
                    <li>Thriving plants</li>
                </ul>
            </div>

            <Footer />
        </div>
    )
}