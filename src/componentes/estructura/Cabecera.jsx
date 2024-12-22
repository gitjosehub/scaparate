import React from "react";
import ControlSesion from "./ControlSesion.jsx";
import ControlRegistro from "./ControlRegistro.jsx";
import BarraNavega from "./BarraNavega.jsx";


const Cabecera = () => {

    return (
        <React.Fragment>
            <header className="bg-light">
                {/* <h2>Cabecera</h2> */}
                <section className="d-flex justify-content-between align-items-center">
                    <BarraNavega />
                    <article className="d-flex align-items-center">
                        <ControlSesion />
                        <ControlRegistro />
                    </article>
                </section>
            </header>
        </React.Fragment>
    );
}

export default Cabecera;