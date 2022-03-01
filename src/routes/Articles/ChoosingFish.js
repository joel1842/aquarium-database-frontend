import React from 'react';
import { Link } from 'react-router-dom';
import choosingfish from "../../assets/stocking.png"
import "./choosingfish.css"
import "./Buttons.css"
import { StandardNavBar } from '../../components/Bars/StandardNavBar';
import Footer from '../../components/Bars/Footer';
import next from "../../assets/arrowrotated.png";

export const ChoosingFish = ({ getSearchTerm }) => {
    return (
        <div>
            <StandardNavBar getSearchTerm={getSearchTerm}/>
            <div className='chooseHeader'>
                <img src={choosingfish} alt="choosing a tank!" />
                <h1>Choosing fish</h1>
            </div>
            <div className="chooseBody">
                <p className='chooseText'><b>Choosing the fish you want</b> is a good place to start when you are thinking about setting up an aquarium. When choosing a fish, you must consider several things to set up your tank properly.</p>
                <p className='chooseSubHeader'>Type of aquarium</p>
                <p className='chooseText'>You can set up a tropical or a cold-water aquarium depending on the type of fish you want to keep. Coldwater fish require less equipment but limit your options. If you want to keep tropical fish, you will require a heater.</p>
                <p className='chooseSubHeader'>Water parameters</p>
                <p className='chooseText'>Depending on the type of fish you want to keep, you must set up your tank accordingly. Ph levels are the main parameter you must take into consideration and before buying fish. The ph level of your aquarium must be within a safe range for the fish you want to keep. Your water hardness (gh & kh levels) also must be tested & within a safe range for your fish.</p>
                <p className='chooseSubHeader'>Research individual fish</p>
                <p className='chooseText'>Researching the fish you want to keep first is important. You should know what parameters your fish requires & have your tank set up accordingly long in advance. Additionally, some fish have individual care requirements that may not be necessary when keeping other fish. For example, some fish may get aggressive when breeding & could cause harm to your other fish.</p>
                <p className='chooseSubHeader'>Tank environment</p>
                <p className='chooseText'>Ensure that your tank environment is set up properly for the type of fish that you are keeping. Some fish prefer lots of places to hide out, and a lack of places to hide can cause stress to the fish. Other fish prefer to swim in open water, so a tank with lots of open space for them to swim is important.</p>
                <p className='chooseText'>If you are just starting in the hobby, some of these fish may be good choices for your first aquarium.</p>
                <p className='chooseSubHeader'>Recommended beginner fish</p>
                <ul className='chooseList'>
                    <li>Rasboras</li>
                    <li>Tetras</li>
                    <li>Corydoras</li>
                    <li>Platys</li>
                    <li>Bettas</li>
                    <li>Barbs</li>
                </ul>

                <div className="articleButton">
                    <Link to="/pickingatank">
                    <button className="careButton nextButton">
                        <p>Picking a tank</p>
                        <img src={next} alt="Next"/>
                    </button>
                    </ Link>
                </div>

            </div>
            <Footer />
        </div>
    )
}