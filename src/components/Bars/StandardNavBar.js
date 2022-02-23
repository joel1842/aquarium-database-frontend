import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './StandardNavBar.css'
import { MenuButton } from "../Button/MenuButton";
import hamburger from "../../assets/hamburgermenu.png"
import { Logo } from "../Logo/Logo"
import { AuthenticationButton } from "../Button/Authentication/AuthenticationButton";
import { SearchBarCompact } from "../SearchBar/SearchBarCompact";

export const StandardNavBar = ({getSearchTerm}) => {

    const { isAuthenticated } = useAuth0()

    const [open, setOpen] = useState(false)

    const menuSwitch = () => {
        if (open) {
            setOpen(false) 
        } else {
            setOpen(true)
        }
    }

    if (isAuthenticated) {
        return (
            <nav className="mobileNav">
                <div className="logo">
                    <Logo/>
                </div>
                <div className='SearchBar'>
                    <SearchBarCompact getSearchTerm={getSearchTerm}/>
                </div>
                <div className="menuIcon">
                    <button onClick={menuSwitch}>
                        <img src={hamburger} alt="Menu"/>
                    </button>
                </div>
                <div className="navContainer">         
                    <ul className={open ? 'navMenu active' : 'navMenu'}>      
                        <li>
                            <div className='SearchBarMobile'>
                                <SearchBarCompact getSearchTerm={getSearchTerm}/>
                            </div>
                            <div className="menuItem">
                                <MenuButton label='Browse' link='/browse'/>
                            </div>
                            <div className="menuItem">
                                <MenuButton label='Calculator' link='/tank'/>
                            </div>
                            <div className="menuItem">
                                <MenuButton label='My Tanks' link='/mytanks'/>
                            </div>
                            <div className="menuItem">
                                <MenuButton label='Favorites' link='/favlist'/>
                            </div>
                            <div className="menuItem">
                                <AuthenticationButton />
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    } else {
        return (
            <nav className="mobileNav">
                <div className="logo">
                    <Logo/>
                </div>
                <div className='SearchBar'>
                    <SearchBarCompact getSearchTerm={getSearchTerm}/>
                </div>
                <div className="menuIcon">
                    <button onClick={menuSwitch}>
                        <img src={hamburger} alt="Menu"/>
                    </button>
                </div>
                <div className="navContainer">         
                    <ul className={open ? 'navMenu active' : 'navMenu'}>      
                        <li>
                            <div className='SearchBarMobile'>
                                <SearchBarCompact getSearchTerm={getSearchTerm}/>
                            </div>
                            <div className="menuItem">
                                <MenuButton label='Browse' link='/browse'/>
                            </div>
                            <div className="menuItem">
                                <MenuButton label='About' link='/About'/>
                            </div>
                            <div className="menuItem">
                                <MenuButton label='Care' link='/care'/>
                            </div>
                            <div className="menuItem">
                                <MenuButton label='Calculator' link='/tank'/>
                            </div>
                            <div className="menuItem">
                                <AuthenticationButton />
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
    
}