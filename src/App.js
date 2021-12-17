import './css/App.css';
import React, { useState, useEffect } from 'react';
import {
  Route,
  Routes
} from "react-router-dom";
import {Home} from './routes/Home';
import {About} from './routes/About';
import {Browse} from './routes/Browse/Browse.js';
import {Tank} from './routes/TankSize/Tank.js';
import {Compatibility} from './routes/Compatibility';
import {FishPage} from './routes/FishPage';
import FavList from './routes/FavList/FavList';
import MyTanks from './routes/MyTanks/MyTanks';
import Loading from './routes/Loading';

const App = () => {

  const [fishAPI, setFishAPI] = useState()

  useEffect(() => {
    fetch('http://localhost:3001/allfish').then((res) => {
        if (res.ok) {
            console.log(res)
            return res.json();
        }
    }).then(jsonResponse => {
        setFishAPI(jsonResponse)
    });
}, [])

  const [searchTerm, setSearchTerm] = useState();

  const getSearchTerm = (search) => {
    setSearchTerm(search)
    console.log(searchTerm)
  }

  if (fishAPI) {
    return (
        <Routes>
          {fishAPI.map((fishData, index) => {

            let fishName = fishData.name
            fishName = fishName.replace(/\s+/g, '')
            fishName = fishName.replace(/-/g, '')
            fishName = fishName.replace(/'/g, '')

            let path = "/browse/" + fishName

            console.log(path)

            return <Route exact path={path} element={<FishPage fishData={fishData}/>} key={index} />
          })}
          <Route exact path="/compatibility" element={<Compatibility/>}></Route>
          <Route exact path="/tank" element={<Tank getSearchTerm={getSearchTerm}/>}></Route>
          <Route exact path="/about" element={<About/>}></Route>
          <Route exact path="/browse" element={<Browse getSearchTerm={getSearchTerm} searchTerm={searchTerm} fishAPI={fishAPI}/>}></Route>
          <Route exact path="/fish" element={<FishPage/>}></Route>
          <Route exact path="/favlist" element={<FavList getSearchTerm={getSearchTerm}/>}></Route>
          <Route exact path="/mytanks" element={<MyTanks getSearchTerm={getSearchTerm}/>}></Route>
          <Route exact path="/" element={<Home getSearchTerm={getSearchTerm}/>}></Route>
        </Routes>
    );
  } else {
    return <Loading /> 
  }
}

export default App;
