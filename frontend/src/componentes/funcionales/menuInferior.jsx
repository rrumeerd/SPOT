import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../../contextos/contextodeUsuario";
import './funcionales.css';

function MenuInferior() {
    const navigate = useNavigate();
    const { TipodeUsuario } = useUsuario();
    const [showModaldeTransaccion, setShowModaldeTransaccion] = useState(false);
    const [showModaldeIngreso, setShowModaldeIngreso] = useState(false);

    const BotondeTransaccion = () => {
        if (TipodeUsuario === 'cliente') {
            setShowModaldeTransaccion(true);
        } else if (TipodeUsuario === 'negocio') {
            setShowModaldeIngreso(true);
        }
    };

    return (
    <>
            <nav className="menu-inferior">
                <button onClick={() => navigate('/inicio')}>
                    <img src="/recursos/iconos/inicio.png" alt="Inicio" />
                </button>
                <button onClick={() => navigate(TipodeUsuario === 'negocio' ? '/basededatos' : '/mapa')}>
                    <img src={TipodeUsuario === 'negocio' ? "/recursos/iconos/base.png" : "/recursos/iconos/aguja.png"} alt={TipodeUsuario === 'negocio' ? "Base de datos" : "Mapa"} />
                </button>
                <button onClick={BotondeTransaccion}>
                    <img src="/recursos/iconos/pago.png" alt="Pago" />
                </button>
                <button onClick={() => navigate('/vehiculos')}>
                    <img src="/recursos/iconos/auto.png" alt="Vehículos" />
                </button>
            </nav>

            {showModaldeTransaccion && (
                <div className="modal-overlay" onClick={() => setShowModaldeTransaccion(false)}>
                    <div className="negocio-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>REALIZAR TRANSACCIÓN</h3>
                            <button
                                className="cerrar-btn"
                                onClick={() => setShowModaldeTransaccion(false)}
                            >
                                ×
                            </button>
                        </div>

                        <div className="modal-content">
                            <div className="negocio-type-row">
                                <select defaultValue="">
                                    <option value="">TIPO DE TRANSACCIÓN</option>
                                    <option value="transferir">Transferir dinero</option>
                                    <option value="pago">Pagar servicio</option>
                                    <option value="recargar">Recargar saldo</option>
                                </select>
                            </div>

                            <input
                                type="text"
                                placeholder="MONTO"
                            />

                            <input
                                type="text"
                                placeholder="DESTINATARIO"
                            />

                            <input
                                type="text"
                                placeholder="DESCRIPCIÓN"
                            />

                            <div className="modal-acciones">
                                <button
                                    type="button"
                                    className="guardar-btn"
                                    onClick={() => setShowModaldeTransaccion(false)}
                                >
                                    REALIZAR TRANSACCIÓN
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showModaldeIngreso && (
                <div className="modal-overlay" onClick={() => setShowModaldeIngreso(false)}>
                    <div className="negocio-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-encabezado">
                            <h3>GESTIONAR COLA DE ESPERA</h3>
                            <button
                                className="boton-cerrar"
                                onClick={() => setShowModaldeIngreso(false)}
                            >
                                ×
                            </button>
                        </div>

                        <div className="modal-content">
                            <div className="en-espera-section">
                                <h4>ClienteES EN ESPERA</h4>

                                <div className="en-espera-element">
                                    <div className="cliente-info">
                                        <div>Carlos Mendoza</div>
                                        <div>YAMAHA NMAX 115 - POP 69X</div>
                                        <div>Esperando desde: 15 min</div>
                                    </div>
                                    <div className="en-espera-actions">
                                        <input
                                            type="text"
                                            placeholder="ESCRIBIR MOTIVO"
                                            className="motivo-input"
                                        />
                                        <button className="asignar-btn">ASIGNAR</button>
                                    </div>
                                </div>

                                <div className="en-espera-stats">
                                    <span>Total en espera: <strong>3</strong></span>
                                    <span>Tiempo promedio: <strong>15 min</strong></span>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
      )}
                </>
            );
}

export default MenuInferior;
