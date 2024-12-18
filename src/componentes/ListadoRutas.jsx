import React, { useEffect } from "react";
import useContextoRutas from "../hooks/useContextoRutas.js";
import ListadoRuta from "./ListadoRuta.jsx";

// import { Row, Col } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const ListadoRutas = () => {
    // Desestructuración de los contextos que recibimos por el hook.
    const { rutas, obtenerListadoRutas, inicializarRuta } = useContextoRutas();
    console.log(`Hay rutas: ${rutas.length}`);
    // Función a realizar en la carga del componente. Para actualizar las rutas del usuario.
    useEffect(() => {
        obtenerListadoRutas();
      }, []);
    
    

    return (
        <React.Fragment>
            {/* Boton para crear una nueva ruta */}
            <Button variant="primary" 
                onClick={(evento) => {
                    inicializarRuta();
                    // inicializarErroresFormulario();
                }}
            >
                Nueva Ruta
            </Button>
            {/* Mapeamos el estado rutas (array de objetos ruta). */}
            {rutas.length ? (
                <Row>
                    {rutas.map((valor, indice, array) => {
                        
                        return (
                            <Col key={indice} xs={12} sm={6} md={4} lg={3}>
                            <ListadoRuta key={valor.codRuta} datosRuta={valor} />
                            </Col>
                        );
                        
                    })}
                </Row>
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

