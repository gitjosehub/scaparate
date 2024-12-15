// Este hook es una capa intermedia en la lógica del contexto, que nos
// permite en caso de que haya cambios, realizar la modificación sólamente 
// aquí, en lugar de tenerlas que hacer en todos los componentes donde trabajemos
// con el contexto. 
// Por tanto, tenemos que importar este hook en vez del contexto, en los componentes
// que lo vayan a utilizar.

// Importamos useContext y el propio contexto para poder trabajar.
import { useContext } from "react";
import { ContextoRutas } from "../contextos/ProveedorRutas.jsx";

const useContextoRutas = () => {
    const contexto = useContext(ContextoRutas);
    return contexto;
};

export default useContextoRutas;