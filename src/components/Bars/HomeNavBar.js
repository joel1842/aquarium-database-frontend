import React from 'react';
import {AuthenticationButton} from '../Button/Authentication/AuthenticationButton';
import { MenuButton } from '../Button/MenuButton';
import { Logo } from '../Logo/Logo';
import { useAuth0 } from '@auth0/auth0-react';
import './HomeNavBar.css';

//Standard Nav Bar
export const HomeNavBar = () => {

    const {isAuthenticated} = useAuth0();

    if(isAuthenticated) {
        return(
            <div className='navBar'>
            <div className='LogoHome'>
                <Logo />
            </div>
            <h3 className="tagLine">A fish & plant search tool</h3>
            <nav className="navButtons">
                <MenuButton label='Browse Database' link='/browse'/>
                <MenuButton label='Calculator' link='/tank'/>
                <MenuButton label='My Tanks' link='/mytanks'/>
                <MenuButton label='Favorites' link='/favlist'/>
                <AuthenticationButton />
            </nav>
            </div>
        )
    } else {
        return (
            <div className='navBar'>
                <div className='LogoHome'>
                    <Logo />
                </div>
                <h3 className="tagLine">A fish & plant search tool</h3>
                <nav className="navButtons">
                    <MenuButton link='/browse' label='Browse Database'/>
                    <MenuButton link='/compatibility' label='Fish Compatibility'/>
                    <MenuButton link='/about' label='About Us'/>
                    <MenuButton link='/tank' label='Calculator'/>
                    <AuthenticationButton />
                </nav>
            </div>
        )
    }
}
