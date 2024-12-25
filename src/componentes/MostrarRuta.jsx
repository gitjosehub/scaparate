import React from "react";
import useContextoRutas from "../hooks/useContextoRutas.js";

import TarjetaRuta from "./TarjetaRuta.jsx";
import ListadoComentarios from "./ListadoComentarios.jsx";

const MostrarRuta = () => {

    // Desestructuración del contexto recibido a través del hook.
    const { mostrandoRuta } = useContextoRutas();

    return (
        <React.Fragment>
            { mostrandoRuta && (
                <section>
                <TarjetaRuta />
                <ListadoComentarios />
                </section>
            )}
        </React.Fragment>
    );
}

export default MostrarRuta;