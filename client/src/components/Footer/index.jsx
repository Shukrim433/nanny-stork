import React from "react";

export default function Footer() {
    return (
        <footer>
            <div class="footer-container">
                <div class="footer-section">
                    <h4>About Us</h4>
                    <p>Nanny Stork, AI Powered solutions for newly parents.</p>
                </div>
                <div class="footer-section">
                    <h4>Links</h4>
                    <ul>
                        <li><a href="#">Home Page</a></li>
                        <li><a href="#">More About Us...</a></li>
                        <li><a href="#">Other Services</a></li>
                        <li><a href="#">Contact Details </a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Contact</h4>
                    <p>Email: nannystork@gmail.com</p>
                    <p>Phone: 00000</p>
                </div>
                <div class="footer-section">
                    <h4>Follow Us</h4>
                    <div class="social-icons">
                        <a href="#"><i class="Facebook"></i></a>
                        <a href="#"><i class="Instagram"></i></a>
                        <a href="#"><i class="Linked-in"></i></a>
                        <a href="#"><i class="Twitter"></i></a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p className="text">Copyright Hustler HQ 2024 ©</p>
            </div>
        </footer>
    );
}

