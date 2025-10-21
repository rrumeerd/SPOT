import { useNavigate } from "react-router-dom";
import { useUsuario } from "../../contextos/contextodeUsuario";
import './funcionales.css';
import { useState } from "react";
import Ingresos from "./negocio/ingresos";

function MenuInferior() {
    const navigate = useNavigate();
    const { TipodeUsuario } = useUsuario();
    const [showIngresos, setShowIngresos] = useState(false);

    return (
        <>
            <nav className="menu-inferior">
                <button onClick={() => navigate('/inicio')}>
                    <img src="/recursos/iconos/inicio.png" alt="Inicio" />
                </button>
                {TipodeUsuario === 'negocio' && (
                    <button onClick={() => setShowIngresos(true)}>
                    <img src="/recursos/iconos/pago.png" alt="Transacciones en Espera" />
                </button>)}
                {showIngresos && <Ingresos onClose={() => setShowIngresos(false)} />}
                {TipodeUsuario === 'negocio' && (
                    <button onClick={() => navigate('/basededatos')}>
                        <img src="/recursos/iconos/base.png" alt="Base de Datos" />
                    </button>)}
                {TipodeUsuario === 'cliente' && (
                    <button onClick={() => navigate('/mapa')}>
                        <img src="/recursos/iconos/aguja.png" alt="Mapa" />
                    </button>)}
                {TipodeUsuario === 'cliente' && (
                    <button onClick={() => navigate('/vehiculos')}>
                        <img src="/recursos/iconos/auto.png" alt="Mis Vehículos" />
                    </button>)}
            </nav>
        </>
    );
}

export default MenuInferior;
