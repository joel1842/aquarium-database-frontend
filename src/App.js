import './App.css';
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
import TankCardExpanded from './components/Cards/TankCards/TankCardExpanded';
import { Disclaimer } from './routes/Disclaimer';
import { Care } from './routes/Care';
import { ChoosingFish } from './routes/Articles/ChoosingFish';
import { SetupAquarium } from './routes/Articles/SetupAquarium';
import { PickingATank } from './routes/Articles/PickingATank';
import { WaterChanges } from './routes/Articles/WaterChanges';
import { NitrogenCycle } from './routes/Articles/NitrogenCycle';
import { ThrivingPlants } from './routes/Articles/ThrivingPlants';

const App = () => {

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [fish, setFish] = useState([]);
  const [filterCategory, setCategory] = useState();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(21);
  const [searchTerm, setSearchTerm] = useState();

  // gets search term from nav bar
  const getSearchTerm = (search) => {
    setSearchTerm(search)
    setCategory('name')
  }

  // gets filter term 
  const getFilterCriterion = (filter, category) => {
      setFish([])
      setSearchTerm(filter)
      setCategory(category)
  }

  // increases page query to load another page of fish
  const nextPage = () => {
    setPage(prevPage => prevPage + 1)
  }

  // catches all fish
  useEffect(() => {
      const getFish = async () => {
      
        try {
            const response = await fetch(`https://fishtank-wiki.herokuapp.com/allfish?page=${page}&search=${searchTerm}&category=${filterCategory}`);
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
      getFish()
  }, [page, searchTerm, count, filterCategory])
  

  const [tanks, setTanks] = useState();

  // catches user tanks
  useEffect(() => {

    if (isAuthenticated) {
      const catchTanks = async() => {
          try {
      
              const token = await getAccessTokenSilently();
              const data = {
                  user: user.email
              }
      
              const response = await fetch('https://fishtank-wiki.herokuapp.com/mytanks', {
                  method: 'POST',
                  headers: {
                      Authorization: `Bearer ${token}`,
                      'Content-Type': 'application/json;charset=utf-8'
                  },
                  body: JSON.stringify(data)
              })
              const responseData = await response.json()
      
              if (responseData.length >= 1) {
                  setTanks(responseData)
                  console.log("Caught Tanks!")
              } else {
                  setTanks()
                  console.log("No tanks!")
              }
      
          } catch (error) {
              console.error()
          }
      }
      catchTanks()
    }

  }, [isAuthenticated, getAccessTokenSilently, user])

  if (fish) {
    return (
        <Routes>
          {fish && fish.map((fishData, index) => {

            let fishName = fishData.name
            fishName = fishName.replace(/\s+/g, '')
            fishName = fishName.replace(/-/g, '')
            fishName = fishName.replace(/'/g, '')
            fishName = fishName.toLowerCase();

            let path = "/browse/" + fishName

            return <Route exact path={path} element={<FishPage tanks={tanks} fishData={fishData}/>} key={index}/>
          })}
          
          {tanks && tanks.map((tank, index) => {

            let tankName = tank.tankName
            tankName = tankName.replace(/\s+/g, '')
            tankName = tankName.replace(/-/g, '')
            tankName = tankName.replace(/'/g, '')
            tankName = tankName.toLowerCase();

            let path = "/" + tankName;
            console.log(path);

            return <Route exact path={path} element={<TankCardExpanded getSearchTerm={getSearchTerm} tank={tank}/>} key={index} />
          })}

          <Route exact path="/loading" element={<Loading/>}></Route>
          <Route exact path="/compatibility" element={<Compatibility/>}></Route>
          <Route exact path="/tank" element={<Tank getSearchTerm={getSearchTerm}/>}></Route>
          <Route exact path="/about" element={<About getSearchTerm={getSearchTerm}/>}></Route>
          <Route exact path="/browse" element={<Browse getSearchTerm={getSearchTerm} getFilterCriterion={getFilterCriterion} fish={fish} count={count} nextPage={nextPage}/>}></Route>
          <Route exact path="/favlist" element={<FavList getSearchTerm={getSearchTerm}/>}></Route>
          <Route exact path="/mytanks" element={<MyTanks getSearchTerm={getSearchTerm} tanks={tanks}/>}></Route>
          <Route exact path="/disclaimer" element={<Disclaimer getSearchTerm={getSearchTerm}/>}></Route>
          <Route exact path="/care" element={<Care getSearchTerm={getSearchTerm}/>}></Route>
          <Route exact path="/choosingfish" element={<ChoosingFish getSearchTerm={getSearchTerm}/>}></Route>
          <Route exact path="/setupaquarium" element={<SetupAquarium getSearchTerm={getSearchTerm}/>}></Route>
          <Route exact path="/pickingatank" element={<PickingATank getSearchTerm={getSearchTerm}/>}></Route>
          <Route exact path="/waterchanges" element={<WaterChanges getSearchTerm={getSearchTerm}/>}></Route>
          <Route exact path="/nitrogencycle" element={<NitrogenCycle getSearchTerm={getSearchTerm}/>}></Route>
          <Route exact path="/thrivingplants" element={<ThrivingPlants getSearchTerm={getSearchTerm}/>}></Route>
          <Route exact path="/" element={<Home getSearchTerm={getSearchTerm}/>}></Route>
        </Routes>
    );
  } else {
    return <Loading /> 
  }
}

export default App;
