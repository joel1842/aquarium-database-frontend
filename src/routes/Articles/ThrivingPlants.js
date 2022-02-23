import React from 'react';
import "./thrivingplants.css"
import plants from "../../assets/plants.png"

export const ThrivingPlants = () => {
    return (
        <div>
            <div className="plantsHeader">
                <img src={plants} alt="Thriving Plants"/>
                <h1>Thriving Plants</h1>
            </div>
            <div className='plantsBody'>
                <p className='plantsText'>Setting up an aquarium with plants is where many fish keepers divide. Live plants are not a necessary part of keeping fish, so many fish keepers choose not to use them. Live plants are delicate & can die for no apparent reason. However, in this keeper’s opinion, the benefits of keeping live plants outweigh the negatives.</p>
                <p className='plantsSubHeader'>A natural environment</p>
                <p className='plantsText'>An aquarium with live plants replicates a fish’s natural environment much better than plastic plants or a pirate ship ever could. Plants provide your fish with places to hide & rest.</p>
                <p className='plantsText spaced'>Additionally, plants contribute to your aquarium’s ecosystem. Plants need nitrogen to grow! This is something that your fish produce! Nitrogen is bad for your fish. Your plants remove nitrogen from your tank & use it to grow. Ultimately keeping plants in your tank will contribute to a healthier tank!</p>
                <p className='plantsSubHeader'>How to keep thriving plants</p>
                <ul className='plantsList'>
                    <li className='plantsListSub'>Good lighting</li>
                    <ul>
                        <li>Plants stay alive using photosynthesis. If your tank has bad lighting your plants will die. But make sure that your lights are not too bright. Having too bright of a light can cause stress to your fish.</li>
                    </ul>
                    <li className='plantsListSub'>Light timers</li>
                    <ul>
                        <li>Put your tank light on a timer. Too much of a good thing turns into a bad thing quickly.</li>
                        <li>Set your light to turn on for a set amount of time every day. Between 6-8 hours is a good amount of time to light your tank. Too much light can cause algae blooms & will not benefit your plants.</li>
                        <li>Your plants need time to use the energy they have absorbed during the day.</li>
                    </ul>
                    <li className='plantsListSub'>Substrate</li>
                    <ul>
                        <li>Nutrient-rich substrate is very important to keeping healthy plants.</li>
                        <li>A base of clay or aqua soil works very well for your plants to have a solid place to root.</li>
                        <li>You can cover your base layer of substrate with a layer of sand or a different substrate.</li>
                        <li>Your substrate layer should be at least two inches thick.</li>
                        <li>The more substrate you have, allows your plants more area to grow.</li>
                    </ul>
                    <li className='plantsListSub'>Nitrogen Supplements</li>
                    <ul>
                        <li>Root tabs are available at most pet stores & are nutrient-rich tabs that you place in your substrate. They can help dramatically improve your plant growth.</li>
                        <li>Plant grow in liquid form is also readily available. It is a different form of the supplement than root tabs but accomplishes the same thing. However, liquid plant growth will have to be added to your tank much more frequently than roots tabs.</li>
                    </ul>
                    <li className='plantsListSub'>Co2</li>
                    <ul>
                        <li>Co2 is not necessary for keeping plants & most plants do fine without it, so don’t let that stop you from adding live plants to your aquarium.</li>
                        <li>Co2 will however dramatically increase plant growth and allow you to keep a wider variety of plants.</li>
                        <li>Some plants will just not grow properly without Co2, so select plants accordingly.</li>
                    </ul>
                </ul>
                <p className='plantsText spaced'>Tankmates are very crucial to the success of your plants. Some fish eat or uproot plants! So the type of tank mates you choose for a planted aquarium can make or break your setup.</p>
                <p className='plantsText spaced'>Too many floating plants can also impact your plant growth. If you have floating plants, ensure that enough light is getting through to the bottom.</p>
                <p className='plantsText spaced'>Research individual plants to know how it grows and what it needs specifically before buying!</p>
            </div>
        </div>
    )
}