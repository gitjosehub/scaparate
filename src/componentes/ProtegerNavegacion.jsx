import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useContextoUsuarios from "../hooks/useContextoUsuarios.js";
import AvisoSesionNecesaria from "./AvisarSesionNecesaria.jsx";

const ProtegerNavegacion = ({ children }) => {
    const { sesionIniciada } = useContextoUsuarios();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Si no hay sesión, permanecer en la misma ruta y no permitir navegación.
        if (!sesionIniciada && location.pathname !== "/") {
            // Evitamos cambiar la URL y mantenemos la página en el Home
            navigate("/", { replace: true });
        }
    }, [sesionIniciada, location, navigate]);

    // Si no está logueado, mostramos el aviso
    if (!sesionIniciada) {
        return <AvisoSesionNecesaria />;
    }

    // Si está logueado, mostramos el contenido protegido
    return children;
};

export default ProtegerNavegacion;
