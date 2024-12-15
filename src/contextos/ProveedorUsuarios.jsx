import React, { useState, useEffect, createContext } from "react";
import { supabaseConexion } from "../config/supabase.js";
import { useNavigate } from "react-router-dom";

const ContextoUsuarios = createContext();

const ProveedorUsuarios = ({ children }) => {

    // Hook para trabajar con las rutas de router-dom de React.
    const navegar = useNavigate();

    // Valores iniciales para los estados.
    const valorInicialArray = [];
    const valorInicialCadena = "";
    const valorInicialTrue = true;
    const valorInicialFalse = false;
    const valorInicialUsuario = {};
    const valorInicialSesion = {
        email: "",
        password: "",
    };

    // Creación de estados.
    const [sesionIniciada, setSesionIniciada] = useState(valorInicialFalse);
    const [datosSesion, setDatosSesion] = useState(valorInicialSesion);
    const [usuario, setUsuario] = useState(valorInicialUsuario);
    const [errorUsuario, setErrorUsuario] = useState(valorInicialCadena);
    const [errores, setErrores] = useState(valorInicialCadena);
    const [erroresFormularioIniciar, setErroresFormularioIniciar] = useState(valorInicialArray);
    const [erroresFormularioCrear, setErroresFormularioCrear] = useState(valorInicialArray);
    const [cargando, setCargando] = useState(valorInicialFalse);









    // Tareas a realizar solamente en la carga del componente.
    useEffect(() => {
        /* Creamos un monitor (listener) hacia la sesión de los servidores en supabase 
                para poder comprobar si está activa la sesión del usuario. Este monitor
                permanece a la escucha de los cambios que se produzcan en la sesión. */
        /* Se trata de una función callback que recibe un objeto con la sesión activa
                y una cadena de texto con el evento que se ha producido. */

        const monitorSuscripcion = supabaseConexion.auth.onAuthStateChange(
            (event, session) => {
                // Dependiendo de si hay o no sesión redirigimos al usuario a una parte u otra
                // de la aplicación y modificamos el estado sesionIniciada.
                if (session) {
                    // Con el hook navegar lo redirigimos hacia la parte privada.
                    navegar("/");
                    // Cambiamos el estado de sesionIniciada.
                    setSesionIniciada(true);
                } else {
                    // Utilizamos el hook navegar para dirigirlo hacia login.
                    // navegar("login");
                    navegar("/");
                    // No hay sesión, por tanto modificamos el estado de sesionIniciada.
                    setSesionIniciada(false);
                    setUsuario(valorInicialUsuario);
                    setDatosSesion(valorInicialSesion);
                };
            }
        );
    }, []);

    // Objeto con los estados y funciones para exportar del contexto.
    const datosAExportar = {
        // sesionIniciada,
        // // datosSesion,
        // crearCuenta,
        // iniciarSesion,
        // cerrarSesion,
        // actualizarDatoFormulario,
        // validarFormulario,
        // erroresFormularioIniciar,
        // erroresFormularioCrear,
        // usuario,
    };
    return (
        <ContextoUsuarios.Provider value={datosAExportar}>
        {children}
        </ContextoUsuarios.Provider>
    );
};

// Ademas de exportar el componente como hacemos siempre, tambien hay
// que exportar el propio contexto.
export { ContextoUsuarios };
export default ProveedorUsuarios;