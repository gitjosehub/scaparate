import React from "react";
import ListadoRutasInicio from "../componentes/ListadoRutasInicio.jsx";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Home = () => {

    return (
        <React.Fragment>
            <Row className="justify-content-center">
                <Col className="text-center">
                <h1 className="titulo-pagina">
                    Bienvenidos/as a scap<span className="a-de-scapa">a</span>.
                </h1>
                </Col>
            </Row>
            <Row className="g-1">
                <Col xs={12} sm={6} className="rounded-2 p-3 ms-auto" style={{ border: '2px solid #139408' }}>
                <h3 className="text-center subtitulo-pagina">Últimas Rutas disponibles</h3>
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
        </React.Fragment>
    );
}

export default Home;