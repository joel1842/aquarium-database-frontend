import { useEffect, useState } from "react";
import './MobileMenu.css'
import { MenuButton } from "../Button/MenuButton";

export const MobileMenu = () => {
    const [open, setOpen] = useState(false)

    const [menuStyle, setMenuStyle] = useState()

    const style = {
        width: '100%'
    }

    useEffect(() => {
        if (open) {
            setMenuStyle(style)
        } else {
            setMenuStyle()
        }
    }, [open])

    return (
        <>
            <button className="menuButton" onClick={() => setOpen(true)}>Menu</button>

            <div className="mobileNavContainer" style={menuStyle}>
                {open && <>
                    <button onClick={()=> setOpen(false)}>Close</button>
                    <nav className="mobileNav">
                        <MenuButton label='Browse Database' link='/browse'/>
                        <MenuButton label='Calculator' link='/tank'/>
                        <MenuButton label='My Tanks' link='/mytanks'/>
                        <MenuButton label='Favorites' link='/favlist'/>
                    </nav>
                </>}
            </div>
        </>
    )
}