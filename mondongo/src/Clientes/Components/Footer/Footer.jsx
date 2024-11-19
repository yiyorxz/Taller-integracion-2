import React from "react";
import './Footer.css'

import { CiFacebook } from "react-icons/ci";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsTwitterX } from "react-icons/bs";



const Footer = () => {
    return(
        <footer className="foot">
            <div>
                (Logo de la empresa)
            </div>

            <div>
            <h1 style={{fontSize:24}}>Elige como pagar al por mayor</h1>
            <p style={{fontSize:15}}>Con nuestro sistema de pagos, puedes pagar <br/>con tarjetas de crédito, débito o transferencias <br/> bancarias. Te ofrecemos opciones de financiamiento <br/>para grandes pedidos. </p>
            </div>
            
            <div>
            <h1 style={{fontSize:24, paddingLeft:37}}>Envío prioritario para comerciantes</h1>
            <p style={{fontSize:15, paddingLeft:37}}>Aprovecha envíos rápidos y gratuitos para tus compras al <br/> por mayor. Nos aseguramos de que tus productos lleguen <br/>a tiempo para que siempre tengas inventario disponible. </p>
            </div>

            <div>
            <h1 style={{fontSize:24, paddingLeft:37}}>Compras Protegidas y Garantizadas</h1>
            <p style={{fontSize:15, paddingLeft:37}}>Si tus productos no son lo que esperabas o no llegan en la <br/> fecha estimada, te devolvemos tu dinero o los reponemos <br/> rápidamente.</p>
            </div>

            <div>
            <h1 style={{fontSize:24, paddingLeft:70}}>Siguenos en Nuestras redes Sociales</h1>
            <a style={{paddingLeft:80}}><CiFacebook style={{fontSize:60}}/></a>
            <a style={{paddingLeft:3}}><AiOutlineInstagram style={{fontSize:60}}/></a>
            <a style={{paddingLeft:3}}><BsTwitterX style={{fontSize:50}}/></a>
            
            </div>

        </footer>
    )
};

export default Footer;