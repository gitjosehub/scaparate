import React from "react";
import useContextoRutas from "../hooks/useContextoRutas.js";
import { useNavigate } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import useContextoUsuarios from "../hooks/useContextoUsuarios.js";

const ConfirmarParticipacionRuta = ({ confirmandoParticipar, setConfirmandoParticipar, accion }) => {

    // Deconstrucción de los contextos a través del hook, con estados y funciones
    // que necesitamos.
    const { rutas, 
        ruta, 
        activandoRuta, 
        confirmarEliminacion,
        activarRuta,
        desactivarRuta,
        participacionRuta,
        crearParticipacion,
        eliminarParticipacion,
        actualizarDatoFormularioParticipar } = useContextoRutas();
    const { usuario } = useContextoUsuarios();

    // Hook para trabajar con las rutas de router-dom de React.
    const navegar = useNavigate();

    console.log(`props ha recibido participa y entonces accion es: ${accion}`);

    return (
        <React.Fragment>
            <section className="confirmacion-eliminar">
            <Card className="p-2">
                <Card.Body>
                    {!accion ? (
                        <p className="eliminar-ruta">Por favor, valora {ruta.titulo}. Y confirma que es favorita.</p>
                    ) : (
                        <p className="eliminar-ruta">Por favor, confirma que quieres quitar {ruta.titulo} de favorita.</p>
                    )}
                    
                    {/* Campo númerico para valoración. */}
                    {!accion && (
                        <Form>
                        <Form.Group controlId="exampleForm.ControlInput2">
                            <Form.Control type="number" placeholder="0" size="sm" min="0" max="5" step="0.1" required 
                            name = "valoracion"
                            value = {participacionRuta.valoracion || ""}
                            onChange = {(evento) => {
                                actualizarDatoFormularioParticipar(evento);
                            }}
                            />
                            <Form.Control.Feedback type="invalid">La puntuacion no es valida.</Form.Control.Feedback>
                        </Form.Group>
                        </Form>
                    )}
                    
                    {/* Botones confirmar y cancelar. */}
                    <article className="d-flex justify-content-between mt-2">
                        <Button variant="outline-success" size="sm"
                            onClick={
                                (evento) => {
                                    evento.preventDefault();
                                    if (!accion) {
                                        crearParticipacion(usuario.id);
                                    } else {
                                        eliminarParticipacion(usuario.id);
                                        console.log('ahora eliminarParticipacion');
                                    }
                                    
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