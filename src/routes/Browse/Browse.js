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

    let page = 1;

    useEffect(() => {
        getFish()
    }, [])

    useEffect(() => {
        let fetching = false;
        const onScroll = (event) => {
            const { scrollHeight, scrollTop, clientHeight } = event.target.scrollingElement;

            if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
                fetching = true;
                page++
                getFish() 
            }
        }

        document.addEventListener("scroll", onScroll)
        return () => {
            document.removeEventListener("scroll", onScroll)
        }
    }, [])

    const [fish, setFish] = useState([])

    const getFish = async () => {
        try {

            console.log(page)

            const response = await fetch(`http://localhost:3001/allfish?page=${page}&limit=20`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            })
            const responseData = await response.json()
            setFish(fish => {
                return [...fish, responseData]
            })
            
            // if (!fish) {
            //     setFish(responseData)
            // } else {
                
            //     console.log("fired")
            // }
            
        } catch (error) {
            console.error()
        }
    }

    if (fish) {

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
                    {fish.map((fishData, index) => {

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
                    {fish.filter((fishData) => {
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
                    {fish.filter((fishData) => {
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
