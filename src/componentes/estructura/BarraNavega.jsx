import React from "react";
import { NavLink, Link } from 'react-router-dom';
import useContextoUsuarios from "../../hooks/useContextoUsuarios.js";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

// import Logo from "../../assets/img/scapa100x40.png";
import Logo from "../../assets/img/scapaFondogris.png";

const BarraNavega = () => {

    // Desestructuración del contexto.
    const { sesionIniciada } = useContextoUsuarios();

    return (
        <React.Fragment>
            <section>
                <article>
                    {/* <Navbar expand="lg" className="bg-body-tertiary"> */}
                    <Navbar expand="lg" className="bg-body-tertiary">
                        <Container>
                            <Navbar.Brand as={NavLink} to="/">
                                <img src={Logo} alt="scapa" className="img-logo"/>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                            {sesionIniciada && (
                                <Nav className="me-auto">
                                    {/* Eliminar 'exact' y utilizar 'className' con función para manejar la clase activa */}
                                    
                                    <NavLink to="/rutas" className={({ isActive }) => { return isActive ? "nav-link active" : "nav-link"; }}>
                                        Rutas
                                    </NavLink>
                                    <NavLink to="/eventos" className={({ isActive }) => { return isActive ? "nav-link active" : "nav-link"; }}>
                                        Eventos
                                    </NavLink>
                                    <NavDropdown title="Comunidad" id="basic-nav-dropdown">
                                        <NavDropdown.Item as={NavLink} to="/comunidad" className={({ isActive }) => { return isActive ? "nav-link active" : "nav-link"; }}>
                                            Seguidores
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} to="/comunidadRutas" className={({ isActive }) => { return isActive ? "nav-link active" : "nav-link"; }}>
                                            Rutas
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} to="/comunidadEventos" className={({ isActive }) => { return isActive ? "nav-link active" : "nav-link"; }}>
                                            Eventos
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={NavLink} to="/comunidadComentarios" className={({ isActive }) => { return isActive ? "nav-link active" : "nav-link"; }}>
                                            Comentarios
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    
                                </Nav>
                                )}
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </article>
            </section>
        </React.Fragment>
    );
    
}

export default BarraNavega;