import React from "react";
import footerGround from '../assets/images/footerGround.png';

function Footer() {
    return (
        <>
        <div className="w3-container footerStyle">
            <img src={footerGround} alt="ground with grass, dirt, and worms" className="footerStyle"/>
            <p className="footerTextStyle">Brought to you by Project 3 Superstars</p>
        </div>
        </>
    );
}

export default Footer;