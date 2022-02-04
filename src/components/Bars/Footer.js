import React from "react";
import "./Footer.css"
import linkedin from "../../assets/linkedin.png"
import github from "../../assets/github.png"
import cc from "../../assets/cclogo.png"
import logo from "../../assets/fishopedialogo.png"

const Footer = () => {
    return (
        <div className="footerContainer">
            <div className="footer">
                <div className="footerHead">
                    <img className="footerLogo" src={logo} alt="Fish-O-Pedia"/>
                </div>
                <div className="footerNav">
                    <nav>
                        <a href="/about">About</a>
                        <a href="/care">Care</a>
                        <a href="/tank">Calculator</a>
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
        </div>
    )
}

export default Footer;