import React from "react";


const Login = () => {
    return (
        <React.Fragment>
            <h3>Inicia sesion.</h3>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Correo electronico</Form.Label>
                <Form.Control type="email" size="sm" placeholder="nombre@ejemplo.es" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPlaintextPassword">
                <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="introduce tu contraseña" />
                </Form.Group>
                <Button variant="outline-success" type="submit">Iniciar sesion</Button>
            </Form>
            <h3>Crea una nueva cuenta.</h3>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Correo electronico</Form.Label>
                <Form.Control type="email" size="sm" placeholder="nombre@ejemplo.es" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPlaintextPassword">
                <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="introduce tu contraseña" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPlaintextPassword">
                <Form.Label>Confirma contraseña</Form.Label>
                    <Form.Control type="password" placeholder="introduce de nuevo tu contraseña" />
                </Form.Group>
                <Button variant="outline-success" type="submit">crear cuenta</Button>
            </Form>
        </React.Fragment>
    );
}

export default Login;