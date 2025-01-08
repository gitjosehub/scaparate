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
      validarFormulario,
      erroresFormuSesion,
      inicializarErroresFormuSesion,
      // erroresFormularioCrear
     } = useContextoUsuarios();
    // Hook para trabajar con las rutas de router-dom de React.
    const navegar = useNavigate();
    // Estado para trabajar con el modal.
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                <Form name="crearCuenta">
                <article className="mb-3">
                  <label htmlFor="email" className="form-label">Correo electrónico</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="nombre@ejemplo.com"
                    autoFocus
                    onChange={(evento) => {
                      actualizarDatoFormulario(evento);
                    }}
                  />
                </article>
                <article className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder="introduce contraseña"
                    onChange={(evento) => {
                      actualizarDatoFormulario(evento);
                    }}
                  />
                </article>
                <article className="mb-3">
                  <label htmlFor="repitePassword" className="form-label">Confirma contraseña</label>
                  <input
                    type="password"
                    name="repitePassword"
                    id="repitePassword"
                    className="form-control"
                    placeholder="repite contraseña"
                    onChange={(evento) => {
                      actualizarDatoFormulario(evento);
                    }}
                  />
                </article>
                <article className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    className="form-control"
                    placeholder="introduce tu nombre"
                    onChange={(evento) => {
                      actualizarDatoFormulario(evento);
                    }}
                  />
                </article>
                <article className="mb-3">
                  <label htmlFor="nick" className="form-label">Nick</label>
                  <input
                    type="text"
                    name="nick"
                    id="nick"
                    className="form-control"
                    placeholder="introduce un seudónimo"
                    onChange={(evento) => {
                      actualizarDatoFormulario(evento);
                    }}
                  />
                </article>
                <article className="mb-3">
                  <label htmlFor="dni" className="form-label">D.N.I.</label>
                  <input
                    type="text"
                    name="dni"
                    id="dni"
                    className="form-control"
                    placeholder="introduce tu dni"
                    onChange={(evento) => {
                      actualizarDatoFormulario(evento);
                    }}
                  />
                </article>
                <article className="mb-3">
                  <label htmlFor="imagen" className="form-label">Imagen</label>
                  <input
                    type="text"
                    name="imagen"
                    id="imagen"
                    className="form-control"
                    placeholder="introduce nombre imagen avatar"
                    onChange={(evento) => {
                      actualizarDatoFormulario(evento);
                    }}
                  />
                </article>
                <article className="d-flex justify-content-end">
                  <Button variant="outline-secondary" size="sm" 
                    onClick={(evento) => {
                      handleClose();
                      inicializarErroresFormuSesion();
                    }}
                  >Cerrar
                  </Button>
                  <Button variant="outline-success" size="sm" className="ms-2"
                    onClick={(evento) => {
                      evento.preventDefault();
                      handleClose;
                      if (validarFormulario(evento)) {
                        handleClose();
                          crearCuenta();
                      }
                    }}
                  >
                    Crear cuenta
                  </Button>
                </article>
                </Form>
                {/* Listar posibles errores del formulario. */}
                {erroresFormuSesion.length !== 0 && (
                    <article className="no-encontrado">
                    {erroresFormuSesion.map((valor, indice, array) => {
                        return(
                        <React.Fragment key={indice}>
                            {valor} <br />
                        </React.Fragment>
                        );
                    })}
                    </article>
                )}
                <p className="mt-3">
                  ¿ Ya estas registrado ? Inicia sesion
                </p>
              </Modal.Body>
            </Modal>
            </article>
          )}
        </React.Fragment>

    );
}

export default ControlSesion;