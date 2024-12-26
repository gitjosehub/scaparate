// Este componente contiene el enrutador, que nos permite cambiar
// la ruta en la barra del navegador y saber que componentes corresponden
// en cada una.

// Además de React importamos dos componentes necesarios para la navegación
// de la biblioteca react-router-dom, así como los componentes propios de 
// páginas que se incorporan en cada opción de navegación.
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../../paginas/Home.jsx";
import Rutas from "../../../paginas/Rutas.jsx";
import Eventos from "../../../paginas/Eventos.jsx";
import Comunidad from "../../../paginas/Comunidad.jsx";
import FormularioRutas from "../../FormularioRutas.jsx";
import MostrarRuta from "../../MostrarRuta.jsx";
import Error from "../../../paginas/Error.jsx";
import ConfirmarEliminacionRuta from "../../ConfirmarEliminacionRuta.jsx";
import ListadoComentarios from "../../ListadoComentarios.jsx";

const Enrutador = () => {
    return (
        <React.Fragment>
            {/* Indicamos que componente corresponde con cada ruta. */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="rutas" element={<Rutas />}>
                    <Route path="veruta" element={<MostrarRuta />} />
                    <Route path="crearuta" element={<FormularioRutas accion="crear" />} />
                    <Route path="editaruta" element={<FormularioRutas accion="editar" />} />
                    {/* <Route path="comentaruta" element={<ListadoComentarios />} /> */}
                    {/* <Route path="eliminaruta" element={<ConfirmarEliminacionRuta />} /> */}
                    <Route path="eliminaruta" element={<React.Fragment />} />
                </Route>
                <Route path="eventos" element={<Eventos />} />
                <Route path="comunidad" element={<Comunidad />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </React.Fragment>
    );
}

export default Enrutador;


