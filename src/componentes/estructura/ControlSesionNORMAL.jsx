import React from "react";
// import useContextoUsuarios from "../../hooks/useContextoUsuarios.js";
import useContextoUsuarios from "../../hooks/useContextoUsuarios.js";
import { useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';

const ControlSesion = () => {

    // Desectructuración del contexto para tener los estados y funciones
    // necesarias a través del hook.
    const { sesionIniciada, cerrarSesion } = useContextoUsuarios();
    // Hook para trabajar con las rutas de router-dom de React.
    const navegar = useNavigate();

    return (
        <React.Fragment>
          { sesionIniciada ? (
            <Button variant="outline-success" type="submit">Cierra sesion</Button>
            ) : (
            <Button variant="outline-success" type="submit">Crea o inicia cuenta</Button>
          )}
          
          
        </React.Fragment>

    );
}

export default ControlSesion;