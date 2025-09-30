import MenudeUsuario from "../../componentes/funcionales/menudeUsuario.jsx";
import MenuInferior from "../../componentes/funcionales/menuInferior.jsx";
import './cliente.css';

function Mapa() {
  return (
    <div className="mapa-container">
      <div className="mapa-header">
        <h1>MAPA DE CERCANÍA</h1>
        <MenudeUsuario />
      </div>
      <div className="mapa-content">
      </div>
      <MenuInferior />
    </div>
  );
}

export default Mapa;