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

const App = () => {

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [fish, setFish] = useState([]);
  const [filterCategory, setCategory] = useState();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(21);
  const [searchTerm, setSearchTerm] = useState();

  const getSearchTerm = (search) => {
    setSearchTerm(search)
    setCategory('name')
  }

  const getFilterCriterion = (filter, category) => {
      setFish([])
      setSearchTerm(filter)
      setCategory(category)
  }

  const nextPage = () => {
    setPage(prevPage => prevPage + 1)
  }

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
  const [create, setCreate] = useState(false);
  const [deleteTank, setDeleteTank] = useState(false);

  const createSwitch = () => {
    if (create) {
      setCreate(false)
    } else {
      setCreate(true)
    }
  }

  const deleteSwitch = () => {
    if (deleteTank) {
      setDeleteTank(false) 
    } else {
      setDeleteTank(true)
    }
  }

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

  }, [isAuthenticated, getAccessTokenSilently, user, create, deleteTank])

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

            return <Route exact path={path} element={<FishPage tanks={tanks} fishData={fishData}/>} key={index} getSearchTerm={getSearchTerm}/>
          })}
          
          {tanks && tanks.map((tank, index) => {

            let tankName = tank.tankName
            tankName = tankName.replace(/\s+/g, '')
            tankName = tankName.replace(/-/g, '')
            tankName = tankName.replace(/'/g, '')
            tankName = tankName.toLowerCase();

            let path = "/" + tankName;
            console.log(path);

            return <Route exact path={path} element={<TankCardExpanded tank={tank} deleteSwitch={deleteSwitch}/>} key={index} />
          })}

          <Route exact path="/loading" element={<Loading/>}></Route>
          <Route exact path="/compatibility" element={<Compatibility/>}></Route>
          <Route exact path="/tank" element={<Tank getSearchTerm={getSearchTerm}/>}></Route>
          <Route exact path="/about" element={<About/>}></Route>
          <Route exact path="/browse" element={<Browse getSearchTerm={getSearchTerm} getFilterCriterion={getFilterCriterion} fish={fish} count={count} nextPage={nextPage}/>}></Route>
          <Route exact path="/fish" element={<FishPage getSearchTerm={getSearchTerm}/>}></Route>
          <Route exact path="/favlist" element={<FavList getSearchTerm={getSearchTerm}/>}></Route>
          <Route exact path="/mytanks" element={<MyTanks getSearchTerm={getSearchTerm} createSwitch={createSwitch} create={create} tanks={tanks}/>}></Route>
          <Route exact path="/disclaimer" element={<Disclaimer />}></Route>
          <Route exact path="/care" element={<Care />}></Route>
          <Route exact path="/" element={<Home getSearchTerm={getSearchTerm}/>}></Route>
        </Routes>
    );
  } else {
    return <Loading /> 
  }
}

export default App;
