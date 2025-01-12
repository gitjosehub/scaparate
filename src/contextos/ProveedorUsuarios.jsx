import React, { useState, useEffect, createContext } from "react";
import { supabaseConexion } from "../config/supabase.js";
import { useNavigate } from "react-router-dom";
import { use } from "react";

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
        codUsuario: "",
        nick: "",
        nombre: "",
        dni: "",
        imagen: "",
    };
    const valorInicialRegistrado = {
        codUsuario: "",
        nick: "",
        nombre: "",
        dni: "",
        imagen: "",
    };

    // Creación de estados.
    const [sesionIniciada, setSesionIniciada] = useState(valorInicialFalse);
    const [datosSesion, setDatosSesion] = useState(valorInicialSesion);
    const [usuario, setUsuario] = useState(valorInicialUsuario);
    const [registrados, setRegistrados] = useState(valorInicialArray);
    const [errorUsuario, setErrorUsuario] = useState(valorInicialCadena);
    const [errores, setErrores] = useState(valorInicialCadena);
    const [erroresFormuSesion, setErroresFormuSesion] = useState(valorInicialArray);
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
            // Cambiamos estado usuario con datos del objeto data.user y le 
            // añadimos el nick y la imagen para completar información del usuario.
            const usuarioInicial = data.user;
            const usuarioCompleto = {
                ...usuarioInicial,
                nick: datosSesion.nick,
                imagen: datosSesion.imagen,
            }
            // Actualizamos estado usuario.
            setUsuario(usuarioCompleto);
            // Controlamos el posible error del método signUp.
            if (!error) {
                // Cambiamos el estado de sesionIniciada (porque no hay mail de confirmación de cuenta).
                setSesionIniciada(true);
                // Realizamos insert en tabla usuario (para completar datos del usuario).
                const { error: errorUsuario } = await supabaseConexion
                .from('usuario')
                .insert({
                    codUsuario: data.user.id, 
                    nick: datosSesion.nick,
                    nombre: datosSesion.nombre,
                    dni: datosSesion.dni,
                    imagen: datosSesion.imagen,
                });
                if (errorUsuario) {
                    setErrorUsuario(errorUsuario);
                } else {
                    console.log('no ...');
                }
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
            const { data: userData, error } = await supabaseConexion.auth.signInWithPassword({
                email: datosSesion.email,
                password: datosSesion.password,
                options: {
                        emailRedirectTo: 'http://localhost:5173/',
                        },
            });
            // Comprobar el objeto que nos devuelve la consulta.
            // Comprobamos posible error en la consulta con el método signInWithPassword.
            if (error) {
                setErrorUsuario(error.message);
            } else {
                // Obtenemos los datos del usuario para nuestro estado,
                // añadiendo información de la tabla usuario.
                console.log(userData.user);
                const usuarioInicial = userData.user;
                const idUsuario = usuarioInicial.id;
                // Consulta a la tabla usuario para obtener información adicional.
                const { data: usuarioData, error2 } = await supabaseConexion
                .from("usuario")
                .select("*")
                .eq("codUsuario", idUsuario);
                // Controlamos posible error en la consulta.
                if (error2) {
                    setErrorUsuario(error2.message);
                } else {
                    // Guardamos toda la información completa del usuario.
                    const usuarioCompleto = {
                        ...usuarioInicial,
                        nick: usuarioData[0].nick,
                        imagen: usuarioData[0].imagen,
                    }
                    // Actualizamos estado usuario.
                    setUsuario(usuarioCompleto);
                }
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

    // Función asíncrona para conseguir listado usuarios o registrados desde Supabase.
    const obtenerListadoRegistrados = async () => {
        try {
        setCargando(true);
        // Consulta a la base de datos de supabase.
        const { data, error } = await supabaseConexion
            .from("usuario")
            .select(`*`);

        // Controlamos si ha habido error o no.
        if (error) {
          setErrores(error); 
        } else {
          // Actualizamos el estado registrados.
          setRegistrados(data);
        }
        
        } catch (errorConexion) {
          setErrores(errorConexion);
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

    // Función para inicializar el estado erroresFormuSesion fuera del contexto.
    const inicializarErroresFormuSesion = () => {
        setErroresFormuSesion(valorInicialArray);
    };

    // Función para validar elemento input de formulario rutas.
    // Recibe por parámetro un elemento del formulario.
    // Retorna un array con los errores del elemento si los ha habido.
    const validarInputFormulario = (elemento) => {
        // Desestructuración del elemento.
        const { name, value } = elemento;
        // Array para guardar los errores del elemento del formulario.
        let listaErroresElemento = [];
        // Comprobación para correo electrónico.
        if (name === "email") {
          if (!value.includes('@') || !value.includes('.') || value.length < 10) {
            listaErroresElemento = [
              ...listaErroresElemento,
              "El correo electrónico no es correcto.",
            ];
          }
        }
        // Comprobación para contraseñas.
        if (name === "password" || name === "repitePassword") {
          if (value.length < 6) {
            listaErroresElemento = [
              ...listaErroresElemento,
              "La contraseña no es adecuada.",
            ];
          }
        }
        // Comprobación para el nombre.
        if (name === "nombre") {
            // Expresión regular para validar que el nombre solo contenga letras y espacios
            const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
          
            // Comprobar que el nombre tiene al menos 2 caracteres y solo contiene letras y espacios
            if (value.length < 2 || value.length > 50) {
              listaErroresElemento = [
                ...listaErroresElemento,
                "El nombre debe tener entre 2 y 50 caracteres.",
              ];
            } else if (!regexNombre.test(value)) {
              listaErroresElemento = [
                ...listaErroresElemento,
                "El nombre solo debe contener letras y espacios.",
              ];
            }
        }
        // Comprobación para el nick.
        if (name === "nick") {
            // Expresión regular para validar que el nick solo contenga letras, números, guiones y puntos
            const regexNick = /^[A-Za-z0-9_-]{2,10}$/;
          
            // Comprobar que el nick tiene entre 2 y 10 caracteres
            if (value.length < 2 || value.length > 10) {
              listaErroresElemento = [
                ...listaErroresElemento,
                "El nick debe tener entre 2 y 10 caracteres.",
              ];
            } else if (!regexNick.test(value)) {
              listaErroresElemento = [
                ...listaErroresElemento,
                "El nick solo puede contener letras, números, guiones y puntos.",
              ];
            }
        }
        // Comprobación para dni.
        if (name === "dni") {
            const regexDni = /^[0-9]{8}[A-Za-z]$/; // Expresión regular para validar el formato de DNI español
            if (!regexDni.test(value)) {
              listaErroresElemento = [
                ...listaErroresElemento,
                "El DNI no es válido. Debe contener 8 dígitos seguidos de una letra.",
              ];
            }
          }
        // Retorna el listado con los posibles errores del elemento.
        return listaErroresElemento;
      };

    // Función para validar el formulario de login.
    // Recibe por parámetro el evento que la ha llamado con el que
    // accederemos al formulario en cuestión.
    // Retorna un valor booleano dependiendo de si ha habido errores.
    const validarFormulario = (evento) => {
        // Accedemos al elemento form.
        const formulario = evento.target.parentNode.parentNode;
        // Creamos un array para los posibles errores del formulario.
        let listaErrores = [];
        // Recorremos el formulario comprobando cada elemento del mismo.
        for (let i = 0; i < formulario.elements.length - 2; i++) {
          let elementoErrores = validarInputFormulario(formulario.elements[i]);
          // Añadimos al listado general los posibles errores de cada elemento.
          listaErrores = [...listaErrores, ...elementoErrores];
        }
        // Comprobar que contraseña y repite coinciden.
        if (formulario.name ==="crearCuenta") {
            if (formulario.elements['password'].value !== formulario.elements['repitePassword'].value) {
                listaErrores = [...listaErrores, "La contraseñas no coinciden."];
            }
        }
        // Modificamos el estado que se encarga de los errores.
        setErroresFormuSesion(listaErrores);
        // Retorna true o false según haya habido errores o no.
        return listaErrores.length === 0;
      };



    // Tareas a realizar solamente en la carga del componente.
    useEffect(() => {
        /* Creamos un monitor (listener) hacia la sesión de los servidores en supabase 
                para poder comprobar si está activa la sesión del usuario. Este monitor
                permanece a la escucha de los cambios que se produzcan en la sesión. */
        /* Se trata de una función callback que recibe un objeto con la sesión activa
                y una cadena de texto con el evento que se ha producido. */
        console.log('cargando ProveedorUsuarios');
        const monitorSuscripcion = supabaseConexion.auth.onAuthStateChange(
            (event, session) => {
                // Dependiendo de si hay o no sesión redirigimos al usuario a una parte u otra
                // de la aplicación y modificamos el estado sesionIniciada.
                if (session) {
                    // Cambiamos el estado de sesionIniciada.
                    console.log('iniciando sesion');
                    setSesionIniciada(true);
                    obtenerListadoRegistrados();
                } else {
                    // Utilizamos el hook navegar para dirigirlo hacia login.
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
        sesionIniciada,
        // datosSesion,
        crearCuenta,
        iniciarSesion,
        cerrarSesion,
        obtenerListadoRegistrados,
        registrados,
        actualizarDatoFormulario,
        validarFormulario,
        erroresFormuSesion,
        inicializarErroresFormuSesion,
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