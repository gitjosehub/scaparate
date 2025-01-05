import React from "react";
import useContextoRutas from "../hooks/useContextoRutas.js";
import useContextoUsuarios from "../hooks/useContextoUsuarios.js";
import { formatearFecha } from "../bibliotecas/funciones.js";

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
// import Button from 'react-bootstrap/Button';


const ListadoComentario = (props) => {

    // Desestructuración de props.
    const { codComenta, codUsuario, comentario, fecha, tipoComenta, nickUsuario, imgUsuario } = props.datosComenta;
    // console.log(props.datosComenta);
    // Desestructuración de los contextos recibidos a través del hook.
    const { eliminarComentario } = useContextoRutas();
    // console.log(imagen);
    const { usuario } = useContextoUsuarios();
    // console.log(usuario);

    return (
        <React.Fragment>
            {/* <Card>
                <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">{codUsuario} - {formatearFecha(fecha)}</Card.Subtitle>
                {comentario}
                </Card.Body>
            </Card> */}
            <Form>
            <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="basic-addon1" style={{ width: '20%' }}>
                    <img src={`http://localhost:5173/src/assets/img/usuario/${imgUsuario}`} className="rounded me-2 img-avatar" alt={`usuario ${nickUsuario}`}/>
                    <strong>{nickUsuario}</strong>
                </InputGroup.Text>
                <Form.Control
                as="textarea"
                rows={2}
                aria-label="comentario"
                aria-describedby="basic-addon1"
                value={comentario}
                readOnly
                style={{ resize: "none" }}
                />
                <InputGroup.Text>{formatearFecha(fecha)}</InputGroup.Text>
                <Button variant="outline-danger"
                    id={codComenta}
                    onClick={(evento) => {
                        {/* Eliminamos el mensaje sin confirmación. */}
                        eliminarComentario(evento.target.id);
                        }}
                >eliminar</Button>
            </InputGroup>
            </Form>
        </React.Fragment>
    );
};

export default ListadoComentario;