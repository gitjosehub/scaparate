import React from "react";
import ControlSesion from "./ControlSesion.jsx";
import ControlRegistro from "./ControlRegistro.jsx";
import BarraNavega from "./BarraNavega.jsx";
import CarruselCabecera from "../CarruselCabecera.jsx";


const Cabecera = () => {

    return (
        <React.Fragment>
            <header className="bg-light">
                {/* <h2>Cabecera</h2> */}
                <section className="d-flex justify-content-between align-items-center fixed-top bg-body-tertiary">
                    <BarraNavega />
                    <article className="d-flex align-items-center gap-2">
                        <ControlSesion />
                        <article className="me-3">
                        <ControlRegistro />
                        </article>
                    </article>
                </section>
                <section>
                    <CarruselCabecera />
                </section>
            </header>
        </React.Fragment>
    );
}

export default Cabecera;