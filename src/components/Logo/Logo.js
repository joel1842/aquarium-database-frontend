import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';
import logo from "../../assets/fishopedialogo.png"

//Fish-O-Pedia Logo
export const Logo = () => {
    return(
        <>
            <Link to="/">
                <img alt='Fish-O-Pedia' src={logo} className='Logo'/>
            </Link>
        </>
    );
};
