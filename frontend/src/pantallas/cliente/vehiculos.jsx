import Logotipo from "../../componentes/visuales/logotipo.jsx";
import MenudeUsuario from "../../componentes/funcionales/menudeUsuario.jsx";
import MenuInferior from "../../componentes/funcionales/menuInferior.jsx";
import './cliente.css';

function Vehicles() {
  return (
    <div className="vehicles-container">
      <div className="vehicles-header">
        <Logotipo />
        <MenudeUsuario />
      </div>
      <div className="vehicles-content">
        <h1 className="vehicles-title">VEHÍCULOS</h1>
        <p className="vehicles-description">Aquí podrás gestionar tus vehículos registrados.</p>
      </div>
      <MenuInferior />
    </div>
  );
}

export default Vehicles;