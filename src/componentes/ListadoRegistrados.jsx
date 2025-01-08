import React, { useEffect } from "react";
import useContextoUsuarios from "../hooks/useContextoUsuarios.js";

import ListadoRegistrado from "./ListadoRegistrado.jsx";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ListadoRegistrados = () => {

    // Desestructuración de los contextos que recibimos por el hook.
    const { usuario, obtenerListadoRegistrados, registrados } = useContextoUsuarios();
    
    // Acciones a la carga del componente.
    useEffect(() => {
        obtenerListadoRegistrados(usuario.id);
          }, []);

    return (
        <React.Fragment>

            {/* Mapeamos el estado registrados (array de objetos registrado). */}
            {registrados.length ? (
                <Container className="mt-4">
                    <Row className="g-4">
                    {registrados.map((valor, indice, array) => {
                        return (
                            <Col  key={indice} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
                                <ListadoRegistrado key={valor.codUsuario} datosRegistrado={valor} />
                            </Col> 
                        ); 
                    })}
                    </Row>
                </Container>
            ) : (
                <React.Fragment>
                    <p className="no-encontrado">No se han encontrado usuarios.</p>
                </React.Fragment>
            )
            }
        </React.Fragment>
    );
}

export default ListadoRegistrados;