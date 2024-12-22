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
          <h3>Inicia sesion.</h3>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Correo electronico</Form.Label>
              <Form.Control type="email" size="sm" placeholder="nombre@ejemplo.es" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPlaintextPassword">
              <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="introduce tu contraseña" />
            </Form.Group>
          </Form>
          <h3>Crea una nueva cuenta.</h3>

        </React.Fragment>

    );
}

export default ControlSesion;