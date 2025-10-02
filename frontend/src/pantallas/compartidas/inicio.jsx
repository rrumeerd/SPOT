import { useUsuario } from "../../contextos/contextodeUsuario";
import IniciodeCliente from "../cliente/inicio";
import IniciodeNegocio from "../negocio/inicio";
import Bienvenida from "../bienvenida";

function Inicio() {
  const { TipodeUsuario, DatosdeUsuario } = useUsuario();

  if (TipodeUsuario === 'negocio') {
    return <IniciodeNegocio DatosdeNegocio={DatosdeUsuario} />;
  } else if (TipodeUsuario === 'cliente') {
    return <IniciodeCliente />;
  } else {
    return <Bienvenida />;
  }
}

export default Inicio;
