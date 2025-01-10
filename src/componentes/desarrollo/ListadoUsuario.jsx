import React from "react";


const ListadoUsuario = (props) => {
    const { id, name, email, country } = props.datos;
    
    return (
        <React.Fragment>
            <article id={id}>
                {name} - {email} ({country})
            </article>
        </React.Fragment>
    );
}

export default ListadoUsuario;