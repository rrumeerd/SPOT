import { useNavigate } from "react-router-dom";
import { useUsuario } from "../../contextos/contextodeUsuario.jsx"
import LogotipodeNegocio from "../../componentes/visuales/logotipodeNegocio.jsx";
import MenuInferior from "../../componentes/funcionales/menuInferior.jsx";
import MenudeUsuario from "../../componentes/funcionales/menudeUsuario.jsx";
import './negocio.css';

function BasedeDatos() {
  const navigate = useNavigate();
  const { TipodeUsuario } = useUsuario();

  if (TipodeUsuario !== 'negocio') {
    navigate('/');
    return null;
  }

  return (
    <div className="inicio-container">

      <div className="inicio-header">
        <LogotipodeNegocio />
        <MenudeUsuario />
      </div>

      <div className="inicio-content">
        <h1 className="inicio-title">BASE DE DATOS</h1>
        <p>
          Gestión completa de clientes y servicios
        </p>
      </div>

      <div className="info-container">
        <div className="info-dato">
          <img src="/recursos/iconos/usuario.png" alt="Clientes"/>
          <div>156</div>
          <div>clientes totales</div>
        </div>
        <div className="info-dato">
          <img src="/recursos/iconos/gas.png" alt="Servicios"/>
          <div>89</div>
          <div>servicios este mes</div>
        </div>
        <div className="info-dato">
          <img src="/recursos/iconos/pago.png" alt="Ingresos"/>
          <div>$8.2M</div>
          <div>ingresos totales</div>
        </div>
      </div>

      <div className="inicio-box">
        <div className="datos-box-title">
          <span>GESTIÓN DE CLIENTES</span>
          <img src="/recursos/iconos/usuario.png" alt="Clientes"/>
        </div>
        <div className="datos-btn">
          <div>
            <div className="datos-btn-title">BUSCAR CLIENTE</div>
            <div className="datos-btn-subtitle">Buscar por nombre, placa o documento</div>
          </div>
          <img src="/recursos/iconos/continuar.png" alt="Ver más"/>
        </div>
        <div className="datos-btn">
          <div>
            <div className="datos-btn-title">HISTORIAL DE SERVICIOS</div>
            <div className="datos-btn-subtitle">Ver todos los servicios realizados</div>
          </div>
          <img src="/recursos/iconos/continuar.png" alt="Ver más"/>
        </div>
        <div className="datos-btn">
          <div>
            <div className="datos-btn-title">AGREGAR NUEVO CLIENTE</div>
            <div className="datos-btn-subtitle">Registrar cliente en la base de datos</div>
          </div>
          <img src="/recursos/iconos/continuar.png" alt="Ver más" style={{ width: 28 }} />
        </div>
      </div>
      <br/>

      <div className="inicio-box">
        <div className="datos-box-title">
          <span>REPORTES Y ANÁLISIS</span>
          <img src="/recursos/iconos/lupa.png" alt="Reportes"/>
        </div>
        <div className="datos-btn">
          <div>
            <div datos-btn-title>INGRESOS MENSUALES</div>
            <div datos-btn-subtitle>Análisis de ingresos por período</div>
          </div>
          <img src="/recursos/iconos/continuar.png" alt="Ver más"/>
        </div>
        <div className="datos-btn">
          <div>
            <div className="datos-btn-title">SERVICIOS MÁS POPULARES</div>
            <div className="datos-btn-subtitle">Estadísticas de servicios solicitados</div>
          </div>
          <img src="/recursos/iconos/continuar.png" alt="Ver más"/>
        </div>
      </div>

      <MenuInferior />
    </div>
  );
}

export default BasedeDatos;
