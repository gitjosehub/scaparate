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
                


                <section className="py-4 bg-secondary"> {/* Fondo más claro, pero oscuro */}
    <section className="container">
        <section className="row">
            {/* Columna más ancha con logo e información de contacto */}
            <article className="col-lg-3 mb-3">
                <img src={Logo} alt="Logo scapa" className="img-fluid mb-3" style={{ maxWidth: "150px" }} />
                <p className="text-light fs-6"> {/* Correo y teléfono más grandes */}
                    info@scapa.com
                    <br />
                    +34 600 600 600
                </p>
            </article>

            {/* Línea vertical */}
            <article className="col-1 d-none d-md-block border-start border-light mx-2"></article>

            {/* Columna Rutas */}
            <article className="col-sm-4 col-md-2 mb-3">
                <h5 className="text-light fw-bold fs-6 text-start">Rutas</h5> {/* Texto alineado a la izquierda */}
                <ul className="list-unstyled fs-smaller text-light text-start"> {/* Texto alineado a la izquierda */}
                    <li>Créalas</li>
                    <li>Visualízalas</li>
                    <li>Compártelas</li>
                </ul>
            </article>

            {/* Columna Eventos */}
            <article className="col-sm-4 col-md-2 mb-3">
                <h5 className="text-light fw-bold fs-6 text-start">Eventos</h5> {/* Texto alineado a la izquierda */}
                <ul className="list-unstyled fs-smaller text-light text-start"> {/* Texto alineado a la izquierda */}
                    <li>Participa</li>
                    <li>Organiza</li>
                </ul>
            </article>

            {/* Columna Comunidad */}
            <article className="col-sm-4 col-md-2 mb-3">
                <h5 className="text-light fw-bold fs-6 text-start">Comunidad</h5> {/* Texto alineado a la izquierda */}
                <ul className="list-unstyled fs-smaller text-light text-start"> {/* Texto alineado a la izquierda */}
                    <li>Seguidores</li>
                    <li>Comentarios</li>
                    <li>Actividades</li>
                    <li>¡ Interactúa !</li>
                </ul>
            </article>
        </section>
    </section>
</section>








                {/* Franja estrecha */}
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