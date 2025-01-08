import React from "react";
import useContextoRutas from "../hooks/useContextoRutas.js";
import { useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ConfirmarActivacionRuta = ({ confirmandoEliminar, setConfirmandoActivar }) => {

    // Deconstrucción del contexto a través del hook, con estados y funciones
    // que necesitamos.
    const { rutas, 
        ruta, 
        activandoRuta, 
        confirmarEliminacion,
        activarRuta,
        desactivarRuta } = useContextoRutas();

    // Hook para trabajar con las rutas de router-dom de React.
    const navegar = useNavigate();

    return (
        <React.Fragment>
            <section className="confirmacion-eliminar">
            <Card className="p-2">
                <Card.Body>
                    <p className="eliminar-ruta">¿Estás seguro de que deseas {ruta.activa ? "activar" : "desactivar"} {ruta.titulo}?</p>
                    <article className="d-flex justify-content-between">
                        <Button variant={ruta.activa ? "outline-success" : "outline-danger"} size="sm"
                            onClick={
                                (evento) => {
                                    if (ruta.activa) {
                                        activarRuta(ruta.codRuta);
                                    } else {
                                        desactivarRuta(ruta.codRuta);
                                    }
                                    
                                    setConfirmandoActivar(false);
                                    navegar("/rutas");
                                }
                            }
                        >Confirmar
                        </Button>
                        <Button variant="outline-secondary" size="sm"
                            onClick={
                                (evento) => {
                                    setConfirmandoActivar(false);
                                    navegar("/rutas");
                                }
                            }
                        >Cancelar
                        </Button>
                    </article>
                </Card.Body>
            </Card>
        </section>
        </React.Fragment>
    );
};

export default ConfirmarActivacionRuta;