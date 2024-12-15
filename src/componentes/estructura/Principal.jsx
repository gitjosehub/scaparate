import React from "react";
import Enrutador from "./enrutador/Enrutador.jsx";

const Principal = () => {

    return (
        <React.Fragment>
            {/* Aquí es donde cargará el contenido según el enrutador. */}
            <main>
                <Enrutador />
            </main>
            
        </React.Fragment>
    );
}

export default Principal;