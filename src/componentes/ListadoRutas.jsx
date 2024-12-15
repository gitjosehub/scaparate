import React, { useEffect } from "react";
import useContextoRutas from "../hooks/useContextoRutas.js";
import ListadoRuta from "./ListadoRuta.jsx";

const ListadoRutas = () => {
    // Desestructuración de los contextos que recibimos por el hook.
    const { rutas, obtenerListadoRutas } = useContextoRutas();
    console.log(`Hay rutas: ${rutas.length}`);
    // Función a realizar en la carga del componente. Para actualizar las rutas del usuario.
    useEffect(() => {
        obtenerListadoRutas();
      }, []);
    
    

    return (
        <React.Fragment>
            {/* Mapeamos el estado rutas (array de objetos ruta). */}
            <section className="">
            {rutas.length ? (
                <section className="">
                    {rutas.map((valor, indice, array) => {
                        return (
                            <ListadoRuta key={valor.codRuta} datosRuta={valor} />
                        );
                    })}
                </section>
            ) : (
                <React.Fragment>
                    <p>No se han encontrado rutas.</p>
                </React.Fragment>
            )
            }
            </section>
        </React.Fragment>
    );
}

export default ListadoRutas;

