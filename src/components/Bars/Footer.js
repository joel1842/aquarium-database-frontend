import React from "react";
import "./Footer.css"
import linkedin from "../../assets/linkedin.png"
import github from "../../assets/github.png"
import cc from "../../assets/cclogo.png"

const Footer = () => {
    return (
        <div className="footer">
            <div className="footerHead">
                <h1>Fish-O-Pedia 🐟</h1>
            </div>
            <div className="footerNav">
                <nav>
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                    <a href="/calculator">Calculator</a>
                    <a href="/browse">Browse</a>
                </nav>
            </div>
            <div className="socials">
                <a href="https://www.linkedin.com/in/joel-lake/">
                    <img className="socialImg" src={linkedin} />
                </a>
                <a href="https://github.com/joel1842">
                    <img className="socialImg" src={github} />
                </a>
            </div>
            <div className="creativeCommons">
                <a href="https://creativecommons.org/">
                    <img className="ccImg" src={cc} />
                </a>
            </div>
        </div>
    )
}

export default Footer;