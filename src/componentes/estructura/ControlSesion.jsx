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
          { sesionIniciada ? (
              <Button variant="outline-success" size="sm"
                onClick={(evento) => {
                  evento.preventDefault();
                  setShow(true);
                  cerrarSesion();
                }}
              >
              Cerrar sesion
              </Button>
            ) : (
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
        <Modal.Header>
          <Modal.Title id="example-custom-modal-styling-title">
            Iniciar sesion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form name="iniciarSesion">
          <article className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
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

          <article className="d-flex justify-content-end">
            <Button variant="outline-secondary" size="sm" 
              onClick={(evento) => {
                handleClose();
                inicializarErroresFormuSesion();
              }}
            >Cerrar
            </Button>
            <Button 
              variant="outline-success" 
              size="sm"
              className="ms-2"
              onClick={(evento) => {
                evento.preventDefault();
                
                if (validarFormulario(evento)) {
                  handleClose();
                  iniciarSesion();
                }
              }}
            >
              Iniciar sesión
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
            ¿ Todavia no estas registrado ? Crea una cuenta
          </p>
          
        </Modal.Body>
      </Modal>
      )}
        </React.Fragment>

    );
}

export default ControlSesion;