// Importamos funcion de la biblioteca de Supabase con la que crear 
// el objeto para la conexion.
import { createClient } from "@supabase/supabase-js";

// Necesitamos dos datos que se encuentran en Project Settings > API y son
// la url del proyecto y la clave anon.
// Esta informacion la ponemos en archivo .env.local para no subir
// datos sensibles al repositorio y creamos el objeto.
const supabaseConexion = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
);

// Y lo exportamos para poder utilizarlo en nuestra aplicacion.
export { supabaseConexion };
