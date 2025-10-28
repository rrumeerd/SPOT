import MenuInferior from "../../componentes/funcionales/menuInferior";
import MenudeUsuario from "../../componentes/funcionales/menudeUsuario";
import Saludo from "../../componentes/funcionales/saludo";
import Logotipo from "../../componentes/visuales/logotipo";
import { useNavigate } from 'react-router-dom';
import './cliente.css'

function IniciodeCliente() {
    const navigate = useNavigate();

    const irAMovimientos = () => {
        navigate('/movimientos');
    };

    return (
        <div className="inicio-container">

            <div className="inicio-header">
                <Logotipo />
                <MenudeUsuario />
            </div>

            <Saludo />

            <div className="inicio-box" onClick={irAMovimientos} style={{cursor: 'pointer'}}>
                <div className="inicio-box-header">
                    <span>TUS ÚLTIMOS MOVIMIENTOS</span>
                    <img src="/recursos/iconos/pago.png" alt="Movimientos" />
                </div>
                <div className="inicio-cliente-movimiento">
                    Aún no tienes movimientos recientes.
                    <button className="continuar-btn" onClick={irAMovimientos}>
                        <img src="/recursos/iconos/continuar.png" alt="Ver más" />
                    </button>
                </div>
            </div>

            <MenuInferior />
        </div>
    );
}

export default IniciodeCliente;