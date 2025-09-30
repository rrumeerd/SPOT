import MenuInferior from "../../componentes/funcionales/menuInferior";
import MenudeUsuario from "../../componentes/funcionales/menudeUsuario";
import Saludo from "../../componentes/funcionales/saludo";
import LogotipoNegocio from "../../componentes/visuales/logotipodeNegocio";
import './negocio.css';

function IniciodeNegocio({ DatosdeNegocio }) {

    return (
        <div className="inicio-container">

            <div className="inicio-header">
                <LogotipoNegocio />
                <MenudeUsuario />
            </div>

            <Saludo />

            {/* Últimas Transacciones */}
            <div className="inicio-box">
                <div className="inicio-box-header">
                    <span>ÚLTIMAS TRANSACCIONES</span>
                    <img src="/recursos/iconos/pago.png" alt="Transacciones" />
                </div>
                <div className="inicio-negocio-pago-info">
                    Recibiste <b>($45.000)</b> de Carlos Mendoza
                </div>
                <div className="inicio-negocio-pago-motivo">
                    Servicio de mecánica general para moto YAMAHA NMAX 115
                </div>
            </div>

            {/* Acciones Rápidas */}
            <div className="inicio-box">
                <div className="inicio-box-header">
                    <span>ACCIONES RÁPIDAS</span>
                    <img src="/recursos/iconos/mas.png" alt="Acciones" />
                </div>
                <div className="inicio-acciones-boton">
                    <div>
                        <div style={{ fontSize: "1.1rem" }}>GESTIONAR CITAS</div>
                        <div style={{ fontSize: "0.95rem", color: "#e0e0e0" }}>Ver y programar citas</div>
                    </div>
                    <img src="/recursos/iconos/continuar.png" alt="Ver más" style={{ width: 28 }} />
                </div>
                <div className="inicio-acciones-boton">
                    <div style={{ fontSize: "1.1rem" }}>REPORTES</div>
                    <div style={{ fontSize: "0.95rem", color: "#e0e0e0" }}>Ver estadísticas</div>
                    <img src="/recursos/iconos/continuar.png" alt="Ver más" style={{ width: 28 }} />
                </div>
            </div>

            <MenuInferior />
        </div>
    );
};

export default IniciodeNegocio;