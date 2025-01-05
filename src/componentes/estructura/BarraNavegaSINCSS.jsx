import React from "react";
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

// import Logo from "../../assets/img/scapa100x40.png";
import Logo from "../../assets/img/scapaFondogris.png";

const BarraNavega = () => {

    return (
        <React.Fragment>
            <section>
                <article>
                    {/* <Navbar expand="lg" className="bg-body-tertiary"> */}
                    <Navbar expand="lg" className="bg-body-tertiary">
                        <Container>
                            {/* <Navbar.Brand href="#home"> */}
                            <Navbar.Brand as={Link} to="/">
                            <img src={Logo} alt="scapa" className="img-logo"/>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                {/* <Nav.Link href="#rutas">Rutas</Nav.Link> */}
                                <Nav.Link as={Link} to="rutas">Rutas</Nav.Link>
                                {/* <Nav.Link href="#eventos">Eventos</Nav.Link> */}
                                <Nav.Link as={Link} to="/eventos">Eventos</Nav.Link>
                                <NavDropdown title="Comunidad" id="basic-nav-dropdown">
                                {/* <NavDropdown.Item href="#seguidores">Seguidores</NavDropdown.Item> */}
                                <NavDropdown.Item as={Link} to="/comunidad">Seguidores</NavDropdown.Item>
                                {/* <NavDropdown.Item href="#comunidadRutas">Rutas</NavDropdown.Item> */}
                                <NavDropdown.Item as={Link} to="/comunidadRutas">Rutas</NavDropdown.Item>
                                {/* <NavDropdown.Item href="#comunidadEventos">Eventos</NavDropdown.Item> */}
                                <NavDropdown.Item as={Link} to="/comunidadEventos">Eventos</NavDropdown.Item>
                                <NavDropdown.Divider />
                                {/* <NavDropdown.Item href="#comunidadComentarios">Comentarios</NavDropdown.Item> */}
                                <NavDropdown.Item as={Link} to="/comunidadComentarios">Comentarios</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </article>
            </section>
        </React.Fragment>
    );
    
}

export default BarraNavega;