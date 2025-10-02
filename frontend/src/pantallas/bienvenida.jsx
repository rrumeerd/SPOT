import Logotipo from '../componentes/visuales/logotipo';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Terminos from '../componentes/visuales/terminos.jsx';
import TipodeRegistro from '../componentes/funcionales/tipodeRegistro.jsx';
import './pantallas.css';

function Bienvenida() {
    const navigate = useNavigate();
    const [mostrarTipoRegistro, setMostrarTipoRegistro] = useState(false);
    const [mostrarTerminos, setMostrarTerminos] = useState(false);

    return (
        <>
        <div className="bienvenida-container">
            <div className='bienvenida-header'>
            <Logotipo />
                <h2 className='bienvenida-title'>¡BIENVENIDO A SPOT!</h2>
                <p className='bienvenida-subtitle'>Por favor, lee nuestros <a href='terminos' onClick={(e) => { e.preventDefault(); setMostrarTerminos(true); }}>términos y políticas de privacidad. </a></p>
            </div>

            <h1 className="bienvenida-comenzar-title">¡CREA UNA CUENTA AHORA!</h1>
            <div className="terceros-row">
                <button className="terceros-btn" onClick={() => navigate('/')}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/640px-Google_Favicon_2025.svg.png" alt="Google"/>
                    CONTINUAR CON GOOGLE
                </button>
                <button className="terceros-btn primary" onClick={() => navigate('/')}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple"/>
                    CONTINUAR CON iCLOUD
                </button>
            </div>
            <div>o</div>

            <div className='bienvenida-registro'>
                <button
                    onClick={() => setMostrarTipoRegistro(true)}
                    className="bienvenida-btn primary">
                    REGISTRARSE
                </button>
                <div className="bienvenida-footer">
                    <p>
                        ¿Ya tienes una cuenta?
                    </p>
                    <button
                        onClick={() => navigate('/iniciodesesion')}
                    >
                        ¡INICIA SESIÓN AQUI!
                    </button>
                </div>
            </div>

        </div>
        {mostrarTipoRegistro && (
            <TipodeRegistro onClose={() => setMostrarTipoRegistro(false)} />
        )}
        {mostrarTerminos && (
            <div className="overlay-terminos" onClick={() => setMostrarTerminos(false)}>
                <div className="popup-terminos" onClick={(e) => e.stopPropagation()}>
                    <div className="popup-terminos-header">
                        <h3>Términos y Políticas de Privacidad</h3>
                        <button className="cerrar-btn" onClick={() => setMostrarTerminos(false)}>×</button>
                    </div>
                    <div className="popup-terminos-body">
                        <Terminos />
                    </div>
                </div>
            </div>
        )}
        </>
    );
}

export default Bienvenida;
