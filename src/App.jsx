import { BrowserRouter } from 'react-router-dom';
import Cabecera from "./componentes/estructura/Cabecera.jsx";
import Principal from "./componentes/estructura/Principal.jsx";
import Pie from "./componentes/estructura/Pie.jsx";
import PruebaConexion from './componentes/desarrollo/PruebaConexion';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProveedorRutas from './contextos/ProveedorRutas.jsx';
// import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
      
      <ProveedorRutas>
        <Cabecera />
        <Principal />
        <Pie />
        {/* <PruebaConexion /> */}
      </ProveedorRutas>
        
      </BrowserRouter>
    </>
  )
}

export default App;
