import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useContextoRutas from "../hooks/useContextoRutas.js";
import ListadoRuta from "./ListadoRuta.jsx";

// import { Row, Col } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const ListadoRutas = () => {
    // Desestructuración de los contextos que recibimos por el hook.
    const { rutas, obtenerListadoRutas, inicializarRuta } = useContextoRutas();
    // console.log(`Hay rutas: ${rutas.length}`);
    // Función a realizar en la carga del componente. Para actualizar las rutas del usuario.
    useEffect(() => {
        obtenerListadoRutas();
      }, []);
    console.log('entrando en ListadoRutas');
    

    return (
        <React.Fragment>
            <section className="d-flex justify-content-between mb-4">
            {/* Indicar al enrutador el link para que conecte con outlet de la subruta. */}
            <Link to="crearuta">
            {/* Boton para crear una nueva ruta */}
            <Button variant="outline-success" 
                onClick={(evento) => {
                    inicializarRuta();
                    // inicializarErroresFormulario();
                }}
            >Crear Ruta
            </Button>
            </Link>
            </section>
            {/* Mapeamos el estado rutas (array de objetos ruta). */}
            {rutas.length ? (
                <Row className="justify-content-center">
                    {rutas.map((valor, indice, array) => {
                        
                        return (
                            <Col key={indice} xs={12} sm={6} md={4} lg={3} className="mb-4">
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

