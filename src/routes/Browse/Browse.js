import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StandardNavBar } from '../../components/Bars/StandardNavBar';
import FishCard from '../../components/Cards/FishCard';
import FilterBar from '../../components/Bars/FilterBar';
import Footer from '../../components/Bars/Footer';
import './browse.css';
export const Browse = ({ searchTerm, getSearchTerm, fishAPI }) => {

    // const [filterCriterion, setFilterCriterion] = useState();

    // const getFilterCriterion = (criterion) => {
    //     // setSearchTerm()
    //     setFilterCriterion(criterion);
    //     console.log(criterion)
    // }

    // useEffect(() => {
    //     getFish()
    // }, [])

    // let fetching = false;
    // let activated = false;

    // useEffect(() => {
    //     const onScroll = (event) => {
    //         const { scrollHeight, scrollTop, clientHeight } = event.target.scrollingElement;

    //         if (!activated && scrollHeight - scrollTop <= clientHeight * 1.5) {
    //             activated = true
    //             nextPage()
    //             console.log('FIRED')
    //         }
    //     }

    //     document.addEventListener("scroll", onScroll)
    //     return () => {
    //         document.removeEventListener("scroll", onScroll)
    //     }
    // }, [])

    const [page, setPage] = useState(1)
    const [fish, setFish] = useState([])
    const [count, setCount] = useState(21)

    useEffect(() => {
        getFish()
    }, [page, searchTerm])

    const getFish = async () => {
    
        try {
            const response = await fetch(`https://localhost:8000/allfish?page=${page}&search=${searchTerm}`);
            const data = await response.json();

            if (searchTerm === undefined) {
                setFish(oldData => oldData.concat(data.fish))
                setCount(data.fishCount)
            } else {
                if (count === 21) {
                    setFish(oldData => oldData.concat(data.fish))
                    setCount(data.fishCount)
                } else {
                    setFish(data.fish)
                    setCount(data.fishCount)
                }

            }
            
        } catch (err) {
            throw new Error(err);
        }
        
    }

    const nextPage = () => {
        setPage(prevPage => prevPage + 1)
        // activated = false
    }

    if (fish) {

        return(
            <div>
                <div>
                    <StandardNavBar getSearchTerm={getSearchTerm}/>
                </div>

                <div className='browseContainer'>                  
                    <div className='fishCardGrid'>
                        {fish.map((fishData, index) => {

                        let fishName = fishData.name
                        fishName = fishName.replace(/\s+/g, '')
                        fishName = fishName.replace(/-/g, '')
                        fishName = fishName.replace(/'/g, '')
                        
                        let url = "/browse/" + fishName;

                        return (
                            <Link to={url}>
                                <FishCard fishData={fishData} key={fishData.id} />
                            </Link> 
                        )
                        })}
                    </div>

                    {count === 21 && 
                    <div>
                        <button className="moreFish" onClick={nextPage}>More Fish...</button>
                    </div>}
                </div>

                <Footer />
            </div>
        )

        // return(
        //     <div>
        //         <div>
        //             <StandardNavBar getSearchTerm={getSearchTerm}/>
        //         </div>
                
        //         <br />

        //         <div>
        //             <FilterBar getFilterCriterion={getFilterCriterion}/>
        //         </div>

                // {!searchTerm && !filterCriterion &&
                // <div className='fishCardGrid'>
                //     {fish.map((fishData, index) => {

                //     let fishName = fishData.name
                //     fishName = fishName.replace(/\s+/g, '')
                //     fishName = fishName.replace(/-/g, '')
                //     fishName = fishName.replace(/'/g, '')
                    
                //     let url = "/browse/" + fishName;

                //     return (
                //         <Link to={url}>
                //             <FishCard fishData={fishData} key={index} />
                //         </Link> 
                //     )
                //     })}
                // </div>}
                
        //         {searchTerm && 
        //         <div className='fishCardGrid'>
        //             {fish.filter((fishData) => {
        //                 if (fishData.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        //                     return fishData; 
        //                 }
        //             }).map((fishData, index) => {
        //                 let fishName = fishData.name
        //                 fishName = fishName.replace(/\s+/g, '')
        //                 fishName = fishName.replace(/-/g, '')
        //                 fishName = fishName.replace(/'/g, '')
                        
        //                 let url = "/browse/" + fishName;
    
        //                 return (
        //                     <Link to={url}>
        //                         <FishCard fishData={fishData} key={index} />
        //                     </Link> 
        //                 )
        //             })}
        //         </div>}


        //         {filterCriterion && 
        //         <div className='fishCardGrid'>
        //             {fish.filter((fishData) => {
        //                 if (fishData.careLevel.toLowerCase().includes(filterCriterion.toLowerCase())) {
        //                     return fishData;
        //                 }
        //             }).map((fishData, index) => {
        //                 let fishName = fishData.name
        //                 fishName = fishName.replace(/\s+/g, '')
        //                 fishName = fishName.replace(/-/g, '')
        //                 fishName = fishName.replace(/'/g, '')
                        
        //                 let url = "/browse/" + fishName;
    
        //                 return (
        //                     <Link to={url}>
        //                         <FishCard fishData={fishData} key={index} />
        //                     </Link> 
        //                 )
        //             })}
        //         </div>}
        //         <Footer />
        //     </div>
        // );

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
