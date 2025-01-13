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
    const { ruta, comentariosRutas, 
            comentarioRuta, actualizarDatoFormularioComenta, 
            crearComentario, obtenerListadoComentarios, 
            participacionRuta, participacionRutas } = useContextoRutas();
    const { usuario } = useContextoUsuarios();

    // Saber si usuario participa (favorita) en la ruta.
    const participa = participacionRutas.some(
        (participacion) => participacion.codUsuPR === usuario.id && participacion.codRutaPR === ruta.codRuta
    );
    // console.log(`ListadoComentarios y participa es: ${participa}`);
    // console.log(`participaRuta es: `);
    // console.log(participacionRuta);
    
    return (
        <React.Fragment>
            <section className="mt-4">
                <h5 className="subtitulo2-pagina">Comentarios de la ruta.</h5>
                {participa ? (
                    <>
                        <Form>
                            <InputGroup size="sm" className="mb-3">
                                <Form.Control
                                    placeholder="Introduce tu comentario ..."
                                    aria-label="nuevo comentario"
                                    aria-describedby="basic-addon2"
                                    name="comentario"
                                    value={comentarioRuta.comentario || ""}
                                    onChange={(evento) => {
                                        actualizarDatoFormularioComenta(evento);
                                    }}
                                />
                                <Button
                                    variant="outline-success"
                                    id="button-addon2"
                                    onClick={(evento) => {
                                        evento.preventDefault();
                                        crearComentario(usuario.id);
                                    }}
                                >
                                    Comentar
                                </Button>
                            </InputGroup>
                        </Form>
                        {comentariosRutas.length ? (
                            <section className="mt-4 scroll-comenta">
                                {comentariosRutas.map((valor) => (
                                    <ListadoComentario key={valor.codComenta} datosComenta={valor} />
                                ))}
                            </section>
                        ) : (
                            <p className="no-encontrado">No se han encontrado comentarios.</p>
                        )}
                    </>
                ) : (
                    <p className="no-encontrado">
                        Añade la ruta a tus favoritas para ver y realizar comentarios.
                    </p>
                )}
            </section>
        </React.Fragment>
    );
};

export default ListadoComentarios;