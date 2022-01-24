import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StandardNavBar } from '../../components/Bars/StandardNavBar';
import FishCard from '../../components/Cards/FishCard';
import FilterBar from '../../components/Bars/FilterBar';
import Footer from '../../components/Bars/Footer';
import './browse.css';

export const Browse = ({ searchTerm, getSearchTerm, fishAPI }) => {

    const [filterCriterion, setFilterCriterion] = useState();

    const getFilterCriterion = (criterion) => {
        // setSearchTerm()
        setFilterCriterion(criterion);
        console.log(criterion)
    }

    if (fishAPI) {

        return(
            <div>
                <div>
                    <StandardNavBar getSearchTerm={getSearchTerm}/>
                </div>
                
                <br />

                <div>
                    <FilterBar getFilterCriterion={getFilterCriterion}/>
                </div>

                {!searchTerm && !filterCriterion &&
                <div className='fishCardGrid'>
                    {fishAPI.map((fishData, index) => {

                    let fishName = fishData.name
                    fishName = fishName.replace(/\s+/g, '')
                    fishName = fishName.replace(/-/g, '')
                    fishName = fishName.replace(/'/g, '')
                    
                    let url = "/browse/" + fishName;

                    return (
                        <Link to={url}>
                            <FishCard fishData={fishData} key={index} />
                        </Link> 
                    )
                    })}
                </div>}
                
                {searchTerm && 
                <div className='fishCardGrid'>
                    {fishAPI.filter((fishData) => {
                        if (fishData.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return fishData; 
                        }
                    }).map((fishData, index) => {
                        let fishName = fishData.name
                        fishName = fishName.replace(/\s+/g, '')
                        fishName = fishName.replace(/-/g, '')
                        fishName = fishName.replace(/'/g, '')
                        
                        let url = "/browse/" + fishName;
    
                        return (
                            <Link to={url}>
                                <FishCard fishData={fishData} key={index} />
                            </Link> 
                        )
                    })}
                </div>}


                {filterCriterion && 
                <div className='fishCardGrid'>
                    {fishAPI.filter((fishData) => {
                        if (fishData.careLevel.toLowerCase().includes(filterCriterion.toLowerCase())) {
                            return fishData;
                        }
                    }).map((fishData, index) => {
                        let fishName = fishData.name
                        fishName = fishName.replace(/\s+/g, '')
                        fishName = fishName.replace(/-/g, '')
                        fishName = fishName.replace(/'/g, '')
                        
                        let url = "/browse/" + fishName;
    
                        return (
                            <Link to={url}>
                                <FishCard fishData={fishData} key={index} />
                            </Link> 
                        )
                    })}
                </div>}
                <Footer />
            </div>
        );

    } else {
        return (
            <div>
                <StandardNavBar />
                <div>
                    <h1>Catching fish!</h1>
                    <h2>Please wait a moment...</h2>
                </div>
            </div>
        )
    }
}
