import React from "react";
import { Link } from "react-router-dom";
import useContextoRutas from "../hooks/useContextoRutas.js";
import ListadoComentario from "./ListadoComentario.jsx";

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const ListadoComentarios = () => {

    // Desestructuración de los contextos que recibimos por el hook.
    const { comentariosRutas, obtenerListadoComentarios } = useContextoRutas();
    // Función a realizar en la carga del componente. Para actualizar las rutas del usuario.
    // useEffect(() => {
    //     obtenerListadoComentarios(ruta.codRuta);
    // }, []);
    console.log('valor y length de comentariosRutas en ListadoComentarios.');
    console.log(comentariosRutas.length);
    console.log(comentariosRutas);
    return (
        <React.Fragment>
            {/* Mapeamos el estado rutas (array de objetos ruta). */}
            {comentariosRutas.length ? (
                <section>
                    {comentariosRutas.map((valor, indice, array) => {
                        return (
                            <ListadoComentario key={valor.codComenta} datosComenta={valor} />
                        );
                    })}
                </section>
            ) : (
                <React.Fragment>
                    <p>No se han encontrado comentarios.</p>
                </React.Fragment>
            )
            }
            <InputGroup size="sm" className="mb-3">
                <Form.Control
                placeholder="introduce tu comentario"
                aria-label="nuevo comentario"
                aria-describedby="basic-addon2"
                />
                <Button variant="outline-secondary" id="button-addon2">
                comentar
                </Button>
            </InputGroup>
        </React.Fragment>
    );
};

export default ListadoComentarios;