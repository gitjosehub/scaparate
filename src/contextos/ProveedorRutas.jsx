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
      activa: false,
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
    const valorInicialParticipar = {
      codUsuPR: "",
      codRutaPR: "",
      valoracion: "",
    }
    
    // Creación de estados.
    const [ruta, setRuta] = useState(valorInicialRuta);
    const [rutas, setRutas] = useState(valorInicialArray);
    const [rutasInicio, setRutasInicio] = useState(valorInicialArray);
    const [comentariosRutas, setComentariosRutas] = useState(valorInicialArray);
    const [comentarioRuta, setComentarioRuta] = useState(valorInicialComentario);
    const [contadorComentarios, setContadorComentarios] = useState(valorInicialArray);
    const [contadorParticipantes, setContadorParticipantes] = useState(valorInicialArray);
    const [filtroRuta, setFiltroRuta] = useState(valorInicialFiltroRuta);
    const [participacionRuta, setParticipacionRuta] = useState(valorInicialParticipar);
    const [participacionRutas, setParticipacionRutas] = useState(valorInicialArray);
    const [eliminandoRuta, setEliminandoRuta] = useState(valorInicialBooleanoFalse);
    const [activandoRuta, setActivandoRuta] = useState(valorInicialBooleanoFalse);
    const [mostrandoRuta, setMostrandoRuta] = useState(valorInicialBooleanoFalse);
    const [erroresFormulario, setErroresFormulario] = useState(valorInicialArray);
    const [errores, setErrores] = useState(valorInicialCadena);
    const [cargando, setCargando] = useState(valorInicialBooleanoTrue);
    const [provincias, setProvincias] = useState(valorInicialArray);
    const [localidades, setLocalidades] = useState(valorInicialArray);

    // Función asíncrona para conseguir las rutas desde Supabase.
    const obtenerListadoRutas = async (usuPhone) => {
      try {
        setCargando(true);
        // Consulta a la base de datos de supabase, dependiendo de rol de usuario.
        if (usuPhone === "rol_admin") {
          const { data, error } = await supabaseConexion
            .from("ruta")
            .select(`
              *,
              localidad (codLocalidad, codProvL, nombreLocalidad, 
              provincia (codProvincia, nombreProvincia))
              `);
          // Controlamos si ha habido error o no.
          if (error) {
            setErrores(error); 
          } else {
            // Antes de pasarlo al estado, simplificamos y nos quedamos con 
            // la info que nos interesa, aplanando la estructura del objeto.
            // LLamada a la función externa para simplificar estructura.
            const simplificaRutas = simplificarRutas(data);
            setRutas(simplificaRutas);
          }
        } else {
          const { data, error } = await supabaseConexion
            .from("ruta")
            .select(`
              *,
              localidad (codLocalidad, codProvL, nombreLocalidad, 
              provincia (codProvincia, nombreProvincia))
              `)
              .eq("activa", true);
          // Controlamos si ha habido error o no.
          if (error) {
            setErrores(error); 
          } else {
            // Antes de pasarlo al estado, simplificamos y nos quedamos con 
            // la info que nos interesa, aplanando la estructura del objeto.
            // LLamada a la función externa para simplificar estructura.
            const simplificaRutas = simplificarRutas(data);
            setRutas(simplificaRutas);
          }
        };
        
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
              activa: data[0].activa,
              codUsuR: data[0].codUsuR,
              codLocalR: data[0].codLocalR,
              codProvR: data[0].codProvR,
              localidad: data[0].localidad.nombreLocalidad,
              provincia: data[0].localidad.provincia.nombreProvincia,
            };
            setRuta(simplificaRuta);
          }
      } catch (errorConexion) {
          setErrores(errorConexion);
      } finally {
          setCargando(false);
      }
    };

    // Función asíncrona para crear una nueva ruta en BDatos de Supabase.
    const crearRuta = async (usuId) => {
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
                codUsuR: usuId,
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

    // Función asíncrona para editar/actualizar una ruta en la BDatos.
    const editarRuta = async () => {
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

    // Función asíncrona para desactivar (que admin la bloquee) una ruta en la BDatos.
    const activarRuta = async () => {
        try {
          setCargando(true);
          // Consulta a la base de datos para actualizar la tabla ruta.
          const { data, error } = await supabaseConexion
            .from("ruta")
            .update([{ activa: true }])
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
            setRuta(valorInicialRuta);
            setActivandoRuta(false);
          } else {
            setErrores(error);
            // setErrores(errori);
          }
          
        } catch (errorConexion) {
            setErrores(errorConexion);
        } finally {
            setCargando(false);
        }
    };

    // Función asíncrona para desactivar (que admin la bloquee) una ruta en la BDatos.
    const desactivarRuta = async () => {
        try {
          setCargando(true);
          // Consulta a la base de datos para actualizar la tabla ruta.
          const { data, error } = await supabaseConexion
            .from("ruta")
            .update([{ activa: false }])
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
            setRuta(valorInicialRuta);
            setActivandoRuta(false);
          } else {
            setErrores(error);
          }
          
        } catch (errorConexion) {
            setErrores(errorConexion);
        } finally {
            setCargando(false);
        }
    };

    // Función asíncrona para cambiar activa en estado ruta.
    const cambiarRuta = async (id, activaOno) => {
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
                activa: activaOno,
                codUsuR: data[0].codUsuR,
                codLocalR: data[0].codLocalR,
                codProvR: data[0].codProvR,
                localidad: data[0].localidad.nombreLocalidad,
                provincia: data[0].localidad.provincia.nombreProvincia,
              };
              setRuta(simplificaRuta);
            }
        } catch (errorConexion) {
            setErrores(errorConexion);
        } finally {
            setCargando(false);
        }
    };

    // Función asíncrona para añadir la ruta a favorita (participa) del usuario.
    const crearParticipacion = async (idUsu) => {
      try {
        setCargando(true);
        // Consulta a la base de datos.
        const { data, error } = await supabaseConexion
          .from("participaruta")
          .insert([
            {
              codUsuPR: idUsu,
              codRutaPR: ruta.codRuta,
              // titulo: ruta.titulo,
              valoracion: participacionRuta.valoracion
            },
          ])
          .select();
        // Controlamos el posible error en la inserción del registro.
        if (!error) {
          // Actualizamos el estado participacionRutas con la nueva.
          setParticipacionRutas([...participacionRutas, participacionRuta]);
          
        } else {
          setErrores(error);
        }
      } catch (errorConexion) {
          setErrores(errorConexion);
      } finally {
          setCargando(false);
          setParticipacionRuta(valorInicialParticipar);
          obtenerListadoParticipacion(idUsu);
      }
    };

    // Función asíncrona para quitar ruta de favorita (participa) de un usuario.
    const eliminarParticipacion = async (idUsu) => {
      try {

        setCargando(true);
          const { error } = await supabaseConexion
            .from("participaruta")
            .delete()
            .eq("codUsuPR", idUsu)
            .eq("codRutaPR", ruta.codRuta);
          // Controlamos si ha habido error en el delete.
          if (!error) {
            // Actualizar el estado participacionRutas para quitar la eliminada, mediante
            // el método filter..
            const participaEditadas = participacionRutas.filter((participaAnterior) => {
              return !(participaAnterior.codUsuPR === idUsu && participaAnterior.codRutaPR === ruta.codRuta);
            });
            setParticipacionRutas(participaEditadas);
            setParticipacionRuta(valorInicialParticipar);
          } else {
            setErrores(error);
          }

      } catch (errorConexion) {
          setErrores(errorConexion);
      } finally {
          setCargando(false);
          setParticipacionRuta(valorInicialParticipar);
          obtenerListadoParticipacion(idUsu);
      }
    };

    // Función asíncrona para conseguir las rutas desde Supabase.
    const obtenerListadoParticipacion = async (idUsu) => {
      try {
        setCargando(true);
        // Consulta a la base de datos de supabase.
        const { data, error } = await supabaseConexion
          .from("participaruta")
          .select(`
            *`)
          .eq("codUsuPR", idUsu);
        // Controlamos si ha habido error o no.
        if (error) {
          setErrores(error); 
        } else {
          // Actualizamos el estado correspondiente.
          setParticipacionRutas(data);
        };
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
      // Controlamos si ha habido error o no.
      if (error) {
        setErrores(error); 
      } else {
        // LLamada a la función externa para simplificar estructura.
        const simplificaRutas = simplificarRutas(data);
        setRutasInicio(simplificaRutas);
      }
      
      } catch (errorConexion) {
        setErrores(errorConexion);
      } finally {
        setCargando(false);
      }
    };

    // Función asíncrona para conseguir los comentarios de una ruta. 
    const obtenerListadoComentarios = async (id) => {
      try {
        setCargando(true);
        // Consulta a la base de datos de supabase.
        const { data, error } = await supabaseConexion
        .from("conversaruta")
        .select(`
          codRutaCR,
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
        // Comprobamos si ha habido error o no en la consulta.
        if (error) {
          setErrores(error); 
        } else {
          // Antes de pasarlo al estado, simplificamos y nos quedamos con 
          // la info que nos interesa, aplanando la estructura del objeto.
          // Ademas los ordenamos por la fecha de forma descendente.
          
          const simplificaComentarios = data.map(elemento => ({        
              codUsuario: elemento.codUsuCR,
              codComenta: elemento.comentaruta.codComenta,
              comentario: elemento.comentaruta.comentario,
              tipoComenta: elemento.comentaruta.tipoComenta,
              fecha: elemento.comentaruta.fecha,
              nickUsuario: elemento.usuario.nick,
              imgUsuario: elemento.usuario.imagen,
          }))
          .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
          setComentariosRutas(simplificaComentarios);
          
        }
      } catch (errorConexion) {
        setErrores(errorConexion);
      } finally {
        setCargando(false);
      }
    };

    // Función asíncrona para crear una nuevo comentario de ruta en BDatos.
    const crearComentario = async (idUsuario) => {
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
        // Controlamos el posible error en la inserción del registro.
        if (!error) {
          // Consulta para insertar ahora en conversaruta.
          const { data: conversaData, error2 } = await supabaseConexion
          .from("conversaruta")
          .insert([
            {
              codUsuCR: idUsuario,
              codComentaCR: comentaData[0].codComenta,
              codRutaCR: ruta.codRuta
              // codUsuR: usuario_id,
            },
          ])
          .select();
          // Controlamos posible error en inserción en conversaruta.
          if (!error2) {
            // Inicializamos el estado comentarioRuta.
            setComentarioRuta(valorInicialComentario);
            // Actualizamos  el estado comentariosRutas.
            obtenerListadoComentarios(ruta.codRuta);
          } else {
            setErrores(error2);
          }
        // else del error en primera consulta.
        } else {
          setErrores(error);
        }
      } catch (errorConexion) {
          setErrores(errorConexion);
      } finally {
          setCargando(false);
      }
    };

    const eliminarComentario = async (id) => {
      try {
        setCargando(true);
        const { error } = await supabaseConexion
          .from("comentaruta")
          .delete()
          .eq("codComenta", id);
        // Controlamos si ha habido error en el delete.
        if (!error) {
          // Actualizar el estado comentariosRutas para quitar el eliminado.el método filter del estado comentariosRutas.
          const comentariosEditados = comentariosRutas.filter((comentarioAnterior) => {
            return comentarioAnterior.codComenta !== id;
          });
          setComentariosRutas(comentariosEditados);
          setComentarioRuta(valorInicialComentario);
        } else {
          setErrores(error);
        }
      } catch (errorConexion) {
          setErrores(errorConexion);
      } finally {
          setCargando(false);
      }
    };

    // Función asíncrona para obtener recuento de comentarios en cada ruta.
    // Llamando a la función que hemos creado en Supabase.
    const contarComentariosRutas = async () => {
      try {
        setCargando(true);
        // Consulta a la base de datos de supabase.
        const { data, error } = await supabaseConexion
          .rpc('count_by_codrutacr');
        // Controlamos si ha habido error o no.
        if (error) {
          setErrores(error); 
        } else {
          // Actualizamos el estado correspondiente.
          setContadorComentarios(data);
        }
      } catch (errorConexion) {
        setErrores(errorConexion);
      } finally {
        setCargando(false);
      }
    };

    // Función asíncrona para obtener recuento de comentarios en cada ruta.
    // Llamando a la función que hemos creado en Supabase.
    const contarParticipantesRutas = async () => {
      try {
        setCargando(true);
        // Consulta a la base de datos de supabase.
        const { data, error } = await supabaseConexion
          // .rpc('count_by_codrutapr');
          .rpc('count_sum_by_codrutapr');
        // Controlamos si ha habido error o no.
        if (error) {
          setErrores(error); 
        } else {
          // Actualizamos el estado correspondiente.
          setContadorParticipantes(data);
        }
      } catch (errorConexion) {
        setErrores(errorConexion);
      } finally {
        setCargando(false);
      }
    };

    // Función asíncrona para filtrar rutas.
    const filtrarRuta = async (filtros) => {
      try {
        setCargando(true);
        // Vamos a ir construyendo la consulta segun los filtros.
        let consulta = supabaseConexion.from("ruta").select(`*,localidad (codLocalidad, codProvL, nombreLocalidad, provincia (codProvincia, nombreProvincia))`);
        consulta = consulta.eq("activa", true);
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
        // Realizamos la consulta a la base de datos.
        const { data, error } = await consulta;
        // Controlamos posible error en la consulta.
        if (error) {
          setErrores(error);
        } else {
          const simplificaRutas = simplificarRutas(data);
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
        // No hay forma de que actualize los dos a la vez si no es asi.
        // Con los select del formulario (provincia y localidad).
        setRuta((prevRuta) => {
          let nuevaProvincia = prevRuta.provincia;
          let nuevaLocalidad = prevRuta.localidad;
          if (name === "codProvR") {
              const provinciaSeleccionada = provincias.find(
                  (provincia) => provincia.codProvincia === value
              );
              nuevaProvincia = provinciaSeleccionada ? provinciaSeleccionada.nombreProvincia : "";
          }
          if (name === "codLocalR") {
            const localidadSeleccionada = localidades.find(
                (localidad) => localidad.codLocalidad === value
            );
            nuevaLocalidad = localidadSeleccionada ? localidadSeleccionada.nombreLocalidad : "";
          }
          // Peculiaridad para imagenesruta (tipo file no utiliza value).
          if (name === "imagenesruta") {
            if (files && files.length > 0) {
              const nombreArchivo = files[0].name; 
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
    };

    // Función para actualizar los datos del campo del formulario de participar en ruta.
    const actualizarDatoFormularioParticipar = (evento) => {
      const { name, value } = evento.target;
      // Se asignan al estado, que es un objeto clave-valor.
      setParticipacionRuta({ ...participacionRuta, [name]: value });
    };

    // Función para validar elemento input de formulario rutas.
    // Recibe por parámetro un elemento del formulario.
    // Retorna un array con los errores del elemento si los ha habido.
    const validarInputFormulario = (elemento) => {
      // Desestructuración del elemento.
      const { name, value } = elemento;
      // Array para guardar los errores del elemento del formulario.
      let listaErroresElemento = [];
      // Comprobación para nombre de la ruta.
      if (name === "nombre_ruta") {
        if (!value.length) {
          listaErroresElemento = [
            ...listaErroresElemento,
            "El nombre es obligatorio.",
          ];
        }
      }
      // Comprobación para localidad de la ruta.
      if (name === "localidad") {
        if (!value.length) {
          listaErroresElemento = [
            ...listaErroresElemento,
            "La localidad es obligatoria.",
          ];
        }
      }
      // Comprobación para la distancia de la ruta.
      if (name === "distancia") {
        if (value === undefined || isNaN(value) || value < 0 || !value.length) {
          listaErroresElemento = [
            ...listaErroresElemento,
            "Distancia es obligatoria y debe ser un número mayor de 0.",
          ];
        }
      }
      // Comprobación para la dificultad de la ruta.
      if (name === "dificultad") {
        if (value === undefined || isNaN(value) || value < 0 || value > 10 || !value.length) {
          listaErroresElemento = [
            ...listaErroresElemento,
            "Dificultad es obligatoria y debe ser un número entre 0 y 10.",
          ];
        }
      }
      // Comprobación de imagen ruta.
      if (name === "img_ruta") {
        if (value.length > 0) {
          const regex = /^[a-zA-Z].*\.(jpg|png)$/;
          if (!regex.test(value)) {
            listaErroresElemento = [
              ...listaErroresElemento,
              "La imagen debe comenzar por una letra y terminar por .jpg o .png",
            ];
          }
          /* listaErroresElemento = [
            ...listaErroresElemento,
            "Imagen debe comenzar por una letra y terminar por .jpg o .png",
          ]; */
        }
      }
      // Retorna el listado con los posibles errores del elemento.
      return listaErroresElemento;
    };

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

    // Funcion para controlar el estado activar ruta fuera del contexto.
    const confirmarActivacion = (cambio) => {
      setActivandoRuta(cambio);
    }

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
        // obtenerListadoRutas();
        obtenerListadoRutasInicio();
        obtenerProvincias();
        obtenerLocalidades();
        contarComentariosRutas();
        contarParticipantesRutas();
    }, []);

    // Objeto con la información a exportar del contexto.
    const datosAExportar = {
        obtenerProvincias, 
        obtenerLocalidades,
        obtenerListadoRutas,
        obtenerListadoRutasInicio,
        obtenerRuta,
        cambiarRuta,
        ruta,
        rutas,
        rutasInicio,
        provincias,
        localidades,
        obtenerListadoComentarios,
        comentariosRutas,
        comentarioRuta,
        contarComentariosRutas,
        contarParticipantesRutas,
        contadorComentarios,
        contadorParticipantes,
        crearRuta,
        editarRuta,
        eliminarRuta,
        activarRuta,
        desactivarRuta,
        confirmarEliminacion,
        confirmarActivacion,
        crearParticipacion,
        eliminarParticipacion,
        obtenerListadoParticipacion,
        participacionRuta,
        participacionRutas,
        eliminandoRuta,
        activandoRuta,
        inicializarRuta,
        inicializarFiltroRuta,
        mostrandoRuta,
        filtroRuta,
        filtrarRuta,
        cerrarMostrando,
        crearComentario,
        eliminarComentario,
        actualizarDatoFormulario,
        actualizarDatoFormularioComenta,
        actualizarDatoFormularioFiltrar,
        actualizarDatoFormularioParticipar,
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