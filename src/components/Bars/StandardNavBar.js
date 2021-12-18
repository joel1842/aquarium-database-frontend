import React from 'react';
import { LogoCompact } from '../Logo/LogoCompact';
import { SearchBarCompact } from '../SearchBar/SearchBarCompact';
import { MenuButton } from '../Button/MenuButton';
import {AuthenticationButton} from '../Button/Authentication/AuthenticationButton';
import { useAuth0 } from '@auth0/auth0-react';
import './StandardNavBar.css';

//Nav Bar to be used on all pages other than the homepage
export const StandardNavBar = ({getSearchTerm}) => {

    const { isAuthenticated } = useAuth0();
    if(isAuthenticated) {
        return(
            <div className='NavContainer'>
                <div className='LogoStandard'>
                    <LogoCompact />
                </div>
                <div className='SearchBarCompact'>
                    <SearchBarCompact getSearchTerm={getSearchTerm}/>
                </div>
                <div className='NavMenuButtons'>
                    <MenuButton label='Browse' link='/browse'/>
                    <MenuButton label='Calculator' link='/tank'/>
                    <MenuButton label='My Tanks' link='/mytanks'/>
                    <MenuButton label='Favorites' link='/favlist'/>
                    <AuthenticationButton />
                </div>
            </div>)
    } else {
        return(
            <div className='NavContainer'>
                <div className='LogoStandard'>
                    <LogoCompact />
                </div>
                <div className='SearchBarCompact'>
                    <SearchBarCompact getSearchTerm={getSearchTerm}/>
                </div>
                <div className='NavMenuButtons'>
                    <MenuButton label='Browse' link='/browse'/>
                    <MenuButton label='Compatibility' link='/compatibility'/>
                    <MenuButton label='About Us' link='/about'/>
                    <MenuButton label='Calculator' link='/tank'/>
                    <AuthenticationButton />
                </div>
            </div>
        )
    }
}
