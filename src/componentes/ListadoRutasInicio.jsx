import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useContextoRutas from "../hooks/useContextoRutas.js";
import ListadoRutaInicio from "./ListadoRutaInicio.jsx";

// import { Row, Col } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const ListadoRutas = () => {
    // Desestructuración de los contextos que recibimos por el hook.
    const { rutasInicio, obtenerListadoRutasInicio, inicializarRuta } = useContextoRutas();
    // console.log(`Hay rutas: ${rutas.length}`);
    // Función a realizar en la carga del componente. Para actualizar las rutas del usuario.
    useEffect(() => {
        obtenerListadoRutasInicio();
      }, []);
    console.log('entrando en ListadoRutas');
    

    return (
        <React.Fragment>
            
            {/* Mapeamos el estado rutasInicio (array de objetos ruta). */}
            {rutasInicio.length ? (
                <section className="d-flex justify-content-center">
                <Row className="w-100">
                    {rutasInicio.map((valor, indice, array) => {
                        
                        return (
                            <Col key={indice} xs={12} sm={6} className="d-flex justify-content-center mb-4">
                            <ListadoRutaInicio key={valor.codRuta} datosRuta={valor} />
                            </Col>
                        );
                        
                    })}
                </Row>
                </section>
            ) : (
                <React.Fragment>
                    <p>No se han encontrado rutas.</p>
                </React.Fragment>
            )
            }
            
        </React.Fragment>
    );
}

export default ListadoRutas;

