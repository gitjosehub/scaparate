import React, { useState, useEffect } from "react";
import useContextoRutas from "../hooks/useContextoRutas";
import { useNavigate } from "react-router-dom";

import "./FormularioRutas.css";

// Importación elementos de react-bootstrap.
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


const FormularioRutas = ({accion}) => {

    // Desestructuración del contexto.
    const { ruta, 
        actualizarDatoFormulario,
        crearRuta,
        editarRuta,
        eliminarRuta,
        validarFormulario,
        erroresFormulario,
        provincias,
        localidades } = useContextoRutas();

    // Hook para trabajar con las rutas de router-dom de React.
    const navegar = useNavigate();

    // Estado para controlar las localidades según provincia seleccionada.
    const [localidadesPorProvincia, setLocalidadesPorProvincia] = useState([]);

    // Acciones a realizar si cambia la provincia en relación con localidad.
    useEffect(() => {
        if (ruta.codProvR) {
          const localidadesPorProvincia = localidades.filter(
            (localidad) => localidad.codProvL === ruta.codProvR
          );
          setLocalidadesPorProvincia(localidadesPorProvincia);
        } else {
          setLocalidadesPorProvincia([]);
        }
        console.log("en el useEffect:", localidadesPorProvincia);
    }, [ruta.codProvR, localidades]);



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
            
            <section className="position-absolute top-0 start-0 w-100 h-100">
            <article className="position-absolute top-0 start-0 w-100 h-100 bg-white opacity-50"></article>
            <article className="position-absolute bg-white shadow p-2" style={{ width: '90%', height: 'auto', left: '50%', transform: 'translateX(-50%)' }}>
            <h4>{accion} ruta.</h4>
            {/* Formulario controlado. Mismos nombres (name) que en la base de datos
                y utilizamos el evento onChange para actualizar el valor de sus campos. */}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                    {/* Columna izquierda */}
                    <Col md={6}>
                        {/* Campo de texto para título. */}
                        <Row className="mb-3">
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Título</Form.Label>
                                <Form.Control type="text" placeholder="Introduce el titulo" size="sm" required autoFocus 
                                name = "titulo"
                                value = {ruta.titulo || ""}
                                onChange = {(evento) => {
                                    actualizarDatoFormulario(evento);
                                }}
                                />
                                <Form.Control.Feedback type="invalid">El nombre no es valido.</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        {/* Campos numéricos para dificultad, distancia y desnivel*/}
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

                        <Row className="mb-3">
                            {/* Desplegable para provincia. */}
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
                            {/* Desplegable para localidad. */}
                            <Col>
                                <Form.Group controlId="exampleForm.SelectLocalidad">
                                    <Form.Label>Localidad</Form.Label>
                                    <Form.Select aria-label="Localidad" size="sm" required
                                    disabled={!ruta.codProvR}
                                    name = "codLocalR"
                                    value = {ruta.codLocalR}
                                    onChange = {(evento) => {
                                        actualizarDatoFormulario(evento);
                                    }}
                                    >
                                        <option value="">Selecciona localidad</option>
                                        {localidadesPorProvincia.map((localidad) => (
                                            <option key={localidad.codLocalidad} value={localidad.codLocalidad}>
                                                {localidad.nombreLocalidad} 
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">Selecciona una localidad valida.</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            {/*  ANTERIOR: Elemento tipo fichero para imagen. */}
                            {/* <Col>
                            <Form.Group controlId="formFileSm" className="mb-3">
                                <Form.Label>Imagen</Form.Label>
                                <Form.Control type="file" size="sm" 
                                name="imagenesruta"
                                onChange={(evento) => {
                                    actualizarDatoFormulario(evento);
                                }}
                                />
                            </Form.Group>         
                            </Col> */}
                            {/*  Elemento tipo text para imagen. */}
                            <Col>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Imagen</Form.Label>
                                <Form.Control type="text" placeholder="Introduce el nombre y extension de la imagen" size="sm" required  
                                name = "imagen"
                                value = {ruta.imagen || ""}
                                onChange = {(evento) => {
                                    actualizarDatoFormulario(evento);
                                }}
                                />
                                <Form.Control.Feedback type="invalid">El nombre de la imagen es valido.</Form.Control.Feedback>
                            </Form.Group>         
                            </Col>
                        </Row>
                    </Col>

                    {/* Columna derecha. */}
                    <Col md={6} className="d-flex flex-column">
                    <Row>
                        {/* Textarea para descripción. */}
                        <Form.Group controlId="descripcion" className="flex-grow-1">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" rows={9} style={{ resize: 'none' }} 
                            name = "descripcion"
                            value = {ruta.descripcion || ""}
                            onChange = {(evento) => {
                                actualizarDatoFormulario(evento);
                            }}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-end mt-1">
                    <Col xs="auto">
                        {/* Botón del formulario. */}
                        <Button variant="outline-success" type="submit"
                            onClick={(evento) => {
                                // Evitamos el comportamiento por defecto para no recargar la página.
                                evento.preventDefault();
                                // Validamos el formulario antes de realizar la acción (crear o editar).
                                // if (validarFormulario(evento)) {
                                  if (accion === "crear") {
                                    // crearRuta(usuario.id);
                                    crearRuta("1e9a4f36-fcb5-4a34-a11d-73cea10d7569");
                                    navegar("../");
                                  } else {
                                    editarRuta();
                                    navegar("../");
                                  }
                                // }
                            }}
                        >{accion} ruta
                        </Button>
                    </Col>
                </Row>
                    </Col>
                </Row>
            </Form>
            </article>
            </section>

        </React.Fragment>
    );
}

export default FormularioRutas;