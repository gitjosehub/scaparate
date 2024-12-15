import { BrowserRouter } from 'react-router-dom';
import Cabecera from "./componentes/estructura/Cabecera.jsx";
import Principal from "./componentes/estructura/Principal.jsx";
import Pie from "./componentes/estructura/Pie.jsx";
import PruebaConexion from './componentes/desarrollo/PruebaConexion';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Cabecera />
        <Principal />
        <Pie />
        <PruebaConexion />
      </BrowserRouter>
    </>
  )
}

export default App;
