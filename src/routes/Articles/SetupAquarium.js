import React from 'react';
import "./setupaquarium.css"
import setup from "../../assets/setuptank.png"

export const SetupAquarium = () => {

    return (
        <div>
            <div className="setupHeader">
                <img src={setup} alt="Setup an aquarium"/>
                <h1>Set up an aquarium</h1>
            </div>
            <div className="setupBody">
                <p className="setupText">Now that you’ve <b>decided on your fish & picked out your tank,</b> it is time to set it up!</p>
                <p className='setupSubHeader'>Supplies</p>
                <ul className="setupList">
                    <li className="setupListSub">Freshwater test kit</li>
                    <ul>
                        <li>Having a test kit is essential for setting up a healthy aquarium. It will be impossible to tell if your tank is safe for fish without testing the water first.</li>
                    </ul>
                    <li className="setupListSub">Water conditioner</li>
                    <ul>
                        <li>Water must be conditioned when being added to your tank. Tap water, regardless of source, contains heavy metals, chlorine, and chloramine. Conditioning the water makes it safe for your fish!</li>
                    </ul>
                    <li className="setupListSub">Filter</li>
                    <ul>
                        <li>The type and size of filter you will require is dependent on tank size.</li>
                        <li>On average, your tank volume should run through your filter four times an hour.</li>
                        <li>A sponge or hang-on back filter should work just fine, especially for a tank that is under 50 gallons.</li>
                    </ul>
                    <li className="setupListSub">Heater</li>
                    <ul>
                        <li>If you are keeping tropical fish, a heater is essential.</li>
                        <li>The heater you need is also dependent on tank size.</li>
                        <li>Make sure your heater is adjustable or can heat your water to the proper temperature for the fish you want to keep.</li>
                    </ul>
                    <li className="setupListSub">Light</li>
                    <ul>
                        <li>Having good lighting is very important, especially if you want to stock your tank with live plants.</li>
                        <li>If keeping live plants, you want a light bright enough to reach the bottom of the tank, but not so bright that it will stress out the inhabitants of the tank. When buying a light, look for one specifically for plants.</li>
                    </ul>
                    <li className="setupListSub">Fishnet</li>
                    <li className="setupListSub">Thermometer</li>
                    <ul>
                        <li>A thermometer is necessary for measuring your water temperature when adding fish & doing water changes.</li>
                        <li>A digital thermometer is recommended as it allows you to get a very accurate reading of your aquarium’s temperature.</li>
                    </ul>
                    <li className="setupListSub">Air pump</li>
                    <ul>
                        <li>Air pumps are not necessary for the health of your aquarium but can be a beneficial addition.</li>
                        <li>Air pumps help aerate your water which can help create more dissolved oxygen in your tank for your fish.</li>
                        <li>They also help circulate your water, so adding air stones to areas of your tank with low water circulation can help.</li>
                    </ul>
                </ul>
                <p className='setupSubHeader'>Assembling your tank</p>
                <p className="setupText">Pick an area in your house to set up your tank. Once filled, your tank will be too heavy to move! So, set up your tank in a place where it will not have to be moved. Make sure that the tank is level before adding water. A tank that is not level will have more stress on one side & could cause your tank to leak or break. If you can’t get your tank perfectly level, you can use a foam mat under your tank to help it level out & prevent future issues. A levelling mat is more important for a rimless tank. A tank with bracing is less likely to have problems.</p>
                <p className="setupText spaced">Wipe down the inside of your tank with a paper towel & tap water before adding substrate or water.</p>
                <p className="setupText spaced">You can add your heater & filter to the tank, but don’t plug them in until you have filled the tank with water.</p>
                <p className='setupSubHeader'>What type of substrate should I use?</p>
                <p className="setupText">This question has many answers. If you do not want to keep plants in your aquarium, regular aquarium gravel from any pet store should do just fine & provide ample area for beneficial bacteria to grow. However, if you want to keep plants in your tank, regular aquarium gravel is not ideal. Aqua soil or porous clay will work best as a base. You want a base layer of substrate that contains ample nutrients for your plants to thrive. You can add a layer of sand or another type of substrate to hide your base layer of the substrate if desired. The more substrate you add, the more area you have for plant roots to take hold & bacteria to grow!</p>
                <p className='setupSubHeader'>Adding substrate</p>
                <p className="setupText">Regardless of what type of substrate you choose, make sure to thoroughly wash it before adding it to your aquarium. Not washing your substrate before adding it to your aquarium will leave you with very cloudy water that may never fully clear.</p>
                <p className='setupSubHeader'>Filling your tank</p>
                <p className="setupText">When filling your tank for the first time, use lukewarm water. Adding cold water to your tank will put a heavy load on your heater. When it tries to heat your aquarium to the desired temperature it could even break your heater.</p>
                <p className="setupText spaced">Always condition your water. It is ok to add untreated water directly to your tank when setting it up. However, when your tank is stocked with fish, always treat your water before adding it to your tank. Untreated water will stress your fish out & could kill them.</p>
                <p className='setupSubHeader'>Scaping your tank</p>
                <p className="setupText">Decorations are great for the look of your tank & are also beneficial to your fish! Many decorations can be added to your tank, but it all depends on the look you are after! Pet stores often carry a wide variety of plastic tank ornaments.</p>
                <p className="setupText spaced">A more natural look is great for creating a natural environment for your fish. Adding things like driftwood & rocks to your aquarium make great additions. When adding driftwood, it must be aquarium safe. Check the type of wood you are adding as some wood leach tannins which will make your water brown. When adding rocks to your aquarium, they must be aquarium safe. Some rocks can alter the ph level of your water & make the water unsafe for your fish. Getting driftwood & rocks from a store is always good practice.</p>
                <p className='setupSubHeader'>Cycling your tank</p>
                <p className="setupText">Cycling your tank is key to the safety of your fish. Cycling is setting up your tank & running it without fish for at least a week (two weeks is highly recommended). This initial cycle begins the process of establishing the nitrogen cycle in your aquarium. The longer you cycle your tank, the more time beneficial bacteria have to form.</p>
                <p className="setupText spaced">Do not add fish to a new tank. Not cycling your tank will often lead to fish loss as there are no beneficial bacteria built up in the water to break down the waste of your fish.</p>
                <p className='setupSubHeader'>How can I speed up the cycling process?</p>
                <p className="setupText">Seeding your tank with beneficial bacteria is the best way to encourage this process. There are several ways to do this. All these methods speed up the process but do not allow you to add fish immediately. Without seeding beneficial bacteria into your tank, the initial cycle can take months before you can safely add fish.</p>
                <ul className='setupList'>
                    <li className="setupListSub">Bottled Bacteria</li>
                    <ul>
                        <li>A recommended option is to buy a bottle of beneficial bacteria from the pet store & seed your tank with that.</li>
                    </ul>
                    <li className="setupListSub">Adding a filter from an established tank</li>
                    <ul>
                        <li>Adding a filter from an already established tank will accomplish the same thing as bottled bacteria. You are introducing previously established bacteria to the water.</li>
                    </ul>
                </ul>
                <p className='setupSubHeader'>How do I know if my tank is cycled?</p>
                <p className="setupText">By the end of your initial cycle, your aquarium should have no ammonia, no nitrite, and a little bit of nitrate that can be removed through water changes.</p>
                <p className="setupText spaced">When your tank is cycled, your ph level & temperature is within the parameters of the fish you have picked to keep, it is then safe to add fish to your aquarium.</p>
            </div>
        </div>
    )
}