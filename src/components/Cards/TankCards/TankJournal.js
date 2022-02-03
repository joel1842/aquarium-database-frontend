import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { AddLevelsButton } from "../../Button/AddLevelsButton"
import arrowLeft from "../../../assets/arrow.png"
import arrowRight from "../../../assets/arrowrotated.png"
import clock from "../../../assets/clock.png"
import journal from "../../../assets/journal.png"
import add from "../../../assets/add.png"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import "./TankJournal.css"
import e from 'cors';

export const TankJournal = ({tank, levels}) => {

    const [success, setSuccess] = useState(false)
    const added = () => {
        if (success === false) {
            setSuccess(true)
            console.log("TRUE")
        } else {
            setSuccess(false)
        }
    }

    const [ammonia, setAmmonia] = useState();
    const [nitrite, setNitrite] = useState();
    const [nitrate, setNitrate] = useState();
    const [phLevel, setPhLevel] = useState();
    const [khLevel, setKhLevel] = useState();
    const [ghLevel, setGhLevel] = useState();
    const [temp, setTemp] = useState();
    const [tempScale, setTempScale] = useState("c");
    const [newEntry, setNewEntry] = useState(false);

    const fishLevels = {
        ammonia: ammonia,
        nitrite: nitrite,
        nitrate: nitrate,
        phLevel: phLevel,
        khLevel: khLevel,
        ghLevel: ghLevel,
        temp: temp,
        tempScale: tempScale,
        tankName: tank.tankName
    }

    const [timeSince, setTimeSince] = useState()
    const [page, setPage] = useState(0)

    useEffect(() => {
        if(levels) {
            getDate()
        }
 
    }, [levels, page])

    const getDate = () => {
        let date = Number(levels[page].date)
        dayjs.extend(relativeTime)
        setTimeSince(dayjs().to(date))
    }

    const [showNext, setShowNext] = useState(true)
    const [showBack, setShowBack] = useState(false)

    useEffect(() => {

        if (levels) {
            const length = levels.length
            const entries = length - 1

            if (page > 0) {
                setShowBack(true)
            } else {
                setShowBack(false)
            }

            if (page === entries) {
                setShowNext(false)
            } else {
                setShowNext(true)
            }
        }

    }, [page])

    const viewJournal = () => {
        const length = levels.length
        const entries = length - 1

        if (entries === page) {
            console.log("No more pages!")
            console.log(page)
        } else {
            setPage(prevPage => prevPage + 1)
            console.log(page)
        }
    }

    const backJournal = () => {
        // const length = levels.length
        // const entries = length - 1

        setPage(prevPage => prevPage - 1)
        console.log(page)
    }

    return (
        <div className="tankLevelContainer">
            <div className="tankLevelHeader">
                <img src={journal} alt="Tank Journal"/>
                <h1>Tank Journal</h1>
            </div>

            {!levels && 
            <div>
                <h2 className="noEntries">No Entries Yet!</h2>
            </div>
            }

            {levels && !newEntry &&
            <div className="tankLevels">
                <div className='timeSince'>
                    {showBack && 
                    <div>
                        <button onClick={backJournal}>
                            <img src={arrowLeft} alt="Next Entry..."/>
                            <h2>Last Entry</h2>
                        </button>
                    </div>}
                    <div>
                        <img src={clock} alt="Time since..."/>
                        <h2>{timeSince}</h2>
                    </div>
                    {showNext && 
                    <div>
                        <button onClick={viewJournal}>
                            <h2>Next Entry</h2>
                            <img src={arrowRight} alt="Next Entry..."/>
                        </button>
                    </div>}
                </div>

                <div>
                    <h3>Ammonia</h3>
                    <p>{levels[page].ammonia} ppm</p>
                </div>
                <div>
                    <h3>Nitrites</h3>
                    <p>{levels[page].nitrites} ppm</p>
                </div>
                <div>
                    <h3>Nitrates</h3>
                    <p>{levels[page].nitrates} ppm</p>
                </div>
                <div>
                    <h3>pH Level</h3>
                    <p>{levels[page].phLevel} pH</p>
                </div>
                <div>
                    <h3>Alkalinity</h3>
                    <p>{levels[page].khLevel} ppm</p>
                </div>
                <div>
                    <h3>dH Level</h3>
                    <p>{levels[page].ghLevel} ppm</p>
                </div>

            </div>}

            {!newEntry &&
            <div>
                <button className="newEntryButton" onClick={() => setNewEntry(true)}>
                    <h2>New Entry</h2>
                    <img src={add} alt="New Entry!" />
                </button>
            </div>}
            {newEntry &&
            <div>
                <div className="newEntryHead">
                    <h2>New Entry</h2>
                </div>
                <div className="newEntryContainer">

                    <div className='tempInputContainer'>
                        <label className="tempLevelLabel" for="temp">Temperature</label>
                        <input 
                        id="temp"
                        className="tempInput" 
                        type="number"
                        placeholder="ex. 25.3" 
                        min="0"
                        max="100"
                        onChange={(event) => {
                            if (event.target.value < 0 | event.target.value > 100) {
                                event.target.value = undefined
                            } else {
                                setTemp(event.target.value)}}
                            }
                        />
                        <div className='radioInput'>
                            <div>
                                <input type="radio" name="scale" id="c" value="c" checked onChange={(event) => setTempScale(event.target.value)}/>
                                <label for="c">Celcius</label>
                            </div>
                            <div>
                                <input type="radio" name="scale" id="f" value="f" onChange={(event) => setTempScale(event.target.value)}/>
                                <label for="f">Fahrenheit</label>
                            </div>

                        </div>
                    </div>

                    <div>
                        <label className="tankLevelLabel" for="ammonia">Ammonia</label>
                        <p>( 0-8 ppm )</p>
                        <input 
                        id="ammonia"
                        className="TankLevelInput" 
                        type="number"
                        placeholder="ex. 0.25" 
                        min="0"
                        max="8"
                        onChange={(event) => {
                            if (event.target.value < 0 | event.target.value > 8) {
                                event.target.value = undefined
                            } else {
                                setAmmonia(event.target.value)}}
                            }
                        />
                    </div>
                    <div>
                        <label className="tankLevelLabel" for="nitrites">Nitrites</label>
                        <p>( 0-5 ppm )</p>
                        <input 
                        id="nitrites"
                        className="TankLevelInput" 
                        type="number"
                        placeholder="ex. 0.5" 
                        min="0"
                        max="5"
                        onChange={(event) => {
                            if (event.target.value < 0 | event.target.value > 5) {
                                event.target.value = undefined
                            } else {
                                setNitrite(event.target.value)
                            }
                        }}
                        />
                    </div>
                    <div>
                        <label className="tankLevelLabel" for="nitrates">Nitrates</label>
                        <p>( 0-160 ppm )</p>
                        <input 
                        id="nitrates"
                        className="TankLevelInput" 
                        type="number"
                        placeholder="ex. 20" 
                        min="0"
                        max="160"
                        onChange={(event) => {
                            if (event.target.value < 0 | event.target.value > 160) {
                                event.target.value = undefined
                            } else {
                                setNitrate(event.target.value)
                            }
                        }}
                        />
                    </div>
                    
                    <div>
                        <label className="tankLevelLabel" for="ph">pH Level</label>
                        <p>( 5-9 pH )</p>
                        <input 
                        id="ph"
                        className="TankLevelInput" 
                        type="number"
                        placeholder="ex. 7.2"
                        min="5"
                        max="9" 
                        onChange={(event) => {
                            if (event.target.value < 5 | event.target.value > 9) {
                                event.target.value = undefined
                            } else {
                                setPhLevel(event.target.value)}}
                            }
                        />
                    </div>
                    <div>
                        <label className="tankLevelLabel" for="khLevel">kH Level</label>
                        <p>( 0-240 ppm )</p>
                        <input 
                        id="kHLevel"
                        className="TankLevelInput" 
                        type="number"
                        placeholder="ex. 40" 
                        min="0"
                        max="240"
                        onChange={(event) => {
                            if (event.target.value < 0 | event.target.value > 240) {
                                event.target.value = undefined
                            } else {
                                setKhLevel(event.target.value)
                            }
                        }}
                        />
                    </div>
                    <div>
                        <label className="tankLevelLabel" for="ghLevel">gH Level</label>
                        <p>( 0-180 ppm )</p>
                        <input 
                        id="gHLevel"
                        className="TankLevelInput" 
                        type="number"
                        placeholder="ex. 30"
                        min="0"
                        max="180" 
                        onChange={(event) => {
                            if (event.target.value < 0 | event.target.value > 180) {
                                event.target.value = undefined
                            } else {
                                setGhLevel(event.target.value)
                            }
                        }}
                        />
                    </div>
                    <AddLevelsButton fishLevels={fishLevels} success={success} added={added}/>
                </div>
            </div>}
            
        </div>
    )
}