"use strict";

// Función para obtener la fecha de ruta en formato legible.
const formatearFecha = (cadenaFecha) => {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let fechaGuion = cadenaFecha.substring(0, 10);
    let fechaLegible = fechaGuion.split("-");
    let numeroMes = parseInt(fechaLegible[1]-1);
    let fechaOK = `${fechaLegible[2]} ${meses[numeroMes]} ${fechaLegible[0]}`;
    return fechaOK;
};

export { formatearFecha };

// Función para simplificar estructura del estado-objeto rutas.
const simplificarRutas = (datos) => {
    const simplificaRutas = datos.map(elemento => ({
        codRuta: elemento.codRuta,
        fechaCreacion: elemento.fechaCreacion,
        titulo: elemento.titulo,
        descripcion: elemento.descripcion,
        dificultad: elemento.dificultad,
        distancia: elemento.distancia,
        desnivel: elemento.desnivel,
        imagen: elemento.imagen,
        activa: elemento.activa,
        codUsuR: elemento.codUsuR,
        codLocalR: elemento.codLocalR,
        codProvR: elemento.codProvR,
        localidad: elemento.localidad.nombreLocalidad,
        provincia: elemento.localidad.provincia.nombreProvincia,
    }));
    return simplificaRutas;
};

export { simplificarRutas };