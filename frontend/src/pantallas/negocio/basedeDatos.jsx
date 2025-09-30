import { useNavigate } from "react-router-dom";
import { useUsuario } from "../../contextos/contextodeUsuario.jsx"
import LogotipodeNegocio from "../../componentes/visuales/logotipodeNegocio.jsx";
import MenuInferior from "../../componentes/funcionales/menuInferior.jsx";
import MenudeUsuario from "../../componentes/funcionales/menudeUsuario.jsx";
import './negocio.css';

function BasedeDatos() {
  const navigate = useNavigate();
  const { userType } = useUsuario();

  // Si no es un negocio, redirigir a la pantalla principal
  if (userType !== 'business') {
    navigate('/');
    return null;
  }

  return (
    <div className="home-container" style={{ background: "#2d1d3d", minHeight: "100vh", color: "#fff", fontFamily: "Impact, sans-serif", paddingBottom: "4.5rem" }}>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem" }}>
        <LogotipodeNegocio />
        <MenudeUsuario />
      </div>

      {/* Título de la base de datos */}
      <div style={{ textAlign: "center", margin: "2rem 1rem" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem", letterSpacing: "2px" }}>BASE DE DATOS</h1>
        <p style={{ fontSize: "1.1rem", color: "#e0e0e0", letterSpacing: "1px" }}>
          Gestión completa de clientes y servicios
        </p>
      </div>

      {/* Estadísticas generales */}
      <div style={{ display: "flex", justifyContent: "center", gap: "2.5rem", margin: "2rem 0" }}>
        <div style={{ textAlign: "center" }}>
          <img src="/icons/user.png" alt="Clientes" style={{ width: 80, marginBottom: "0.5rem" }} />
          <div style={{ fontSize: "1.3rem" }}>156</div>
          <div style={{ fontSize: "1.1rem" }}>clientes totales</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <img src="/icons/payment.png" alt="Servicios" style={{ width: 80, marginBottom: "0.5rem" }} />
          <div style={{ fontSize: "1.3rem" }}>89</div>
          <div style={{ fontSize: "1.1rem" }}>servicios este mes</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <img src="/icons/fuel.png" alt="Ingresos" style={{ width: 80, marginBottom: "0.5rem" }} />
          <div style={{ fontSize: "1.3rem" }}>$8.2M</div>
          <div style={{ fontSize: "1.1rem" }}>ingresos totales</div>
        </div>
      </div>

      {/* Secciones de la base de datos */}
      <div className="home-box">
        <div style={{ display: "flex", alignItems: "center", marginBottom: "0.7rem" }}>
          <span style={{ fontSize: "1.3rem", letterSpacing: "1px" }}>GESTIÓN DE CLIENTES</span>
          <img src="/icons/user.png" alt="Clientes" style={{ width: 28, marginLeft: "0.7rem" }} />
        </div>
        <div style={{
          background: "#7c3aed",
          borderRadius: "10px",
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.5rem"
        }}>
          <div>
            <div style={{ fontSize: "1.1rem" }}>BUSCAR CLIENTE</div>
            <div style={{ fontSize: "0.95rem", color: "#e0e0e0", marginBottom: "0.3rem" }}>Buscar por nombre, placa o documento</div>
          </div>
          <img src="/icons/arrow-right.png" alt="Ver más" style={{ width: 28 }} />
        </div>
        <div style={{
          background: "#7c3aed",
          borderRadius: "10px",
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.5rem"
        }}>
          <div>
            <div style={{ fontSize: "1.1rem" }}>HISTORIAL DE SERVICIOS</div>
            <div style={{ fontSize: "0.95rem", color: "#e0e0e0", marginBottom: "0.3rem" }}>Ver todos los servicios realizados</div>
          </div>
          <img src="/icons/arrow-right.png" alt="Ver más" style={{ width: 28 }} />
        </div>
        <div style={{
          background: "#7c3aed",
          borderRadius: "10px",
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div>
            <div style={{ fontSize: "1.1rem" }}>AGREGAR NUEVO CLIENTE</div>
            <div style={{ fontSize: "0.95rem", color: "#e0e0e0", marginBottom: "0.3rem" }}>Registrar cliente en la base de datos</div>
          </div>
          <img src="/icons/arrow-right.png" alt="Ver más" style={{ width: 28 }} />
        </div>
      </div>

      <div className="home-box">
        <div style={{ display: "flex", alignItems: "center", marginBottom: "0.7rem" }}>
          <span style={{ fontSize: "1.3rem", letterSpacing: "1px" }}>REPORTES Y ANÁLISIS</span>
          <img src="/icons/add.png" alt="Reportes" style={{ width: 28, marginLeft: "0.7rem" }} />
        </div>
        <div style={{
          background: "#7c3aed",
          borderRadius: "10px",
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.5rem"
        }}>
          <div>
            <div style={{ fontSize: "1.1rem" }}>INGRESOS MENSUALES</div>
            <div style={{ fontSize: "0.95rem", color: "#e0e0e0", marginBottom: "0.3rem" }}>Análisis de ingresos por período</div>
          </div>
          <img src="/icons/arrow-right.png" alt="Ver más" style={{ width: 28 }} />
        </div>
        <div style={{
          background: "#7c3aed",
          borderRadius: "10px",
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div>
            <div style={{ fontSize: "1.1rem" }}>SERVICIOS MÁS POPULARES</div>
            <div style={{ fontSize: "0.95rem", color: "#e0e0e0", marginBottom: "0.3rem" }}>Estadísticas de servicios solicitados</div>
          </div>
          <img src="/icons/arrow-right.png" alt="Ver más" style={{ width: 28 }} />
        </div>
      </div>

      <MenuInferior />
    </div>
  );
}

export default BasedeDatos;
