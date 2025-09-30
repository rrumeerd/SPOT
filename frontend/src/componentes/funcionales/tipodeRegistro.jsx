import { useNavigate } from "react-router-dom";
import { useUsuario } from "../../contextos/contextodeUsuario.jsx";
import './funcionales.css'

function TipodeRegistro({ onClose }) {
    const navigate = useNavigate();
    const { updateTipodeUsuario } = useUsuario();

    const handleSelecciondeCliente = () => {
        updateTipodeUsuario('cliente');
        if (onClose) onClose();
        navigate('/registro');
    };

    const handleSelecciondeNegocio = () => {
        updateTipodeUsuario('negocio');
        if (onClose) onClose();
        navigate('/registro');
    };

    return (
        <div className="overlay-registro" onClick={onClose}>
            <div className="popup-registro-container" onClick={(e) => e.stopPropagation()}>
                <div className="popup-card">
                    <div className="popup-card-header">
                        <div className="popup-card-title">
                        <h2>¿CÓMO QUIERES REGISTRARTE?</h2>
                        </div>
                        <button className="cerrar-btn" aria-label="Cerrar" onClick={onClose}>×</button>
                    </div>

                    <div className="popup-card-body">

                        <div className="popup-options">
                            <button onClick={handleSelecciondeCliente} className="popup-option">
                                <span className="popup-option-icon">
                                    <img src="/recursos/iconos/usuario.png" alt="Cliente"/>
                                </span>
                                <span className="popup-option-text">Registrarse como cliente</span>
                            </button>

                            <button onClick={handleSelecciondeNegocio} className="popup-option">
                                <span className="popup-option-icon">
                                    <img src="/recursos/iconos/inicio.png" alt="Negocio"/>
                                </span>
                                <span className="popup-option-text">Registrarse como negocio</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TipodeRegistro;