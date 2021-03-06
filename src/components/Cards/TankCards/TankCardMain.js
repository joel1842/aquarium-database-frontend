import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import DeleteTankButton from "../../Button/DeleteTankButton"
import aquarium from "../../../assets/aquarium.png"
import './TankCardMain.css'
import { storage } from '../../../firebase/firebase';
import {ref, getDownloadURL, uploadBytes} from "firebase/storage";
import { Checkmark } from 'react-checkmark';

export const TankCardMain = ({tank, levels, celcius, fahrenheit}) => {

    const { getAccessTokenSilently } = useAuth0()

    // sets picture of tank, if one has been uploaded
    const [tankPic, setTankPic] = useState()
    useEffect(() => {
        if (tank.tankimg !== undefined) {
            setTankPic(tank.tankimg)
        }
    }, [tank])

    // health options 
    const good = 1
    const medium = 2
    const bad = 3

    const [score, setScore] = useState()
    const [ammoniaHealth, setAmmoniaHealth] = useState()
    const [nitriteHealth, setNitriteHealth] = useState()
    const [nitrateHealth, setNitrateHealth] = useState()

    // tank health colors
    const easy = "linear-gradient(165.41deg, rgba(255, 255, 255, 0.525) -19.95%, rgba(255, 255, 255, 0.075) 98.98%), #7BE22A"
    const easyShadow = "0px 2px 2px #65C21B"
    const med = "linear-gradient(166.25deg, rgba(255, 255, 255, 0.525) -38.77%, rgba(255, 255, 255, 0.075) 99.58%), #FFE156"
    const mediumShadow = "0px 2px 2px #D8C93B"
    const hard = "linear-gradient(165.88deg, rgba(255, 255, 255, 0.525) -47.86%, rgba(255, 255, 255, 0.075) 89.89%), #FF3434"
    const hardShadow = "0px 2px 2px #D34315"

    const [careColor, setCareColor] = useState(easy)
    const [shadow, setShadow] = useState(easyShadow)

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
    
    const [phColor, setPhColor] = useState(six)

    useEffect(() => {
        if (levels) {
            // sets ammonia health based on tank levels
            const getAmmonia = () => {
                console.log(levels[0].ammonia)
                if (levels[0].ammonia <= 2) {
                    setAmmoniaHealth(good)
                } else if (levels[0].ammonia <= 4) {
                    setAmmoniaHealth(medium)
                } else { 
                    setAmmoniaHealth(bad)
                }
            }
        
            // sets nitrite health based on tank levels
            const getNitrite = () => {
                console.log(levels[0].nitrites)
                if (levels[0].nitrites <= 0.2) {
                    setNitriteHealth(good)
                } else if (levels[0].nitrites <= 0.4) {
                    setNitriteHealth(medium)
                } else {
                    setNitriteHealth(bad)
                }
            }
        
            // sets nitrate health based on tank levels
            const getNitrate = () => {
                console.log(levels[0].nitrates)
                if (levels[0].nitrates <= 40) {
                    setNitrateHealth(good)
                } else if (levels[0].nitrates <= 60) {
                    setNitrateHealth(medium)
                } else {
                    setNitrateHealth(bad)
                }
            }

            // sets ph level color
            const colorSwitch = () => {
                if (levels[0].phLevel <= 6.3) {
                    setPhColor(six)
                } else if (levels[0].phLevel <= 6.5) {
                    setPhColor(sixfour)
                } else if (levels[0].phLevel <= 6.7) {
                    setPhColor(sixsix)
                } else if (levels[0].phLevel <= 6.9) {
                    setPhColor(sixeight)
                } else if (levels[0].phLevel <= 7.1) {
                    setPhColor(seven)
                } else if (levels[0].phLevel <= 7.5) {
                    setPhColor(seventwo)
                } else if (levels[0].phLevel <= 7.7) {
                    setPhColor(sevensix)
                } else if (levels[0].phLevel <= 7.9) {
                    setPhColor(seveneight)
                } else if (levels[0].phLevel <= 8.1) {
                    setPhColor(eight)
                } else if (levels[0].phLevel <= 8.4) {
                    setPhColor(eighttwo)
                } else if (levels[0].phLevel <= 8.7) {
                    setPhColor(eightfour)
                } else if (levels[0].phLevel <= 9) {
                    setPhColor(eighteight)
                }
            }

            getAmmonia()
            getNitrite()
            getNitrate()
            colorSwitch()
        }
    }, [levels])

    // gets score of tank health
    useEffect(() => {
        if (ammoniaHealth && nitrateHealth && nitriteHealth) {
            const getScore = () => {
                setScore(ammoniaHealth + nitrateHealth + nitriteHealth)
            }
            getScore()
        }

    }, [ammoniaHealth, nitrateHealth, nitriteHealth])


    const [health, setHealth] = useState()
    
    // sets tank health reading based on tank score
    useEffect(() => {
        if (score) {
            const getHealth = () => {
                console.log("Tank Score:", score)
        
                if (score === 3) {
                    setHealth("Good ????")
                    setCareColor(easy)
                    setShadow(easyShadow)
                } else if (score <= 5) {
                    setHealth("Medium ????")
                    setCareColor(med)
                    setShadow(mediumShadow)
                } else {
                    setHealth("Bad ????")
                    setCareColor(hard)
                    setShadow(hardShadow)
                }
            }
            getHealth()
        }  
    }, [score])

    const [file, setFile] = useState()

    // gets tank picture file from input
    const getFile = (event) => {
        setFile(event.target.files[0])
    }

    // uploads picture of tank to firebase
    const uploadTank = () => {
        const imageRef = ref(storage, `image/${file.name}${Date.now()}`);
        uploadBytes(imageRef, file).then(() => {
            getDownloadURL(imageRef).then((url) => {
                uploadLink(url)
                console.log(url)
            })
        })
    }


    const [uploadSuccess, setUploadSuccess] = useState(false)

    // uploads firebase image link to backend
    const uploadLink = async (url) => {

        const token = await getAccessTokenSilently()
        const data = {
            url: url,
            id: tank.id
        }
        console.log(data)

        fetch('https://fishtank-wiki.herokuapp.com/upload', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(res => {
            if (res.ok) {

                setUploadSuccess(true)

                setTimeout(() => {
                    window.location.reload()
                }, 3000)
            }
        })

    }

    const [addPic, setAddPic] = useState(false)

    // determines if image input is visible
    const addSwitch = () => {
        if (addPic) {
            setAddPic(false)
        } else {
            setAddPic(true)
        }
    }

    return (
        
        <div className="tankHeadContainer">

            <div className="quickInfo">
                {!tankPic && <img className="myTankTank" src={aquarium} alt="tank"/>}
                {tankPic && <img className="myTankPic" src={tankPic} alt="tank"/>}
                <div className="tankNameContainer">
                    <h1 className="tankHeader">{tank.tankName}</h1>
                    <h2 className="tankSize">{tank.tankSize} {tank.unit} ??? {tank.tankType}</h2>
                </div>

                {!addPic && !uploadSuccess &&
                <div>
                    <button className="addPic" onClick={addSwitch}>Add picture ????</button>
                </div>}

                {addPic && !uploadSuccess &&
                <div className="uploadPic">
                    <input type="file" onChange={(event) => {
                        getFile(event)
                    }}/>
                    {file && <button onClick={uploadTank}>Upload!</button>}
                </div>}

                {uploadSuccess && 
                <div className="uploadSuccess">
                    <Checkmark size="30px"/>
                </div>}
                
                <DeleteTankButton tank={tank}/>
            </div>
            
            <div className="quickHealth">

                <div className="healthCard" style={{background: careColor, boxShadow: shadow}}>
                    <h2>Health</h2>
                    {!health && <p>No entries!</p>}
                    {health && <p>{health}</p>}
                </div>
                <div className="phCard" style={{background: phColor}}>
                    <h2>pH Level</h2>
                    {!levels && <p>No entries!</p>}
                    {levels && <p>{levels[0].phLevel} pH</p>}
                </div>
                <div className="tempCard">
                    <h2>Temperature</h2>
                    {!levels && <p><b>No entries!</b></p>}
                    {levels && <p><b>{celcius} ??C</b>({fahrenheit} ??F) </p> }
                </div>

            </div>

        </div>
    )
}