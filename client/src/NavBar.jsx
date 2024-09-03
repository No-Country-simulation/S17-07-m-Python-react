import React from "react";
import "./Navbar.css";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="logo-container">
                <div className="logo-circle">
                    <img
                        src="https://res.cloudinary.com/dfulftofe/image/upload/v1725286571/jilguero_s4jlwb.webp"
                        alt="Logo"
                    />
                </div>
                <div className="text-container">
                    <div className="text-1">Jilguero</div>
                    <div className="text-2">.com</div>
                </div>
            </div>
            <div className="buttons">
                <button className="create-account-button">Crear cuenta</button>
                <button className="login-button">Ingresar</button>
            </div>
        </div>
    );
};

export default Navbar;
