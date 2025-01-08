import React from "react";
import useContextoRutas from "../hooks/useContextoRutas.js";
import useContextoUsuarios from "../hooks/useContextoUsuarios.js";
import { formatearFecha } from "../bibliotecas/funciones.js";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const TarjetaRuta = () => {

    // Desestructuración de los contextos recibidos a través del hook.
    const { ruta, mostrandoRuta, cerrarMostrando } = useContextoRutas();
    const { obtenerListadoRegistrados, registrados } = useContextoUsuarios();

    // Conseguir los datos del autor de la ruta, con codUsuR y el estado registrados.
    const autorRuta = registrados.filter((usuarioAnterior) => {
        return usuarioAnterior.codUsuario === ruta.codUsuR;
    });

    let nickAutor = autorRuta.length <= 0 ? "desconocido" : autorRuta[0].nick;

    return (
        <React.Fragment>
            <Card>
                <Card.Img variant="top" src={`http://localhost:5173/src/assets/img/${ruta.imagen}`} />
                <Card.Body>
                <Card.Title className="titulo-ruta-ver">{ruta.titulo}</Card.Title>
                <Card.Subtitle className="autor-ruta"><span className="creado-por-ruta">creada por</span> {nickAutor}, <span className="fecha-ruta">el {formatearFecha(ruta.fechaCreacion)}.</span></Card.Subtitle>
                <section className="row mt-3">
                    {/* Para columna izquierda con iconos, ... */}
                    <section className="col-12 col-md-3">
                    <article className="info-icono">
                            <h5 className="text-center">Dificultad</h5>
                            <div className="d-flex align-items-center justify-content-center">
                                <i className="bi bi-exclamation-triangle me-2" style={{ fontSize: '30px', color: 'rgb(19, 148, 8)' }}></i>
                                <span className="contador-ruta-ver">{ruta.dificultad} / 5</span>
                            </div>
                        </article>
                        <article className="info-icono">
                            <h5 className="text-center">Distancia-Km</h5>
                            <div className="d-flex align-items-center justify-content-center">
                                <i className="bi bi-signpost me-2" style={{ fontSize: '30px', color: 'rgb(19, 148, 8)' }}></i>
                                <span className="contador-ruta-ver">{ruta.distancia}</span>
                            </div>
                        </article>
                        <article className="info-icono">
                            <h5 className="text-center">Desnivel - m</h5>
                            <div className="d-flex align-items-center justify-content-center">
                                <i className="bi bi-bar-chart me-2" style={{ fontSize: '30px', color: 'rgb(19, 148, 8)' }}></i>
                                <span className="contador-ruta-ver">{ruta.desnivel}</span>
                            </div>
                        </article>
                        <article className="info-icono">
                            <h5 className="text-center">Ubicación</h5>
                            <div className="d-flex align-items-center justify-content-center">
                                <i className="bi bi-geo me-2" style={{ fontSize: '30px', color: 'rgb(19, 148, 8)' }}></i>
                                <span className="ubicacion-ruta-ver">{ruta.localidad} <br /> {ruta.provincia}</span>
                            </div>
                        </article>
                    </section>
                    {/* Para columna derecha con texto descriptivo. */}
                    <section className="col-12 col-md-9">
                    <article className="descripcion-ruta">
                        <p>{ruta.descripcion}</p>
                    </article>
                    </section>
                </section>
                <Card.Footer className="text-muted" style={{ marginRight: 0, paddingRight: 0, backgroundColor: '#ffffff' }}>
                    {/* El botón para cerrar la tarjeta de la ruta. */}
                    <article className="d-flex justify-content-end">
                    <Button variant="outline-secondary" size="sm"
                        onClick={
                            (evento) => {
                                cerrarMostrando(false);
                            }}
                    >
                    Cerrar
                    </Button>
                    </article>
                </Card.Footer>
                </Card.Body>
            </Card>
        </React.Fragment>
    );
}

export default TarjetaRuta;