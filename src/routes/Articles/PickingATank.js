import React from 'react';
import "./pickingatank.css"
import picktank from "../../assets/pickingtank.png"

export const PickingATank = () => {

    return (
        <div>
            <div className='pickHeader'>
                <img src={picktank} alt="Picking a tank"/>
                <h1>Picking a tank</h1>
            </div>
            <div className='pickBody'>
                <p className='pickText'>Now that you have chosen a fish <b>it is time to pick out an aquarium.</b> The size of your tank depends on the type & how many fish you want to keep. Each fish has individual tank size requirements, but generally, you want to keep 1 inch of fish per gallon of water. Base this calculation on the full-grown size of your fish.</p>
                <p className='pickText spaced'>You can check the size & tank size requirements for individual fish on the browse page or by searching them!</p>
                <p className='pickText spaced'>You can create the tank you want to set up here on this site on the My Tanks page. Stock it with the fish you want, to see if the tank size you are planning on can accommodate the fish you want to keep.</p>
                <p className="pickSubHeader">How much space do you have?</p>
                <p className='pickText'>Choose a place in your home to put your fish tank. Depending on how much space you have, the aquarium you choose may only be able to be a certain size. If the tank you can fit will not be big enough for the fish you want long term, you may have to choose a different fish.</p>
                <p className="pickSubHeader">Budget</p>
                <p className='pickText'>A big factor in picking a tank is budget. The bigger a tank is, the more expensive it becomes. Bigger tanks require more equipment than small tanks. They also require more supplies. Consider how much you want to pay on a short- & long-term basis.</p>
                <p className="pickSubHeader">Tank Size</p>
                <p className='pickText'>When picking a tank as a beginner, a good size to aim for is between 20-50 gallons. A tank within this range gives you lots of options in stocking & is not too large for a beginner that is learning to take care of fish.</p>
                <p className="pickSubHeader">Does tank shape matter?</p>
                <p className='pickText'>The surface area is very important when selecting a tank for your fish. The more surface area your tank takes up the more space your fish will have to swim. A tank that holds the same volume of water and is very tall will provide less space for your fish to swim, versus a tank that is long & wide of the same volume.</p>
            </div>
        </div>
    )
}