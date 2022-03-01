import React from 'react';
import { Link } from 'react-router-dom';
import { StandardNavBar } from '../components/Bars/StandardNavBar';
import Footer from '../components/Bars/Footer';
import picking from "../assets/pickingtank.png";
import setup from "../assets/setuptank.png";
import stocking from "../assets/stocking.png";
import nitrogen from "../assets/nitrogencycle.png"
import waterchange from "../assets/waterchange.png"
import plants from "../assets/plants.png"
import './Care.css'

export const Care = ({ getSearchTerm }) => {

    return (
        <div>
            <StandardNavBar getSearchTerm={getSearchTerm}/>

            <div className="careHead">
                <h1>Care Information</h1>
            </div>
            <div className="careLinks">
                <ul className="mainCare list">

                    <Link to="/choosingfish">
                    <li>
                        <img src={stocking} alt="Choosing fish"/>
                        <p>Choosing fish</p>
                    </li>
                    </Link>

                    <Link to="/pickingatank">
                    <li>
                        <img src={picking} alt="Picking a tank"/>
                        <p>Picking a tank</p>  
                    </li>
                    </Link>

                    <Link to="/setupaquarium">
                    <li>
                        <img src={setup} alt="Setup an aquarium"/>
                        <p>Setup an aquarium</p>
                        
                    </li>
                    </Link>

                </ul>

                <ul className="otherCare list">
                    <Link to="/waterchanges">
                    <li>
                        <img src={waterchange} alt="Water changes"/>
                        <p>Water changes</p>
                    </li>
                    </Link>
                    
                    <Link to="/nitrogencycle">
                    <li>
                        <img src={nitrogen} alt="Stocking your aquarium"/>
                        <p>The Nitrogen Cycle</p>
                    </li>
                    </Link>

                    <Link to="/thrivingplants">
                    <li>
                        <img src={plants} alt="Thriving plants"/>
                        <p>Thriving plants</p>
                    </li>
                    </Link>
                </ul>
            </div>

            <Footer />
        </div>
    )
}