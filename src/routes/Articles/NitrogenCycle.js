import React from 'react';
import "./nitrogencycle.css"
import nitrogen from "../../assets/nitrogencycle.png"

export const NitrogenCycle = () => {
    
    return (
        <div>
            <div className="nitroHeader">
                <img src={nitrogen} alt="The nitrogen cycle"/>
                <h1>The Nitrogen Cycle</h1>
            </div>
            <div className='nitroBody'>
                <p className='nitroText'>Learning about the nitrogen cycle is very important in understanding how to keep a healthy aquarium. It helps you to understand how the ecosystem that you have created functions.</p>
                <p className='nitroSubHeader'>How does the nitrogen cycle work?</p>
                <p className='nitroText'>When you add food to your tank, or your fish create waste, ammonia is released in your aquarium. Ammonia is toxic to your fish! Beneficial bacteria (denitrifying bacteria) get right to work breaking down the ammonia in your tank & detoxifying it. The beneficial bacterium in your tank then takes the ammonia & converts it into nitrites. This same bacterium will further break down the nitrites into nitrates. Nitrates can be removed at the end of the cycle by changing your aquarium water.</p>
                <p className='nitroText spaced'>The nitrogen cycle is the reason we cycle our tanks before adding fish. The longer you cycle your tank before adding fish, the more time this bacterium is given to build up. Without the presence of this bacterium, when ammonia is released into the water, nothing will break it down and your fish will become very stressed out & may die.</p>
                <p className='nitroText spaced'>A freshwater test kit is necessary to test your ammonia, nitrites & nitrates regularly to ensure your tank levels are healthy & your nitrogen cycle is working properly.</p>
            </div>
        </div>
    )
}