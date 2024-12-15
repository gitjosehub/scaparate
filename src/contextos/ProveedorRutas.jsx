// Importamos los elementos necesarios para trabajar con estados y contextos.
import React, { useState, useEffect, createContext } from "react";

// Importamos el objeto que nos proporciona conexión a los servicios de supabase.
import { supabaseConexion } from "../config/supabase.js";

// Creamos el contexto fuera de la función y por tanto con ámbito global.
const ContextoRutas = createContext();

const ProveedorRutas = ({ children }) => {

    // Valores iniciales para los estados del contexto.
    const valorInicialArray = [];
    const valorInicialCadena = "";
    const valorInicialBooleanoTrue = true;
    const valorInicialBooleanoFalse = false;
    // Antes sin tener nombre de localidad y provincia.
    // const valorInicialRuta = {
    //     codRuta: "",
    //     fechaCreacion: "",
    //     titulo: "",
    //     descripcion: "",
    //     dificultad: "",
    //     codUsuR: "",
    //     codLocalR: "",
    //     codProvR: "",
    // };
    const valorInicialRuta = {
      codRuta: "",
      fechaCreacion: "",
      titulo: "",
      descripcion: "",
      dificultad: "",
      codUsuR: "",
      codLocalR: "",
      codProvR: "",
      localidad: {
        nombreLocalidad: "", 
      },
      provincia: {
        nombreProvincia: "", 
      },
    };
    // Creación de estados.
    const [ruta, setRuta] = useState(valorInicialRuta);
    const [rutas, setRutas] = useState(valorInicialArray);
    const [eliminandoRuta, setEliminandoRuta] = useState(valorInicialBooleanoFalse);
    const [mostrandoRuta, setMostrandoRuta] = useState(valorInicialBooleanoFalse);
    const [erroresFormulario, setErroresFormulario] = useState(valorInicialArray);
    const [errores, setErrores] = useState(valorInicialCadena);
    const [cargando, setCargando] = useState(valorInicialBooleanoTrue);

    // Función asíncrona para conseguir las rutas desde Supabase.
    const obtenerListadoRutas = async () => {
        try {
        setCargando(true);
        // Consulta a la base de datos de supabase.
        // const { data, error } = await supabaseConexion
        //     .from("ruta")
        //     .select("*");
        // console.log(data);
        // NUEVA CONSULTA A LA BASE DE DATOS.
        // const { data, error } = await supabaseConexion
        //     .from("ruta")
        //     .select(`
        //       *,
        //       localidad (codLocalidad, codProvL, nombreLocalidad),
        //       provincia (codProvincia, nombreProvincia)`);

        const { data, error } = await supabaseConexion
            .from("ruta")
            .select(`
              *,
              localidad (codLocalidad, codProvL, nombreLocalidad, 
              provincia (codProvincia, nombreProvincia))
              `);
        // Controlamos si ha habido error o no.
        error ? setErrores(error) : setRutas(data);
        } catch (errorConexion) {
          console.log(errorConexion);
            setErrores(errorConexion);
        } finally {
            setCargando(false);
        }
    };

    // Función asíncrona para conseguir una determinada ruta de Supabase.
    const obtenerRuta = async (id) => {
        // Inicializar el estado error.
        setErrores(valorInicialCadena);
        try {
            setCargando(true);
            const { data, error } = await supabaseConexion
                .from("ruta")
                .select("*")
                .eq("codRuta", id);
            // Controlamos si hay error en la consulta.
            error ? setErrores(error) : setRuta(data[0]);
        } catch (errorConexion) {
            setErrores(errorConexion);
        } finally {
            setCargando(false);
        }
    };

    // Función asíncrona para crear una nueva ruta en BDatos de Supabase.
    const crearRuta = async (usuario_id) => {
        try {
          setCargando(true);
          const { data, error } = await supabaseConexion
            .from("ruta")
            .insert([
              {
                titulo: ruta.titulo,
                descripcion: ruta.descripcion,
                localidad: ruta.localidad,
                dificultad: ruta.dificultad,
                codUsuR: usuario_id,
                codLocalR: ruta.codLocalR,
                codProvR: ruta.codProvR
              },
            ])
            .select();
          
          // Controlamos el posible error en la inserción del registro.
          if (!error) {
            // Inicializamos el estado ruta.
            setRuta(valorInicialRuta);
            // Actualizamos el estado rutas (array de objetos ruta), añadiendo la nueva ruta.
            setRutas([...rutas, ruta]);
          } else {
            setErrores(error);
          }
        } catch (errorConexion) {
            setErrores(errorConexion);
        } finally {
            setCargando(false);
            obtenerListadoRutas();
        }
    };

    // Función asíncrona para editar/actualizar una ruta en la BDatos de Supabase.
    const editarRuta = async () => {
        try {
          setCargando(true);
          const { data, error } = await supabaseConexion
            .from("ruta")
            .update(ruta)
            .eq("codRuta", ruta.codRuta);
          if (!error) {
            // Modificamos la ruta en el estado rutas.
            const rutasEditadas = rutas.map((rutaAnterior) => {
              return rutaAnterior.codRuta === ruta.codRuta
                ? ruta
                : rutaAnterior;
            });
            setRutas(rutasEditadas);
            setRuta(valorInicialRuta);
          } else {
            setErrores(error);
          }
        } catch (errorConexion) {
            setErrores(errorConexion);
        } finally {
            setCargando(false);
        }
    };

    // Función asíncrona para eliminar una ruta de la BDatos de Supabase.
    const eliminarRuta = async (id) => {
        try {
          setCargando(true);
          const { error } = await supabaseConexion
            .from("ruta")
            .delete()
            .eq("codRuta", id);
          // Controlamos si ha habido error en el delete.
          if (!error) {
            // Actualizar el estado rutas para quitar la eliminada, mediante
            // el método filter del estado rutas (array de objetos ruta).
            const rutasEditadas = rutas.filter((rutaAnterior) => {
              return rutaAnterior.codRuta !== id;
            });
            setRutas(rutasEditadas);
            setRuta(valorInicialRuta);
            setEliminandoRuta(false);
          } else {
            setErrores(error);
          }
        } catch (errorConexion) {
            setErrores(errorConexion);
        } finally {
            setCargando(false);
        }
    };

    // Función para actualizar los datos del campo de formulario de rutas.
    const actualizarDatoFormulario = (evento) => {
        const { name, value } = evento.target;
        // Se asignan al estado, que es un objeto clave-valor.
        setRuta({ ...ruta, [name]: value });
    };




    // **************** FALTAN FUNCIONES PARA VALIDAR FORMULARIOS *************




    // Función para inicializar el estado ruta fuera del contexto.
    const inicializarRuta = () => {
        setRuta(valorInicialRuta);
    };

    // Función para controlar el estado de confirmar eliminación ruta fuera del contexto.
    const confirmarEliminacion = (cambio) => {
      setEliminandoRuta(cambio);
    };

    // Función para controlar el estado de mostrar ruta fuera del contexto.
    const cerrarMostrando = (cambio) => {
      setMostrandoRuta(cambio);
    }

    // Función para inicializar el estado erroresFormulario fuera del contexto.
    const inicializarErroresFormulario = () => {
        setErroresFormulario(valorInicialArray);
    };

    // Funciones a realizar en la carga del componente.
    useEffect(() => {
        obtenerListadoRutas();
    }, []);

    // Objeto con la información a exportar del contexto.
    const datosAExportar = {
        obtenerListadoRutas,
        obtenerRuta,
        ruta,
        rutas,
        crearRuta,
        editarRuta,
        eliminarRuta,
        confirmarEliminacion,
        eliminandoRuta,
        inicializarRuta,
        mostrandoRuta,
        cerrarMostrando,
        actualizarDatoFormulario,
        // validarFormulario,
        inicializarErroresFormulario,
        erroresFormulario,
        cargando,
        errores,

    };

    return (
        <ContextoRutas.Provider value={datosAExportar}>
          {children}
        </ContextoRutas.Provider>
      );
};

// Ademas de exportar el componente como hacemos siempre, tambien hay
// que exportar el propio contexto.
export default ProveedorRutas;
export { ContextoRutas };