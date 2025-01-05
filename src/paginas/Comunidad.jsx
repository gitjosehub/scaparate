import React from "react";
import ListadoRegistrados from "../componentes/ListadoRegistrados.jsx";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Comunidad = () => {
    return (
        <React.Fragment>
            <Row className="justify-content-center">
                <Col className="text-center">
                <h1 className="titulo-pagina">
                    Comunidad scap<span className="a-de-scapa">a</span>.
                </h1>
                </Col>
            </Row>
            <ListadoRegistrados />
        </React.Fragment>
    );
}

export default Comunidad;