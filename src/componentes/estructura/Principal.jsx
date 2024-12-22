import React from "react";
import Enrutador from "./enrutador/Enrutador.jsx";

const Principal = () => {

    return (
        <React.Fragment>
            {/* Aquí es donde cargará el contenido según el enrutador. */}
            <main className="p-3">
                <Enrutador />
            </main>
            
        </React.Fragment>
    );
}

export default Principal;