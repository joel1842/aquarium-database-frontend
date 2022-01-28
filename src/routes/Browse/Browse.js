import React, { useState, useEffect } from 'react';
import {useInfiniteQuery, useQueryClient} from 'react-query';
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

    // useEffect(() => {
    //     const onScroll = (event) => {
    //         const { scrollHeight, scrollTop, clientHeight } = event.target.scrollingElement;

    //         if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
    //             fetching = true;
    //             nextPage()
    //         }
    //     }

    //     document.addEventListener("scroll", onScroll)
    //     return () => {
    //         document.removeEventListener("scroll", onScroll)
    //     }
    // }, [])

    const [page, setPage] = useState(1)
    const [fish, setFish] = useState([])
    const [display, setDisplay] = useState(true)

    useEffect(() => {
        getFish()
    }, [page])

    const getFish = async () => {
    
        try {
            const response = await fetch(`http://localhost:3001/allfish?page=${page}&limit=21`);
            const data = await response.json();
            setFish(oldData => oldData.concat(data))

        } catch (err) {
            throw new Error(err);
        }
        
    }

    const nextPage = () => {
        setPage(prevPage => prevPage + 1)
        console.log(page)
    }

    if (fish) {

        return(
            <div>
                <div>
                    <StandardNavBar getSearchTerm={getSearchTerm}/>
                </div>

                
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

                <div>
                    <button className="moreFish" onClick={nextPage}>More Fish...</button>
                </div>
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
