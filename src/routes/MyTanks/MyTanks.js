import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading";
import CreateTank from "./CreateTank";
import TankCard from "../../components/Cards/TankCards/TankCard";
import { StandardNavBar } from "../../components/Bars/StandardNavBar";
import Footer from "../../components/Bars/Footer";
import "./MyTanks.css";

const MyTanks = ({ getSearchTerm, createSwitch, create, tanks }) => {

    return (
        <div>
            <StandardNavBar getSearchTerm={getSearchTerm}/>
            
            <div className="myTanksContainer">
                {!create && 
                <div>
                    <h1 className="myTanksHeader">My Fish Tanks</h1>
                    <button className="newTank" onClick={createSwitch}>New Tank</button>
                </div>}
                
                {!create && tanks && tanks.map((tank, index) => {
                let tankName = tank.tankName
                tankName = tankName.replace(/\s+/g, '')
                tankName = tankName.replace(/-/g, '')
                tankName = tankName.replace(/'/g, '')

                let url = "/" + tankName;
                console.log(url)

                return ( 
                <Link to={url}>
                    <TankCard tank={tank} key={index}/>
                </Link>)
                })}
                {!tanks && <h3>You don't have a tank yet!</h3>}
                {create && <CreateTank create={create} createSwitch={createSwitch}/>}
            </div>

            <Footer />
        </div>
    )
}
    
export default withAuthenticationRequired(MyTanks, {
    onRedirecting: () => <Loading />,
  });