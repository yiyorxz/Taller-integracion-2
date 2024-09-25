// ESTE LOGIN NO se implementa, es una breve plantilla,
// que contiene los datos más basicos de una pagina WEB
// eL OTRO es para implementan en MONDONGO.

/* -------- Mod. de Importación Firebase -----
- Importación de los modulos de firebase 
- Incorporar dentro del archivo App.jsx 
Nota: Se necesita la extención .jsx no .js en App, porque se usa 
componente de react (a menos que esta autentificaion se exporte 
en nuevo archivo)*/
import {useState} from 'react'
import appFirebase from "../src/credenciales"
import {getAuth, onAuthStateChanged} from 'firebase/auth'
const auth = getAuth(appFirebase)

// importacion de loginIniForm y LoginRegForm (RegisterForm)
// importacion de Home  (Home)
function App() {
    const [usuario, setUsuario] = useState(null)
    onAuthStateChanged(auth, (usuarioFirebase)=>{
        if (usuarioFirebase){
            setUsuario(usuarioFirebase)
        }
        else{
            setUsuario(null)
        }
    })
    return (
      <div>
        {usuario ? <Home correoUsuario = {usuario.email}/>: <RegisterForm/>}




      </div>
  // Nota: Borra el contenido que se tiene detro de <div>(footer y demas y eso importalo en Home.jsx, ya que debe pasar por autentificación,
  // (Mi consejo acá podria ser que en este tengas el login nomas y en otro el Home que tenga todas las cosas, pero con el timpo
  //  que se tiene es dificil tener ese orden, asi dentro de este dejalo asi nomas, agrega lo nuevo)
  // para el ppt incorporamos imagenes nomas (lo mejor será no mostrar la aplicaion ya que esta parte 
  // esta semi completa))
    );
  }

/*--------------Login Firebase-----Registro
- Esta parte se configurar, y se mezclara con el login que se tiene.
ya que este incluye y conecta con Firebase pero sin los detalles de css,
y etiquetas extras. */

import React, {useState}from 'react';
/*    ...    */
import appFirebase from "../src/credenciales"
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
const auth = getAuth(appFirebase)

const InicioForm = () => {
    const [registrando, setRegistrando] = useState(false)
    const functAutenticacion = async(e) =>{
        e.preventDefault();
        const correo = e.target.email.value;
        const passwd = e.target.password.value;

        if(registrando){
            try{
                await createUserWithEmailAndPassword(auth, correo,passwd)
            }
            catch(error){
                alert("El correo o contraseña incorrecto")
            }
        }
        else{
            try{
                await signInWithEmailAndPassword(auth, correo, contraseña)
            }
            catch(error){
                alert("El correo o contraseña incorrecto")
            }

        }

    }
    return (   
        <div>

            <form onSubmit={functAutenticacion}>
                <input type="text" placeholder='Ingresar Email' id='email'/>
                <input type="password" placeholder='Ingrese Contraseña' id='password'/>

                <button>{registrando ? "Registrate": "Inicia Sesion"}</button>
            </form>
            <p>{registrando ? "Si ya tienes cuenta": "No tienes cuenta"}<button onClick={()=>setRegistrando(!registrando)}>{registrando ? "Inicia seccion": "Registrate"}</button></p>
        </div>  
    )}
export default InicioForm 