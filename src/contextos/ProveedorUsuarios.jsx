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
            // setUsuario(data.user);
            console.log('en crearCuenta AHORA QUE TENGO EN USUARIO:');
            // console.log('data.user');
            console.log(usuarioCompleto);
            // Controlamos el posible error del método signUp.
            if (!error) {
                // Cambiamos el estado de sesionIniciada (porque no hay mail de confirmación de cuenta).
                setSesionIniciada(true);
                // Realizamos insert en tabla usuario (para completar datos del usuario).
                // console.log(datosSesion);
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
                    console.log('sale por error de insert');
                    setErrorUsuario(errorUsuario);
                } else {
                    console.log('debes de ver a ...');
                    console.log(data.user.id);
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
        console.log('entrando en iniciarSesion');
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
            // console.log(data);
            // Comprobamos posible error en la consulta con el método signInWithPassword.
            if (error) {
                setErrorUsuario(error.message);
            } else {
                // Obtenemos los datos del usuario para nuestro estado,
                // añadiendo información de la tabla usuario.
                // setUsuario(userData.user);
                console.log('a por la segunda consulta ...');
                const usuarioInicial = userData.user;
                const idUsuario = usuarioInicial.id;
                console.log(`idUsuario es: ${idUsuario}`);
                
                // console.log('esto es data.user');
                // console.log(data.user);
                //           setUsuario(usuarioCompleto);
                // Consulta a la tabla usuario para obtener información adicional.
                const { data: usuarioData, error2 } = await supabaseConexion
                .from("usuario")
                .select("*")
                .eq("codUsuario", idUsuario);
                console.log('realizando segunda consulta');
                // Controlamos posible error en la consulta.
                if (error2) {
                    setErrorUsuario(error2.message);
                    console.log('errando en segunda consulta');
                } else {
                    console.log('no hay error en segunda consulta');
                    console.log(usuarioData);
                    console.log(usuarioData[0].nick);
                    console.log(usuarioData[0].imagen);
                    // Guardamos toda la información completa del usuario.
                    const usuarioCompleto = {
                        ...usuarioInicial,
                        nick: usuarioData[0].nick,
                        imagen: usuarioData[0].imagen,
                    }
                    // Actualizamos estado usuario.
                    setUsuario(usuarioCompleto);
                    console.log('AHORA QUE TENGO EN USUARIO:');
                    console.log(usuarioCompleto);
                    // console.log(usuario);
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

    // Función asíncrona para conseguir listado usuarios o registrados desde Supabase.
    const obtenerListadoRegistrados = async () => {
        console.log('entrando en obtListReg: usuario.id y despues parametro id');
        // console.log(usuario.id);
        // console.log(id);
        try {
        setCargando(true);
        // Consulta a la base de datos de supabase.
        const { data, error } = await supabaseConexion
            .from("usuario")
            .select(`*`);

//         const { data, error } = await supabaseConexion
//   .from('usuario')
//   .select('*')
//   .order('codUsuario');

// const { data, error } = await supabaseConexion
// .from('usuario')
// .select(`
//   *,
//   seguidor (
//     codUsuP,
//     codUsuS,
//     estado
//   )
// `)
// .leftJoin('seguidor', 'seguidor.codUsuP = usuario.codUsuario')
// .order('usuario.codUsuario');

            // Nueva consulta
//             const { data, error } = await supabaseConexion
//   .from('usuario')
//   .select(`
//     *,
//     seguidor (
//       codUsuP,
//       codUsuS,
//       estado
//     )
//   `)
//   .leftJoin('seguidor', `
//     seguidor.codUsuP = usuario.codUsuario AND seguidor.codUsuS = ${id} 
//     OR seguidor.codUsuS = usuario.codUsuario AND seguidor.codUsuP = ${id}
//   `)
//   .order('usuario.codUsuario');
        // console.log('el data de la consulta es:');
        // console.log(data);
        // Controlamos si ha habido error o no.
        if (error) {
          setErrores(error); 
          console.log('error en obtListReg');
        } else {
          // Actualizamos el estado registrados.
          setRegistrados(data);
        //   console.log('obtenerListadoRegistrados:');
        //   console.log(data);
        }
        // error ? setErrores(error) : setRutas(data);
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
                    // navegar("/");
                    // Cambiamos el estado de sesionIniciada.
                    setSesionIniciada(true);
                    // DEBERIA DE TENER YA REGISTRADOS, EL ESTADO ????
                    obtenerListadoRegistrados();
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
        obtenerListadoRegistrados,
        registrados,
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