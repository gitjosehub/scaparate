import React from "react"; // he quitado: , { useEffect }
import { Link } from "react-router-dom";
import useContextoRutas from "../hooks/useContextoRutas.js";
import useContextoUsuarios from "../hooks/useContextoUsuarios.js";
import { formatearFecha } from "../bibliotecas/funciones.js";

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';


const ListadoRuta = (props) => {
    // Desestructuración de props.
    const { codRuta, titulo, dificultad, desnivel, distancia, codUsuR, codLocalR, codProvR, localidad, provincia, descripcion, fechaCreacion, imagen } = props.datosRuta;
    // console.log(props.datosRuta);
    // Desestructuración de los contextos recibidos a través del hook.
    const { ruta, obtenerRuta } = useContextoRutas();
    console.log(imagen);

    return (
        <React.Fragment>
            <Card border="success" style={{ backgroundColor: '#f8d7da', width: '14rem' }}>
                <Card.Header as="h5">{titulo}</Card.Header>
                {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
                <Card.Img variant="top" src={`http://localhost:5173/src/assets/img/${imagen}`} />
                {/* <Card.Img variant="top" src={`/assets/img/${imagen}`} /> */}
                <Card.Body>
                    <Card.Title>creador ruta</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{localidad} - {provincia}</Card.Subtitle>
                    <Card.Text>
                    {formatearFecha(fechaCreacion)}
                    </Card.Text>
                    <ButtonGroup size="sm" aria-label="Basic example">
                        <Button variant="success">ver</Button>
                        <Button variant="success">editar</Button>
                        <Button variant="success">comentar</Button>
                        <Button variant="success">eliminar</Button>
                    </ButtonGroup>
                </Card.Body>
            </Card>
        </React.Fragment>
    );
}

export default ListadoRuta;