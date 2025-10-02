import LogotipodeNegocio from "../../componentes/visuales/logotipodeNegocio.jsx";
import MenudeUsuario from "../../componentes/funcionales/menudeUsuario.jsx";
import MenuInferior from "../../componentes/funcionales/menuInferior.jsx";
import { useUsuario } from "../../contextos/contextodeUsuario.jsx";
import './negocio.css';

function PerfildeNegocio() {
  const { DatosdeUsuario } = useUsuario();
  const nombre = DatosdeUsuario?.businessName || DatosdeUsuario?.fullName || 'Mi negocio';
  return (
    <div className="usuario-container">
      <div className="usuario-header">
        <LogotipodeNegocio />
        <MenudeUsuario />
      </div>
      <div className="usuario-content">
        <h1 className="usuario-title">PERFIL DE NEGOCIO</h1>
        <div className="perfil-header">
          <div className="perfil-cover perfil-cover--negocio"></div>
          <div className="perfil-avatar">
            <img src="/recursos/iconos/usuario.png" alt="Avatar" />
          </div>
        </div>
        <p className="usuario-description">{nombre}</p>

        <div className="perfil-actions">
          <button className="perfil-edit-btn">
            <img src="/recursos/iconos/editar.png" alt="Editar" />
            Editar perfil del negocio
          </button>
        </div>

        <section className="perfil-section">
          <div className="perfil-section-title">
            <img src="/recursos/iconos/pago.png" alt="Ingresos" />
            Resumen de ingresos
          </div>
          <div className="perfil-kpis">
            <div className="perfil-kpi"><span>Hoy</span><strong>$ 320.000</strong></div>
            <div className="perfil-kpi"><span>Semana</span><strong>$ 1.450.000</strong></div>
            <div className="perfil-kpi"><span>Mes</span><strong>$ 5.820.000</strong></div>
          </div>
        </section>

        <section className="perfil-section">
          <div className="perfil-section-title">
            <img src="/recursos/iconos/base.png" alt="Operaciones" />
            Operaciones recientes
          </div>
          <div className="perfil-list">
            <div className="perfil-list-item">
              <span>Orden #A-9841</span>
              <span>$ 24.000</span>
              <span>hace 1h</span>
            </div>
            <div className="perfil-list-item">
              <span>Orden #A-9838</span>
              <span>$ 12.000</span>
              <span>hace 3h</span>
            </div>
          </div>
        </section>
      </div>
      <MenuInferior />
    </div>
  );
}

export default PerfildeNegocio;