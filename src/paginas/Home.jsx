import React from "react";
import ListadoRutas from "../componentes/ListadoRutas.jsx";
import FormularioRutas from "../componentes/FormularioRutas.jsx";

const Home = () => {
    return (
        <React.Fragment>
            <h4>Esto es Home de scapa.</h4>
            <FormularioRutas />
            <ListadoRutas />
        </React.Fragment>
    );
}

export default Home;