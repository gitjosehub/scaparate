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
                        {/* Indicar al enrutador el link para que conecte con outlet de la subruta. */}
                        <Link to="veruta">
                        <Button variant="success"
                            id={codRuta}
                            onClick={(evento) => {
                            { /* Obtenemos la ruta e inicializamos
                                mensajes de error formulario por si los hubiera */ }
                            // inicializarErroresFormulario();
                            obtenerRuta(evento.target.id);
                            // cerrarMostrando(true);
                            }}
                        >ver
                        </Button>
                        </Link>
                        {/* Indicar al enrutador el link para que conecte con outlet de la subruta. */}
                        <Link to="editaruta">
                        <Button variant="success"
                            id={codRuta}
                            onClick={(evento) => {
                                { /* Obtenemos la ruta e inicializamos
                                    mensajes de error formulario por si los hubiera */ }
                                // inicializarErroresFormulario();
                                obtenerRuta(evento.target.id);
                            }}
                        >editar
                        </Button>
                        </Link>

                        <Button variant="success">comentar</Button>

                        {/* Indicar al enrutador el link para que conecte con outlet de la subruta. */}
                        <Link to="eliminaruta">
                        <Button variant="success"
                            id={codRuta}
                            onClick={(evento) => {
                            { /* Obtenemos la ruta e inicializamos
                                mensajes de error formulario por si los hubiera */ }
                            // inicializarErroresFormulario();
                            obtenerRuta(evento.target.id);
                            { /* Activamos el estado para confirmar eliminación. */ }
                            // confirmarEliminacion(true);
                            }}
                        >eliminar
                        </Button>
                        </Link>
                    </ButtonGroup>
                </Card.Body>
            </Card>
        </React.Fragment>
    );
}

export default ListadoRuta;