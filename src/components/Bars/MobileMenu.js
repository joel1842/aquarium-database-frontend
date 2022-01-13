import React from "react";
import { slide as Menu } from 'react-burger-menu'

export const MobileMenu = () => {
    return (
        <>
            <Menu isOpen={false}>
                <a href='/browse'>Browse</a>
                <a href='/tank'>Calculator</a>
                <a href='/mytanks'>My Tanks</a>
                <a href='/favlist'>Favorites</a>
            </Menu>
        </>
    )
}