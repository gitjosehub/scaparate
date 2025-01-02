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

    // Función asíncrona para crear una cuenta de usuario (método signUp de auth).
    const crearCuenta = async () => {
        // Inicializar valores de estados antes de crear la nueva cuenta.
        setUsuario(valorInicialUsuario);
        setDatosSesion(valorInicialSesion);
        // Controlar consulta a supabase con try / catch.
        try {
            setCargando(true);
            const { data, error } = await supabaseConexion.auth.signUp({
                email: datosSesion.email,
                password: datosSesion.password,
                options: {
                emailRedirectTo: "http://localhost:5173/",
                },
            });
            // Cambiamos estado usuario con datos del objeto data.user.
            setUsuario(data.user);
            // Controlamos el posible error del método signUp.
            if (!error) {
                // Cambiamos el estado de sesionIniciada (porque no hay mail de confirmación de cuenta).
                setSesionIniciada(true);
            } else {
                setErrorUsuario(error);
            }
        } catch (error) {
            setErrorUsuario(error.message);
        } finally {
            setCargando(false);
        }
    };

    // Función asíncrona para que el usuario inicie sesión.
    const iniciarSesion = async () => {
        // Inicializar valores de estados antes de iniciar la nueva sesión.
        setUsuario(valorInicialUsuario);
        setDatosSesion(valorInicialSesion);
        // Controlar consulta a supabase con try / catch.
        // Utilizando método signInWithPassword de auth para iniciar sesión.
        try {
            setCargando(true);
            const { data, error } = await supabaseConexion.auth.signInWithPassword({
                email: datosSesion.email,
                password: datosSesion.password,
                options: {
                        emailRedirectTo: 'http://localhost:5173/',
                        },
            });
            // Comprobar el objeto que nos devuelve la consulta.
            // console.log(data);
            // Comprobamos posible error en la consulta con el método signInWithPassword.
            if (error) {
                setErrorUsuario(error.message);
            } else {
                // Obtenemos los datos del usuario para nuestro estado.
                setUsuario(data.user);
            }
        } catch (error) {
            setErrorUsuario(error.message);
        } finally {
            setCargando(false);
        }
    };

    // Función asíncrona para cerrar la sesión.
    const cerrarSesion = async () => {
        try {
            await supabaseConexion.auth.signOut();
            // Redirigimos a la ruta de la parte pública.
            // navegar("login");
            // Modificamos el estado sesionIniciada.
            setSesionIniciada(false);
            setUsuario(valorInicialUsuario);
            setDatosSesion(valorInicialSesion);
        } catch (error) {
            setErrorUsuario(error.message);
        } finally {
            setCargando(false);
        }
    };

    // Función para actualizar los datos del campo de formulario de login.
    const actualizarDatoFormulario = (evento) => {
        const { name, value } = evento.target;
        // Se asignan al estado, que es un objeto clave-valor.
        setDatosSesion({ ...datosSesion, [name]: value });
    };



    // ******** FALTAN FUNCIONES PARA VALIDAR FORMULARIO DE LOGIN. *********



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
    // console.log(`sesionIniciada ${sesionIniciada}`);
    // Objeto con los estados y funciones para exportar del contexto.
    const datosAExportar = {
        sesionIniciada,
        // datosSesion,
        crearCuenta,
        iniciarSesion,
        cerrarSesion,
        actualizarDatoFormulario,
        // validarFormulario,
        // erroresFormularioIniciar,
        // erroresFormularioCrear,
        // setSesionIniciada,
        usuario,
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