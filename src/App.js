import './css/App.css';
import React, { useState } from 'react';
import {
  BrowserRouter,
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

const App = () => {

  const [searchTerm, setSearchTerm] = useState();

  const getSearchTerm = (search) => {
    setSearchTerm(search)
    console.log(searchTerm)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/compatibility" element={<Compatibility/>}></Route>
        <Route exact path="/tank" element={<Tank getSearchTerm={getSearchTerm}/>}></Route>
        <Route exact path="/about" element={<About/>}></Route>
        <Route exact path="/browse" element={<Browse getSearchTerm={getSearchTerm} searchTerm={searchTerm}/>}></Route>
        <Route exact path="/fish" element={<FishPage/>}></Route>
        <Route exact path="/favlist" element={<FavList getSearchTerm={getSearchTerm}/>}></Route>
        <Route exact path="/mytanks" element={<MyTanks getSearchTerm={getSearchTerm}/>}></Route>
        <Route exact path="/" element={<Home getSearchTerm={getSearchTerm}/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
