import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useContextoRutas from "../hooks/useContextoRutas.js";
import useContextoUsuarios from "../hooks/useContextoUsuarios.js";
import ListadoRuta from "./ListadoRuta.jsx";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const ListadoRutas = () => {
    // Desestructuración de los contextos que recibimos por el hook.
    const { rutas, obtenerListadoRutas, inicializarRuta, obtenerListadoParticipacion } = useContextoRutas();
    const { usuario } = useContextoUsuarios();

    // Función a realizar en la carga del componente. Para actualizar las rutas del usuario.
    useEffect(() => {
        obtenerListadoRutas(usuario.phone);
        obtenerListadoParticipacion(usuario.id);
      }, []);
    
    return (
        <React.Fragment>
            <section className="d-flex justify-content-center mb-4">
            {/* Indicar al enrutador el link para que conecte con outlet de la subruta. */}
            <Link to="crearuta">
            {/* Boton para crear una nueva ruta */}
            <Button variant="outline-success" size="sm" style={{ width: '15rem' }}
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
                <section className="d-flex justify-content-center">
                <Row className="w-100">
                    {rutas.map((valor, indice, array) => {
                        return (
                            <Col key={indice} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center mb-4">
                            <ListadoRuta key={valor.codRuta} datosRuta={valor} />
                            </Col>
                        ); 
                    })}
                </Row>
                </section>
            ) : (
                <React.Fragment>
                    <article className="no-encontrado">No se han encontrado rutas.</article>
                </React.Fragment>
            )
            }
            
        </React.Fragment>
    );
}

export default ListadoRutas;

