import React from "react";

export default function Footer() {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-section">
                    <h4>About Us</h4>
                    <p>Nanny Stork, AI Powered solutions for newly parents.</p>
                </div>
                <div className="footer-section">
                    <h4>Links</h4>
                    <ul>
                        <li><a href="#">Homepage</a></li>
                        <li><a href="#">More About Us</a></li>
                        <li><a href="#">Other Services</a></li>
                        <li><a href="#">Contact Details</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Contact</h4>
                    <p>Email: nannystork@gmail.com</p>
                    <p>Phone: 00000</p>
                </div>
            </div>
            <p className="text">Copyright Hustler HQ 2024 ©</p>
        </footer>
    );
}
