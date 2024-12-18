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