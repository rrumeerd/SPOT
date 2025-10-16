import React, { useState, useEffect } from 'react';
import { useUsuario } from '../../contextos/contextodeUsuario';
import MenuInferior from "../../componentes/funcionales/menuInferior";
import MenudeUsuario from "../../componentes/funcionales/menudeUsuario";
import Logotipo from "../../componentes/visuales/logotipo";
import Volver from "../../componentes/funcionales/botones/volver";
import './cliente.css';

function Movimientos() {
    const { DatosdeUsuario } = useUsuario();
    const [movimientos, setMovimientos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (DatosdeUsuario?.ID_usuario) {
            cargarDatos();
        }
    }, [DatosdeUsuario]);

    const cargarDatos = async () => {
        try {
            setLoading(true);
            
            // Cargar historial del cliente específico del usuario con información completa
            const historialResponse = await fetch(`http://localhost:4000/historiales-cliente/usuario/${DatosdeUsuario.ID_usuario}`);
            const movimientosUsuario = await historialResponse.json();
            
            setMovimientos(movimientosUsuario);
            
        } catch (err) {
            console.error('Error cargando datos:', err);
            setError('Error al cargar los movimientos');
        } finally {
            setLoading(false);
        }
    };

    const obtenerNombreVehiculo = (movimiento) => {
        if (movimiento.Vehiculo_Modelo && movimiento.Vehiculo_Matricula) {
            return `${movimiento.Vehiculo_Modelo} - ${movimiento.Vehiculo_Matricula}`;
        }
        return 'Vehículo no encontrado';
    };

    const obtenerNombreServicio = (movimiento) => {
        return movimiento.Servicio_Nombre || 'Servicio no encontrado';
    };

    const obtenerNombreNegocio = (movimiento) => {
        return movimiento.Negocio_Nombre || 'Negocio no encontrado';
    };

    const formatearFecha = (fecha) => {
        if (!fecha) return 'Fecha no disponible';
        const fechaObj = new Date(fecha);
        return fechaObj.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const calcularTiempoUso = (horaEntrada, horaSalida) => {
        if (!horaEntrada || !horaSalida) return 'Tiempo no disponible';
        
        const entrada = new Date(horaEntrada);
        const salida = new Date(horaSalida);
        const diferencia = salida - entrada;
        
        const horas = Math.floor(diferencia / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        
        if (horas > 0) {
            return `${horas}h ${minutos}m`;
        } else {
            return `${minutos}m`;
        }
    };

    const obtenerIconoServicio = (tipoServicio) => {
        switch (tipoServicio?.toLowerCase()) {
            case 'gasolina':
            case 'tanqueo':
                return '/recursos/iconos/gas.png';
            case 'parqueo':
            case 'estacionamiento':
                return '/recursos/iconos/velocidad.png';
            case 'mantenimiento':
                return '/recursos/iconos/aguja.png';
            default:
                return '/recursos/iconos/pago.png';
        }
    };

    if (loading) {
        return (
            <div className="movimientos-container">
                <div className="movimientos-header">
                    <Volver />
                    <Logotipo />
                    <MenudeUsuario />
                </div>
                <div className="movimientos-loading">
                    <div className="loading-spinner"></div>
                    <p>Cargando movimientos...</p>
                </div>
                <MenuInferior />
            </div>
        );
    }

    if (error) {
        return (
            <div className="movimientos-container">
                <div className="movimientos-header">
                    <Volver />
                    <Logotipo />
                    <MenudeUsuario />
                </div>
                <div className="movimientos-error">
                    <p>{error}</p>
                    <button onClick={cargarDatos} className="retry-btn">
                        Reintentar
                    </button>
                </div>
                <MenuInferior />
            </div>
        );
    }

    return (
        <div className="movimientos-container">
            <div className="movimientos-header">
                <Volver />
                <Logotipo />
                <MenudeUsuario />
            </div>

            <div className="movimientos-content">
                <h1 className="movimientos-title">Mis Movimientos</h1>
                
                {movimientos.length === 0 ? (
                    <div className="movimientos-empty">
                        <img src="/recursos/iconos/pago.png" alt="Sin movimientos" />
                        <p>No tienes movimientos registrados</p>
                        <span>Cuando uses nuestros servicios, aparecerán aquí</span>
                    </div>
                ) : (
                    <div className="movimientos-list">
                        {movimientos.map((movimiento, index) => (
                            <div key={movimiento.ID_historial_Cliente || index} className="movimiento-card">
                                <div className="movimiento-header">
                                    <img 
                                        src={obtenerIconoServicio(movimiento.Servicio_Nombre)} 
                                        alt="Tipo de servicio" 
                                        className="movimiento-icon"
                                    />
                                    <div className="movimiento-info">
                                        <h3>{obtenerNombreNegocio(movimiento)}</h3>
                                        <p>{obtenerNombreServicio(movimiento)}</p>
                                    </div>
                                    <div className="movimiento-time">
                                        <span>{formatearFecha(movimiento.Hora_entrada)}</span>
                                    </div>
                                </div>
                                
                                <div className="movimiento-details">
                                    <div className="detail-row">
                                        <span className="detail-label">Vehículo:</span>
                                        <span className="detail-value">{obtenerNombreVehiculo(movimiento)}</span>
                                    </div>
                                    
                                    <div className="detail-row">
                                        <span className="detail-label">Entrada:</span>
                                        <span className="detail-value">{formatearFecha(movimiento.Hora_entrada)}</span>
                                    </div>
                                    
                                    {movimiento.Hora_salida && (
                                        <div className="detail-row">
                                            <span className="detail-label">Salida:</span>
                                            <span className="detail-value">{formatearFecha(movimiento.Hora_salida)}</span>
                                        </div>
                                    )}
                                    
                                    {movimiento.Hora_salida && (
                                        <div className="detail-row">
                                            <span className="detail-label">Tiempo de uso:</span>
                                            <span className="detail-value tiempo-destacado">
                                                {calcularTiempoUso(movimiento.Hora_entrada, movimiento.Hora_salida)}
                                            </span>
                                        </div>
                                    )}
                                    
                                    {(movimiento.Monto || movimiento.Servicio_Tarifa) && (
                                        <div className="detail-row">
                                            <span className="detail-label">Costo:</span>
                                            <span className="detail-value precio">
                                                ${(movimiento.Monto || movimiento.Servicio_Tarifa)?.toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="movimiento-status">
                                    <span className={`status-badge ${movimiento.Hora_salida ? 'completed' : 'active'}`}>
                                        {movimiento.Hora_salida ? 'Completado' : 'En curso'}
                                    </span>
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

export default Movimientos;
