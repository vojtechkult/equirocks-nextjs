"use client";

import { useEffect, useState, useRef } from "react";

const Navbar = () => {
    
    return (
        <div className="navbar">
            <img src="assets/images/equirocks-logo.png"></img>

            <div className="navbar-container">
                <p>Riders</p>
                <p>Horses</p>
                <p>Stable</p>
                <p>EquiRocks</p>
                <p>Brands</p>
                <p>Configurator</p>
                <p>Special Sets & Products</p>
            </div>

            <div className="navbar-icons">
                <img src="assets/icons/icon-search.svg"></img>
                <img src="assets/icons/icon-person.svg"></img>
                <img src="assets/icons/icon-cart.svg"></img>
            </div>
        </div>
    );
};

export default Navbar;
