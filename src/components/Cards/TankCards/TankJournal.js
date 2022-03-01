import { useState, useEffect } from 'react';
import { AddLevelsButton } from "../../Button/AddLevelsButton"
import arrowLeft from "../../../assets/arrow.png"
import arrowRight from "../../../assets/arrowrotated.png"
import clock from "../../../assets/clock.png"
import journal from "../../../assets/journal.png"
import add from "../../../assets/add.png"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import "./TankJournal.css"

export const TankJournal = ({tank, levels}) => {

    const [timeSince, setTimeSince] = useState()
    const [page, setPage] = useState(0)
    const [viewPage, setViewPage] = useState(1)
    const [journalLength, setLength] = useState()

    const [ammonia, setAmmonia] = useState();
    const [nitrite, setNitrite] = useState();
    const [nitrate, setNitrate] = useState();
    const [phLevel, setPhLevel] = useState();
    const [khLevel, setKhLevel] = useState();
    const [ghLevel, setGhLevel] = useState();
    const [temp, setTemp] = useState();
    const [tempScale, setTempScale] = useState("c");
    const [newEntry, setNewEntry] = useState(false);

    const [success, setSuccess] = useState(false)
    // determines success of new journal entry
    const added = () => {
        if (success === false) {
            setSuccess(true)
        } else {
            setSuccess(false)
        }
    }

    // new journal entry levels
    const fishLevels = {
        ammonia: ammonia,
        nitrite: nitrite,
        nitrate: nitrate,
        phLevel: phLevel,
        khLevel: khLevel,
        ghLevel: ghLevel,
        temp: temp,
        tempscale: tempScale,
        tank: tank.id
    }

    // tank health colors
    const good = "linear-gradient(165.41deg, rgba(255, 255, 255, 0.525) -19.95%, rgba(255, 255, 255, 0.075) 98.98%), #7BE22A"
    const med = "linear-gradient(166.25deg, rgba(255, 255, 255, 0.525) -38.77%, rgba(255, 255, 255, 0.075) 99.58%), #FFE156"
    const bad = "linear-gradient(165.88deg, rgba(255, 255, 255, 0.525) -47.86%, rgba(255, 255, 255, 0.075) 89.89%), #FF3434"

    // tank ph level colors
    // 6.0 - 6.3
    const six = "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), #FDF885"
    // 6.4 - 6.5
    const sixfour = "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), #F7FAAE"
    // 6.6 - 6.7
    const sixsix = "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), #D6EEA8" 
    // 6.8 - 6.9
    const sixeight = "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), #C1E9B4" 
    // 7.0 - 7.1
    const seven = "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), #ADE2B6" 
    // 7.2 - 7.6
    const seventwo = "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), #93D3AE" 
    // 7.6 - 7.7
    const sevensix = "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), #72C8CA" 
    // 7.8 - 7.9 
    const seveneight = "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), #E9BC2A" 
    // 8.0 - 8.1
    const eight = "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), #E8B57F" 
    // 8.2 - 8.3
    const eighttwo = "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), #C08872" 
    // 8.4 - 8.7
    const eightfour = "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), #A884B1" 
    // 8.8 - 9.0
    const eighteight = "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), #8C71A9" 

    // tank kh level colors
    const khzero = "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), #D7D079"
    const khforty = "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), #CAD691"
    const kheighty = "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), #95cb9d"
    const khonetwenty = "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), #83c09f"
    const khoneeighty = "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), #6cbca7"
    const khtwoforty = "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), #00abb7"
 
    // tank gh level colors
    const ghzero = "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), #65b7b4"
    const ghthirty = "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), #3cc0c9"
    const ghsixty = "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), #30a4d2"
    const ghonetwenty = "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), #408ac3"
    const ghoneeighty = "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), #4162c3 "

    const [ammoniaColor, setAmmoniaColor] = useState(good)
    const [nitriteColor, setNitriteColor] = useState(good)
    const [nitrateColor, setNitrateColor] = useState(good)
    const [phColor, setPhColor] = useState(seven)
    const [khColor, setKhColor] = useState(khzero)
    const [ghColor, setGhColor] = useState(ghzero)

    // sets level colors
    useEffect(() => {
        if (levels) {
            const ammoniaColorSwitch = () => {
                if (levels[page].ammonia <= 2) {
                    setAmmoniaColor(good)
                } else if (levels[page].ammonia <= 4) {
                    setAmmoniaColor(med)
                } else { 
                    setAmmoniaColor(bad)
                }
            }
        
            const nitriteColorSwitch = () => {
                if (levels[page].nitrites <= 0.2) {
                    setNitriteColor(good)
                } else if (levels[page].nitrites <= 0.4) {
                    setNitriteColor(med)
                } else {
                    setNitriteColor(bad)
                }
            }
        
            const nitrateColorSwitch = () => {
                if (levels[page].nitrates <= 40) {
                    setNitrateColor(good)
                } else if (levels[page].nitrates <= 60) {
                    setNitrateColor(med)
                } else {
                    setNitrateColor(bad)
                }
            }

            const phColorSwitch = () => {
                if (levels[page].phLevel <= 6.3) {
                    setPhColor(six)
                } else if (levels[page].phLevel <= 6.5) {
                    setPhColor(sixfour)
                } else if (levels[page].phLevel <= 6.7) {
                    setPhColor(sixsix)
                } else if (levels[page].phLevel <= 6.9) {
                    setPhColor(sixeight)
                } else if (levels[page].phLevel <= 7.1) {
                    setPhColor(seven)
                } else if (levels[page].phLevel <= 7.5) {
                    setPhColor(seventwo)
                } else if (levels[page].phLevel <= 7.7) {
                    setPhColor(sevensix)
                } else if (levels[page].phLevel <= 7.9) {
                    setPhColor(seveneight)
                } else if (levels[page].phLevel <= 8.1) {
                    setPhColor(eight)
                } else if (levels[page].phLevel <= 8.4) {
                    setPhColor(eighttwo)
                } else if (levels[page].phLevel <= 8.7) {
                    setPhColor(eightfour)
                } else if (levels[page].phLevel <= 9) {
                    setPhColor(eighteight)
                }
            }

            const khColorSwitch = () => {
                if (levels[page].khLevel <= 39) {
                    setKhColor(khzero)
                } else if (levels[page].khLevel <= 79) {
                    setKhColor(khforty)
                } else if (levels[page].khLevel <= 119) {
                    setKhColor(kheighty)
                } else if (levels[page].khLevel <= 179) {
                    setKhColor(khonetwenty)
                } else if (levels[page].khLevel <= 210) {
                    setKhColor(khoneeighty)
                } else if (levels[page].khLevel <= 240) {
                    setKhColor(khtwoforty)
                }
            }

            const ghColorSwitch = () => {
                if (levels[page].ghLevel <= 29) {
                    setGhColor(ghzero)
                } else if (levels[page].ghLevel <= 59) {
                    setGhColor(ghthirty)
                } else if (levels[page].ghLevel <= 119) {
                    setGhColor(ghsixty)
                } else if (levels[page].ghLevel <= 160) {
                    setGhColor(ghonetwenty)
                } else if (levels[page].ghLevel <= 180) {
                    setGhColor(ghoneeighty)
                }
            }

            ammoniaColorSwitch()
            nitriteColorSwitch()
            nitrateColorSwitch()
            phColorSwitch()
            khColorSwitch()
            ghColorSwitch()
        }
    }, [levels, page])

    // gets number of journal entries
    useEffect(() => {
        if (levels) {
            setLength(levels.length)
        }
    }, [levels])

    // gets time since journal entry was submitted
    useEffect(() => {
        if (levels) {
            const getDate = () => {
                let date = Number(levels[page].date)
                dayjs.extend(relativeTime)
                setTimeSince(dayjs().to(date))
            }
            getDate()
        }
 
    }, [levels, page])


    const [showNext, setShowNext] = useState(true)
    const [showBack, setShowBack] = useState(false)

    // determines if back or next button should be visible
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

    }, [levels, page])


    // sets page number & moves forward in journal
    const viewJournal = () => {

        const length = levels.length
        const entries = length - 1

        if (entries === page) {
            console.log("No more pages!")
        } else {
            setPage(prevPage => prevPage + 1)
            setViewPage(prevPage => prevPage + 1)
        }
    }

    // sets page number & moves backwards in journal
    const backJournal = () => {

        setPage(prevPage => prevPage - 1)
        setViewPage(prevPage => prevPage - 1)

    }

    return (
        <div className="tankLevelContainer">
            <div className="tankLevelHeader">
                <img src={journal} alt="Tank Journal"/>
                <h1>Tank Journal</h1>
            </div>

            {!levels && !newEntry &&
            <div>
                <h2 className="noEntries">No Entries Yet!</h2>
            </div>
            }

            {levels && !newEntry &&
            <div className="tankLevels">  

                <div className='timeSinceContainer'>
                    <div className="journalInfo">
                        <div className="timeSince">
                            <img className="timeSinceImg" src={clock} alt="Time since..."/>
                            <h2>{timeSince}</h2>
                        </div>
                        <div className='pageNumber'>
                            <h3>Page {viewPage}/{journalLength}</h3>
                        </div>
                    </div>
                    {showBack && 
                    <div className="backJournal">
                        <button onClick={backJournal}>
                            <img src={arrowLeft} alt="Next Entry..."/>
                            <h2>Last Entry</h2>
                        </button>
                    </div>}
                    {showNext && 
                    <div className="nextJournal">
                        <button onClick={viewJournal}>
                            <h2>Next Entry</h2>
                            <img src={arrowRight} alt="Next Entry..."/>
                        </button>
                    </div>}
                </div>

                <div className='ammonia levels' style={{background: ammoniaColor}}>
                    <h3>Ammonia</h3>
                    <p>{levels[page].ammonia} ppm</p>
                </div>
                <div className='nitrites levels' style={{background: nitriteColor}}>
                    <h3>Nitrites</h3>
                    <p>{levels[page].nitrites} ppm</p>
                </div>
                <div className='nitrates levels' style={{background: nitrateColor}}>
                    <h3>Nitrates</h3>
                    <p>{levels[page].nitrates} ppm</p>
                </div>
                <div className='phlevel levels' style={{background: phColor}}>
                    <h3>pH Level</h3>
                    <p>{levels[page].phLevel} pH</p>
                </div>
                <div className='khlevel levels' style={{background: khColor}}>
                    <h3>kH Level</h3>
                    <p>{levels[page].khLevel} ppm</p>
                </div>
                <div className='ghlevel levels' style={{background: ghColor}}>
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