import React from "react";


const AvisoSesionNecesaria = () => {
    return (
        <div
            style={{
                position: "fixed", // Se coloca fijo en la pantalla
                top: "30%", // A 20% desde la parte superior de la ventana
                left: "50%", // Centrado horizontalmente
                transform: "translate(-50%, -50%)", // Ajuste para centrar
                zIndex: 1000, // Para asegurarse de que está encima de otros elementos
                padding: "20px",
                backgroundColor: "rgba(255, 0, 0, 0.9)", // Fondo rojo
                color: "white",
                borderRadius: "4px",
                textAlign: "center",
            }}
        >
            <p style={{ margin: "10px 0 0" }}>
                Inicia sesión o crear una cuenta para navegar en la app.
            </p>
        </div>
    );
};

export default AvisoSesionNecesaria;