import { BrowserRouter } from 'react-router-dom';
import Cabecera from "./componentes/estructura/Cabecera.jsx";
import Principal from "./componentes/estructura/Principal.jsx";
import Pie from "./componentes/estructura/Pie.jsx";
import PruebaConexion from './componentes/desarrollo/PruebaConexion';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
import ProveedorRutas from './contextos/ProveedorRutas.jsx';
import ProveedorUsuarios from './contextos/ProveedorUsuarios.jsx';
import './css/estiloScapa.css';
// import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <ProveedorUsuarios>
          <ProveedorRutas>
            <Cabecera />
            <Principal />
            <Pie />
            {/* <PruebaConexion /> */}
          </ProveedorRutas>
        </ProveedorUsuarios>
      </BrowserRouter>
    </>
  )
}

export default App;
