import React from "react";
import useContextoRutas from "../hooks/useContextoRutas.js";
import { useNavigate } from "react-router-dom";
// import { Form, useNavigate } from "react-router-dom";
// import "./ConfirmarEliminacionRuta.css";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ConfirmarParticipacionRuta = ({ confirmandoParticipar, setConfirmandoParticipar }) => {

    // Deconstrucción del contexto a través del hook, con estados y funciones
    // que necesitamos.
    const { rutas, 
        ruta, 
        activandoRuta, 
        confirmarEliminacion,
        activarRuta,
        desactivarRuta,
        participacionRuta,
        crearParticipacion,
        actualizarDatoFormularioParticipar } = useContextoRutas();

    // Hook para trabajar con las rutas de router-dom de React.
    const navegar = useNavigate();

    return (
        <React.Fragment>
            <section className="confirmacion-eliminar">
            <Card className="p-2">
                <Card.Body>
                    <p className="eliminar-ruta">Por favor, valora {ruta.titulo}.</p>
                    {/* Campo númerico para valoración. */}
                    <Form>
                    <Form.Group controlId="exampleForm.ControlInput2">
                        {/* <Form.Label>Valoración</Form.Label> */}
                        <Form.Control type="number" placeholder="0" size="sm" min="0" max="5" step="0.1" required 
                        name = "valoracion"
                        value = {participacionRuta.valoracion || ""}
                        onChange = {(evento) => {
                            actualizarDatoFormularioParticipar(evento);
                        }}
                        />
                        <Form.Control.Feedback type="invalid">La distancia no es valida.</Form.Control.Feedback>
                    </Form.Group>
                    </Form>
                    {/* Botones confirmar y cancelar. */}
                    <article className="d-flex justify-content-between mt-2">
                        <Button variant="outline-success" size="sm"
                            onClick={
                                (evento) => {
                                    evento.preventDefault();
                                    // eliminarRuta(ruta.codRuta);
                                    crearParticipacion("7b75624a-4002-479a-b463-1e82f39d74c0");
                                    
                                    setConfirmandoParticipar(false);
                                    navegar("/rutas");
                                }
                            }
                        >confirmar
                        </Button>
                        <Button variant="outline-secondary" size="sm"
                            onClick={
                                (evento) => {
                                    evento.preventDefault();
                                    setConfirmandoParticipar(false);
                                    // confirmarEliminacion(false);
                                    navegar("/rutas");
                                }
                            }
                        >cancelar
                        </Button>
                    </article>
                </Card.Body>
            </Card>
        </section>
        </React.Fragment>
    );
};

export default ConfirmarParticipacionRuta;