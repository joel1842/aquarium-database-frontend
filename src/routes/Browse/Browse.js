import React from 'react';
import { Link } from 'react-router-dom';
import { StandardNavBar } from '../../components/Bars/StandardNavBar';
import FishCard from '../../components/Cards/FishCard';
import FilterBar from '../../components/Bars/FilterBar';
import Footer from '../../components/Bars/Footer';
import './browse.css';
export const Browse = ({ getSearchTerm, getFilterCriterion, fish, count, nextPage}) => {

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


    if (fish) {

        return(
            <div>
                <div>
                    <StandardNavBar getSearchTerm={getSearchTerm}/>
                </div>

                <div>
                    <FilterBar getFilterCriterion={getFilterCriterion}/>
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
                                <FishCard fishData={fishData} key={index} />
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
