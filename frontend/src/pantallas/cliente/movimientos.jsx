import MenuInferior from "../../componentes/funcionales/menuInferior";
import MenudeUsuario from "../../componentes/funcionales/menudeUsuario";
import Logotipo from "../../componentes/visuales/logotipo";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './cliente.css'

function MovimientosCliente() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [items, setItems] = useState([]);

    const cargarMovimientos = async () => {
        setLoading(true);
        setError('');
        try {
            setItems([]);
        } catch (e) {
            setError('No se pudieron cargar los movimientos.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarMovimientos();
    }, []);

    return (
        <div className="movimientos-container">
            <div className="movimientos-header">
                <Logotipo />
                <MenudeUsuario />
            </div>

            <h1 className="movimientos-title">TUS MOVIMIENTOS</h1>

            <div className="movimientos-content">
                {loading && (
                    <div className="movimientos-loading">
                        <div className="loading-spinner" />
                        <span>Cargando movimientos...</span>
                    </div>
                )}

                {!loading && error && (
                    <div className="movimientos-error">
                        <span>{error}</span>
                        <button className="retry-btn" onClick={cargarMovimientos}>Reintentar</button>
                    </div>
                )}

                {!loading && !error && items.length === 0 && (
                    <div className="movimientos-empty">
                        <img src="/recursos/iconos/pago.png" alt="Sin movimientos" />
                        <p>No tienes movimientos aún</p>
                        <span>Aquí aparecerán tus pagos, tanqueos y transferencias.</span>
                    </div>
                )}


                <div className="inicio-cliente-datos">
                    <div>
                        <img src="/recursos/iconos/velocidad.png" alt="Tiempo de Parqueo" />
                        <div>134.6 horas</div>
                        <div>aparcado</div>
                    </div>
                    <div>
                        <img src="/recursos/iconos/gas.png" alt="Tanqueos" />
                        <div>340.4 galones</div>
                        <div>tanqueados</div>
                    </div>
                </div>

                {!loading && !error && items.length > 0 && (
                    <div className="movimientos-list">
                        {items.map((m) => (
                            <div key={m.id} className="movimiento-card">
                                <div className="movimiento-header">
                                    <img className="movimiento-icon" src="/recursos/iconos/pago.png" alt="Movimiento" />
                                    <div className="movimiento-info">
                                        <h3>{m.titulo}</h3>
                                        <p>{m.descripcion}</p>
                                    </div>
                                    <div className="movimiento-time">
                                        <span>{m.fecha}</span>
                                    </div>
                                </div>
                                <div className="movimiento-details">
                                    <div className="detail-row">
                                        <span className="detail-label">Monto</span>
                                        <span className="detail-value precio">{m.monto}</span>
                                    </div>
                                    {m.vehiculo && (
                                        <div className="detail-row">
                                            <span className="detail-label">Vehículo</span>
                                            <span className="detail-value">{m.vehiculo}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="movimiento-status">
                                    <span className={`status-badge ${m.estado || 'completed'}`}>{m.estado || 'completado'}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <MenuInferior />
        </div>
    );
}

export default MovimientosCliente;


