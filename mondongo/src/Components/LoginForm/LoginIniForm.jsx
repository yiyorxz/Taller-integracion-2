import React from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import './LoginIniForm.css';

const InicioForm = () => {
    return (
        
    <div>

        <div className='wrapper'>
            <form action=''>

                <h1>Inicia sesion</h1>
                <div className='input-box'>
                    <input type='text'placeholder='Usuario' required />
                    <FaUser className='icon'/>
                </div>
                    
                <div className='input-box'>
                    <input type='password' placeholder='Contraseña' required />
                    <FaLock className='icon' />
                </div>
                
                <div className="remember-forgot">
                    <label><input type='checkbox' />Recordar contraseña</label>
                    <a href='#'>Olvidaste la contraseña?</a>
                </div>
                <button type='submit'>Login</button>

                <div className="register-link">
                    <p>Aun no tienes una cuenta?<a
                    href='#'>Registrate</a></p>
                        
                </div>

            </form>




        </div>

   <footer className='foot'>
        <p>Mondongo S.A</p>
        </footer>
    </div>
    );
};

export default InicioForm;