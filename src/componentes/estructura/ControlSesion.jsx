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
    const { sesionIniciada, 
            cerrarSesion,
            iniciarSesion,
            // crearCuenta,
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
    // setSesionIniciada(true);

    return (
        <React.Fragment>
          { sesionIniciada ? (
              <Button variant="outline-success" 
                onClick={(evento) => {
                  evento.preventDefault();
                  setShow(true);
                  cerrarSesion();
                }}
              >
                Cerrar sesion
              </Button>
            ) : (
              // <Button variant="outline-success" 
              //   onClick={(evento) => {
              //     evento.preventDefault();
              //     setShow(true);
              //     // if (validarFormulario(evento)) {
              //         iniciarSesion();
              //     // }

              //   }}
              // >
              //   Iniciar sesion
              // </Button>
              <Button variant="outline-success" size="sm" onClick={() => setShow(true)}>
                Iniciar sesion
              </Button>
          )}
          
          { !sesionIniciada && ( 
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-60w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Iniciar sesion
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
          </Form>
          <p>
            ¿ Todavia no estas registrado ? Crea una cuenta
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
                  iniciarSesion();
              // }
            }}
          >
            Iniciar sesion
          </Button>
        </Modal.Footer>
      </Modal>
      )}
        </React.Fragment>

    );
}

export default ControlSesion;