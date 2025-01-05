import React from "react";


import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const ListadoRegistrado = (props) => {

  // Desestructuración de props.
  const { codUsuario, nick, nombre, dni, imagen } = props.datosRegistrado;

  return (
      <React.Fragment>
          <section className="mb-4">
  <article className="card w-100">
    <header className="card-header">
      <img 
        src={`http://localhost:5173/src/assets/img/usuario/${imagen}`} 
        className="rounded me-2" 
        alt={`usuario ${nick}`} 
        style={{ width: '40px', height: '40px', objectFit: 'cover' }} 
      />
      <strong>{nick}</strong>
      <small>estado de amistad</small>
    </header>
    <section className="card-body">
      <ButtonGroup aria-label="Acciones" className="w-100">
        <Button variant="secondary" className="flex-fill">Aceptar</Button>
        <Button variant="secondary" className="flex-fill">Rechazar</Button>
      </ButtonGroup>
    </section>
  </article>
</section>
      </React.Fragment>
  );
}

export default ListadoRegistrado;