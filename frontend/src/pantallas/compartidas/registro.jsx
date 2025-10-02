import { Navigate } from "react-router-dom";
import { useUsuario } from "../../contextos/contextodeUsuario.jsx";
import RegistrodeCliente from "../cliente/registro.jsx";
import RegistrodeNegocio from "../negocio/registro.jsx";

function Registro() {
  const { TipodeUsuario } = useUsuario();
  
  if (TipodeUsuario === 'negocio') {
    return <RegistrodeNegocio />;
  } else if (TipodeUsuario === 'cliente') {
    return <RegistrodeCliente />;
  }

  return <Navigate to="/" replace />;
}

export default Registro;
