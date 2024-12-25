import React from "react";
import useContextoRutas from "../hooks/useContextoRutas.js";
import { formatearFecha } from "../bibliotecas/funciones.js";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const TarjetaRuta = () => {

    // Desestructuración del contexto recibido a través del hook.
    const { ruta, 
        mostrandoRuta, 
        cerrarMostrando } = useContextoRutas();
    // console.log(ruta);
    return (
        <React.Fragment>
            {/* { mostrandoRuta && ( */}
            <Card>
                <Card.Img variant="top" src={`http://localhost:5173/src/assets/img/${ruta.imagen}`} />
                <Card.Body>
                <Card.Title>{ruta.titulo}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{formatearFecha(ruta.fechaCreacion)}</Card.Subtitle>
                <Card.Text>{ruta.dificultad}</Card.Text>
                <Card.Text>{ruta.desnivel} m - {ruta.distancia} Km</Card.Text>
                <Card.Text>{ruta.descripcion}</Card.Text>
                <Card.Text>falta: localidad, provincia y creador ruta.</Card.Text>
                <Card.Footer className="text-muted">
                    <Button variant="outline-success"
                        onClick={
                            (evento) => {
                                cerrarMostrando(false);
                            }}
                    >
                    Cerrar
                    </Button>
                </Card.Footer>
                </Card.Body>
            </Card>
            {/* )} */}
        </React.Fragment>
    );
}

export default TarjetaRuta;