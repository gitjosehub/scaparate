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
      localidad: "",
      provincia: "",
      imagenesruta: [],
    };
    // const valorInicialProvincia = {
    //   codProvincia: "",
    //   nombreProvincia: "",
    // };
    // const valorInicialLocalidad = {
    //   codLocalidad: "",
    //   nombreLocalidad: "",
    // };
    // Creación de estados.
    const [ruta, setRuta] = useState(valorInicialRuta);
    const [rutas, setRutas] = useState(valorInicialArray);
    const [eliminandoRuta, setEliminandoRuta] = useState(valorInicialBooleanoFalse);
    const [mostrandoRuta, setMostrandoRuta] = useState(valorInicialBooleanoFalse);
    const [erroresFormulario, setErroresFormulario] = useState(valorInicialArray);
    const [errores, setErrores] = useState(valorInicialCadena);
    const [cargando, setCargando] = useState(valorInicialBooleanoTrue);
    const [provincias, setProvincias] = useState(valorInicialArray);
    const [localidades, setLocalidades] = useState(valorInicialArray);

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

        // Funciona sin imagenes de rutas.
        // const { data, error } = await supabaseConexion
        //     .from("ruta")
        //     .select(`
        //       *,
        //       localidad (codLocalidad, codProvL, nombreLocalidad, 
        //       provincia (codProvincia, nombreProvincia))
        //       `);
        const { data, error } = await supabaseConexion
            .from("ruta")
            .select(`
              *,
              localidad (codLocalidad, codProvL, nombreLocalidad, 
              provincia (codProvincia, nombreProvincia)),
              imagenruta (imagenRuta)
              `);
        console.log(data);
        // Controlamos si ha habido error o no.
        if (error) {
          setErrores(error); 
        } else {
          // Antes de pasarlo al estado, simplificamos y nos quedamos con 
          // la info que nos interesa, aplanando la estructura del objeto.
          const simplificaRutas = data.map(elemento => ({
            codRuta: elemento.codRuta,
            fechaCreacion: elemento.fechaCreacion,
            titulo: elemento.titulo,
            tipoRuta: elemento.tipoRuta,
            descripcion: elemento.descripcion,
            dificultad: elemento.dificultad,
            desnivel: elemento.desnivel,
            codUsuR: elemento.codUsuR,
            codLocalR: elemento.codLocalR,
            codProvR: elemento.codProvR,
            localidad: elemento.localidad.nombreLocalidad,
            provincia: elemento.localidad.provincia.nombreProvincia,
          }));
          setRutas(simplificaRutas);
        }
        // error ? setErrores(error) : setRutas(data);
        } catch (errorConexion) {
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
            // Anterior sin provincia, localidad e imagenes.
            // const { data, error } = await supabaseConexion
            //     .from("ruta")
            //     .select("*")
            //     .eq("codRuta", id);
            // Controlamos si hay error en la consulta.
            const { data, error } = await supabaseConexion
                  .from("ruta")
                  .select(`
                    *,
                    localidad (codLocalidad, codProvL, nombreLocalidad, 
                      provincia (codProvincia, nombreProvincia)
                    ),
                    imagenruta (imagenRuta)
                  `)
                  .eq("codRuta", id);
            error ? setErrores(error) : setRuta(data[0]);
            console.log(data[0]);
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

    // Función asíncrona para conseguir las provincias de la base de datos.
    const obtenerProvincias = async () => {
      try {
      setCargando(true);
      const { data, error } = await supabaseConexion
          .from("provincia")
          .select("*")
          .order("nombreProvincia", { ascending: true });
      console.log(data);
      // Controlamos si ha habido error o no.
      error ? setErrores(error) : setProvincias(data);
      } catch (errorConexion) {
        setErrores(errorConexion);
      } finally {
        setCargando(false);
      }
    };

    // Función asíncrona para conseguir las provincias de la base de datos.
    const obtenerLocalidades = async () => {
      try {
      setCargando(true);
      const { data, error } = await supabaseConexion
          .from("localidad")
          .select("*")
          .order("nombreLocalidad", { ascending: true });
      console.log(data);
      // Controlamos si ha habido error o no.
      error ? setErrores(error) : setLocalidades(data);
      } catch (errorConexion) {
        setErrores(errorConexion);
      } finally {
        setCargando(false);
      }
    };

    // Función para actualizar los datos del campo de formulario de rutas.
    const actualizarDatoFormulario = (evento) => {
        const { name, value } = evento.target;
        // Buscar en estado provincias para actualizar el nombre en el estado
        // ruta porque solo ha actualizado el codigo, no el nombre de la provincia.
        // if (name === "codProvR") {
        //   console.log("entro en el if");
        //   const provinciaSeleccionada = provincias.find(
        //     (provincia) => provincia.codProvincia === value
        //   );
        //   console.log(`provinciaSeleccionada es: `, provinciaSeleccionada);
        //   // setRuta({...ruta, provincia: provinciaSeleccionada ? provinciaSeleccionada.nombreProvincia : ""});
        //   setRuta({ ...ruta, ["provincia"]: provinciaSeleccionada.nombreProvincia});
        //   // console.log(`provincia es`);
        //   // console.log(provinciaSeleccionada);
        // }
        

        // // Se asignan al estado, que es un objeto clave-valor.
        // setRuta({ ...ruta, [name]: value });
        // console.log(`actualizando ruta ...`);
        // console.log(ruta);
        // console.log(provincias);

        // No hay forma de que actualize los dos a la vez si no es asi.
        // Con los select del formulario (provincia y localidad).
        setRuta((prevRuta) => {
          let nuevaProvincia = prevRuta.provincia;
          let nuevaLocalidad = prevRuta.localidad;
          if (name === "codProvR") {
              const provinciaSeleccionada = provincias.find(
                  (provincia) => provincia.codProvincia === value
              );
              console.log(`provinciaSeleccionada es: `, provinciaSeleccionada);
              nuevaProvincia = provinciaSeleccionada ? provinciaSeleccionada.nombreProvincia : "";
          }
          if (name === "codLocalR") {
            const localidadSeleccionada = localidades.find(
                (localidad) => localidad.codLocalidad === value
            );
            console.log(`localidadSeleccionada es: `, localidadSeleccionada);
            nuevaLocalidad = localidadSeleccionada ? localidadSeleccionada.nombreLocalidad : "";
          }
          // Actualiza el estado ruta.
          return { 
              ...prevRuta, 
              [name]: value, 
              provincia: nuevaProvincia,
              localidad: nuevaLocalidad,
          };
      });
  
      console.log(`actualizando ruta ...`);
      console.log(ruta);
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
        obtenerProvincias();
        obtenerLocalidades();
        // obtenerRuta('42f3097c-cbc5-44c4-9362-c951ded41b95');
    }, []);

    // Objeto con la información a exportar del contexto.
    const datosAExportar = {
        obtenerProvincias, // igual no porque lo hace en el useEffect ???
        obtenerLocalidades,
        obtenerListadoRutas,
        obtenerRuta,
        ruta,
        rutas,
        provincias,
        localidades,
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