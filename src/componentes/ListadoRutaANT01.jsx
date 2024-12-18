import React from "react"; // he quitado: , { useEffect }
import { Link } from "react-router-dom";
import useContextoRutas from "../hooks/useContextoRutas.js";
import useContextoUsuarios from "../hooks/useContextoUsuarios.js";


const ListadoRuta = (props) => {
    // Desestructuración de props.
    const { codRuta, titulo, dificultad, desnivel, distancia, codUsuR, codLocalR, codProvR, localidad, provincia, descripcion, fechaCreacion } = props.datosRuta;
    // console.log(props.datosRuta);
    // Desestructuración de los contextos recibidos a través del hook.
    const { ruta, obtenerRuta } = useContextoRutas();
    

    return (
        <React.Fragment>
            <section>
                <p>{titulo} - dif: {dificultad} - des: {desnivel} - dist: {distancia} - {localidad} en {provincia} de usu {codUsuR} - fecha: {fechaCreacion} - cProv: {codProvR} - cLoc: {codLocalR} - rollo: {descripcion} </p>
                <article>
                <button
                    id={codRuta}
                    onClick={(evento) => {
                    {
                        /* Obtenemos la ruta e inicializamos
                            mensajes de error formulario por si los hubiera */
                    }
                    // inicializarErroresFormulario();
                    obtenerRuta(evento.target.id);
                    }}
                >ver
                </button>
                <button
                    id={codRuta}
                    onClick={(evento) => {
                    {
                        /* Obtenemos la ruta e inicializamos
                            mensajes de error formulario por si los hubiera */
                    }
                    // inicializarErroresFormulario();
                    obtenerRuta(evento.target.id);
                    }}
                >editar
                </button>
                <button
                    id={codRuta}
                    onClick={(evento) => {
                    {
                        /* Obtenemos la ruta e inicializamos
                            mensajes de error formulario por si los hubiera */
                    }
                    // inicializarErroresFormulario();
                    obtenerRuta(evento.target.id);
                    }}
                >eliminar
                </button>
                </article>
            </section>
        </React.Fragment>
    );
}

export default ListadoRuta;