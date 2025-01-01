import React from "react";
import { Outlet } from "react-router-dom";
import ListadoRutas from "../componentes/ListadoRutas.jsx";
import BuscadorRutas from "../componentes/BuscadorRutas.jsx";


const Rutas = () => {
    return (
        <React.Fragment>
            <h4>Rutas de scapa.</h4>
            <section className="w-50 mx-auto">
                <BuscadorRutas />
            </section>
            <section className="position-relative">
                <ListadoRutas />
                {/* Recibimos el contenido de las 'subrutas' de nuestras Rutas de senderismo. */}
                <Outlet />
            </section>
        </React.Fragment>
    );
}

export default Rutas;