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
    // console.log('en TarjetaRuta ...');
    // console.log(ruta);
    // Conseguir los datos del autor de la ruta, con codUsuR y el estado registrados.
    const autorRuta = registrados.filter((usuarioAnterior) => {
        return usuarioAnterior.codUsuario === ruta.codUsuR;
    });
    // let nickAutor;
    // console.log(autorRuta);
    // console.log(autorRuta.length);
    let nickAutor = autorRuta.length <= 0 ? "desconocido" : autorRuta[0].nick;
    // if (autorRuta.length <= 0) {
    //    nickAutor = "desconocido"; 
    // } else {
    //     nickAutor = autorRuta[0].nick;
    // }
    console.log(nickAutor);

    return (
        <React.Fragment>
            {/* { mostrandoRuta && ( */}
            <Card>
                <Card.Img variant="top" src={`http://localhost:5173/src/assets/img/${ruta.imagen}`} />
                <Card.Body>
                <Card.Title className="titulo-ruta-ver">{ruta.titulo}</Card.Title>
                <Card.Subtitle className="creado-por-ruta"></Card.Subtitle>
                <Card.Text className="autor-ruta"><span className="creado-por-ruta">creada por</span> {nickAutor}, <span className="fecha-ruta">el {formatearFecha(ruta.fechaCreacion)}.</span></Card.Text>
                <Card.Text className="contador-ruta-ver">
                <i className="bi bi-exclamation-triangle me-2" style={{ fontSize: '30px', color: 'rgb(19, 148, 8)' }}></i>
                    {ruta.dificultad} / 5.0
                </Card.Text>
                <Card.Text className="contador-ruta-ver">
                    <i className="bi bi-signpost me-2" style={{ fontSize: '30px', color: 'rgb(19, 148, 8)' }}></i>
                    {ruta.distancia} Km
                </Card.Text>
                <Card.Text className="contador-ruta-ver">
                    <i className="bi bi-bar-chart me-2" style={{ fontSize: '30px', color: 'rgb(19, 148, 8)' }}></i>
                    {ruta.desnivel} m
                </Card.Text>
                <Card.Text className="ubicacion-ruta">
                <i className="bi bi-geo me-2" style={{ fontSize: '30px', color: 'rgb(19, 148, 8)' }}></i>
                    {ruta.localidad} - {ruta.provincia}
                </Card.Text>
                <Card.Text className="descripcion-ruta">{ruta.descripcion}</Card.Text>
                <Card.Footer className="text-muted">
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
            {/* )} */}
        </React.Fragment>
    );
}

export default TarjetaRuta;