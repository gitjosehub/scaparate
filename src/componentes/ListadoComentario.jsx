import React from "react";
import useContextoRutas from "../hooks/useContextoRutas.js";
import useContextoUsuarios from "../hooks/useContextoUsuarios.js";
import { formatearFecha } from "../bibliotecas/funciones.js";

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
// import Button from 'react-bootstrap/Button';


const ListadoComentario = (props) => {

    // Desestructuración de props.
    const { codComenta, codUsuario, comentario, fecha, tipoComenta } = props.datosComenta;
    console.log(props.datosComenta);
    // Desestructuración de los contextos recibidos a través del hook.
    const { obtenerListadoComentarios } = useContextoRutas();
    // console.log(imagen);
    const { usuario } = useContextoUsuarios();
    console.log(usuario);

    return (
        <React.Fragment>
            <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="basic-addon1">{codUsuario}</InputGroup.Text>
                <Form.Control
                aria-label="comentario"
                aria-describedby="basic-addon1"
                value={comentario}
                readOnly
                />
                <InputGroup.Text>{formatearFecha(fecha)}</InputGroup.Text>
            </InputGroup>
            

        </React.Fragment>
    );
};

export default ListadoComentario;