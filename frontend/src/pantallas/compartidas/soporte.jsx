import { Navigate } from "react-router-dom";
import { useUsuario } from "../../contextos/contextodeUsuario.jsx";
import SoportedeCliente from "../cliente/soporte.jsx";
import SoportedeNegocio from "../negocio/soporte.jsx";

function Soporte() {
  const { TipodeUsuario } = useUsuario();
  
  if (TipodeUsuario === 'negocio') {
    return <SoportedeNegocio />;
  } else if (TipodeUsuario === 'cliente') {
    return <SoportedeCliente />;
  }

  return <Navigate to="/" replace />;
}

export default Soporte;