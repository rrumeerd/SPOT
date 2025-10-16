import Logotipo from "../componentes/visuales/logotipo.jsx";
import LogotipodeNegocio from "../componentes/visuales/logotipodeNegocio.jsx";
import Volver from "../componentes/funcionales/botones/volver.jsx";
import { useUsuario } from "../contextos/contextodeUsuario.jsx";
import './pantallas.css';

function Configuracion() {
    const { TipodeUsuario, DatosdeUsuario, updateTipodeUsuario, clearUsuario } = useUsuario();

    const handleCerrarCuenta = () => {
        const confirmado = window.confirm(
            '¿Estás seguro? Esta acción hará que la cuenta deje de existir de forma permanente.'
        );
        if (confirmado) {
            clearUsuario();
        }
    };

    const cambiarTipo = () => {
        const nuevo = TipodeUsuario === 'negocio' ? 'cliente' : 'negocio';
        updateTipodeUsuario(nuevo);
    };

    return (
        <div className="configuracion-container">
            <div className="configuracion-header">
              <Volver />
                {TipodeUsuario === 'negocio' ? <LogotipodeNegocio /> : <Logotipo />}
            </div>
            <div className="configuracion-title">Configuración</div>
            <div className="configuracion-content">

                <div className="configuracion-configuracion">
                    <section className="config-section">
                        <h2>Información personal</h2>
                        <div className="config-section-content">
                            <div>Nombre: {DatosdeUsuario?.Nombre || DatosdeUsuario?.fullName || '—'}</div>
                            <div>Email: {DatosdeUsuario?.email || DatosdeUsuario?.Correo || '—'}</div>
                            <div>Tipo de cuenta: {TipodeUsuario || '—'}</div>
                            {DatosdeUsuario?.Telefono && <div>Teléfono: {DatosdeUsuario.Telefono}</div>}
                        </div>
                    </section>

                    <section className="config-section">
                        <h2>Métodos de inicio de sesión</h2>
                        <div className="config-section-content">
                            <button className="config-btn">
                                <img src="/recursos/iconos/continuar.png" alt="Agregar" />
                                Conectar método
                            </button>
                            <button className="config-btn">
                                <img src="/recursos/iconos/editar.png" alt="Gestionar" />
                                Gestionar métodos
                            </button>
                        </div>
                    </section>

                    <section className="config-section">
                        <h2>Cambiar el tipo de cuenta</h2>
                        <div className="config-section-content">
                            <button className="config-btn" onClick={cambiarTipo}>
                                <img src="/recursos/iconos/editar.png" alt="Cambiar tipo" />
                                Cambiar a {TipodeUsuario === 'negocio' ? 'cliente' : 'negocio'}
                            </button>
                        </div>
                    </section>

                    <section className="config-section">
                        <h2>Cambiar contraseña</h2>
                        <div className="config-section-content">
                            <button className="config-btn">
                                <img src="/recursos/iconos/editar.png" alt="Cambiar contraseña" />
                                Actualizar contraseña
                            </button>
                        </div>
                    </section>

                    <section className="config-section">
                        <h2>Cerrar cuenta</h2>
                        <div className="config-section-content">
                            <button 
                                className="config-btn cerrar-cuenta-btn" 
                                onClick={handleCerrarCuenta}
                                style={{ backgroundColor: '#ff0045', color: '#fff' }}
                            >
                                Cerrar cuenta permanentemente
                            </button>
                        </div>
                    </section>
                </div>

                <div className="configuracion-ubicacion-info">
                    <div className="configuracion-ubicacion-info-header">
                        <div className="configuracion-ubicación-nombre"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Configuracion;