import React from "react";
import { useNavigate } from "react-router-dom";
import useContextoUsuarios from "../hooks/useContextoUsuarios.js";

import AvisoSesionNecesaria from "./AvisarSesionNecesaria.jsx";

const ProtegerNavegacion = ({ children }) => {

    // Desectructuración del contexto.
    const { sesionIniciada } = useContextoUsuarios();
    // Hook para trabajar con las rutas de router-dom de React.
    const navegar = useNavigate();
    // Si no hay sesion iniciada, no permitimos que acceda al contenido.
    if (!sesionIniciada) {
        navegar("/");
        return <AvisoSesionNecesaria />;
    }

    return children;
}

export default ProtegerNavegacion;