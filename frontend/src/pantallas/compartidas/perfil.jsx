import { Navigate } from "react-router-dom";
import { useUsuario } from "../../contextos/contextodeUsuario.jsx";
import PerfildeCliente from "../cliente/perfil.jsx";
import PerfildeNegocio from "../negocio/perfil.jsx";

function Perfil() {
  const { TipodeUsuario } = useUsuario();
  
  if (TipodeUsuario === 'negocio') {
    return <PerfildeNegocio />;
  } else if (TipodeUsuario === 'cliente') {
    return <PerfildeCliente />;
  }

  return <Navigate to="/" replace />;
}

export default Perfil;