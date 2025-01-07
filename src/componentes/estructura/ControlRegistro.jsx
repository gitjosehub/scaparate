import React from "react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import useContextoUsuarios from "../../hooks/useContextoUsuarios.js";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


const ControlSesion = () => {

    // Desectructuración del contexto para tener los estados y funciones
    // necesarias a través del hook.
    const { sesionIniciada, cerrarSesion,
      iniciarSesion,
      crearCuenta,
      actualizarDatoFormulario,
      // validarFormulario,
      // erroresFormularioIniciar,
      // erroresFormularioCrear
     } = useContextoUsuarios();
    // Hook para trabajar con las rutas de router-dom de React.
    const navegar = useNavigate();
    // Estado para trabajar con el modal.
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // console.log(`sesionIniciada: ${sesionIniciada}`);

    return (
        <React.Fragment>
          { !sesionIniciada && (
            <article>
            <Button variant="outline-success" size="sm" onClick={() => setShow(true)}>
              Crear cuenta
            </Button>

            <Modal
              show={show}
              onHide={() => setShow(false)}
              dialogClassName="modal-60w"
              aria-labelledby="example-custom-modal-styling-title"
            >
              <Modal.Header>
                <Modal.Title id="example-custom-modal-styling-title">
                  Crear cuenta
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      // id="email" Se quita por el controId del Form.Group.
                      placeholder="nombre@ejemplo.com"
                      autoFocus
                      onChange={(evento) => {
                        actualizarDatoFormulario(evento);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      // id="password" Se quita por el controId del Form.Group.
                      placeholder="introduce contraseña"
                      onChange={(evento) => {
                        actualizarDatoFormulario(evento);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="repitePassword">
                    <Form.Label>Confirma contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      name="repitePassword"
                      // id="repitePassword" Se quita por el controId del Form.Group.
                      placeholder="repite contraseña"
                      onChange={(evento) => {
                        actualizarDatoFormulario(evento);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="nombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      name="nombre"
                      // id="nombre" Se quita por el controId del Form.Group.
                      placeholder="introduce tu nombre"
                      onChange={(evento) => {
                        actualizarDatoFormulario(evento);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="nick">
                    <Form.Label>Nick</Form.Label>
                    <Form.Control
                      type="text"
                      name="nick"
                      // id="nick" Se quita por el controId del Form.Group.
                      placeholder="introduce un seudónimo"
                      onChange={(evento) => {
                        actualizarDatoFormulario(evento);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="dni">
                    <Form.Label>D.N.I.</Form.Label>
                    <Form.Control
                      type="text"
                      name="dni"
                      // id="dni" Se quita por el controId del Form.Group.
                      placeholder="introduce tu dni"
                      onChange={(evento) => {
                        actualizarDatoFormulario(evento);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="imagen">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      name="imagen"
                      // id="imagen" Se quita por el controId del Form.Group.
                      placeholder="introduce nombre imagen avatar"
                      onChange={(evento) => {
                        actualizarDatoFormulario(evento);
                      }}
                    />
                  </Form.Group>
                </Form>
                <p>
                  ¿ Ya estas registrado ? Inicia sesion
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="outline-secondary" size="sm" onClick={handleClose}>
                  Cerrar
                </Button>
                <Button variant="outline-success" size="sm" 
                  onClick={(evento) => {
                    evento.preventDefault();
                    handleClose;
                    // if (validarFormulario(evento)) {
                        crearCuenta();
                    // }
                  }}
                >
                  Crear cuenta
                </Button>
              </Modal.Footer>
            </Modal>
            </article>
          )}
        </React.Fragment>

    );
}

export default ControlSesion;