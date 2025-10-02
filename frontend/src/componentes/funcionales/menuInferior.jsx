import BotondeTransaccion from "./negocio/ingresos"
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../../contextos/contextodeUsuario";
import './funcionales.css';

function MenuInferior() {
    const navigate = useNavigate();
    const { TipodeUsuario } = useUsuario();

    return (
        <>
            <nav className="menu-inferior">
                <button onClick={() => navigate('/inicio')}>
                    <img src="/recursos/iconos/inicio.png" alt="Inicio" />
                </button>
                {TipodeUsuario === 'negocio' && (
                    <button onClick={BotondeTransaccion}>
                        <img src="/recursos/iconos/pago.png" alt="Transacciones en Espera" />
                    </button>)}
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
