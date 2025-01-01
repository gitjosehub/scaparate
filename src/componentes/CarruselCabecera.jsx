import React from "react";

import Carousel from 'react-bootstrap/Carousel';
import Montanya from "../assets/img/carrusel/montanya.jpg";
import Rio from "../assets/img/carrusel/rio.jpg";
import Costa from "../assets/img/carrusel/costa.jpg";

const CarruselCabecera = () => {

    return (
        <React.Fragment>
            <Carousel controls={false}>
                <Carousel.Item interval={5000}>
                    <img
                        className="d-block w-100"
                        // src="../assets/img/carrusel/montanya.jpg"
                        src={Montanya}
                        alt="Montañas anocheciendo"
                    />
                    {/* <ExampleCarouselImage text="First slide" /> */}
                    <Carousel.Caption>
                    <h3>Llega a lo más alto</h3>
                    <p>Siente el mundo a tus pies y disfrútalo.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={4000}>
                    <img
                        className="d-block w-100"
                        src={Rio}
                        alt="Cabaña en el rio"
                    />
                    {/* <ExampleCarouselImage text="Second slide" /> */}
                    <Carousel.Caption>
                    <h3>Encuentra tu refugio</h3>
                    <p>Un lugar donde descansar rodeado de naturaleza.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Costa}
                        alt="Embarcadero en la costa"
                    />
                    {/* <ExampleCarouselImage text="Third slide" /> */}
                    <Carousel.Caption>
                    <h3>Embárcate con nosotros</h3>
                    <p>El destino lo escribes tú, en tu camino por la ruta que te está esperando.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </React.Fragment>
    );
}

export default CarruselCabecera;