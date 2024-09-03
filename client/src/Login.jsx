import React from 'react';
import './Login.css';

function Login() {
    const togglePassword = () => {
        const passwordInput = document.getElementById('password');
        const passwordToggle = document.querySelector('.show-password');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordToggle.textContent = '🙈'; // Cambio de ícono cuando se muestra la contraseña
        } else {
            passwordInput.type = 'password';
            passwordToggle.textContent = '👁️'; // Cambio de ícono cuando se oculta la contraseña
        }
    };

    return (
        <div className="login-wrapper">
            <img src="https://res.cloudinary.com/dfulftofe/image/upload/v1725286571/jilguero_s4jlwb.webp" alt="Additional Image" className="additional-image" />
            <div className="login-container">
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="jrod@gmail.com" />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="**********" />
                    <button className="show-password" onClick={togglePassword}>👁️</button>
                </div>
                <button className="login-button">Ingresar</button>
                <div className="signup-text">¿Aún no tienes cuenta? <a href="crear">Crear cuenta</a></div>
            </div>
        </div>
    );
}

export default Login;
