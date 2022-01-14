import React from 'react';
import { Link } from 'react-router-dom';
import './LogoCompact.css';
import logo from '../../assets/fishopedialogo.png';

//Fish-O-Pedia Logo
export const LogoCompact = () => {
    return(
        <>
            <Link to="/">
                <img alt='Fish-O-Pedia' src={logo} className='LogoCompact'/>
            </Link>
        </>
    );
};
