import './css/App.css';
import React, { useState, useEffect } from 'react';
import {
  Route,
  Routes
} from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import {Home} from './routes/Home';
import {About} from './routes/About';
import {Browse} from './routes/Browse/Browse.js';
import {Tank} from './routes/TankSize/Tank.js';
import {Compatibility} from './routes/Compatibility';
import {FishPage} from './routes/FishPage';
import FavList from './routes/FavList/FavList';
import MyTanks from './routes/MyTanks/MyTanks';
import Loading from './routes/Loading';
import TankCardExpanded from './components/Cards/FishCard/TankCardExpanded';

const App = () => {

  const { user, isAuthenticated } = useAuth0();

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

  const [tanks, setTanks] = useState();

  useEffect(() => {
    console.log('fired use effect')
    if (isAuthenticated) {
      console.log('authenticated!')

      const data = {
          user: user.email
      }

      fetch('http://localhost:3001/mytanks', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(data)
      }).then((res) => {
          if (res.ok) {
              return res.json();
          }
      }).then(jsonResponse => {
          if(jsonResponse.length >= 1) {
              setTanks(jsonResponse)
          } else {
              setTanks()
              console.log("No tanks!")
          }
      })
    }

}, [isAuthenticated])

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

            return <Route exact path={path} element={<FishPage fishData={fishData}/>} key={index} />
          })}
          {tanks && tanks.map((tank, index) => {

            let tankName = tank.tankName
            tankName = tankName.replace(/\s+/g, '')
            tankName = tankName.replace(/-/g, '')
            tankName = tankName.replace(/'/g, '')

            let path = "/" + tankName;
            console.log(path);

            return <Route exact path={path} element={<TankCardExpanded tank={tank}/>} key={index} />
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
