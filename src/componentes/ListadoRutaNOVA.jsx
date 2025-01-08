import React, { useState, useEffect } from "react"; // he quitado: , { useEffect }
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
    // console.log(`en listado la ruta ${titulo} esta activa? ${activa}`);
    // console.log(props.datosRuta);
    // Desestructuración de los contextos recibidos a través del hook.
    const { ruta, obtenerRuta, 
            cambiarRuta, cerrarMostrando, 
            confirmarEliminacion, eliminandoRuta, 
            activarRuta, obtenerListadoComentarios, 
            contadorComentarios, 
            participacionRutas } = useContextoRutas();
    // console.log(imagen);
    const { usuario, registrados } = useContextoUsuarios();
    // console.log(usuario);
    // console.log('llega a ListadoRuta y registrados:');
    // console.log(registrados);
    // console.log(`participacion ${titulo}`)
    // console.log(participacionRutas);
    // Esto no se hace aqui, solo para probar ahora. ?????!!!!!!
    useEffect(() => {
        // obtenerListadoRegistrados();
          }, []);
    
    // Saber si el usuario participa en la ruta o no.
    const participa = participacionRutas.some(
        (participacion) => participacion.codUsuPR === usuario.id && participacion.codRutaPR === codRuta
    );
    // console.log(`en ${titulo} participa? ${participa}`);
    // console.log(usuario.id);

    // Conseguir los datos del autor de la ruta, con codUsuR y el estado registrados.
    const autorRuta = registrados.filter((usuarioAnterior) => {
        return usuarioAnterior.codUsuario === codUsuR;
    });
    let nickAutor = autorRuta.length <= 0 ? "desconocido" : autorRuta[0].nick;
    // Conseguir el número de comentarios que tiene la ruta (estado array contadorComentarios).
    // const cantiComentarios = contadorComentarios.filter((rutaAnterior) => {
    //     return rutaAnterior.codrutacr === codRuta;
    // });
    const cantiComenta = contadorComentarios.filter((rutaAnterior) => {
        return rutaAnterior.codrutacr === codRuta;
    });
    // console.log(cantiComenta);
    let totalComenta = cantiComenta.length <= 0 ? 0 : cantiComenta[0].contador;
    // if (cantiComenta.length <=0) {
    //     totalComenta = 0;
    // } else {
    //     totalComenta = cantiComenta[0].contador;
    // }
    // console.log(totalComenta);
    // console.log(cantiComentarios[0].contador);
    // console.log(titulo);
    // console.log(autorRuta[0].nick);
    // console.log(usuario.id);
    // console.log(codUsuR);
    // console.log('---------------------------');
    console.log(usuario.role);

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
                {/* <Card.Header as="h5"></Card.Header> */}
                {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
                <Card.Img variant="top" src={`http://localhost:5173/src/assets/img/${imagen}`} />
                {/* <Card.Img variant="top" src={`/assets/img/${imagen}`} /> */}
                <Card.Body>
                    <Card.Title className="titulo-ruta">{titulo}</Card.Title>
                    <Card.Subtitle className="autor-ruta"><span className="creado-por-ruta">creada por</span> {nickAutor}</Card.Subtitle>
                    {/* <Card.Text> */}
                    <section className="contenedor-tarjeta">
                    <section className="fecha-ruta">{formatearFecha(fechaCreacion)}</section>
                    <section className="d-flex align-items-center justify-content-center ubicacion-ruta">
                        <i className="bi bi-geo me-2" style={{ fontSize: '20px', color: 'rgb(19, 148, 8)' }}></i>
                        <span>{localidad} - {provincia}</span>
                    </section>
                    <section className="d-flex justify-content-between">
                    <article className="contador-ruta">
                        <i className="bi bi-person me-2" style={{ fontSize: '20px', color: 'rgb(19, 148, 8)' }}></i>
                        <span>5</span>
                    </article>
                    <article className="contador-ruta">
                        
                        <i className="bi bi-star me-2" style={{ fontSize: '20px', color: 'rgb(19, 148, 8)' }}></i>
                        <span>123</span>
                    </article>
                    <article className="contador-ruta">
                        <i className="bi bi-chat me-2" style={{ fontSize: '20px', color: 'rgb(19, 148, 8)' }}></i>
                        <span>{totalComenta}</span>
                    </article>
                    </section>
                    </section>
                    {/* </Card.Text> */}    
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
                    {!participa && (
                        <Button variant="outline-success" style={{ flex: 1 }}
                        as={Link} to="participaruta"
                        id={codRuta}
                        onClick={(evento) => {
                            { /* Obtenemos la ruta  */ }
                            // inicializarErroresFormulario();
                            // cambiarRuta(evento.target.id, false);
                            obtenerRuta(evento.target.id);
                            setConfirmandoParticipar(true);
                            console.log('hola participante');
                            { /* Activamos el estado para confirmar eliminación. */ }
                            // confirmarEliminacion(true);
                            // setConfirmandoEliminar(true);
                        }}
                        >participar
                        </Button>
                    )}
                </ButtonGroup>
                <ButtonGroup size="sm" style={{ width: "100%" }}>
                

                {usuario.role === 'rol_admin' && activa && (
    // activa ? (
        // <Button variant="outline-danger" style={{ flex: 1 }}
        //     as={Link} to="activaruta"
        //     id={codRuta}
        //     onClick={(evento) => {
        //         { /* Obtenemos la ruta */ }
        //         cambiarRuta(evento.target.id, false);
        //         setConfirmandoActivar(true);
        //     }}
        // >
        //     desactivar
        // </Button>
    // ) : (
        <Button variant="outline-success" style={{ flex: 1 }}
            as={Link} to="activaruta"
            id={codRuta}
            onClick={(evento) => {
                { /* Obtenemos la ruta */ }
                cambiarRuta(evento.target.id, true);
                setConfirmandoActivar(true);
            }}
        >
            activar
        </Button>
    // )
)}



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
                        // inicializarErroresFormulario();
                        obtenerRuta(evento.target.id);
                        { /* Activamos el estado para confirmar eliminación. */ }
                        // confirmarEliminacion(true);
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
                    setConfirmandoParticipar={setConfirmandoParticipar} />
            )}
            </section>
        </React.Fragment>
    );
}

export default ListadoRuta;