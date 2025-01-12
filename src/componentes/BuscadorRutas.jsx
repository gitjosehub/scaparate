import React, { useState } from "react";
import useContextoRutas from "../hooks/useContextoRutas";
import useContextoUsuarios from "../hooks/useContextoUsuarios";

// Importación elementos de react-bootstrap.
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


const BuscadorRutas = () => {

    // Desestructuración del contexto.
    const { filtrarRuta, 
        actualizarDatoFormularioFiltrar,
        filtroRuta,
        inicializarFiltroRuta,
        obtenerListadoRutas,
        validarFormulario,
        erroresFormulario,
        provincias,
        localidades } = useContextoRutas();
    const { usuario } = useContextoUsuarios();

    // Validar formulario con componente de react-bootstrap no se 
    // como funciona todavia, de momento nada de nada.
        const [validated, setValidated] = useState(false);
    
      const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
      };


    return (
        <React.Fragment>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <section className="d-flex align-items-center">
                            <i className="bi bi-search me-2" style={{ fontSize: '15px' }}></i>
                            <span>Búsqueda avanzada de rutas</span>
                        </section>
                    </Accordion.Header>
                    <Accordion.Body>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row className="mb-3">
                            <Col>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Filtrar título que contenga</Form.Label>
                                <Form.Control type="text" placeholder="buscar en título" size="sm" required autoFocus 
                                name = "titulo"
                                value = {filtroRuta.titulo || ""}
                                onChange = {(evento) => {
                                    actualizarDatoFormularioFiltrar(evento);
                                }}
                                />
                                <Form.Control.Feedback type="invalid">El nombre no es valido.</Form.Control.Feedback>
                            </Form.Group>
                            </Col>
                            </Row>
                            <Row className="mb-3">
                            <Col xs={6}>
                            <Form.Group controlId="exampleForm.ControlInput2">
                                <Form.Label>Dificultad inferior a</Form.Label>
                                <Form.Control type="number" placeholder="0" size="sm" min="0" max="5" step="0.1" required 
                                name = "dificultad"
                                value = {filtroRuta.dificultad || ""}
                                onChange = {(evento) => {
                                    actualizarDatoFormularioFiltrar(evento);
                                }}
                                />
                                <Form.Control.Feedback type="invalid">La distancia no es valida.</Form.Control.Feedback>
                            </Form.Group>
                            </Col>
                            <Col xs={6}>
                            <Form.Group controlId="exampleForm.ControlInput3">
                                <Form.Label>Distancia inferior a </Form.Label>
                                <Form.Control type="number" placeholder="0" size="sm" min="0" step="0.5" 
                                name = "distancia"
                                value = {filtroRuta.distancia || ""}
                                onChange = {(evento) => {
                                    actualizarDatoFormularioFiltrar(evento);
                                }}
                                />
                            </Form.Group>
                            </Col>
                            </Row>
                            <Row className="justify-content-end mt-1">
                            <Col xs="auto">
                            <Button variant="outline-secondary" type="submit"
                            onClick={(evento) => {
                                // Evitamos el comportamiento por defecto para no recargar la página.
                                evento.preventDefault();
                                // Validamos el formulario antes de realizar la acción (crear o editar).
                                // if (validarFormulario(evento)) {
                                    inicializarFiltroRuta();
                                    console.log('buscador de rutas');
                                    obtenerListadoRutas(usuario.phone);
                                // }
                            }}
                            >Limpiar filtros
                            </Button>
                            </Col>
                            <Col xs="auto">
                            <Button variant="outline-success" type="submit"
                                onClick={(evento) => {
                                    // Evitamos el comportamiento por defecto para no recargar la página.
                                    evento.preventDefault();
                                    // Validamos el formulario antes de realizar la acción (crear o editar).
                                    // if (validarFormulario(evento)) {
                                        filtrarRuta(filtroRuta);
                                    // }
                                }}
                            >Buscar rutas
                            </Button>
                            </Col>
                            </Row>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </React.Fragment>
    );
}

export default BuscadorRutas;