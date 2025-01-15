import React from "react";
import { Link } from 'react-router-dom';

import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const ListadoRegistrado = (props) => {

  // Desestructuración de props.
  const { codUsuario, nick, nombre, dni, imagen } = props.datosRegistrado;
  
  const pasar = () => { console.log('esto es pasar'); };

  return (
      <React.Fragment>
          <Toast>
            <Toast.Header closeButton={false}>
              <img src={`http://localhost:5173/src/assets/img/usuario/${imagen}`} className="rounded me-2" alt={`usuario ${nick}`} style={{ width: '40px', height: '40px', objectFit: 'cover' }}/>
              <strong className="me-auto">{nick}</strong>
              <small>estado de amistad</small>
            </Toast.Header>
            <Toast.Body className="p-0">
            <ButtonGroup aria-label="Acciones" className="w-100">
              <Button variant="outline-success" className="flex-fill" size="sm"
                as={Link}
                onClick={pasar}
              >Solicitar
              </Button>
              <Button variant="outline-success" className="flex-fill" size="sm"
                as={Link}
                onClick={pasar}
              >Admitir
              </Button>
              <Button variant="outline-danger" className="flex-fill" size="sm"
                as={Link}
                onClick={pasar}
              >Denegar
              </Button>
            </ButtonGroup>
            </Toast.Body>
          </Toast>
      </React.Fragment>
  );
}

export default ListadoRegistrado;