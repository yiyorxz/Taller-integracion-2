import React from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import './LoginRegForm.css';

const RegisterForm = () => {
    return (
    <div>
        <div className='wrapper'>
            <form action="">
                <h1>Crea tu Cuenta</h1>
                <div className='input-box'>
                    <input type="email" placeholder='Correo' required/>
                    <FaUser />
                </div>
                <div className='input-box'>
                    <input type="text" placeholder='Nombre Completo' required/>
                </div>
                <div className='input-box'>
                    <input type="text" placeholder='Usuario' required/>
                </div>
                <div className='input-box'>
                    <input type="password" placeholder='Contraseña' required/>
                    <FaLock /> 
                </div>
                <div className='input-box'>
                    <input type="password" placeholder='Repetir Contraseña' required/>
                </div>
                

                <div className='terms-conditions'>
                    <label><input type='checkbox'/>Acepto los terminos y Condiciones</label>
                </div>

                <button type='submit'>Crear</button>
                <div className='register-link'>
                    <p>Ya tienes una cuenta? <a href="">Inicia Sesion</a></p>
                </div>
            </form>
            
        </div>
        <footer className='foot'>
        <p>Mondongo S.A</p>
        </footer>
    </div>
    );
};

export default RegisterForm;