import React, { useState } from 'react';
import {AuthenticationButton} from '../Button/Authentication/AuthenticationButton';
import { MenuButton } from '../Button/MenuButton';
import { Logo } from '../Logo/Logo';
import { useAuth0 } from '@auth0/auth0-react';
import hamburger from "../../assets/hamburgermenu.png"
import './HomeNavBar.css';

//Standard Nav Bar
export const HomeNavBar = () => {

    const {isAuthenticated} = useAuth0();

    const [open, setOpen] = useState(false)

    const menuSwitch = () => {
        if (open) {
            setOpen(false) 
        } else {
            setOpen(true)
        }
    }

    if(isAuthenticated) {
        return(
            <div className='navBar'>

                <div className='LogoHome'>
                    <Logo />
                </div>
                <h3 className="tagLine">A freshwater fish search tool</h3>

                <div className="homeMenuIcon">
                    <button onClick={menuSwitch}>
                        <img src={hamburger} alt="Menu"/>
                    </button>
                </div>

                <div className={open ? "homeNavContainer active": "homeNavContainer"}>
                    <nav className="navButtons">
        
                        <div>
                            <MenuButton label='Browse Database' link='/browse'/>
                        </div>
                        <div>
                            <MenuButton label='Calculator' link='/tank'/>
                        </div>
                        <div>
                            <MenuButton label='My Tanks' link='/mytanks'/>
                        </div>
                        <div>
                            <MenuButton label='Favorites' link='/favlist'/>
                        </div>
                        <div>
                            <AuthenticationButton />
                        </div>
                    </nav>
                </div>
            </div>
        )
    } else {
        return (
            <div className='navBar'>

                <div className='LogoHome'>
                    <Logo />
                </div>
                <h3 className="tagLine">A fish & plant search tool</h3>

                <div className="homeMenuIcon">
                    <button onClick={menuSwitch}>
                        <img src={hamburger} alt="Menu"/>
                    </button>
                </div>

                <div className={open ? "homeNavContainer active": "homeNavContainer"}>
                    <nav className="navButtons">

                        <div>
                            <MenuButton label='Browse Database' link='/browse'/>
                        </div>
                        <div>
                            <MenuButton label='Calculator' link='/tank'/>
                        </div>
                        <div>
                            <MenuButton label='My Tanks' link='/mytanks'/>
                        </div>
                        <div>
                            <MenuButton label='Favorites' link='/favlist'/>
                        </div>
                        <div>
                            <AuthenticationButton />
                        </div>
                    </nav>
                </div>
            </div>
        )
    }
}
