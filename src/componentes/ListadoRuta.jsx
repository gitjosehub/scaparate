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
    const { ruta, obtenerRuta, cerrarMostrando, obtenerListadoComentarios } = useContextoRutas();
    // console.log(imagen);
    const { usuario } = useContextoUsuarios();
    // console.log(usuario);

    return (
        <React.Fragment>
            <Card border="success" bg="light" style={{ backgroundColor: '#e0e0e0', width: '15rem' }}>
                <Card.Header as="h5">{titulo}</Card.Header>
                {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
                <Card.Img variant="top" src={`http://localhost:5173/src/assets/img/${imagen}`} />
                {/* <Card.Img variant="top" src={`/assets/img/${imagen}`} /> */}
                <Card.Body>
                    <Card.Title>{usuario.email}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{localidad} - {provincia}</Card.Subtitle>
                    <Card.Text>
                    {formatearFecha(fechaCreacion)}
                    </Card.Text>
                    <Card.Link as={Link} to="veruta"
                        id={codRuta}
                        onClick={(evento) => {
                            { /* Obtenemos la ruta e inicializamos
                                mensajes de error formulario por si los hubiera */ }
                            // inicializarErroresFormulario();
                            obtenerRuta(evento.target.id);
                            cerrarMostrando(true);
                            // esto es nuevo con comentariios.
                            obtenerListadoComentarios(evento.target.id);
                            }
                        }
                        className="text-success"
                    >ver
                    </Card.Link>
                    <Card.Link as={Link} to="editaruta"
                        id={codRuta}
                        onClick={(evento) => {
                            { /* Obtenemos la ruta e inicializamos
                                mensajes de error formulario por si los hubiera */ }
                            // inicializarErroresFormulario();
                            obtenerRuta(evento.target.id);
                        }}
                        className="text-success"
                    >editar
                    </Card.Link>

                    <Card.Link as={Link} to="comentaruta"
                        id={codRuta}
                        onClick={(evento) => {
                            { /* Obtenemos la ruta e inicializamos
                                mensajes de error formulario por si los hubiera */ }
                            // inicializarErroresFormulario();
                            obtenerRuta(evento.target.id);
                            // esto es nuevo con comentariios.
                            obtenerListadoComentarios(evento.target.id);
                        }}
                        className="text-success"
                    >comentar
                    </Card.Link>

                    <Card.Link as={Link} to="eliminaruta"
                        id={codRuta}
                        onClick={(evento) => {
                        { /* Obtenemos la ruta e inicializamos
                            mensajes de error formulario por si los hubiera */ }
                        // inicializarErroresFormulario();
                        obtenerRuta(evento.target.id);
                        { /* Activamos el estado para confirmar eliminación. */ }
                        // confirmarEliminacion(true);
                        }}
                        className="text-success"
                    >eliminar
                    </Card.Link>
                </Card.Body>
            </Card>
        </React.Fragment>
    );
}

export default ListadoRuta;