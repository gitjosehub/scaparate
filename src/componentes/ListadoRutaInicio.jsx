import React, { useState } from "react"; // he quitado: , { useEffect }
import { Link } from "react-router-dom";
import useContextoRutas from "../hooks/useContextoRutas.js";
import useContextoUsuarios from "../hooks/useContextoUsuarios.js";
import { formatearFecha } from "../bibliotecas/funciones.js";

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import ConfirmarEliminacionRuta from "./ConfirmarEliminacionRuta.jsx";


const ListadoRuta = (props) => {
    // Desestructuración de props.
    const { codRuta, titulo, dificultad, desnivel, distancia, codUsuR, codLocalR, codProvR, localidad, provincia, descripcion, fechaCreacion, imagen } = props.datosRuta;
    // console.log(props.datosRuta);
    // Desestructuración de los contextos recibidos a través del hook.
    const { ruta, obtenerRuta, cerrarMostrando, confirmarEliminacion, eliminandoRuta, obtenerListadoComentarios } = useContextoRutas();
    // console.log(imagen);
    const { usuario } = useContextoUsuarios();
    // console.log(usuario);

    // Estado local para confirmar eliminacion.
    const [confirmandoEliminar, setConfirmandoEliminar] = useState(false);

    return (
        <React.Fragment>
            <section className="position-relative">
            <Card border="secondary" bg="light" style={{ backgroundColor: '#e0e0e0', width: '11rem' }}>
                {/* <Card.Header as="h5">{titulo}</Card.Header> */}
                {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
                <Card.Img variant="top" src={`http://localhost:5173/src/assets/img/${imagen}`} />
                {/* <Card.Img variant="top" src={`/assets/img/${imagen}`} /> */}
                <Card.Body>
                    <Card.Title className="titulo-ruta-inicio">{titulo}</Card.Title>
                    <Card.Subtitle className="fecha-ruta">{formatearFecha(fechaCreacion)}</Card.Subtitle>
                    <Card.Text className="d-flex align-items-center justify-content-center ubicacion-ruta-inicio">
                    <i className="bi bi-geo me-2" style={{ fontSize: '20px', color: 'rgb(19, 148, 8)' }}></i>
                    <span>{localidad} - {provincia}</span>
                    </Card.Text>
                </Card.Body>
            </Card>
            </section>
        </React.Fragment>
    );
}

export default ListadoRuta;