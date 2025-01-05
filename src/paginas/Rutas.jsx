import React from "react";
import { Outlet } from "react-router-dom";
// import useContextoRutas from "../hooks/useContextoRutas.js";
import ListadoRutas from "../componentes/ListadoRutas.jsx";
import BuscadorRutas from "../componentes/BuscadorRutas.jsx";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Rutas = () => {

    // Desestructuración del contexto que recibimos por el hook.
    // const { rutas } = useContextoRutas();

    return (
        <React.Fragment>
            <Row className="justify-content-center">
                <Col className="text-center">
                <h1 className="titulo-pagina">
                    Rutas scap<span className="a-de-scapa">a</span>.
                </h1>
                </Col>
            </Row>
            {/* <h4>Rutas de scapa.</h4> */}
            <section className="w-50 mx-auto">
                <BuscadorRutas />
            </section>
            <section className="position-relative mt-3">
                {/* <ListadoRutas listadoRutas={rutas} listadoCompleto={true}/> */}
                <ListadoRutas />
                {/* Recibimos el contenido de las 'subrutas' de nuestras Rutas de senderismo. */}
                <Outlet />
            </section>
        </React.Fragment>
    );
}

export default Rutas;