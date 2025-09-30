import Logotipo from "../../componentes/visuales/logotipo.jsx";
import MenudeUsuario from "../../componentes/funcionales/menudeUsuario.jsx";
import MenuInferior from "../../componentes/funcionales/menuInferior.jsx";
import './cliente.css';

function Usuario() {
  return (
    <div className="usuario-container">
      <div className="usuario-header">
        <Logotipo />
        <MenudeUsuario />
      </div>
      <div className="usuario-content">
        <h1 className="usuario-title">PERFIL DE USUARIO</h1>
        <p className="usuario-description">Aquí podrás gestionar tu perfil y configuración de cuenta.</p>
      </div>
      <MenuInferior />
    </div>
  );
}

export default Usuario;