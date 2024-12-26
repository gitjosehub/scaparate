import React from "react";
import useContextoRutas from "../hooks/useContextoRutas.js";
import { useNavigate } from "react-router-dom";
import "./ConfirmarEliminacionRuta.css";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ConfirmarEliminacionRuta = ({ confirmandoEliminar, setConfirmandoEliminar }) => {

    // Deconstrucción del contexto a través del hook, con estados y funciones
    // que necesitamos.
    const { rutas, 
        ruta, 
        eliminandoRuta, 
        confirmarEliminacion,
        eliminarRuta } = useContextoRutas();

    // Hook para trabajar con las rutas de router-dom de React.
    const navegar = useNavigate();

    return (
        <React.Fragment>
            <section className="confirmacion-eliminar">
            <Card className="p-2">
                <Card.Body>
                    <p>¿Estás seguro de que deseas eliminar {ruta.titulo}?</p>
                    <article className="d-flex justify-content-between">
                        <Button variant="outline-danger" 
                            onClick={
                                (evento) => {
                                    eliminarRuta(ruta.codRuta);
                                    setConfirmandoEliminar(false);
                                    navegar("/rutas");
                                }
                            }
                        >Confirmar
                        </Button>
                        <Button variant="outline-secondary" 
                            onClick={
                                (evento) => {
                                    setConfirmandoEliminar(false);
                                    // confirmarEliminacion(false);
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

export default ConfirmarEliminacionRuta;