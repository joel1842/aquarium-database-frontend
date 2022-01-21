import React from 'react';
import { StandardNavBar } from '../components/Bars/StandardNavBar';
import Footer from '../components/Bars/Footer';
import './About.css'
import myfish from "../assets/myfish.JPG"
import me from "../assets/me.jpg"
import built from "../assets/built.jpg"

export const About = () => {
    return(
        <>
            <StandardNavBar/>
            <div>
                <div className='goal'>
                    <div className='goalHeader'>
                        <h1>The Goal</h1>
                    </div>
                    <div className='goalText'>
                        <p><b>Helping to spread proper fish care information!</b> Many pet stores sell fish without insuring owners have the proper care knowledge.</p>
                        <p>Fish-O-Pedia was built to <b>help close that knowledge gap</b> & provide fish owners a tracking tool for their tanks! Individual fish information, maintainance reminders & health tracking all in one place!</p>
                    </div>
                    <div className='myTankContainer'>
                        <img className="myTank" src={myfish} alt="My Fish Tank!" />
                    </div>
                </div>

                <div className='about'>
                    <div className='aboutHeader'>
                        <h1>About Me</h1>
                    </div>
                    <div className='meContainer'>
                        <img className="me" src={me} alt="Me! (Joel)"/>
                    </div>
                    <div className='aboutText'>
                        <p><b>My name is Joel!</b> I am a fish keeper & programmer! I always wanted some kind of tracking tool to make keeping track of my fish tank parameters from week to week & remind me when it is time to change my water!</p>
                        <p>When I realized an all in one tool did not exist for this purpose <b>I got right to work building my own!</b></p>
                    </div>
                </div>

                <div className='built'>
                    <div className='builtHeader'>
                        <h1>Built with...</h1>
                    </div>
                    <div className='builtText'>
                        <p>This application was built using <b>React JS</b> for the front-end. For the backend I used <b>Node JS & PostgreSQL</b> to constuct the database!</p>
                        <p>In the future turning this application <b>into a mobile application</b> with React Native is the goal!</p>
                    </div>
                    <div className='builtImgContainer'>
                        <img className="builtImg" src={built} alt='Built With!'/>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
