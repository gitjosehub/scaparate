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
                <section className="position-absolute top-0 start-0 w-100 h-100">
                    <article className="position-absolute top-0 start-0 w-100 h-100 bg-white opacity-50"></article>
                    <article className="position-absolute top-0 start-50 translate-middle-x w-50 h-100 bg-white shadow p-2 z-index-1">
                        <TarjetaRuta />
                        <ListadoComentarios />
                    </article>
                </section>
            )}
        </React.Fragment>
    );
}

export default MostrarRuta;