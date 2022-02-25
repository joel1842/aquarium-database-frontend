import React from 'react';
import { Link } from 'react-router-dom';
import "./waterchanges.css"
import change from "../../assets/waterchange.png"
import { StandardNavBar } from '../../components/Bars/StandardNavBar';
import Footer from '../../components/Bars/Footer';
import "./Buttons.css"
import back from "../../assets/arrow.png"
import next from "../../assets/arrowrotated.png"

export const WaterChanges = ({getSearchTerm}) => {

    return (
        <div>
            <StandardNavBar getSearchTerm={getSearchTerm}/>
            <div className='changeHeader'>
                <img src={change} alt="Water changes"/>
                <h1>Water changes</h1>
            </div>
            <div className='changeBody'>
                <p className='changeText'>Water changes are <b>essential to your fish health & tank success.</b> Changing your tank water is the only way to remove the leftover fish food & fish waste.</p>
                <p className='changeSubHeader'>How do I know when to do a water change?</p>
                <p className='changeText'>Testing your tank regularly is important to the success of your aquarium. Keeping an eye on water levels will tell you when you need to change your water. The main indicator that it is time to do a water change is when your nitrates begin to rise. Nitrates above 20ppm indicate it is time to do a water change. Other levels like ammonia & nitrites at high levels are also good indicators of when to do water changes. Ammonia & nitrites can be dangerous to your fish so doing water changes when you notice a spike is always good practice.</p>
                <p className='changeText spaced'>Regardless of your tank levels, it is good to get into a habit of changing your water regularly. Every one to two weeks is a good amount of time between water changes. Every tank is different and how often you need to do water changes depends on how many fish are in your tank. The more fish you have, the more frequent you will need to change your water, due to more waste being created. Ultimately you will have to get a feel for how often your tank needs to be changed. Often, the longer a tank is set up and the more established it becomes, the less frequently you may need to do water changes as your levels stay steadier.</p>
                <p className='changeText spaced'>Another factor that increases how often you need to do water changes is how much you feed your fish. Overfeeding leaves excess, which is a direct contributor to your ammonia levels. A good rule of thumb is to only feed your fish as much as they can eat within 5 minutes.</p>
                <p className='changeSubHeader'>How much water should I change?</p>
                <p className='changeText'>How much water you change is all dependent on your tank levels. If your nitrates are low, you can do a 10% change. If your nitrates are high, do a bigger change like 30% or 40%. Doing big water changes, like 60% or more, can crash your fish tank & hurt your fish, so don’t do big changes unless your levels are dangerously high.</p>
                <p className='changeSubHeader'>Properly changing water</p>
                <p className='changeText'>When changing your water is it very important to condition your water before adding it to your aquarium. Tap water often contains chlorine, chloramines & heavy metals. All these things are very toxic to your fish. Adding water directly from the tap untreated can make them very sick & lead to fish loss. Add water to a bucket, condition it, then add it to your tank.</p>
                <p className='changeText spaced'>Ensuring the water you are adding is close to the temperature of your tank water is also very important. Adding water that is a different temperature than your tank water can cause your fish to go into shock. A digital thermometer is a very helpful tool for measuring your water temperature when doing water changes.</p>
                <p className='changeText spaced'>Although unnecessary, buying a python water changing system is a very worthy investment, it will save you a lot of time & hassle in the long run.</p>
                <p className='changeText spaced'>Keeping track of your levels with the tank journal tool can help monitor your levels between water changes. Additionally, it will also help you remember how long it’s been since changing your tank water.</p>
                <div className="articleButton">
                    <Link to="/setupaquarium">
                    <button className="careButton backButton">
                        <img src={back} alt="Back"/>
                        <p>Setup aquarium</p>
                    </button>
                    </ Link>
                </div>
                <div className="articleButton">
                    <Link to="/nitrogencycle">
                    <button className="careButton nextButton">
                        <p>Nitrogen cycle</p>
                        <img src={next} alt="Next"/>
                    </button>
                    </ Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}