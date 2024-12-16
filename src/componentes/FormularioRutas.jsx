import React, { useState } from "react";
import useContextoRutas from "../hooks/useContextoRutas";
import { useNavigate } from "react-router-dom";

// Importacion elementos de react-bootstrap.
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


const FormularioRutas = () => {

    // Desestructuracion del contexto.
    const { ruta, 
        actualizarDatoFormulario,
        crearRuta,
        editarRuta,
        validarFormulario,
        erroresFormulario,
        provincias,
        localidades } = useContextoRutas();

    // Hook para trabajar con las rutas de router-dom de React.
    const navegar = useNavigate();

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
            <h4>Formulario rutas.</h4>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                    {/* Columna izquierda */}
                    <Col md={6}>
                        {/* Campo de texto para titulo. */}
                        <Row className="mb-3">
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Título</Form.Label>
                                <Form.Control type="text" placeholder="introduce el titulo" size="sm" required autoFocus 
                                name = "titulo"
                                value = {ruta.titulo || ""}
                                onChange = {(evento) => {
                                    actualizarDatoFormulario(evento);
                                }}
                                />
                                <Form.Control.Feedback type="invalid">El nombre no es valido.</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        {/* Campos numericos para dificultad, distancia y desnivel*/}
                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="exampleForm.ControlInput2">
                                    <Form.Label>Dificultad</Form.Label>
                                    <Form.Control type="number" placeholder="0" size="sm" min="0" max="5" step="0.1" required 
                                    name = "dificultad"
                                    value = {ruta.dificultad || ""}
                                    onChange = {(evento) => {
                                        actualizarDatoFormulario(evento);
                                    }}
                                    />
                                    <Form.Control.Feedback type="invalid">La distancia no es valida.</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="exampleForm.ControlInput3">
                                    <Form.Label>Distancia</Form.Label>
                                    <Form.Control type="number" placeholder="0" size="sm" min="0" step="0.5" 
                                    name = "distancia"
                                    value = {ruta.distancia || ""}
                                    onChange = {(evento) => {
                                        actualizarDatoFormulario(evento);
                                    }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="exampleForm.ControlInput3">
                                    <Form.Label>Desnivel</Form.Label>
                                    <Form.Control type="number" placeholder="0" size="sm" min="0" step="0.5" 
                                    name = "desnivel"
                                    value = {ruta.desnivel || ""}
                                    onChange = {(evento) => {
                                        actualizarDatoFormulario(evento);
                                    }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Desplegables para provincia y localidad. */}
                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="exampleForm.SelectProvincia">
                                    <Form.Label>Provincia</Form.Label>
                                    <Form.Select aria-label="Provincia" size="sm" required 
                                    name = "codProvR"
                                    value = {ruta.codProvR}
                                    onChange = {(evento) => {
                                        actualizarDatoFormulario(evento);
                                    }}
                                    >
                                        <option value="">Selecciona provincia</option>
                                        {provincias.map((provincia) => (
                                            <option key={provincia.codProvincia} value={provincia.codProvincia}>
                                                {provincia.nombreProvincia} 
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">Selecciona una provincia valida.</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="exampleForm.SelectLocalidad">
                                    <Form.Label>Localidad</Form.Label>
                                    <Form.Select aria-label="Localidad" size="sm" required
                                    name = "codLocalR"
                                    value = {ruta.codLocalR}
                                    onChange = {(evento) => {
                                        actualizarDatoFormulario(evento);
                                    }}
                                    >
                                        <option value="">Selecciona localidad</option>
                                        {localidades.map((localidad) => (
                                            <option key={localidad.codLocalidad} value={localidad.codLocalidad}>
                                                {localidad.nombreLocalidad} 
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">Selecciona una localidad valida.</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Col>

                    {/* Columna derecha. */}
                    <Col md={6} className="d-flex flex-column">
                        {/* Textarea para descripcion. */}
                        <Form.Group controlId="descripcion" className="flex-grow-1">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" rows={7} style={{ resize: 'none' }} 
                            name = "descripcion"
                            value = {ruta.descripcion || ""}
                            onChange = {(evento) => {
                                actualizarDatoFormulario(evento);
                            }}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* Boton del formulario. */}
                <Row className="justify-content-end mt-3">
                    <Col xs="auto">
                        <Button variant="primary" type="submit"
                            onClick={(evento) => {
                                evento.preventDefault();
                                // if (validarFormulario(evento)) {
                                //   if (accion === "crear") {
                                //     crearRuta(usuario.id);
                                //     navegar("../");
                                //   } else {
                                //     editarRuta();
                                //     navegar("../");
                                //   }
                                // }
                                console.log("Y ahora toca crear o actualizar.");
                            }}
                        >Enviar
                        </Button>
                    </Col>
                </Row>
            </Form>



        </React.Fragment>
    );
}

export default FormularioRutas;