import React from "react"; // he quitado: , { useEffect }
import { Link } from "react-router-dom";
import useContextoRutas from "../hooks/useContextoRutas.js";
import useContextoUsuarios from "../hooks/useContextoUsuarios.js";


const ListadoRuta = (props) => {
    // Desestructuración de props.
    const { codRuta, titulo, dificultad, codUsuR, codLocalR, codProvR, localidad, provincia } = props.datosRuta;
    console.log(props.datosRuta);
    // Desestructuración de los contextos recibidos a través del hook.
    const { ruta } = useContextoRutas();
    

    return (
        <React.Fragment>
            <section>
                <p>{titulo} - {dificultad} - {codLocalR}(es {localidad.nombreLocalidad}) - {codProvR} (en {localidad.provincia.nombreProvincia}) de usu {codUsuR}</p>
            </section>
        </React.Fragment>
    );
}

export default ListadoRuta;