import React from "react";
import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


const ControlSesion = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <React.Fragment>
            <Button variant="outline-success" onClick={() => setShow(true)}>
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="introduce contraseña"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Confirma contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="introduce de nuevo contraseña"
              />
            </Form.Group>
          </Form>
          <p>
            ¿ Ya estas registrado ? Inicia sesion
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="outline-success" onClick={handleClose}>
            Iniciar sesion
          </Button>
        </Modal.Footer>
      </Modal>
        </React.Fragment>

    );
}

export default ControlSesion;