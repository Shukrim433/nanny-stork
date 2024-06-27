import React from "react";
import { Link } from "react-router-dom";
export default function Header() {
    return (
        <>
        <header className="flex justify-center items-center flex-col">
            <img src="images/ns-logo.png" alt="nanny-stork-logo" className="w-56 mb-2" />
            <nav className="w-2/3">
                <ul className="navbar flex justify-between"> 
                    <li className="navLink"><Link to="/">HOME</Link></li>
                    <li className="navLink"><Link to="/about">ABOUT ME</Link></li>
                    <li className="navLink"><Link to="/portfolio">PORTFOLIO</Link></li>
                    <li className="navLink"><Link to="/resume">RESUME</Link></li>
                    <li className="navLink"><Link to="/contact">CONTACT ME</Link></li>
                </ul>
            </nav>
        </header>
        </>
    )
}