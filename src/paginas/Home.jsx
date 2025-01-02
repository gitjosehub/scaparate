import React from "react";
// import useContextoRutas from "../hooks/useContextoRutas.js";
import ListadoRutasInicio from "../componentes/ListadoRutasInicio.jsx";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Home = () => {

    // Desestructuración del contexto que recibimos por el hook.
    // const { rutasInicio } = useContextoRutas();

    return (
        <React.Fragment>
            <Row className="mb-5 justify-content-center">
                <Col className="text-center">
                <h4 style={{ color: '#444444', fontSize: '3rem', marginTop: '1.5rem', marginBottom: '1rem' }}>
                    Bienvenidos/as a scap<span style={{ color: '#139408', fontSize: '3.5rem' }}>a</span>.
                </h4>
                </Col>
            </Row>
            {/* <Row>
            <Col xs={12} sm={6}>
            <h5 className="text-center mb-4">Últimas Rutas</h5>
            </Col>
            <Col>
            <h5 className="text-center mb-4"></h5>
            </Col>
            </Row> */}
            <Row className="g-1">
                <Col xs={12} sm={6} className="rounded-2 p-3 ms-auto" style={{ border: '2px solid #139408' }}>
                <h5 className="text-center mb-5 display-6" style={{ color: '#343a40' }}>Últimas Rutas disponibles</h5>
                <ListadoRutasInicio />
                </Col>
                <Col xs={12} sm={6} className="bg-dark text-white p-3 rounded-2 me-auto" style={{ fontFamily: "Verdana, sans-serif", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h6 className="display-4 fw-bold mb-5 text-end">Explora nuevas <br />rutas <br />y disfruta la aventura.</h6>
                <p className="fs-4 text-justify">Inicia sesión en tu cuenta o crea una nueva para descubrir todas las ventajas.</p>
                <ul className="fs-6 text-start" style={{ listStyleType: "disc", paddingLeft: "3.5rem" }}>
                    <li> Crea y comparte tus propias rutas.</li>
                    <li> Comenta e interactúa con otros usuarios.</li>
                    <li> Participa en eventos o ponte un reto.</li>
                    <li> Ahora, lo tienes muy fácil.</li>
                </ul>
                </Col>
            </Row>
            
            {/* <ListadoRutas listadoRutas={rutasInicio} listadoCompleto={false}/> */}
            {/* <FormularioRutas /> */}
            {/* <ListadoRutas /> */}
        </React.Fragment>
    );
}

export default Home;