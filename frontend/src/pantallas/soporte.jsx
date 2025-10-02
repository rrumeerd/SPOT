import { useNavigate } from "react-router-dom";
import { useUsuario } from "../contextos/contextodeUsuario.jsx";
import Logotipo from "../componentes/visuales/logotipo.jsx";
import LogotipodeNegocio from "../componentes/visuales/logotipodeNegocio.jsx";
import Volver from "../componentes/funcionales/botones/volver.jsx";
import './pantallas.css';

function Soporte() {
    const navigate = useNavigate();
    const { TipodeUsuario } = useUsuario();

    return (
        <div className="soporte-container">
            <div className="soporte-header">
                <Volver />
                {TipodeUsuario === 'negocio' ? <LogotipodeNegocio /> : <Logotipo />}
            </div>

            <div className="soporte-title">Ayuda y Soporte</div>

            <div className="soporte-content">
                <div className="soporte-description">Selecciona un tema para obtener ayuda rápida</div>

                <div className="soporte-list">
                    <button className="soporte-item" onClick={() => navigate('/perfil')}>
                        <img src="/recursos/iconos/usuario.png" alt="Perfil" />
                        <div>
                            <div className="soporte-item-title">Mi Perfil</div>
                            <div className="soporte-item-sub">Edita tu información y preferencias</div>
                        </div>
                    </button>

                    <button className="soporte-item" onClick={() => navigate('/configuracion')}>
                        <img src="/recursos/iconos/editar.png" alt="Configuración" />
                        <div>
                            <div className="soporte-item-title">Configuración</div>
                            <div className="soporte-item-sub">Cuenta, seguridad y métodos de inicio</div>
                        </div>
                    </button>

                    {TipodeUsuario === 'cliente' && (
                        <>
                            <button className="soporte-item" onClick={() => navigate('/pagos')}>
                                <img src="/recursos/iconos/pago.png" alt="Pagos" />
                                <div>
                                    <div className="soporte-item-title">Pagos</div>
                                    <div className="soporte-item-sub">Formas de pago y estados de transacción</div>
                                </div>
                            </button>
                            <button className="soporte-item" onClick={() => navigate('/vehiculos')}>
                                <img src="/recursos/iconos/auto.png" alt="Vehículos" />
                                <div>
                                    <div className="soporte-item-title">Mis Vehículos</div>
                                    <div className="soporte-item-sub">Gestión de placas, alias y tipos</div>
                                </div>
                            </button>
                        </>
                    )}

                    {TipodeUsuario === 'negocio' && (
                        <>
                            <button className="soporte-item" onClick={() => navigate('/basededatos')}>
                                <img src="/recursos/iconos/base.png" alt="Base de datos" />
                                <div>
                                    <div className="soporte-item-title">Base de Datos</div>
                                    <div className="soporte-item-sub">Gestión de catálogo y operaciones</div>
                                </div>
                            </button>
                            <button className="soporte-item" onClick={() => navigate('/negocios')}>
                                <img src="/recursos/iconos/continuar.png" alt="Negocios" />
                                <div>
                                    <div className="soporte-item-title">Mis Negocios</div>
                                    <div className="soporte-item-sub">Puntos de venta y servicios</div>
                                </div>
                            </button>
                        </>
                    )}

                    <button className="soporte-item" onClick={() => navigate('/inicio')}>
                        <img src="/recursos/iconos/inicio.png" alt="Inicio" />
                        <div>
                            <div className="soporte-item-title">Ir al inicio</div>
                            <div className="soporte-item-sub">Accede a tus accesos directos</div>
                        </div>
                    </button>

                    <button className="soporte-item" onClick={() => navigate('/terminos')}>
                        <img src="/recursos/iconos/mas.png" alt="Términos" />
                        <div>
                            <div className="soporte-item-title">Términos y condiciones</div>
                            <div className="soporte-item-sub">Conoce nuestras políticas</div>
                        </div>
                    </button>
                </div>

                <div className="soporte-contacto">
                    <div>¿Necesitas más ayuda?</div>
                    <a className="soporte-contacto-btn" href="mailto:soporte@spot.app">Contactar soporte</a>
                </div>
            </div>
        </div>
    );
}

export default Soporte;


