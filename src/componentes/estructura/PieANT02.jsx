import React from "react";
import { Link } from 'react-router-dom';
import Logo from "../../assets/img/scapaGrisobscuro.png";


const Pie = () => {

    return (
        <React.Fragment>
            <footer className="mt-5">
                {/* Franja más amplia */}
                
                {/* <section className="container">
                    <section className="row d">
                        <section className="col-12 col-md-3 mb-3">
                            <article>logotipo</article>
                        </section>
                        <section className="col-12 col-md-9 mb-3 d-flex flex-row">
                            <article>rutas</article>
                            <article>eventos</article>
                            <article>comunidad</article>
                        </section>
                    </section>
                </section> */}
                


                {/* Primera fila con las columnas principales */}
                <section className="py-4 bg-secondary">
                <section className="container">
                    <section className="row align-items-center">
                    {/* Columna del logo */}
                    <article className="col-12 col-md-6 mb-3 mb-md-0 d-flex flex-column align-items-center align-items-md-start">
                        <img src={Logo} alt="Logo scapa" className="img-fluid mb-3" style={{ maxWidth: "150px" }} />
                        <p className="text-light fs-6 text-center text-md-start">
                        info@scapa.com
                        <br />
                        +34 600 600 600
                        </p>
                    </article>

                    {/* Contenedor para las otras columnas, alineado a la derecha */}
                    <section className="col-12 col-md-6 d-flex flex-nowrap justify-content-center justify-content-md-end gap-3">
                        {/* Rutas */}
                        <article className="col-auto">
                        <h5 className="text-light fw-bold fs-6 text-start">Rutas</h5>
                        <ul className="list-unstyled fs-smaller text-light text-start">
                            <li>Créalas</li>
                            <li>Visualízalas</li>
                            <li>Compártelas</li>
                        </ul>
                        </article>

                        {/* Eventos */}
                        <article className="col-auto">
                        <h5 className="text-light fw-bold fs-6 text-start">Eventos</h5>
                        <ul className="list-unstyled fs-smaller text-light text-start">
                            <li>Participa</li>
                            <li>Organiza</li>
                        </ul>
                        </article>

                        {/* Comunidad */}
                        <article className="col-auto">
                        <h5 className="text-light fw-bold fs-6 text-start">Comunidad</h5>
                        <ul className="list-unstyled fs-smaller text-light text-start">
                            <li>Seguidores</li>
                            <li>Comentarios</li>
                            <li>Actividades</li>
                            <li>¡Interactúa!</li>
                        </ul>
                        </article>
                    </section>
                    </section>
                </section>
                </section>

                {/* Segunda fila con la franja estrecha */}
                <section className="py-0 bg-dark text-light">
                    <section className="container d-flex justify-content-center justify-content-md-end align-items-center">
                        <small className="d-flex align-items-center">
                        <Link to="#" className="text-light text-decoration-none me-2 small">
                            Políticas Privacidad
                        </Link>
                        <span className="me-2 small">|</span>
                        <Link to="#" className="text-light text-decoration-none me-2 small">
                            Términos Uso
                        </Link>
                        <span className="ms-3">&copy; 2025 scapa</span>
                        </small>
                    </section>
                </section>

            </footer>
        </React.Fragment>
    );
}

export default Pie;