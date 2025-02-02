import React, { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import useContextoRutas from "../hooks/useContextoRutas.js";
import useContextoUsuarios from "../hooks/useContextoUsuarios.js";
import { formatearFecha } from "../bibliotecas/funciones.js";

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import ConfirmarEliminacionRuta from "./ConfirmarEliminacionRuta.jsx";
import ConfirmarActivacionRuta from "./ConfirmarActivacionRuta.jsx";
import ConfirmarParticipacionRuta from "./ConfirmarParticipacionRuta.jsx";


const ListadoRuta = (props) => {
    // Desestructuración de props.
    const { codRuta, titulo, dificultad, desnivel, distancia, codUsuR, codLocalR, codProvR, localidad, provincia, descripcion, fechaCreacion, imagen, activa } = props.datosRuta;

    // Desestructuración de los contextos recibidos a través del hook.
    const { ruta, obtenerRuta, 
            cambiarRuta, cerrarMostrando, 
            confirmarEliminacion, eliminandoRuta, 
            activarRuta, obtenerListadoComentarios, 
            contadorComentarios, contadorParticipantes,
            participacionRutas } = useContextoRutas();

    const { usuario, registrados } = useContextoUsuarios();

    useEffect(() => {
        // obtenerListadoRegistrados();
          }, []);
    
    // Saber si el usuario participa (favorita) en la ruta o no.
    const participa = participacionRutas.some(
        (participacion) => participacion.codUsuPR === usuario.id && participacion.codRutaPR === codRuta
    );

    // Conseguir los datos del autor de la ruta, con codUsuR y el estado registrados.
    const autorRuta = registrados.filter((usuarioAnterior) => {
        return usuarioAnterior.codUsuario === codUsuR;
    });
    let nickAutor = autorRuta.length <= 0 ? "desconocido" : autorRuta[0].nick;
    // Conseguir el número de comentarios que tiene la ruta (estado array contadorComentarios).
    const cantiComenta = contadorComentarios.filter((rutaAnterior) => {
        return rutaAnterior.codrutacr === codRuta;
    });
    let totalComenta = cantiComenta.length <= 0 ? 0 : cantiComenta[0].contador;
    // Estado local para cantidad de comentarios.
    const [numComenta, setNumComenta] = useState(totalComenta);
    // Conseguir el número de participantes que tiene una ruta 
    // y la media de puntos de la misma (estado array contadorParticipantes).
    const cantiParticipa = contadorParticipantes.filter((rutaAnterior) => {
        return rutaAnterior.codrutapr === codRuta;
    });
    let totalParticipa, puntuacion;
    if (cantiParticipa.length <=0) {
        totalParticipa = 0;
        puntuacion = 0;
    } else {
        totalParticipa = cantiParticipa[0].contador;
        puntuacion = cantiParticipa[0].suma_valoracion / totalParticipa;
        puntuacion = parseFloat(puntuacion.toFixed(1));
    }
    // Estado local para participantes.
    const [numParticipa, setNumParticipa] = useState(totalParticipa);
    
    // Estado local para confirmar eliminación.
    const [confirmandoEliminar, setConfirmandoEliminar] = useState(false);
    // Estado local para confirmar activación.
    const [confirmandoActivar, setConfirmandoActivar] = useState(false);
    // Estado local para confirmar participación.
    const [confirmandoParticipar, setConfirmandoParticipar] = useState(false);

    return (
        <React.Fragment>
            <section className="position-relative">
            <Card border="secondary" bg="light" style={{ backgroundColor: '#e0e0e0', width: '15rem' }}>
                <Card.Img variant="top" src={`http://localhost:5173/src/assets/img/${imagen}`} />
                <Card.Body>
                    <Card.Title className="titulo-ruta">{titulo}</Card.Title>
                    <Card.Subtitle className="autor-ruta"><span className="creado-por-ruta">creada por</span> {nickAutor}</Card.Subtitle>
                    
                    <section className="contenedor-tarjeta">
                    <section className="fecha-ruta">{formatearFecha(fechaCreacion)}</section>
                    <section className="d-flex align-items-center justify-content-center ubicacion-ruta">
                        <i className="bi bi-geo me-2" style={{ fontSize: '20px', color: 'rgb(19, 148, 8)' }}></i>
                        <span>{localidad} - {provincia}</span>
                    </section>
                    <section className="d-flex justify-content-between">
                    <article className="contador-ruta">
                        <i className="bi bi-award me-2" style={{ fontSize: '20px', color: 'rgb(19, 148, 8)' }}></i>
                        <span>{puntuacion}</span>
                    </article>
                    <article className="contador-ruta">
                        
                        <i className="bi bi-star-fill me-2" style={{ fontSize: '20px', color: 'rgb(19, 148, 8)' }}></i>
                        <span>{numParticipa}</span>
                    </article>
                    <article className="contador-ruta">
                        <i className="bi bi-chat-right me-2" style={{ fontSize: '20px', color: 'rgb(19, 148, 8)' }}></i>
                        <span>{numComenta}</span>
                    </article>
                    </section>
                    </section>
                        
                </Card.Body>
                <ButtonGroup size="sm" style={{ width: "100%" }}>
                    <Button variant="outline-success" style={{ flex: 1 }}
                    as={Link} to="veruta"
                    id={codRuta}
                    onClick={(evento) => {
                        // evento.preventDefault();
                        { /* Obtenemos la ruta e inicializamos mensajes de error formulario 
                            por si los hubiera, activamos estado para cerrar y obtenemos el
                            listado de comentarios de la ruta. */ }
                        // inicializarErroresFormulario();
                        obtenerRuta(evento.target.id);
                        cerrarMostrando(true);
                        obtenerListadoComentarios(evento.target.id);
                        }
                    }
                    >ver
                    </Button>                    
                    {!participa ? (
                        <Button variant="outline-success" style={{ flex: 1 }}
                        as={Link} to="participaruta"
                        id={codRuta}
                        onClick={(evento) => {
                            { /* Obtenemos la ruta.  */ }
                            obtenerRuta(evento.target.id);
                            setConfirmandoParticipar(true);
                        }}
                        ><i className="bi bi-star"></i> añadir
                        </Button>
                    ) : (
                        <Button variant="outline-success" style={{ flex: 1 }}
                        as={Link} to="participaruta"
                        id={codRuta}
                        onClick={(evento) => {
                            { /* Obtenemos la ruta  */ }
                            obtenerRuta(evento.target.id);
                            setConfirmandoParticipar(true);
                        }}
                        ><i className="bi bi-star-fill"></i> quitar
                        </Button>
                    )}
                </ButtonGroup>
                <ButtonGroup size="sm" style={{ width: "100%" }}>
                {/* Solo muestra activar/desactivar correspondiente y si es rol admin. */}
                {usuario.phone === "rol_admin" && (
                activa ? (
                    <Button variant="outline-danger" style={{ flex: 1 }}
                    as={Link} to="activaruta"
                    id={codRuta}
                    onClick={(evento) => {
                        { /* Obtenemos la ruta  */ }
                        // inicializarErroresFormulario();
                        cambiarRuta(evento.target.id, false);
                        setConfirmandoActivar(true);
                        
                        { /* Activamos el estado para confirmar eliminación. */ }
                        // confirmarEliminacion(true);
                        // setConfirmandoEliminar(true);
                    }}
                    >ocultar
                    </Button>
                ) : (
                    <Button variant="outline-success" style={{ flex: 1 }}
                    as={Link} to="activaruta"
                    id={codRuta}
                    onClick={(evento) => {
                        { /* Obtenemos la ruta  */ }
                        cambiarRuta(evento.target.id, true);
                        setConfirmandoActivar(true);
                    }}
                    >publicar
                    </Button>
                ))}
                    {usuario.id === codUsuR && (
                    <>
                    <Button variant="outline-success" style={{ flex: 1 }}
                    as={Link} to="editaruta"
                    id={codRuta}
                    onClick={(evento) => {
                        // evento.preventDefault();
                        { /* Obtenemos la ruta e inicializamos
                            mensajes de error formulario por si los hubiera */ }
                        // inicializarErroresFormulario();
                        obtenerRuta(evento.target.id);
                    }}
                    >editar
                    </Button>
                    <Button variant="outline-danger" style={{ flex: 1 }}
                    as={Link} to="eliminaruta"
                    id={codRuta}
                    onClick={(evento) => {
                        { /* Obtenemos la ruta  */ }
                        obtenerRuta(evento.target.id);
                        { /* Activamos el estado para confirmar eliminación. */ }
                        
                        setConfirmandoEliminar(true);
                    }}
                    >eliminar
                    </Button>
                    </>
                    )}
                </ButtonGroup>
            </Card>
            {confirmandoEliminar && (
                <ConfirmarEliminacionRuta 
                    confirmandoEliminar={confirmandoEliminar}
                    setConfirmandoEliminar={setConfirmandoEliminar} />
            )}
            {confirmandoActivar && (
                <ConfirmarActivacionRuta 
                    confirmandoActivar={confirmandoActivar}
                    setConfirmandoActivar={setConfirmandoActivar} />
            )}
            {confirmandoParticipar && (
                <ConfirmarParticipacionRuta 
                    confirmandoParticipar={confirmandoParticipar}
                    setConfirmandoParticipar={setConfirmandoParticipar} 
                    accion={participa} 
                    setNumParticipa={setNumParticipa} />
            )}
            </section>
        </React.Fragment>
    );
}

export default ListadoRuta;