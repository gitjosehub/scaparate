// Importamos los elementos necesarios para trabajar con estados y contextos.
import React, { useState, useEffect, createContext } from "react";

// Importamos el objeto que nos proporciona conexión a los servicios de supabase.
import { supabaseConexion } from "../config/supabase.js";

// Importar función externa que simplifica estructura de estado rutas.
import { simplificarRutas } from "../bibliotecas/funciones.js";

// Creamos el contexto fuera de la función y por tanto con ámbito global.
const ContextoRutas = createContext();

const ProveedorRutas = ({ children }) => {

    // Valores iniciales para los estados del contexto.
    const valorInicialArray = [];
    const valorInicialCadena = "";
    const valorInicialBooleanoTrue = true;
    const valorInicialBooleanoFalse = false;
    
    const valorInicialRuta = {
      codRuta: "",
      fechaCreacion: "",
      titulo: "",
      descripcion: "",
      dificultad: "",
      desnivel: "",
      distancia: "",
      codUsuR: "",
      codLocalR: "",
      codProvR: "",
      localidad: "",
      provincia: "",
      imagen: "",
      // imagenesruta: "", // antes [] para varias imagenes.
    };
    const valorInicialComentario = {
      codUsuario: "",
      codRuta: "",
      codComenta: "",
      fecha: "",
      comentario: "",
      tipoComenta: "",
      nickUsuario: "",
      imgUsuario: "",
    };
    const valorInicialFiltroRuta = {
      titulo: "",
      distancia: "",
      dificultad: "",
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
    const [rutasInicio, setRutasInicio] = useState(valorInicialArray);
    const [comentariosRutas, setComentariosRutas] = useState(valorInicialArray);
    const [comentarioRuta, setComentarioRuta] = useState(valorInicialComentario);
    const [filtroRuta, setFiltroRuta] = useState(valorInicialFiltroRuta);
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
        const { data, error } = await supabaseConexion
            .from("ruta")
            .select(`
              *,
              localidad (codLocalidad, codProvL, nombreLocalidad, 
              provincia (codProvincia, nombreProvincia))
              `)
              .eq("activa", true);
        // console.log(data);
        // Controlamos si ha habido error o no.
        if (error) {
          setErrores(error); 
        } else {
          // Antes de pasarlo al estado, simplificamos y nos quedamos con 
          // la info que nos interesa, aplanando la estructura del objeto.
          // const simplificaRutas = data.map(elemento => ({
          //   codRuta: elemento.codRuta,
          //   fechaCreacion: elemento.fechaCreacion,
          //   titulo: elemento.titulo,
          //   descripcion: elemento.descripcion,
          //   dificultad: elemento.dificultad,
          //   distancia: elemento.distancia,
          //   desnivel: elemento.desnivel,
          //   imagen: elemento.imagen,
          //   codUsuR: elemento.codUsuR,
          //   codLocalR: elemento.codLocalR,
          //   codProvR: elemento.codProvR,
          //   localidad: elemento.localidad.nombreLocalidad,
          //   provincia: elemento.localidad.provincia.nombreProvincia,
          // }));
          // LLamada a la función externa para simplificar estructura.
          const simplificaRutas = simplificarRutas(data);
          setRutas(simplificaRutas);
          // console.log('obtenerListadoRutas ylistado de rutas:');
          // console.log(simplificaRutas);
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
            // Consulta sobre la base de datos.
            const { data, error } = await supabaseConexion
                  .from("ruta")
                  .select(`
                    *,
                    localidad (codLocalidad, codProvL, nombreLocalidad, 
                      provincia (codProvincia, nombreProvincia)
                    )
                  `)
                  .eq("codRuta", id);
            // error ? setErrores(error) : setRuta(data[0]);
            if (error) {
              setErrores(error)
            } else {
              // Simplificamos el objeto y lo pasamos al estado.
              const simplificaRuta = {
                codRuta: data[0].codRuta,
                fechaCreacion: data[0].fechaCreacion,
                titulo: data[0].titulo,
                descripcion: data[0].descripcion,
                dificultad: data[0].dificultad,
                distancia: data[0].distancia,
                desnivel: data[0].desnivel,
                imagen: data[0].imagen,
                codUsuR: data[0].codUsuR,
                codLocalR: data[0].codLocalR,
                codProvR: data[0].codProvR,
                localidad: data[0].localidad.nombreLocalidad,
                provincia: data[0].localidad.provincia.nombreProvincia,
              };
              setRuta(simplificaRuta);
            }
            // console.log('en obtenerRuta y ...');
            // console.log(data[0]);
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
          // Consulta a la base de datos.
          const { data, error } = await supabaseConexion
            .from("ruta")
            .insert([
              {
                titulo: ruta.titulo,
                descripcion: ruta.descripcion,
                // localidad: ruta.localidad,
                dificultad: ruta.dificultad,
                distancia: ruta.distancia,
                desnivel: ruta.desnivel,
                imagen: ruta.imagen,
                codUsuR: usuario_id,
                // codUsuR: "1e9a4f36-fcb5-4a34-a11d-73cea10d7569",
                codLocalR: ruta.codLocalR,
                codProvR: ruta.codProvR
              },
            ])
            .select();
          // Controlamos el posible error en la inserción del registro.
          if (!error) {
            console.log("no ha habido error.");
            // Inicializamos el estado ruta.
            setRuta(valorInicialRuta);
            // Actualizamos el estado rutas (array de objetos ruta), añadiendo la nueva ruta.
            setRutas([...rutas, ruta]);
            console.log('ruta añadida y ...');
            console.log(rutas);
          } else {
            console.log("pasa por error");
            setErrores(error);
            // setErrores(errori);
          }
        } catch (errorConexion) {
            setErrores(errorConexion);
        } finally {
            setCargando(false);
            obtenerListadoRutas();
        }
    };

    // Función asíncrona para editar/actualizar una ruta en la BDatos.
    const editarRuta = async () => {
      console.log('entrando en editarRuta.');
      console.log(ruta);
        try {
          setCargando(true);
          // Consulta a la base de datos para actualizar tabla ruta.
          const { data, error } = await supabaseConexion
            .from("ruta")
            .update([{
              titulo: ruta.titulo,
              descripcion: ruta.descripcion,
              dificultad: ruta.dificultad,
              distancia: ruta.distancia,
              desnivel: ruta.desnivel,
              // codUsuR: usuario_id,
              codUsuR: ruta.codUsuR,
              // codUsuR: "1e9a4f36-fcb5-4a34-a11d-73cea10d7569",
              codLocalR: ruta.codLocalR,
              codProvR: ruta.codProvR,
              imagen: ruta.imagen
            }])
            .eq("codRuta", ruta.codRuta);
          // Comprobamos si ha habido errores o no.
          if (!error) {
            // Modificamos la ruta en el estado rutas.
            const rutasEditadas = rutas.map((rutaAnterior) => {
              return rutaAnterior.codRuta === ruta.codRuta
                ? ruta
                : rutaAnterior;
            });
            setRutas(rutasEditadas);
            console.log(rutasEditadas);
            setRuta(valorInicialRuta);
          } else {
            setErrores(error);
            // setErrores(errori);
          }
          
        } catch (errorConexion) {
            setErrores(errorConexion);
        } finally {
            setCargando(false);
            console.log('saliendo de editarRuta');
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

    // Función asíncrona para conseguir las 4 rutas de Inicio o Home.
    const obtenerListadoRutasInicio = async () => {
      try {
      setCargando(true);
      // Consulta a la base de datos de supabase.
      const { data, error } = await supabaseConexion
          .from("ruta")
          .select(`
            *,
            localidad (codLocalidad, codProvL, nombreLocalidad, 
            provincia (codProvincia, nombreProvincia))
            `)
            .eq("activa", true)
            .order("fechaCreacion", { ascending: false })
            .limit(4);
      // console.log(data);
      // Controlamos si ha habido error o no.
      if (error) {
        setErrores(error); 
      } else {
        // LLamada a la función externa para simplificar estructura.
        const simplificaRutas = simplificarRutas(data);
        setRutasInicio(simplificaRutas);
        // console.log('rutas de inicio o home:');
        // console.log(simplificaRutas);
      }
      // error ? setErrores(error) : setRutas(data);
      } catch (errorConexion) {
        setErrores(errorConexion);
      } finally {
        setCargando(false);
      }
  };

    // Función asíncrona para conseguir los comentarios de las rutas desde Supabase.
    // CREO QUE NO NECESITO TENER LOS COMENTARIOS DE TODAS LAS RUTAS.
    // const obtenerListadoComentarios = async () => {
    //   try {
    //     setCargando(true);
    //     // Consulta a la base de datos de supabase.
      
    //     const { data, error } = await supabaseConexion
    //     .from("ruta")
    //     .select(`
    //       codRuta,
    //       conversaruta (
    //         codUsuCR,
    //         comentaruta (
    //           codComenta,
    //           comentario,
    //           tipoComenta,
    //           fecha
    //         )
    //       )
    //     `);

    //     // FORMA DE HACERLO CON RUTAS AHORA.
    //     // console.log('data o error:');
    //     // console.log(data, error);
    //     if (error) {
    //       setErrores(error); 
    //       console.log('tenemos error nene');
    //       console.log(error);
    //     } else {
    //       // Antes de pasarlo al estado, simplificamos y nos quedamos con 
    //       // la info que nos interesa, aplanando la estructura del objeto.
    //       console.log('ahora viene el mapeo para simplificar');
    //       // rutas.map((rutaAnterior) => {
    //       // const simplificaComentarios = data.map((elemento) => {
    //       //   return {codRuta: elemento.codRuta};
    //       //   });
    //       const simplificaComentarios = data.map(elemento => ({
    //         codRuta: elemento.codRuta,
    //         comentarios: (elemento.conversaruta || []).map(subelemento => ({
    //           codUsuCR: subelemento.codUsuCR,
    //           codComenta: subelemento.comentaruta.codComenta,
    //           comentario: subelemento.comentaruta.comentario,
    //           tipoComenta: subelemento.comentaruta.tipoComenta,
    //           fecha: subelemento.comentaruta.fecha
    //         }))
    //       }));
    //       setComentariosRutas(simplificaComentarios);
    //       console.log('tenemos simplificado:');
    //       console.log(simplificaComentarios);
    //     }
    //   } catch (errorConexion) {
    //     setErrores(errorConexion);
    //   } finally {
    //     setCargando(false);
    //   }
    // };

    // Función asíncrona para conseguir los comentarios de una ruta. 
    const obtenerListadoComentarios = async (id) => {
      // console.log('valor id en funcion de comentarios');
      // console.log(id);
      // let id = "42f3097c-cbc5-44c4-9362-c951ded41b95";
      try {
        setCargando(true);
        // Consulta a la base de datos de supabase.
        // const { data, error } = await supabaseConexion
        // .from("conversaruta")
        // .select(`
        //   codUsuCR,
        //   comentaruta (
        //     codComenta,
        //     comentario,
        //     tipoComenta,
        //     fecha
        //   )
        // `)
        // .eq('codRutaCR', id);

        const { data, error } = await supabaseConexion
        .from("conversaruta")
        .select(`
          codUsuCR,
          comentaruta (
            codComenta,
            comentario,
            tipoComenta,
            fecha
          ),
          usuario!inner (*)
        `)
        .eq('codRutaCR', id);

        // const { data, error } = await supabaseConexion
        // .from("ruta")
        // .select(`
        //   conversaruta (
        //     comentaruta (
        //       codComenta,
        //       comentario,
        //       tipoComenta,
        //       fecha
        //     )
        //   )
        // `)
        // .eq('codRuta', id);

        // FORMA DE HACERLO CON RUTAS AHORA.
        // console.log('data o error:');
        // console.log(data, error);
        // Comprobamos si ha habido error o no en la consulta.
        if (error) {
          setErrores(error); 
          console.log('tenemos error nene');
          console.log(error);
        } else {
          // Antes de pasarlo al estado, simplificamos y nos quedamos con 
          // la info que nos interesa, aplanando la estructura del objeto.
          // Ademas los ordenamos por la fecha de forma ascendente.
          // console.log('ahora viene el mapeo para simplificar');
          // console.log(data);
          
          const simplificaComentarios = data.map(elemento => ({        
              codUsuario: elemento.codUsuCR,
              codComenta: elemento.comentaruta.codComenta,
              comentario: elemento.comentaruta.comentario,
              tipoComenta: elemento.comentaruta.tipoComenta,
              fecha: elemento.comentaruta.fecha,
              nickUsuario: elemento.usuario.nick,
              imgUsuario: elemento.usuario.imagen,
          }))
          .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
          setComentariosRutas(simplificaComentarios);
          console.log('tenemos simplificado:');
          console.log(simplificaComentarios);
          // console.log(comentariosRutas);
        }
      } catch (errorConexion) {
        setErrores(errorConexion);
      } finally {
        setCargando(false);
      }
    };

    // Función asíncrona para crear una nuevo comentario de ruta en BDatos.
    const crearComentario = async (idUsuario) => {
      console.log('entrando en crearComentario ...');
      console.log(comentarioRuta);
      try {
        setCargando(true);
        // Consulta a la base de datos para insertar en comentaruta.
        const { data: comentaData, error } = await supabaseConexion
          .from("comentaruta")
          .insert([
            {
              comentario: comentarioRuta.comentario,
              tipoComenta: "publico"
              // descripcion: ruta.descripcion,
              // codUsuR: usuario_id,
            },
          ])
          .select();
          console.log('comentaData de insert en comentaruta');
          console.log(comentaData);
        // Controlamos el posible error en la inserción del registro.
        if (!error) {
          console.log("no ha habido error.");
          // Consulta para insertar ahora en conversaruta.
          const { data: conversaData, error2 } = await supabaseConexion
          .from("conversaruta")
          .insert([
            {
              codUsuCR: idUsuario,
              codComentaCR: comentaData[0].codComenta,
              codRutaCR: ruta.codRuta
              // comentario: comentarioRuta.comentario,
              // tipoComenta: "publico"
              // descripcion: ruta.descripcion,
              // codUsuR: usuario_id,
            },
          ])
          .select();
          // Controlamos posible error en inserción en conversaruta.
          if (!error2) {
            
            // Actualizamos el estado comentariosRutas (array de comentarios), añadiendo el nuevo.
            // setComentariosRutas([...comentariosRutas, comentarioRuta]);
            // Inicializamos el estado comentarioRuta.
            setComentarioRuta(valorInicialComentario);
            // Actualizamos  el estado comentariosRutas.
            obtenerListadoComentarios(ruta.codRuta);
          } else {
            setErrores(error2);
          }
        // else del error en primera consulta.
        } else {
          console.log("pasa por error");
          setErrores(error);
          // setErrores(errori);
        }
      } catch (errorConexion) {
          setErrores(errorConexion);
      } finally {
          setCargando(false);
          obtenerListadoComentarios();
      }
    };

    // Función asíncrona para filtrar rutas.
    const filtrarRuta = async (filtros) => {
      console.log('en filtrarRuta, el objeto es ...');
      console.log(filtros);
      try {
        console.log('entrando en try de filtrarRuta');
        setCargando(true);
        // Vamos a ir construyendo la consulta segun los filtros.
        let consulta = supabaseConexion.from("ruta").select(`*,localidad (codLocalidad, codProvL, nombreLocalidad, provincia (codProvincia, nombreProvincia))`);
        // Condicionamos a que tenga valor en el objeto para ir completando la consulta.
        if (filtros.titulo) {
          consulta = consulta.ilike("titulo", `%${filtros.titulo}%`);
        }
        if (filtros.dificultad) {
          consulta = consulta.lt("dificultad", filtros.dificultad);
        }
        if (filtros.distancia) {
          consulta = consulta.lte("distancia", filtros.distancia);
        }
        console.log('consulta de filtrado es ...');
        console.log(consulta);
        // Realizamos la consulta a la base de datos.
        const { data, error } = await consulta;
        // Controlamos posible error en la consulta.
        // error ? setErrores(error) : setRutas(data);
        console.log('¿¿¿ rutas simplificadas, funciona ???');
        console.log(data);
        if (error) {
          setErrores(error);
          console.log('paso por error amigo');
        } else {
          console.log('llamando a la funcion externa');
          const simplificaRutas = simplificarRutas(data);
          console.log(simplificaRutas);
          setRutas(simplificaRutas);
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
      // console.log(data);
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
      // console.log(data);
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
        const { name, value, files } = evento.target;
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
              // console.log(`provinciaSeleccionada es: `, provinciaSeleccionada);
              nuevaProvincia = provinciaSeleccionada ? provinciaSeleccionada.nombreProvincia : "";
          }
          if (name === "codLocalR") {
            const localidadSeleccionada = localidades.find(
                (localidad) => localidad.codLocalidad === value
            );
            // console.log(`localidadSeleccionada es: `, localidadSeleccionada);
            nuevaLocalidad = localidadSeleccionada ? localidadSeleccionada.nombreLocalidad : "";
          }
          // Peculiaridad para imagenesruta (tipo file no utiliza value).
          if (name === "imagenesruta") {
            if (files && files.length > 0) {
              const nombreArchivo = files[0].name; 
              // console.log(`Archivo seleccionado: ${nombreArchivo}`);
              // Actualiza el estado ruta (solo para tipo file).
              return {
                  ...prevRuta,
                  [name]: nombreArchivo,
                  provincia: nuevaProvincia,
                  localidad: nuevaLocalidad,
              };
            } else {
                return prevRuta; // Si no hay archivo, no hacemos nada
            }
          }
          // Actualiza el estado ruta (excepto para tipo file).
          return { 
              ...prevRuta, 
              [name]: value, 
              provincia: nuevaProvincia,
              localidad: nuevaLocalidad,
          };
      });
  
      // console.log(`actualizando ruta ...`);
      // console.log(ruta);
      // console.log(localidades);
    };

    // Función para actualizar los datos del campo de formulario de comentarios.
    const actualizarDatoFormularioComenta = (evento) => {
      const { name, value } = evento.target;
      // Se asignan al estado, que es un objeto clave-valor.
      setComentarioRuta({ ...comentarioRuta, [name]: value });
    };

    // Función para actualizar los datos del campo del formulario de filtrado de rutas.
    const actualizarDatoFormularioFiltrar = (evento) => {
      const { name, value } = evento.target;
      // Se asignan al estado, que es un objeto clave-valor.
      setFiltroRuta({ ...filtroRuta, [name]: value });
      console.log(filtroRuta);
    };




    // **************** FALTAN FUNCIONES PARA VALIDAR FORMULARIOS *************




    // Función para inicializar el estado ruta fuera del contexto.
    const inicializarRuta = () => {
        setRuta(valorInicialRuta);
    };

    // Función para inicializar el estado ruta fuera del contexto.
    const inicializarFiltroRuta = () => {
      setFiltroRuta(valorInicialFiltroRuta);
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
        obtenerListadoRutasInicio();
        obtenerProvincias();
        obtenerLocalidades();
        // obtenerRuta('42f3097c-cbc5-44c4-9362-c951ded41b95');
        // console.log('llamada a obtenerListadoComentarios');
        // obtenerListadoComentarios();
    }, []);

    // Objeto con la información a exportar del contexto.
    const datosAExportar = {
        obtenerProvincias, // igual no porque lo hace en el useEffect ???
        obtenerLocalidades,
        obtenerListadoRutas,
        obtenerListadoRutasInicio,
        obtenerRuta,
        ruta,
        rutas,
        rutasInicio,
        provincias,
        localidades,
        obtenerListadoComentarios,
        comentariosRutas,
        comentarioRuta,
        crearRuta,
        editarRuta,
        eliminarRuta,
        confirmarEliminacion,
        eliminandoRuta,
        inicializarRuta,
        inicializarFiltroRuta,
        mostrandoRuta,
        filtroRuta,
        filtrarRuta,
        cerrarMostrando,
        crearComentario,
        actualizarDatoFormulario,
        actualizarDatoFormularioComenta,
        actualizarDatoFormularioFiltrar,
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