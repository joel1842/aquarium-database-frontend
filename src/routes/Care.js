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

export const Care = () => {

    return (
        <div>
            <StandardNavBar />

            <div className="careHead">
                <h1>Care Information</h1>
            </div>
            <div className="careLinks">
                <ul className="mainCare list">
                    <li>
                        <Link to="/pickingatank">
                        <img src={picking} alt="Picking a tank"/>
                        <p>Picking a tank</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/setupaquarium">
                        <img src={setup} alt="Setup an aquarium"/>
                        <p>Setup an aquarium</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/choosingfish">
                        <img src={stocking} alt="Choosing fish"/>
                        <p>Choosing fish</p>
                        </Link>
                    </li>
                </ul>

                <ul className="otherCare list">
                    <li>
                        <Link to="/waterchanges">
                        <img src={waterchange} alt="Water changes"/>
                        <p>Water changes</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/nitrogencycle">
                        <img src={nitrogen} alt="Stocking your aquarium"/>
                        <p>The Nitrogen Cycle</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/thrivingplants">
                        <img src={plants} alt="Thriving plants"/>
                        <p>Thriving plants</p>
                        </Link>
                    </li>
                </ul>
            </div>

            <Footer />
        </div>
    )
}