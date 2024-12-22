import React from "react";
import { Outlet } from "react-router-dom";
import ListadoRutas from "../componentes/ListadoRutas.jsx";


const Rutas = () => {
    return (
        <React.Fragment>
            <h4>Rutas de scapa.</h4>
            <ListadoRutas />
            {/* Recibimos el contenido de las 'subrutas' de nuestras Rutas de senderismo. */}
            <Outlet />
        </React.Fragment>
    );
}

export default Rutas;