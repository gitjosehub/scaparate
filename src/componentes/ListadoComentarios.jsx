import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useContextoRutas from "../hooks/useContextoRutas.js";
import useContextoUsuarios from "../hooks/useContextoUsuarios.js";
import ListadoComentario from "./ListadoComentario.jsx";

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const ListadoComentarios = () => {

    // Desestructuración de los contextos que recibimos por el hook.
    const { ruta, comentariosRutas, comentarioRuta, actualizarDatoFormularioComenta, crearComentario, obtenerListadoComentarios } = useContextoRutas();
    const { usuario } = useContextoUsuarios();
    // Función a realizar en la carga del componente y cuando cambie el estado comentariosRutas.
    // useEffect(() => {
    //     obtenerListadoComentarios(ruta.codRuta);
    // }, [comentariosRutas]);
    // console.log('valor y length de comentariosRutas en ListadoComentarios.');
    // console.log(comentariosRutas.length);
    // console.log(comentariosRutas);
    // console.log(comentarioRuta);
    
    return (
        <React.Fragment>
            <section className="mt-4">
            <h5 className="subtitulo2-pagina">Comentarios de la ruta.</h5>
            <Form>
            <InputGroup size="sm" className="mb-3">
                <Form.Control
                placeholder="introduce tu comentario, si ya tienes la ruta como favorita ..."
                aria-label="nuevo comentario"
                aria-describedby="basic-addon2"
                name="comentario"
                value = {comentarioRuta.comentario || ""}
                onChange = {(evento) => {
                    actualizarDatoFormularioComenta(evento);
                }}
                />
                {/* Boton para hacer comentario. */}
                <Button variant="outline-success" id="button-addon2"
                    onClick={(evento) => {
                        // Evitamos el comportamiento por defecto para no recargar la página.
                        evento.preventDefault();
                        // Validamos el formulario antes de realizar la acción (crear o editar).
                        // if (validarFormulario(evento)) {
                            // crearRuta(usuario.id);
                            crearComentario(usuario.id);
                            // navegar("../");
                          
                        // }
                    }}
                >comentar
                </Button>
            </InputGroup>
            </Form>
            </section>
            {/* Mapeamos el estado rutas (array de objetos ruta). */}
            {comentariosRutas.length ? (
                <section className="mt-4 scroll-comenta">
                    {comentariosRutas.map((valor, indice, array) => {
                        return (
                            <ListadoComentario key={valor.codComenta} datosComenta={valor} />
                        );
                    })}
                </section>
            ) : (
                <React.Fragment>
                    <p className="no-encontrado">No se han encontrado comentarios.</p>
                </React.Fragment>
            )
            }
            
        </React.Fragment>
    );
};

export default ListadoComentarios;